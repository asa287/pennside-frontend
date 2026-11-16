import { useMemo, useState, type ReactNode } from "react";

type Intent = "companion" | "teammate";
type AppView = "discover" | "details" | "clarify" | "matches" | "invite" | "profile";
type Tone = "verified" | "updated" | "unconfirmed" | "waiting" | "confirmed";

const categories = [
  "Arts & culture",
  "Design",
  "Social impact",
  "Technology",
  "Wellness",
  "Academic",
];
const eventData = [
  {
    id: "design",
    date: "OCT 17",
    title: "Design Thinking Workshop",
    description: "A hands-on introduction to turning campus challenges into testable ideas.",
    time: "Thursday · 4:00–5:30 PM",
    location: "Tangen Hall · Room 708",
    category: "Design",
    host: "Venture Lab",
    source: "Penn Events Calendar",
    updated: "Checked 12 minutes ago",
    status: "verified" as Tone,
    statusText: "Verified",
    people: 8,
  },
  {
    id: "climate",
    date: "OCT 18",
    title: "Climate Action at Penn",
    description:
      "Students and practitioners share practical paths to climate action across campus.",
    time: "Friday · 12:30–1:45 PM",
    location: "Perry World House",
    category: "Social impact",
    host: "Penn Sustainability",
    source: "Penn Sustainability",
    updated: "Time updated today",
    status: "updated" as Tone,
    statusText: "Official update",
    people: 5,
  },
  {
    id: "jazz",
    date: "OCT 19",
    title: "Jazz under the Button",
    description: "An informal evening set from student musicians on College Green.",
    time: "Saturday · 6:00 PM",
    location: "College Green",
    category: "Arts & culture",
    host: "Penn Arts",
    source: "Penn Arts & Culture",
    updated: "Checked 2 hours ago",
    status: "unconfirmed" as Tone,
    statusText: "Location unconfirmed",
    people: 11,
  },
];

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={back ? "M20 12H4m6-6-6 6 6 6" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

function Icon({
  name,
}: {
  name:
    | "check"
    | "shield"
    | "spark"
    | "calendar"
    | "pin"
    | "people"
    | "filter"
    | "bell"
    | "search"
    | "external"
    | "clock";
}) {
  const paths = {
    check: <path d="m5 12 4 4L19 6" />,
    shield: (
      <>
        <path d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4m8-4v4M3 10h18" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </>
    ),
    filter: <path d="M4 6h16M7 12h10m-7 6h4" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6m0-6L10 14" />
        <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <span className="app-wordmark">
      <svg width="23" height="23" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M5 28V4h12a8 8 0 0 1 0 16h-6v8H5Zm6-18v4h6a2 2 0 0 0 0-4h-6Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <circle className="logo-blue-dot" cx="24" cy="25" r="3" fill="currentColor" />
      </svg>
      <span>
        pennside<span>.</span>
      </span>
    </span>
  );
}

function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`app-badge ${tone}`}>
      <i />
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
  secondary = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <button
      className={`app-primary ${secondary ? "secondary" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <Arrow />
    </button>
  );
}

type Setup = {
  intent: Intent;
  interests: string[];
  availability: string[];
  meetup: "before" | "entrance" | "flexible";
  groupSize: "one" | "small" | "any";
  requirementMode: Record<string, "required" | "flexible">;
  request: IntakeRecord;
};

type IntakeRecord = {
  syntheticUserId: string;
  rawInput: string;
  scenario: string;
  testCase: string;
  pipelineStage: string;
  category: string;
  activity: string;
  activityExtracted: string;
  time: string;
  flexibility: string;
  location: string;
  budget: number;
  budgetMin?: number;
  availableUntil?: string;
  timeZone?: string;
  minParty: number;
  maxParty: number;
  duration: number;
  language: string;
  socialEnergy: string;
  softPreferences: string;
  hardConstraints: string;
  missingFields: string;
  conflictFlag: string;
  expectedAction: string;
  expectedQuestion: string;
  confirmedSummary: string;
  mockCandidates: number;
  expectedMatch: string;
  invitationResult: string;
  resourceStatus: string;
  nextStep: string;
  feedbackLoop: string;
};

const sampleRequests: IntakeRecord[] = [
  {
    syntheticUserId: "STU-001",
    rawInput:
      "I want to organize a board game hangout in a Penn student common area. My budget is up to $15 per person, and I’d like 2–4 people total. I’m open to meeting students from different majors.",
    scenario: "Entertainment",
    testCase: "Missing time",
    pipelineStage: "Stage 1 · Requirement clarification",
    category: "Entertainment",
    activity: "Board games",
    activityExtracted: "Board games",
    time: "",
    flexibility: "Any time this week",
    location: "Penn student common area",
    budget: 15,
    minParty: 2,
    maxParty: 4,
    duration: 180,
    language: "No preference",
    socialEnergy: "Quiet / low social energy",
    softPreferences: "Open to meeting students from different majors",
    hardConstraints:
      "Location: Penn student common area; budget ≤ $15/person; total party: 2–4; verified Penn members only",
    missingFields: "Time",
    conflictFlag: "None",
    expectedAction: "Ask for the missing time",
    expectedQuestion: "What day and time window would work for you?",
    confirmedSummary: "Waiting for user confirmation",
    mockCandidates: 1,
    expectedMatch: "Candidate plan must be checked against hard constraints",
    invitationResult: "Activity cancelled",
    resourceStatus: "Available (simulated)",
    nextStep: "Ask for missing time → user confirms → enter matching pool",
    feedbackLoop: "Not yet",
  },
  {
    syntheticUserId: "STU-002",
    rawInput:
      "Looking for someone to see a movie with on November 11 at 7 PM at a Philadelphia cinema. Budget up to $50 per person. Exactly 2 people total. Shared course background would be nice.",
    scenario: "Entertainment",
    testCase: "Complete and explicit",
    pipelineStage: "Stage 2 · Joint matching",
    category: "Entertainment",
    activity: "Movie",
    activityExtracted: "Movie",
    time: "2026-11-11T19:00",
    flexibility: "Fixed",
    location: "Philadelphia cinema",
    budget: 50,
    minParty: 2,
    maxParty: 2,
    duration: 90,
    language: "English or Chinese",
    socialEnergy: "Casual conversation",
    softPreferences: "Shared course background preferred",
    hardConstraints:
      "Time: 2026-11-11 19:00; location: Philadelphia cinema; budget ≤ $50/person; total party: 2; verified Penn members only",
    missingFields: "None",
    conflictFlag: "None",
    expectedAction: "Organize requirements and show confirmation card",
    expectedQuestion: "Please review the request card and confirm whether to start matching.",
    confirmedSummary:
      "Movie | 2026-11-11 19:00 | Philadelphia cinema | ≤$50/person | 2 people | 90 minutes",
    mockCandidates: 8,
    expectedMatch: "Venue and resource coordination required",
    invitationResult: "Not sent",
    resourceStatus: "Needs verification",
    nextStep: "Verify hard constraints and resources → form candidate plan",
    feedbackLoop: "Not yet",
  },
  {
    syntheticUserId: "STU-003",
    rawInput:
      "Explore Philadelphia together on November 7 at 2 PM in Center City. Budget up to $30 per person, exactly 3 people total, ideally with shared course background.",
    scenario: "City exploration",
    testCase: "Complete and explicit",
    pipelineStage: "Stage 4 · Execution feedback",
    category: "City exploration",
    activity: "Explore Philly",
    activityExtracted: "Explore Philly",
    time: "2026-11-07T14:00",
    flexibility: "Any time this week",
    location: "Center City Philadelphia",
    budget: 30,
    minParty: 3,
    maxParty: 3,
    duration: 60,
    language: "No preference",
    socialEnergy: "No preference",
    softPreferences: "Shared course background preferred",
    hardConstraints:
      "Time: 2026-11-07 14:00; location: Center City Philadelphia; budget ≤ $30/person; total party: 3; verified Penn members only",
    missingFields: "None",
    conflictFlag: "None",
    expectedAction: "Organize requirements and show confirmation card",
    expectedQuestion: "Please review the request card and confirm whether to start matching.",
    confirmedSummary:
      "Explore Philly | 2026-11-07 14:00 | Center City Philadelphia | ≤$30/person | 3 people | 60 minutes",
    mockCandidates: 0,
    expectedMatch: "No feasible group yet",
    invitationResult: "Someone declined",
    resourceStatus: "Venue unavailable (simulated)",
    nextStep: "Final notice → activity execution → feedback → update interest profile",
    feedbackLoop: "Yes",
  },
  {
    syntheticUserId: "STU-004",
    rawInput:
      "Last-minute brunch this weekend. I’d love to find people now and can only wait 30 minutes.",
    scenario: "Dining",
    testCase: "Urgent activity",
    pipelineStage: "Stage 1 · Requirement clarification",
    category: "Dining",
    activity: "Brunch",
    activityExtracted: "Brunch",
    time: "",
    flexibility: "Any time this weekend",
    location: "University City restaurant",
    budget: 50,
    minParty: 3,
    maxParty: 3,
    duration: 120,
    language: "No preference",
    socialEnergy: "Active / high social energy",
    softPreferences: "Similar interests preferred",
    hardConstraints:
      "Location: University City restaurant; budget ≤ $50/person; total party: 3; response window: 30 minutes; verified Penn members only",
    missingFields: "Exact time",
    conflictFlag: "Urgent / short response window",
    expectedAction: "Verify exact time and explain matching uncertainty",
    expectedQuestion:
      "What exact time window do you mean by this weekend? Could you reschedule if nobody responds?",
    confirmedSummary: "Waiting for user confirmation",
    mockCandidates: 8,
    expectedMatch: "A candidate plan may be possible",
    invitationResult: "Partially accepted",
    resourceStatus: "Time conflict (simulated)",
    nextStep: "Verify exact time and risk → user confirms → enter matching pool",
    feedbackLoop: "Not yet",
  },
  {
    syntheticUserId: "STU-005",
    rawInput:
      "Find people for coffee and conversation at a University City coffee shop. Budget up to $20 per person, 5–7 people total. Open to different majors.",
    scenario: "Social",
    testCase: "Missing time",
    pipelineStage: "Stage 1 · Requirement clarification",
    category: "Social",
    activity: "Coffee chat",
    activityExtracted: "Coffee chat",
    time: "",
    flexibility: "Any time this week",
    location: "University City coffee shop",
    budget: 20,
    minParty: 5,
    maxParty: 7,
    duration: 150,
    language: "English or Chinese",
    socialEnergy: "Casual conversation",
    softPreferences: "Open to meeting students from different majors",
    hardConstraints:
      "Location: University City coffee shop; budget ≤ $20/person; total party: 5–7; verified Penn members only",
    missingFields: "Time",
    conflictFlag: "None",
    expectedAction: "Ask for the missing time",
    expectedQuestion: "What day and time window would work for you?",
    confirmedSummary: "Waiting for user confirmation",
    mockCandidates: 2,
    expectedMatch: "No feasible group yet",
    invitationResult: "Response timed out",
    resourceStatus: "Over budget (simulated)",
    nextStep: "Ask for missing time → user confirms → enter matching pool",
    feedbackLoop: "Not yet",
  },
];

const activityChoices = [
  { name: "Board games", category: "Entertainment" },
  { name: "Movie", category: "Entertainment" },
  { name: "Coffee & conversation", category: "Social" },
  { name: "Lunch or dinner", category: "Dining" },
  { name: "Explore Philadelphia", category: "City exploration" },
  { name: "Study session", category: "Academic" },
  { name: "Sports & outdoors", category: "Wellness" },
  { name: "Arts & culture", category: "Arts & culture" },
  { name: "Other activity", category: "Other" },
];
const locationChoices = [
  "Penn campus · student common area",
  "Locust Walk / College Green",
  "Penn Libraries",
  "Tangen Hall",
  "University City",
  "Center City, Philadelphia",
  "Online",
  "Other location",
];

type ActivityPlan = {
  activity: string;
  customActivity: string;
  start: string;
  end: string;
  budgetMin: number;
  budgetMax: number;
  location: string;
  customLocation: string;
  people: number;
};

const planExamples = [
  {
    name: "Board games",
    activity: "Board games",
    location: "Penn campus · student common area",
    people: 4,
    budgetMin: 0,
    budgetMax: 15,
    from: "18:00",
    until: "21:00",
  },
  {
    name: "Coffee chat",
    activity: "Coffee & conversation",
    location: "University City",
    people: 2,
    budgetMin: 5,
    budgetMax: 20,
    from: "14:00",
    until: "16:00",
  },
  {
    name: "Movie night",
    activity: "Movie",
    location: "Center City, Philadelphia",
    people: 4,
    budgetMin: 10,
    budgetMax: 40,
    from: "19:00",
    until: "22:00",
  },
];

function examplePlan(index: number): ActivityPlan {
  const example = planExamples[index];
  const campusDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const tomorrow = new Date(`${campusDate}T12:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const day = tomorrow.toISOString().slice(0, 10);
  return {
    activity: example.activity,
    customActivity: "",
    start: `${day}T${example.from}`,
    end: `${day}T${example.until}`,
    budgetMin: example.budgetMin,
    budgetMax: example.budgetMax,
    location: example.location,
    customLocation: "",
    people: example.people,
  };
}

function StructuredIntake({
  onComplete,
  onExit,
}: {
  onComplete: (setup: Setup) => void;
  onExit: () => void;
}) {
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [plan, setPlan] = useState<ActivityPlan>(() => examplePlan(0));
  const fillExample = (index: number) => {
    setPlan(examplePlan(index));
    setConsent(false);
  };
  const change = <K extends keyof ActivityPlan>(key: K, value: ActivityPlan[K]) => {
    setPlan((current) => ({ ...current, [key]: value }));
    setConsent(false);
  };
  const activity = plan.activity === "Other activity" ? plan.customActivity.trim() : plan.activity;
  const location = plan.location === "Other location" ? plan.customLocation.trim() : plan.location;
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const validStart = Boolean(plan.start && plan.start.slice(0, 10) >= today);
  const validEnd = Boolean(plan.end && plan.end > plan.start);
  const ready = Boolean(activity && location && validStart && validEnd);
  const budget = plan.budgetMax === 0 ? "Free · $0" : `$${plan.budgetMin}–$${plan.budgetMax}`;
  const availability = `${plan.start.replace("T", " at ")} – ${plan.end.replace("T", " at ")} (Eastern Time)`;
  const summary = `${activity} | ${availability} | ${location} | ${budget}/person | ${plan.people} people, including you`;
  const next = () => {
    if (!ready) return;
    setStep(1);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const finish = () => {
    if (!ready || !consent) return;
    const category =
      activityChoices.find((choice) => choice.name === plan.activity)?.category || "Other";
    const hardConstraints = `Available: ${availability}; location: ${location}; budget: $${plan.budgetMin}–$${plan.budgetMax}/person; total party: ${plan.people}, including organizer`;
    const request: IntakeRecord = {
      ...sampleRequests[0],
      syntheticUserId: "YOUR PLAN",
      rawInput: "",
      scenario: category,
      category,
      testCase: "Structured form",
      activity,
      activityExtracted: activity,
      time: plan.start,
      availableUntil: plan.end,
      timeZone: "America/New_York",
      flexibility: "Within selected availability",
      location,
      budgetMin: plan.budgetMin,
      budget: plan.budgetMax,
      minParty: plan.people,
      maxParty: plan.people,
      duration: Math.round((Date.parse(plan.end) - Date.parse(plan.start)) / 60000),
      language: "No preference",
      socialEnergy: "No preference",
      softPreferences: "None specified",
      hardConstraints,
      missingFields: "None",
      conflictFlag: "None",
      pipelineStage: "Confirmed · demo",
      confirmedSummary: summary,
      expectedAction: "Use confirmed selections for matching",
      expectedQuestion: "",
      mockCandidates: 0,
      expectedMatch: "Matching is not connected yet.",
      invitationResult: "No invitation sent",
      resourceStatus: "Not checked",
      nextStep: "Explore demo events",
      feedbackLoop: "Not started",
    };
    onComplete({
      intent: "companion",
      interests: [category, activity],
      availability: [availability],
      meetup: "flexible",
      groupSize: plan.people <= 2 ? "one" : "small",
      requirementMode: {
        event: "required",
        availability: "required",
        group: "required",
        meetup: "flexible",
      },
      request,
    });
  };
  const overview = (
    <dl className="plan-overview">
      <div>
        <dt>Activity</dt>
        <dd>{activity || "Choose an activity"}</dd>
      </div>
      <div>
        <dt>Available from</dt>
        <dd>{plan.start ? plan.start.replace("T", " at ") : "Choose a start time"}</dd>
      </div>
      <div>
        <dt>Available until</dt>
        <dd>{plan.end ? plan.end.replace("T", " at ") : "Choose an end time"}</dd>
      </div>
      <div>
        <dt>Budget / person</dt>
        <dd>
          {budget} <small>USD</small>
        </dd>
      </div>
      <div>
        <dt>Location</dt>
        <dd>{location || "Choose a location"}</dd>
      </div>
      <div>
        <dt>Total participants</dt>
        <dd>
          {plan.people} people <small>including you</small>
        </dd>
      </div>
    </dl>
  );
  return (
    <div className="intake-shell selection-intake">
      <header className="intake-header">
        <button onClick={onExit} aria-label="PennSide home">
          <Logo />
        </button>
        <nav className="intake-steps" aria-label="Activity setup progress">
          {["Plan", "Confirm"].map((label, index) => (
            <span
              key={label}
              className={index === step ? "active" : index < step ? "done" : ""}
              aria-current={index === step ? "step" : undefined}
            >
              <i>{index < step ? "✓" : index + 1}</i>
              {label}
            </span>
          ))}
        </nav>
        <button className="setup-exit" onClick={onExit}>
          Exit prototype
        </button>
      </header>
      <main className="intake-main">
        <section>
          <div className="intake-title">
            <span className="app-kicker">
              {step === 0 ? "A GOOD PLAN STARTS HERE" : "ONE LAST LOOK"}
            </span>
            <h1>{step === 0 ? "What’s your next plan?" : "Your plan, all together."}</h1>
            <p>
              {step === 0
                ? "A few choices, and you’re on your way. Pick an activity and tell us what works for you."
                : "Check the details below. You can go back and change anything before confirming."}
            </p>
          </div>
          {step === 0 && (
            <div className="plan-examples">
              <div>
                <span className="app-kicker">TRY AN EXAMPLE</span>
                <p>
                  A board game example is prefilled to get you started. Examples use tomorrow’s
                  date. Edit any detail, or go straight to review.
                </p>
              </div>
              <div className="plan-example-buttons">
                {planExamples.map((example, index) => (
                  <button type="button" key={example.name} onClick={() => fillExample(index)}>
                    Fill {example.name.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 0 ? (
            <form
              className="plan-layout"
              onSubmit={(event) => {
                event.preventDefault();
                next();
              }}
            >
              <div className="plan-fields">
                <fieldset className="plan-section">
                  <legend>
                    <span>01</span> The idea
                  </legend>
                  <label htmlFor="plan-activity">What would you like to organize?</label>
                  <select
                    id="plan-activity"
                    required
                    value={plan.activity}
                    onChange={(e) => change("activity", e.target.value)}
                  >
                    <option value="" disabled>
                      Choose an activity
                    </option>
                    {activityChoices.map((choice) => (
                      <option key={choice.name}>{choice.name}</option>
                    ))}
                  </select>
                  {plan.activity === "Other activity" && (
                    <label className="plan-custom">
                      Activity name
                      <input
                        required
                        maxLength={100}
                        pattern=".*\S.*"
                        value={plan.customActivity}
                        onChange={(e) => change("customActivity", e.target.value)}
                        placeholder="e.g. A photography walk"
                      />
                    </label>
                  )}
                </fieldset>
                <fieldset className="plan-section">
                  <legend>
                    <span>02</span> Your available time
                  </legend>
                  <p className="plan-help">
                    Choose a window when you’re free. All times are Eastern Time (Penn /
                    Philadelphia).
                  </p>
                  <div className="plan-grid">
                    <label>
                      Available from
                      <input
                        type="datetime-local"
                        required
                        min={`${today}T00:00`}
                        value={plan.start}
                        onInput={(e) => change("start", e.currentTarget.value)}
                      />
                    </label>
                    <label>
                      Available until
                      <input
                        type="datetime-local"
                        required
                        min={plan.start || `${today}T00:00`}
                        value={plan.end}
                        aria-invalid={Boolean(plan.end && !validEnd)}
                        aria-describedby={plan.end && !validEnd ? "plan-time-error" : undefined}
                        onInput={(e) => change("end", e.currentTarget.value)}
                      />
                    </label>
                  </div>
                  {plan.end && !validEnd && (
                    <p className="plan-error" id="plan-time-error" role="alert">
                      Choose an end time after your start time.
                    </p>
                  )}
                  {plan.start && !validStart && (
                    <p className="plan-error" role="alert">
                      Choose today or a future date.
                    </p>
                  )}
                </fieldset>
                <fieldset className="plan-section budget-section">
                  <legend>
                    <span>03</span> Your budget
                  </legend>
                  <div className="budget-heading">
                    <p className="plan-help">
                      Per person · USD. Drag either handle to set your range.
                    </p>
                    <output aria-live="polite">{budget}</output>
                  </div>
                  <div className="budget-slider">
                    <div className="budget-track" />
                    <div
                      className="budget-fill"
                      style={{
                        left: `${plan.budgetMin / 2}%`,
                        right: `${100 - plan.budgetMax / 2}%`,
                      }}
                    />
                    <input
                      type="range"
                      aria-label="Minimum budget per person"
                      aria-valuemax={plan.budgetMax}
                      aria-valuetext={`$${plan.budgetMin} per person`}
                      min={0}
                      max={200}
                      step={5}
                      value={plan.budgetMin}
                      onChange={(e) =>
                        change("budgetMin", Math.min(Number(e.target.value), plan.budgetMax))
                      }
                    />
                    <input
                      type="range"
                      aria-label="Maximum budget per person"
                      aria-valuemin={plan.budgetMin}
                      aria-valuetext={`$${plan.budgetMax} per person`}
                      min={0}
                      max={200}
                      step={5}
                      value={plan.budgetMax}
                      onChange={(e) =>
                        change("budgetMax", Math.max(Number(e.target.value), plan.budgetMin))
                      }
                    />
                  </div>
                  <div className="budget-scale">
                    <span>$0 · Free</span>
                    <span>$100</span>
                    <span>$200</span>
                  </div>
                  <div className="plan-grid budget-exact">
                    <label>
                      Minimum ($)
                      <input
                        type="number"
                        required
                        min={0}
                        max={plan.budgetMax}
                        step={5}
                        value={plan.budgetMin}
                        onChange={(e) =>
                          change(
                            "budgetMin",
                            Math.max(0, Math.min(Number(e.target.value), plan.budgetMax)),
                          )
                        }
                      />
                    </label>
                    <label>
                      Maximum ($)
                      <input
                        type="number"
                        required
                        min={plan.budgetMin}
                        max={200}
                        step={5}
                        value={plan.budgetMax}
                        onChange={(e) =>
                          change(
                            "budgetMax",
                            Math.min(200, Math.max(Number(e.target.value), plan.budgetMin)),
                          )
                        }
                      />
                    </label>
                  </div>
                  <button
                    className="budget-free"
                    type="button"
                    onClick={() => {
                      setPlan((current) => ({ ...current, budgetMin: 0, budgetMax: 0 }));
                      setConsent(false);
                    }}
                  >
                    Keep it free · $0
                  </button>
                </fieldset>
                <fieldset className="plan-section">
                  <legend>
                    <span>04</span> The place & the people
                  </legend>
                  <div className="plan-grid">
                    <label>
                      Where would you like to meet?
                      <select
                        required
                        value={plan.location}
                        onChange={(e) => change("location", e.target.value)}
                      >
                        <option value="" disabled>
                          Choose a location
                        </option>
                        {locationChoices.map((place) => (
                          <option key={place}>{place}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Expected participants
                      <select
                        value={plan.people}
                        onChange={(e) => change("people", Number(e.target.value))}
                      >
                        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 20].map((count) => (
                          <option value={count} key={count}>
                            {count} people, including you
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {plan.location === "Other location" && (
                    <label className="plan-custom">
                      Meeting place
                      <input
                        required
                        maxLength={150}
                        pattern=".*\S.*"
                        value={plan.customLocation}
                        onChange={(e) => change("customLocation", e.target.value)}
                        placeholder="A public place or venue"
                      />
                    </label>
                  )}
                  <p className="plan-help">
                    The total includes you as the organizer. You can arrange the exact meeting spot
                    later.
                  </p>
                </fieldset>
              </div>
              <aside className="plan-side">
                <div className="plan-summary-card">
                  <span className="app-kicker">YOUR PLAN AT A GLANCE</span>
                  <h2>
                    A little plan.
                    <br />A shared possibility.
                  </h2>
                  {overview}
                  <p className="plan-help">You’ll review these details before continuing.</p>
                </div>
                <button className="app-primary plan-submit" type="submit">
                  Review my plan <Arrow />
                </button>
                <p className="plan-footnote">
                  Choose your activity, time window, and location to continue.
                </p>
              </aside>
            </form>
          ) : (
            <div className="plan-layout plan-confirmation">
              <div className="plan-summary-card">
                <span className="app-kicker">
                  {activityChoices.find((choice) => choice.name === plan.activity)?.category}
                </span>
                <h2>{activity}</h2>
                {overview}
                <p className="plan-help">
                  Availability is in Eastern Time (America/New_York). Budget is per person in US
                  dollars.
                </p>
              </div>
              <aside className="plan-side">
                <div className="plan-summary-card">
                  <span className="app-kicker">YOU’RE IN CONTROL</span>
                  <h2>
                    Ready when
                    <br />
                    you are.
                  </h2>
                  <p>Confirm your choices to continue to the event companion.</p>
                  <p className="plan-help">
                    This is a prototype. Matching and invitations are still demonstrations;
                    confirming won’t send an invitation.
                  </p>
                  <label className="plan-consent">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <span>
                      I’ve reviewed my activity, availability, budget, location, and participant
                      count.
                    </span>
                  </label>
                  <PrimaryButton onClick={finish} disabled={!consent}>
                    Confirm my plan
                  </PrimaryButton>
                  <button
                    className="plan-edit"
                    onClick={() => {
                      setStep(0);
                      setConsent(false);
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                  >
                    <Arrow back /> Edit my plan
                  </button>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Onboarding({
  onComplete,
  onExit,
}: {
  onComplete: (setup: Setup) => void;
  onExit: () => void;
}) {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<Intent>("companion");
  const [interests, setInterests] = useState<string[]>(["Design", "Social impact"]);
  const [availability, setAvailability] = useState<string[]>(["Weekday afternoons"]);
  const [meetup, setMeetup] = useState<Setup["meetup"]>("entrance");
  const [groupSize, setGroupSize] = useState<Setup["groupSize"]>("one");
  const [requirementMode, setRequirementMode] = useState<Setup["requirementMode"]>({
    event: "required",
    availability: "required",
    group: "flexible",
    meetup: "flexible",
  });
  const titles = [
    "Welcome to your PennSide.",
    "What brings you here?",
    "What are you curious about?",
    "When does campus fit?",
    "Here’s what we’ll use.",
  ];
  const descriptions = [
    "We brought over only the minimum Penn context needed for this demo. You decide what else becomes part of your profile.",
    "Choose your main goal for now. You can switch modes for any individual event later.",
    "Pick a few signals for better discovery. These shape recommendations—not who gets to see you.",
    "Give us broad windows, not your class schedule. You can be more specific for an individual event.",
    "PennSide’s assistant translated your choices into matching needs. Review what’s firm and what can flex.",
  ];
  const canContinue = step !== 2 || interests.length >= 2;
  const toggle = (list: string[], item: string, setter: (next: string[]) => void) =>
    setter(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  const finish = () =>
    onComplete({
      intent,
      interests,
      availability,
      meetup,
      groupSize,
      requirementMode,
      request: sampleRequests[0],
    });

  return (
    <div className="setup-shell">
      <header className="setup-header">
        <button onClick={onExit} aria-label="Return to landing page">
          <Logo />
        </button>
        <span>PRIVATE SETUP · PROTOTYPE</span>
        <button className="setup-exit" onClick={onExit}>
          Exit setup
        </button>
      </header>
      <main className="setup-layout">
        <aside className="setup-rail">
          <span className="setup-kicker">YOUR PENNSIDE</span>
          <ol>
            {["Penn context", "Your goal", "Interests", "Availability", "Review"].map(
              (label, index) => (
                <li
                  key={label}
                  className={index === step ? "active" : index < step ? "complete" : ""}
                >
                  <span>{index < step ? <Icon name="check" /> : `0${index + 1}`}</span>
                  <strong>{label}</strong>
                </li>
              ),
            )}
          </ol>
          <div className="setup-privacy">
            <Icon name="shield" />
            <p>
              <strong>Built around restraint.</strong>We ask only for what improves discovery or
              matching. No class schedule, phone number, or personal bio is required.
            </p>
          </div>
        </aside>
        <section className="setup-content">
          <div className="setup-progress">
            <i style={{ width: `${((step + 1) / 5) * 100}%` }} />
          </div>
          <div className="setup-step" key={step}>
            <span className="setup-step-label">STEP {step + 1} OF 5</span>
            <h1>{titles[step]}</h1>
            <p className="setup-description">{descriptions[step]}</p>

            {step === 0 && (
              <div className="identity-panel">
                <div className="identity-top">
                  <div className="setup-avatar">AM</div>
                  <div>
                    <span>PENNKEY RETURN · SIMULATED</span>
                    <h2>Alex Morgan</h2>
                    <p>University of Pennsylvania community member</p>
                  </div>
                  <Badge tone="verified">Penn affiliation verified</Badge>
                </div>
                <div className="identity-fields">
                  <label>
                    <span>DISPLAY NAME</span>
                    <input value="Alex" readOnly aria-label="Display name" />
                    <small>Visible only after you request or accept a match.</small>
                  </label>
                  <label>
                    <span>
                      SCHOOL & YEAR <i>OPTIONAL</i>
                    </span>
                    <button>
                      CAS · Class of 2026 <b>⌄</b>
                    </button>
                    <small>Helps add context; never used as a hard match requirement.</small>
                  </label>
                </div>
                <div className="data-boundary">
                  <Icon name="shield" />
                  <div>
                    <strong>What PennSide receives in this prototype</strong>
                    <p>
                      A verified Penn affiliation and the display name above. Your PennKey username,
                      password, and institutional records are not collected.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="intent-grid">
                <button
                  className={intent === "companion" ? "selected" : ""}
                  onClick={() => setIntent("companion")}
                >
                  <span className="intent-icon">
                    <Icon name="people" />
                  </span>
                  <span className="intent-check">
                    <Icon name="check" />
                  </span>
                  <small>MOST COMMON</small>
                  <h2>Find someone to go with</h2>
                  <p>
                    A companion for a talk, workshop, performance, or another official Penn event.
                  </p>
                  <ul>
                    <li>Shared event interest</li>
                    <li>Compatible meetup time</li>
                    <li>Mutual opt-in</li>
                  </ul>
                </button>
                <button
                  className={intent === "teammate" ? "selected" : ""}
                  onClick={() => setIntent("teammate")}
                >
                  <span className="intent-icon">
                    <Icon name="spark" />
                  </span>
                  <span className="intent-check">
                    <Icon name="check" />
                  </span>
                  <small>PROJECT MODE</small>
                  <h2>Find a collaborative teammate</h2>
                  <p>
                    A teammate for an event challenge, project sprint, or collaborative opportunity.
                  </p>
                  <ul>
                    <li>Complementary interests</li>
                    <li>Working preferences</li>
                    <li>Shared commitment</li>
                  </ul>
                </button>
                <div className="intent-note">
                  <Icon name="spark" />
                  <p>
                    <strong>This is a starting preference, not a label.</strong>For each event, you
                    can choose companion or teammate mode independently.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="interest-setup">
                <div className="selection-count">
                  <span>{interests.length}</span>
                  <p>
                    <strong>interests selected</strong>
                    <small>Choose at least two</small>
                  </p>
                </div>
                <div className="choice-cloud">
                  {categories.map((item) => (
                    <button
                      key={item}
                      aria-pressed={interests.includes(item)}
                      className={interests.includes(item) ? "selected" : ""}
                      onClick={() => toggle(interests, item, setInterests)}
                    >
                      {item}
                      <span>{interests.includes(item) ? <Icon name="check" /> : "+"}</span>
                    </button>
                  ))}
                </div>
                <div className="interest-preview">
                  <span className="setup-kicker">YOUR DISCOVERY MIX</span>
                  <div>
                    {interests.length ? (
                      interests.map((item) => <span key={item}>{item}</span>)
                    ) : (
                      <p>Select interests to preview your mix.</p>
                    )}
                  </div>
                  <p>
                    Used to order events and explain recommendations. Interests are not shown
                    publicly.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="availability-setup">
                <div className="setup-question">
                  <span className="question-number">01</span>
                  <div>
                    <h2>When are you usually open to campus plans?</h2>
                    <p>Select broad windows. Event-specific availability comes later.</p>
                  </div>
                </div>
                <div className="slot-grid">
                  {[
                    "Weekday afternoons",
                    "Weekday evenings",
                    "Weekend daytime",
                    "Weekend evenings",
                  ].map((item) => (
                    <button
                      key={item}
                      className={availability.includes(item) ? "selected" : ""}
                      onClick={() => toggle(availability, item, setAvailability)}
                    >
                      <span>{availability.includes(item) && <Icon name="check" />}</span>
                      {item}
                    </button>
                  ))}
                </div>
                <div className="setup-question">
                  <span className="question-number">02</span>
                  <div>
                    <h2>For companion requests, what feels easiest?</h2>
                    <p>This is a flexible default.</p>
                  </div>
                </div>
                <div className="radio-row">
                  {[
                    {
                      id: "before",
                      title: "Meet a little before",
                      copy: "Enough time to say hello",
                    },
                    {
                      id: "entrance",
                      title: "Meet at the entrance",
                      copy: "Simple and event-focused",
                    },
                    { id: "flexible", title: "I’m flexible", copy: "Decide with the match" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={meetup === item.id ? "selected" : ""}
                      onClick={() => setMeetup(item.id as Setup["meetup"])}
                    >
                      <i />
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.copy}</small>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="setup-question compact">
                  <span className="question-number">03</span>
                  <div>
                    <h2>Preferred group size</h2>
                  </div>
                </div>
                <div className="group-row">
                  {[
                    { id: "one", text: "One person" },
                    { id: "small", text: "Small group (2–3)" },
                    { id: "any", text: "No preference" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={groupSize === item.id ? "selected" : ""}
                      onClick={() => setGroupSize(item.id as Setup["groupSize"])}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="review-setup">
                <div className="assistant-note">
                  <span>
                    <Icon name="spark" />
                  </span>
                  <div>
                    <strong>PennSide assistant</strong>
                    <p>
                      I kept your requirements broad. You’ll confirm the specific event and exact
                      availability every time you request a match.
                    </p>
                  </div>
                </div>
                <div className="needs-card">
                  <div className="needs-card-heading">
                    <div>
                      <span className="setup-kicker">MATCHING NEEDS</span>
                      <h2>Your starting preferences</h2>
                    </div>
                    <span>EDITABLE ANYTIME</span>
                  </div>
                  {[
                    {
                      id: "event",
                      label: "PRIMARY GOAL",
                      value:
                        intent === "companion"
                          ? "Find someone to attend with"
                          : "Find a collaborative teammate",
                      why: "Sets the default request type",
                    },
                    {
                      id: "availability",
                      label: "USUAL AVAILABILITY",
                      value: availability.join(" · ") || "Ask me for each event",
                      why: "Helps avoid impossible suggestions",
                    },
                    {
                      id: "group",
                      label: "GROUP SIZE",
                      value:
                        groupSize === "one"
                          ? "One companion"
                          : groupSize === "small"
                            ? "A small group of 2–3"
                            : "No preference",
                      why: "Shapes the kind of introduction",
                    },
                    {
                      id: "meetup",
                      label: "MEETUP DEFAULT",
                      value:
                        meetup === "entrance"
                          ? "Meet at the event entrance"
                          : meetup === "before"
                            ? "Meet shortly before the event"
                            : "Decide together",
                      why: "Used only as a starting suggestion",
                    },
                  ].map((item) => (
                    <div className="need-row" key={item.id}>
                      <div>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                        <small>{item.why}</small>
                      </div>
                      <div
                        className="mode-toggle"
                        role="group"
                        aria-label={`${item.label} flexibility`}
                      >
                        <button
                          className={requirementMode[item.id] === "required" ? "active" : ""}
                          onClick={() =>
                            setRequirementMode({ ...requirementMode, [item.id]: "required" })
                          }
                        >
                          Required
                        </button>
                        <button
                          className={requirementMode[item.id] === "flexible" ? "active" : ""}
                          onClick={() =>
                            setRequirementMode({ ...requirementMode, [item.id]: "flexible" })
                          }
                        >
                          Flexible
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="consent-summary">
                  <Icon name="shield" />
                  <div>
                    <strong>Your control, at every introduction.</strong>
                    <p>
                      PennSide will never share contact details based on this setup. For each
                      suggestion, both people must accept before either person can choose to share
                      coordination details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="setup-actions">
              <button
                className="setup-back"
                onClick={() => (step === 0 ? onExit() : setStep(step - 1))}
              >
                <Arrow back />
                {step === 0 ? "Back to landing" : "Back"}
              </button>
              <PrimaryButton
                onClick={() => (step === 4 ? finish() : setStep(step + 1))}
                disabled={!canContinue}
              >
                {step === 4 ? "Confirm preferences" : "Continue"}
              </PrimaryButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function EventCard({ event, onOpen }: { event: (typeof eventData)[number]; onOpen: () => void }) {
  return (
    <button className="app-event-card" onClick={onOpen}>
      <div className={`event-poster ${event.id}`}>
        <span>{event.category}</span>
        <strong>
          {event.id === "design"
            ? "MAKE / TEST / LEARN"
            : event.id === "climate"
              ? "ACT / TOGETHER"
              : "LISTEN / LINGER"}
        </strong>
        <i>{event.date}</i>
      </div>
      <div className="event-card-body">
        <div className="event-source">
          <Badge tone={event.status}>{event.statusText}</Badge>
          <span>{event.source}</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="event-meta">
          <span>
            <Icon name="calendar" />
            {event.time}
          </span>
          <span>
            <Icon name="pin" />
            {event.location}
          </span>
        </div>
        <div className="event-card-foot">
          <span>{event.people} students interested</span>
          <span>
            View event <Arrow />
          </span>
        </div>
      </div>
    </button>
  );
}

function AppHeader({
  view,
  setView,
  onSignOut,
}: {
  view: AppView;
  setView: (view: AppView) => void;
  onSignOut: () => void;
}) {
  return (
    <header className="app-header">
      <button onClick={() => setView("discover")}>
        <Logo />
      </button>
      <nav>
        <button className={view !== "profile" ? "active" : ""} onClick={() => setView("discover")}>
          Discover
        </button>
        <button>
          My plans <span>1</span>
        </button>
      </nav>
      <div className="app-header-actions">
        <button aria-label="Notifications">
          <Icon name="bell" />
          <i />
        </button>
        <button className="profile-button" onClick={() => setView("profile")}>
          <span>AM</span>
          <div>
            <strong>Alex</strong>
            <small>Penn verified</small>
          </div>
          <b>⌄</b>
        </button>
        <button className="prototype-signout" onClick={onSignOut}>
          Exit prototype
        </button>
      </div>
    </header>
  );
}

function Discover({ setup, setView }: { setup: Setup; setView: (view: AppView) => void }) {
  const [category, setCategory] = useState("For you");
  const [officialOnly, setOfficialOnly] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<"Any date" | "This week" | "Weekend">("Any date");
  const [locationFilter, setLocationFilter] = useState<
    "Anywhere" | "Tangen Hall" | "College Green"
  >("Anywhere");
  const filtered = useMemo(
    () =>
      eventData.filter((event) => {
        const matchesCategory = category === "For you" || event.category === category;
        const matchesSearch = `${event.title} ${event.description} ${event.host}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesDate =
          dateFilter === "Any date" ||
          dateFilter === "This week" ||
          event.time.startsWith("Saturday");
        const matchesLocation =
          locationFilter === "Anywhere" || event.location.includes(locationFilter);
        return matchesCategory && matchesSearch && matchesDate && matchesLocation;
      }),
    [category, dateFilter, locationFilter, search],
  );
  const clearFilters = () => {
    setSearch("");
    setDateFilter("Any date");
    setLocationFilter("Anywhere");
    setCategory("For you");
  };
  return (
    <main className="app-main">
      <section className="active-request-strip">
        <div>
          <span className="app-kicker">ACTIVE REQUEST · {setup.request.syntheticUserId}</span>
          <strong>{setup.request.activity}</strong>
          <p>{setup.request.confirmedSummary}</p>
        </div>
        <span className="request-stage">{setup.request.pipelineStage}</span>
        <div className="candidate-meter">
          <strong>{setup.request.mockCandidates}</strong>
          <span>synthetic candidates</span>
        </div>
        <button onClick={() => setView("profile")}>
          View structured needs <Arrow />
        </button>
      </section>
      <section className="app-welcome">
        <div>
          <span className="app-kicker">GOOD AFTERNOON, ALEX</span>
          <h1>
            Find your next <em>“I’m glad I went.”</em>
          </h1>
          <p>Official Penn experiences, ordered around what you’re curious about.</p>
        </div>
        <div className="recommendation-reason">
          <Icon name="spark" />
          <p>
            <strong>Shaped by your setup</strong>
            {setup.interests.join(" · ")}
            <br />
            {setup.availability.join(" · ")}
          </p>
          <button onClick={() => setView("profile")}>Tune preferences</button>
        </div>
      </section>
      <section className="discovery-tools">
        <label>
          <Icon name="search" />
          <input
            aria-label="Search events"
            placeholder="Search official Penn events"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <div className="filter-buttons">
          <button
            aria-label={`Date filter: ${dateFilter}`}
            onClick={() =>
              setDateFilter(
                dateFilter === "Any date"
                  ? "This week"
                  : dateFilter === "This week"
                    ? "Weekend"
                    : "Any date",
              )
            }
          >
            <Icon name="calendar" />
            {dateFilter} <span>⌄</span>
          </button>
          <button
            aria-label={`Location filter: ${locationFilter}`}
            onClick={() =>
              setLocationFilter(
                locationFilter === "Anywhere"
                  ? "Tangen Hall"
                  : locationFilter === "Tangen Hall"
                    ? "College Green"
                    : "Anywhere",
              )
            }
          >
            {locationFilter} <span>⌄</span>
          </button>
          <button onClick={clearFilters}>
            <Icon name="filter" />
            Reset filters{" "}
            <span>{Number(dateFilter !== "Any date") + Number(locationFilter !== "Anywhere")}</span>
          </button>
        </div>
        <label className="official-toggle">
          <input
            type="checkbox"
            checked={officialOnly}
            onChange={(event) => setOfficialOnly(event.target.checked)}
          />
          <i />
          <span>
            <strong>Official sources only</strong>
            <small>{officialOnly ? "On" : "Off"}</small>
          </span>
        </label>
      </section>
      <div className="app-category-tabs">
        {["For you", "Design", "Social impact", "Arts & culture"].map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="event-results">
        <div className="results-heading">
          <div>
            <span className="app-kicker">CURATED FOR YOUR INTERESTS</span>
            <h2>{category === "For you" ? "This week at Penn" : category}</h2>
          </div>
          <span>{filtered.length} official events</span>
        </div>
        {filtered.length ? (
          <div className="app-event-grid">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} onOpen={() => setView("details")} />
            ))}
          </div>
        ) : (
          <div className="filter-empty">
            <Icon name="search" />
            <strong>No official events match these filters.</strong>
            <p>Try another date, location, or search term.</p>
            <button onClick={clearFilters}>Clear filters</button>
          </div>
        )}
      </section>
      <section className="source-monitor">
        <div>
          <Icon name="shield" />
          <span>
            <strong>Information you can trace.</strong>
            <p>
              Every event links back to its supported official source. PennSide checks for changes
              and labels anything unavailable or unconfirmed.
            </p>
          </span>
        </div>
        <div className="monitor-stats">
          <span>
            <strong>12 min</strong>
            <small>Last source check</small>
          </span>
          <span>
            <strong>3</strong>
            <small>Supported sources</small>
          </span>
          <span>
            <strong>1 update</strong>
            <small>Detected today</small>
          </span>
        </div>
      </section>
    </main>
  );
}

function Details({
  setView,
  requestType,
  setRequestType,
}: {
  setView: (view: AppView) => void;
  requestType: Intent;
  setRequestType: (type: Intent) => void;
}) {
  return (
    <main className="app-main detail-page">
      <button className="app-back-link" onClick={() => setView("discover")}>
        <Arrow back />
        Back to discovery
      </button>
      <div className="detail-layout">
        <article className="app-detail">
          <div className="app-detail-poster">
            <span>VENTURE LAB · OFFICIAL PENN EVENT</span>
            <strong>
              MAKE
              <br />
              TEST
              <br />
              LEARN
            </strong>
            <i>OCT 17</i>
          </div>
          <div className="detail-title-row">
            <div>
              <Badge tone="verified">Verified information</Badge>
              <h1>Design Thinking Workshop</h1>
              <p>
                Turn a real campus challenge into a testable idea. This hands-on session is open to
                curious beginners from every school.
              </p>
            </div>
            <button aria-label="Save event">♡</button>
          </div>
          <div className="detail-facts">
            <div>
              <Icon name="calendar" />
              <span>
                <small>DATE & TIME</small>
                <strong>Thursday, October 17 · 4:00–5:30 PM</strong>
              </span>
            </div>
            <div>
              <Icon name="pin" />
              <span>
                <small>LOCATION</small>
                <strong>Tangen Hall · Room 708</strong>
              </span>
            </div>
            <div>
              <Icon name="people" />
              <span>
                <small>HOST</small>
                <strong>Venture Lab</strong>
              </span>
            </div>
            <div>
              <Icon name="clock" />
              <span>
                <small>CAPACITY</small>
                <strong className="unconfirmed-text">Not yet confirmed</strong>
              </span>
            </div>
          </div>
          <section className="detail-about">
            <span className="app-kicker">ABOUT THIS EVENT</span>
            <h2>A practical place to start.</h2>
            <p>
              Work through the basics of human-centered problem framing, rapid ideation, and
              low-fidelity prototyping with students across Penn.
            </p>
          </section>
          <div className="official-source-box">
            <Icon name="shield" />
            <div>
              <span>SUPPORTED OFFICIAL SOURCE</span>
              <strong>Penn Events Calendar · Venture Lab</strong>
              <small>Last checked today at 2:42 PM · No changes detected</small>
            </div>
            <a href="https://events.upenn.edu/" target="_blank" rel="noreferrer">
              View source <Icon name="external" />
            </a>
          </div>
        </article>
        <aside className="request-panel">
          <span className="app-kicker">MAKE THIS YOUR PLAN</span>
          <h2>How would you like to take part?</h2>
          <p>
            Registration and finding someone are separate. PennSide never registers on your behalf.
          </p>
          <div className="request-options">
            <button
              className={requestType === "companion" ? "selected" : ""}
              onClick={() => setRequestType("companion")}
            >
              <Icon name="people" />
              <span>
                <strong>Find a companion</strong>
                <small>Meet someone and attend together</small>
              </span>
              {requestType === "companion" && <Icon name="check" />}
            </button>
            <button
              className={requestType === "teammate" ? "selected" : ""}
              onClick={() => setRequestType("teammate")}
            >
              <Icon name="spark" />
              <span>
                <strong>Find a teammate</strong>
                <small>Collaborate around the event</small>
              </span>
              {requestType === "teammate" && <Icon name="check" />}
            </button>
          </div>
          <PrimaryButton onClick={() => setView("clarify")}>
            Continue with {requestType}
          </PrimaryButton>
          <a
            className="official-register"
            href="https://events.upenn.edu/"
            target="_blank"
            rel="noreferrer"
          >
            Register on official site <Icon name="external" />
          </a>
          <div className="separate-actions">
            <span>1</span>
            <p>
              <strong>Find your person here.</strong>PennSide helps make the introduction.
            </p>
            <i />
            <span>2</span>
            <p>
              <strong>Register separately.</strong>Complete official event registration at the
              source.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Clarify({
  setup,
  setView,
  requestType,
}: {
  setup: Setup;
  setView: (view: AppView) => void;
  requestType: Intent;
}) {
  const [answer, setAnswer] = useState<"before" | "entrance" | null>(
    setup.meetup === "before" ? "before" : "entrance",
  );
  const teammate = requestType === "teammate";
  return (
    <main className="app-main focused-page">
      <button className="app-back-link" onClick={() => setView("details")}>
        <Arrow back />
        Event details
      </button>
      <div className="focus-heading">
        <span className="app-kicker">{teammate ? "TEAMMATE" : "COMPANION"} REQUEST · 1 OF 2</span>
        <h1>A quick check before we look.</h1>
        <p>The assistant asks only what could change the quality of this specific match.</p>
      </div>
      <div className="clarify-layout">
        <section className="conversation-card">
          <div className="assistant-identity">
            <span>
              <Icon name="spark" />
            </span>
            <div>
              <strong>PennSide assistant</strong>
              <small>Uses your saved preferences as a starting point</small>
            </div>
          </div>
          <div className="assistant-bubble">
            <p>
              {teammate
                ? "Would you like to collaborate during the workshop, or connect afterward to keep developing the idea?"
                : "Your profile says you usually prefer meeting at the entrance. For this workshop, can you arrive a little early?"}
            </p>
          </div>
          <div className="answer-options">
            <button
              className={answer === "before" ? "selected" : ""}
              onClick={() => setAnswer("before")}
            >
              <i />
              <span>
                <strong>
                  {teammate ? "Collaborate during the workshop" : "Yes, I’m free from 3:40 PM"}
                </strong>
                <small>
                  {teammate ? "Work through the activities as a pair" : "Meet 15–20 minutes before"}
                </small>
              </span>
            </button>
            <button
              className={answer === "entrance" ? "selected" : ""}
              onClick={() => setAnswer("entrance")}
            >
              <i />
              <span>
                <strong>
                  {teammate ? "Connect after the workshop" : "I’d rather meet at the entrance"}
                </strong>
                <small>
                  {teammate ? "Attend independently, then follow up" : "Meet at 3:55 PM"}
                </small>
              </span>
            </button>
          </div>
          <div className="why-question">
            <Icon name="shield" />
            <p>
              <strong>Why we’re asking</strong>
              {teammate
                ? "Collaboration timing changes who will be a useful match."
                : "Availability is the one missing detail that materially affects this match."}{" "}
              We don’t need your class schedule or a reason.
            </p>
          </div>
        </section>
        <section className="request-review">
          <div className="needs-card-heading">
            <div>
              <span className="app-kicker">REQUEST PREVIEW</span>
              <h2>What matches will see</h2>
            </div>
            <button>Edit</button>
          </div>
          <div className="request-event-mini">
            <span>
              OCT<strong>17</strong>
            </span>
            <div>
              <small>OFFICIAL PENN EVENT</small>
              <strong>Design Thinking Workshop</strong>
              <p>Thursday · 4:00 PM</p>
            </div>
          </div>
          {[
            {
              label: "REQUEST TYPE",
              value: teammate ? "One collaborative teammate" : "One companion",
              mode: "Required",
            },
            {
              label: teammate ? "COLLABORATION" : "AVAILABLE FROM",
              value: teammate
                ? answer === "before"
                  ? "During the workshop"
                  : "Follow up afterward"
                : answer === "before"
                  ? "3:40 PM"
                  : "3:55 PM",
              mode: "Required",
            },
            {
              label: teammate ? "WORKING STYLE" : "MEETUP",
              value: teammate
                ? "Open to shaping the idea together"
                : answer === "before"
                  ? "Tangen Hall · 3:45 PM"
                  : "Tangen Hall entrance · 3:55 PM",
              mode: "Flexible",
            },
            { label: "SHARED INTEREST", value: "Design", mode: "Context" },
          ].map((item) => (
            <div className="request-field" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.mode}</small>
            </div>
          ))}
          <div className="request-privacy">
            <Icon name="shield" />
            <span>
              <strong>Private by default</strong>Your Penn email and contact details are not
              included.
            </span>
          </div>
          <PrimaryButton onClick={() => setView("matches")} disabled={!answer}>
            Confirm and find matches
          </PrimaryButton>
        </section>
      </div>
    </main>
  );
}

function Matches({ setView }: { setView: (view: AppView) => void }) {
  return (
    <main className="app-main focused-page">
      <button className="app-back-link" onClick={() => setView("clarify")}>
        <Arrow back />
        Edit request
      </button>
      <div className="focus-heading">
        <span className="app-kicker">COMPANION REQUEST · 2 OF 2</span>
        <h1>One thoughtful match.</h1>
        <p>A specific recommendation—not an endless feed of student profiles.</p>
      </div>
      <section className="match-layout">
        <div className="match-profile-card">
          <div className="match-person">
            <div className="jamie-avatar">JC</div>
            <div>
              <Badge tone="verified">Strong fit</Badge>
              <h2>Jamie Chen</h2>
              <p>SEAS · Class of 2027</p>
            </div>
            <span>
              92<small>% fit</small>
            </span>
          </div>
          <div className="match-explanation">
            <Icon name="spark" />
            <p>
              <strong>Why Jamie?</strong>You’re both interested in this workshop, have Design in
              your discovery mix, and can meet 15 minutes before it starts.
            </p>
          </div>
          <div className="match-signals">
            <span>
              <Icon name="calendar" />
              <strong>Same event</strong>
              <small>Design Thinking Workshop</small>
            </span>
            <span>
              <Icon name="clock" />
              <strong>Availability aligns</strong>
              <small>Both free from 3:40 PM</small>
            </span>
            <span>
              <Icon name="people" />
              <strong>Same group preference</strong>
              <small>One companion</small>
            </span>
          </div>
          <div className="about-match">
            <span className="app-kicker">A LITTLE CONTEXT</span>
            <p>
              “Interested in designing for social impact. This would be my first Venture Lab
              workshop.”
            </p>
          </div>
        </div>
        <aside className="invite-summary">
          <span className="app-kicker">YOUR INTRODUCTION</span>
          <h2>Send Jamie an invite?</h2>
          <p>
            Jamie will see the event, meetup proposal, your first name, school and year, and the
            context you approved.
          </p>
          <div className="visibility-list">
            <span>
              <Icon name="check" />
              Alex · CAS ’26
            </span>
            <span>
              <Icon name="check" />
              Event and meetup plan
            </span>
            <span>
              <Icon name="check" />
              Shared interest: Design
            </span>
            <span className="hidden-item">
              <Icon name="shield" />
              Email and contact details stay hidden
            </span>
          </div>
          <PrimaryButton onClick={() => setView("invite")}>Send invite</PrimaryButton>
          <button className="keep-looking">Not this match · Keep looking</button>
          <small>
            Jamie can accept, decline, or respond later. If either of you withdraws, contact sharing
            ends.
          </small>
        </aside>
      </section>
    </main>
  );
}

function Invite({ setView }: { setView: (view: AppView) => void }) {
  return (
    <main className="app-main confirmation-page">
      <div className="sent-mark">
        <Icon name="check" />
      </div>
      <Badge tone="waiting">Waiting for reply</Badge>
      <h1>Your invite is with Jamie.</h1>
      <p>We’ll let you know when Jamie responds. No contact details have been shared.</p>
      <section className="confirmed-plan">
        <div className="request-event-mini">
          <span>
            OCT<strong>17</strong>
          </span>
          <div>
            <small>THURSDAY · 4:00 PM</small>
            <strong>Design Thinking Workshop</strong>
            <p>Tangen Hall · Room 708</p>
          </div>
        </div>
        <div>
          <span>
            <Icon name="clock" />
            <small>PROPOSED MEETUP</small>
            <strong>3:45 PM · Tangen Hall entrance</strong>
          </span>
          <span>
            <Icon name="people" />
            <small>INVITED COMPANION</small>
            <strong>Jamie Chen · SEAS ’27</strong>
          </span>
        </div>
      </section>
      <div className="pending-consent">
        <Icon name="shield" />
        <div>
          <strong>Mutual confirmation comes first.</strong>
          <p>
            If Jamie accepts, you’ll both see the final plan. Each of you can then choose whether to
            share contact details.
          </p>
        </div>
      </div>
      <PrimaryButton onClick={() => setView("discover")}>Return to discovery</PrimaryButton>
      <button className="withdraw-button">Withdraw invitation</button>
    </main>
  );
}

function Profile({
  setup,
  onEdit,
  setView,
}: {
  setup: Setup;
  onEdit: () => void;
  setView: (view: AppView) => void;
}) {
  return (
    <main className="app-main profile-page">
      <button className="app-back-link" onClick={() => setView("discover")}>
        <Arrow back />
        Back to discovery
      </button>
      <div className="profile-heading">
        <div className="setup-avatar">AM</div>
        <div>
          <Badge tone="verified">Penn affiliation verified</Badge>
          <h1>Alex Morgan</h1>
          <p>CAS · Class of 2026 · Display name: Alex</p>
        </div>
        <button onClick={onEdit}>Redo setup</button>
      </div>
      <div className="profile-grid">
        <section>
          <span className="app-kicker">DISCOVERY & MATCHING</span>
          <h2>Your needs profile</h2>
          <p>
            These defaults reduce repeated questions. Every event request still requires your
            confirmation.
          </p>
          <div className="profile-needs">
            <div>
              <small>PRIMARY GOAL</small>
              <strong>
                {setup.intent === "companion"
                  ? "Find someone to attend with"
                  : "Find collaborative teammates"}
              </strong>
              <span>Required</span>
            </div>
            <div>
              <small>INTERESTS</small>
              <strong>{setup.interests.join(" · ")}</strong>
              <span>Private signal</span>
            </div>
            <div>
              <small>USUAL AVAILABILITY</small>
              <strong>{setup.availability.join(" · ")}</strong>
              <span>Flexible</span>
            </div>
            <div>
              <small>MEETUP DEFAULT</small>
              <strong>
                {setup.meetup === "entrance"
                  ? "At the event entrance"
                  : setup.meetup === "before"
                    ? "A little before"
                    : "Decide together"}
              </strong>
              <span>Flexible</span>
            </div>
          </div>
          <button className="edit-needs" onClick={onEdit}>
            Edit preferences
          </button>
        </section>
        <aside>
          <span className="app-kicker">PRIVACY & CONTROL</span>
          <h2>What stays yours</h2>
          <div className="privacy-setting">
            <Icon name="shield" />
            <div>
              <strong>Contact details</strong>
              <p>Hidden until both people confirm and each chooses to share.</p>
            </div>
            <span>Private</span>
          </div>
          <div className="privacy-setting">
            <Icon name="people" />
            <div>
              <strong>Interests</strong>
              <p>Used for recommendations; only shared as match context.</p>
            </div>
            <span>Limited</span>
          </div>
          <div className="privacy-setting">
            <Icon name="calendar" />
            <div>
              <strong>Availability</strong>
              <p>Only event-specific windows are shown to suggested matches.</p>
            </div>
            <span>Limited</span>
          </div>
          <div className="profile-boundary">
            <strong>Not collected</strong>
            <p>Class schedule · PennKey password · phone number · precise location history</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default function PostSignIn({ onSignOut }: { onSignOut: () => void }) {
  const [setup, setSetup] = useState<Setup | null>(null);
  const [view, setView] = useState<AppView>("discover");
  const [requestType, setRequestType] = useState<Intent>("companion");
  const complete = (next: Setup) => {
    setSetup(next);
    setRequestType(next.intent);
    setView("discover");
    window.scrollTo(0, 0);
  };
  const navigate = (next: AppView) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!setup) return <StructuredIntake onComplete={complete} onExit={onSignOut} />;
  return (
    <div className="signed-in-app">
      <AppHeader view={view} setView={navigate} onSignOut={onSignOut} />
      {view === "discover" && <Discover setup={setup} setView={navigate} />}
      {view === "details" && (
        <Details setView={navigate} requestType={requestType} setRequestType={setRequestType} />
      )}
      {view === "clarify" && <Clarify setup={setup} setView={navigate} requestType={requestType} />}
      {view === "matches" && <Matches setView={navigate} />}
      {view === "invite" && <Invite setView={navigate} />}
      {view === "profile" && (
        <Profile setup={setup} onEdit={() => setSetup(null)} setView={navigate} />
      )}
    </div>
  );
}
