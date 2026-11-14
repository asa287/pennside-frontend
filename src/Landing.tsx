import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

const photographs = [
  {
    id: "locust",
    src: `${import.meta.env.BASE_URL}images/locust-walk.jpg`,
    location: "Locust Walk",
    description:
      "Students walking along Locust Walk beneath autumn trees and Penn’s historic architecture.",
    source: "https://www.upenn.edu/",
    assetSource:
      "https://penntoday.upenn.edu/sites/default/files/2024-09/P-101335-Master-V1-036.jpg",
    publisher: "Penn Today / University of Pennsylvania",
    credit:
      "Photographer not identified in the source listing. Confirm attribution before publication.",
  },
  {
    id: "fisher",
    src: `${import.meta.env.BASE_URL}images/fisher-reading-room.jpg`,
    location: "Fisher Fine Arts Library",
    description: "Sunlight falling across the ornate reading room of Fisher Fine Arts Library.",
    source: "https://www.library.upenn.edu/finearts",
    assetSource:
      "https://www.library.upenn.edu/sites/default/files/2022-07/finearts-readingrmdappled.jpg",
    publisher: "Penn Libraries",
    credit:
      "Photographer not identified in the source listing. Confirm attribution before publication.",
  },
  {
    id: "fisher-exterior",
    src: `${import.meta.env.BASE_URL}images/fisher-exterior.jpg`,
    location: "Fisher Fine Arts Library · exterior",
    description: "The red-brick, Gothic exterior and entrance steps of Fisher Fine Arts Library.",
    source: "https://www.library.upenn.edu/finearts",
    assetSource:
      "https://www.library.upenn.edu/sites/default/files/2024-03/fisher%20exterior-original.jpeg",
    publisher: "Penn Libraries",
    credit:
      "Photographer not identified in the source listing. Confirm attribution before publication.",
  },
  {
    id: "city",
    src: `${import.meta.env.BASE_URL}images/philadelphia-skyline.jpg`,
    location: "Fairmount Park, Philadelphia",
    description:
      "An authentic aerial view of autumn in Fairmount Park with the Philadelphia skyline beyond.",
    source: "https://www.visitphilly.com/areas/philadelphia-neighborhoods/fairmount/",
    assetSource:
      "https://www.visitphilly.com/wp-content/uploads/2022/09/Fairmount-Park-Baseball-Field-Skyline-by-Visit-Philadelphia-2200x1237px.jpg",
    publisher: "Visit Philadelphia",
    credit:
      "Photo by Visit Philadelphia, as credited in the source filename. Confirm exact credit and usage rights.",
  },
  {
    id: "penn-commons",
    src: `${import.meta.env.BASE_URL}images/penn-commons-group.jpg`,
    location: "Penn Commons",
    description: "Students gathering beneath the Penn Commons shield in autumn.",
    source: "https://www.upenn.edu/",
    assetSource:
      "https://www.upenn.edu/sites/default/files/styles/priority_card_3x2/public/2025-09/P-101788-Master-V1-117.jpg",
    publisher: "University of Pennsylvania",
    credit:
      "Photographer not identified in the source listing. Confirm attribution before publication.",
  },
  {
    id: "locust-gathering",
    src: `${import.meta.env.BASE_URL}images/locust-gathering.jpg`,
    location: "Locust Walk",
    description: "Groups of students walking and gathering beneath the Covenant sculpture.",
    source: "https://www.upenn.edu/",
    assetSource:
      "https://www.upenn.edu/sites/default/files/styles/priority_card_3x2/public/2024-04/covenant.jpeg",
    publisher: "University of Pennsylvania",
    credit:
      "Photographer not identified in the source listing. Confirm attribution before publication.",
  },
  {
    id: "campus-conversation",
    src: `${import.meta.env.BASE_URL}images/campus-performance.jpg`,
    location: "Campus conversation",
    description: "A diverse group sitting in a circle and talking together.",
    source: "https://www.upenn.edu/",
    assetSource:
      "https://penntoday.upenn.edu/sites/default/files/styles/teaser/public/2026-10/Context_1.jpg",
    publisher: "Penn Today / University of Pennsylvania",
    credit:
      "Photographer not identified in the source listing. Confirm attribution before publication.",
  },
];

const previews = [
  {
    kind: "Experiences",
    title: "An evening outside your usual.",
    label: "THE EVENT",
    name: "Design after hours",
    detail:
      "An open studio, a small creative challenge, and people with entirely different perspectives.",
    meta: "Tangen Hall · Thursday, 6 PM",
  },
  {
    kind: "Opportunities",
    title: "A possibility you hadn’t considered.",
    label: "THE OPPORTUNITY",
    name: "Curiosity meets research",
    detail:
      "A cross-disciplinary introduction to student research. No perfect pitch needed—just a question.",
    meta: "On campus · Open to all schools",
  },
  {
    kind: "Conversations",
    title: "A question worth staying for.",
    label: "THE CONVERSATION",
    name: "What makes a place feel like home?",
    detail:
      "Different schools. Different stories. One unhurried conversation about finding your place.",
    meta: "Fisher Fine Arts · A small-group conversation",
  },
];

function Arrow({ diagonal = false, down = false }: { diagonal?: boolean; down?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d={
          down
            ? "M12 4v16m-5-5 5 5 5-5"
            : diagonal
              ? "M6 18 18 6M6 6h12v12"
              : "M4 12h16m-6-6 6 6-6 6"
        }
      />
    </svg>
  );
}

function Mark({ large = false }: { large?: boolean }) {
  return (
    <svg
      className={large ? "side-mark large" : "side-mark"}
      width="23"
      height="23"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 3c4 0 6 8 0 13C10 11 12 3 16 3Zm13 13c0 4-8 6-13 0 5-6 13-4 13 0ZM16 29c-4 0-6-8 0-13 6 5 4 13 0 13ZM3 16c0-4 8-6 13 0C11 22 3 20 3 16Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Wordmark({ mark }: { mark?: ReactNode }) {
  return (
    <span className="wordmark">
      {mark ?? <Mark />}
      <span>
        pennside<span className="wordmark-period">.</span>
      </span>
    </span>
  );
}

function moveMagnet(event: PointerEvent<HTMLButtonElement>) {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--magnet-x",
    `${(event.clientX - rect.left - rect.width / 2) * 0.07}px`,
  );
  event.currentTarget.style.setProperty(
    "--magnet-y",
    `${(event.clientY - rect.top - rect.height / 2) * 0.1}px`,
  );
}

function resetMagnet(event: PointerEvent<HTMLButtonElement>) {
  event.currentTarget.style.setProperty("--magnet-x", "0px");
  event.currentTarget.style.setProperty("--magnet-y", "0px");
}

function KeyButton({
  children = "Continue with PennKey",
  onClick,
  variant = "",
}: {
  children?: ReactNode;
  onClick: () => void;
  variant?: string;
}) {
  return (
    <button
      className={`key-button ${variant}`}
      onClick={onClick}
      onPointerMove={moveMagnet}
      onPointerLeave={resetMagnet}
    >
      <span>{children}</span>
      <Arrow diagonal />
    </button>
  );
}

function Photo({
  index,
  className = "",
  eager = false,
}: {
  index: number;
  className?: string;
  eager?: boolean;
}) {
  const photo = photographs[index];
  return (
    <img
      className={`editorial-photo ${className}`}
      src={photo.src}
      alt={photo.description}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}

function CampusPolaroid({
  className,
  photo,
  location,
  coordinates,
  corner,
}: {
  className: string;
  photo: number;
  location: string;
  coordinates: string;
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  return (
    <figure className={`campus-polaroid ${className}`}>
      <img
        src={photographs[photo].src}
        alt={photographs[photo].description}
        loading={className === "polaroid-one" ? "eager" : "lazy"}
      />
      <figcaption className={`polaroid-label ${corner}`}>
        <strong>{location}</strong>
        <span>{coordinates}</span>
      </figcaption>
    </figure>
  );
}

function movePhoto(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--pointer-x",
    `${((event.clientX - rect.left) / rect.width - 0.5) * 14}px`,
  );
  event.currentTarget.style.setProperty(
    "--pointer-y",
    `${((event.clientY - rect.top) / rect.height - 0.5) * 10}px`,
  );
}

function resetPhoto(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--pointer-x", "0px");
  event.currentTarget.style.setProperty("--pointer-y", "0px");
}

function Modal({
  children,
  onClose,
  className,
  label,
}: {
  children: ReactNode;
  onClose: () => void;
  className: string;
  label: string;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key !== "Tab") return;
      const elements = dialog.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex="0"]',
      );
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || document.activeElement === dialog.current)
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeydown);
      previousFocus?.focus();
    };
  }, []);

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={label}
        tabIndex={-1}
        ref={dialog}
      >
        {children}
      </div>
    </div>
  );
}

export default function Landing({ onSignedIn }: { onSignedIn: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [authStep, setAuthStep] = useState<"intro" | "handoff" | null>(null);
  const [credits, setCredits] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(0);
  const [activeChapter, setActiveChapter] = useState("campus");
  const [headerProgress, setHeaderProgress] = useState(false);
  const preview = previews[selectedPreview];

  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scenes = container.querySelectorAll<HTMLElement>("[data-scene]");
    let animationFrame = 0;
    const update = () => {
      animationFrame = 0;
      const height = window.innerHeight;
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (height * 0.65 - rect.top) / Math.max(rect.height - height * 0.35, 1)),
        );
        scene.style.setProperty("--progress", preference.matches ? "0.4" : progress.toFixed(4));
        if (rect.top < height * 0.5 && rect.bottom > height * 0.5 && scene.id)
          setActiveChapter(scene.id);
      });
      setHeaderProgress(window.scrollY > 45);
    };
    const onScroll = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    const reveals = container.querySelectorAll(".reveal");
    const syncMotion = () => {
      container.classList.toggle("motion-ready", !preference.matches);
      onScroll();
    };
    reveals.forEach((element) => observer.observe(element));
    syncMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    preference.addEventListener("change", syncMotion);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      preference.removeEventListener("change", syncMotion);
    };
  }, []);

  const openAuth = () => setAuthStep("intro");
  const scrollTo = (id: string) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  };

  return (
    <div className="penn-experience" ref={root}>
      <a className="skip-link" href="#explore">
        Skip to explore
      </a>
      <header className={`site-header ${headerProgress ? "scrolled" : ""}`}>
        <a className="home-link" href="#home" aria-label="PennSide home">
          <Wordmark
            mark={
              <svg
                className="side-mark"
                width="23"
                height="23"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 28V4h12a8 8 0 0 1 0 16h-6v8H5Zm6-18v4h6a2 2 0 0 0 0-4h-6Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
                <circle className="logo-blue-dot" cx="24" cy="25" r="3" fill="currentColor" />
              </svg>
            }
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#join">About</a>
          <a href="#explore">
            Explore
            <Arrow diagonal />
          </a>
        </nav>
        <KeyButton onClick={openAuth} variant="header-key">
          Join with PennKey
        </KeyButton>
      </header>

      <main>
        <section className="opening" id="home" aria-labelledby="opening-title">
          <div className="campus-polaroid-collage" aria-label="Penn campus locations">
            <CampusPolaroid
              className="polaroid-one"
              photo={0}
              location="Locust Walk"
              coordinates="39.9522° N · 75.1932° W"
              corner="top-left"
            />
            <CampusPolaroid
              className="polaroid-two"
              photo={2}
              location="Fisher Fine Arts"
              coordinates="39.9527° N · 75.1927° W"
              corner="top-right"
            />
            <CampusPolaroid
              className="polaroid-three"
              photo={1}
              location="Fisher Reading Room"
              coordinates="39.9528° N · 75.1928° W"
              corner="bottom-left"
            />
            <CampusPolaroid
              className="polaroid-four"
              photo={4}
              location="Penn Commons"
              coordinates="39.9524° N · 75.1924° W"
              corner="bottom-right"
            />
            <CampusPolaroid
              className="polaroid-five"
              photo={5}
              location="Locust Walk · Covenant"
              coordinates="39.9523° N · 75.1961° W"
              corner="top-left"
            />
            <CampusPolaroid
              className="polaroid-six"
              photo={6}
              location="Campus conversation"
              coordinates="39.9520° N · 75.1930° W"
              corner="top-right"
            />
            <CampusPolaroid
              className="polaroid-seven"
              photo={4}
              location="Penn Commons · East"
              coordinates="39.9525° N · 75.1922° W"
              corner="bottom-left"
            />
          </div>
          <div className="opening-copy">
            <h1 id="opening-title">
              There’s more to Penn.
              <br />
              <em>Find your part in it.</em>
            </h1>
            <p className="opening-description">
              Discover the experiences, opportunities, and
              <br className="desktop-only" /> conversations that make campus yours.
            </p>
            <div className="opening-actions">
              <KeyButton onClick={openAuth} />
              <a className="quiet-link" href="#explore">
                Explore first
                <Arrow down />
              </a>
            </div>
          </div>
          <a className="hero-scroll-cue" href="#explore">
            <span>SCROLL TO EXPLORE</span>
            <span className="scroll-cue-line">
              <i />
            </span>
          </a>
          <div className="opening-baseline">
            <span>For the curious. For the Penn community.</span>
            <span>Independent minds. Shared ground.</span>
          </div>
        </section>

        <section className="homepage-explore" id="explore">
          <div className="explore-intro reveal">
            <span className="eyebrow">EXPLORE PENN, YOUR WAY</span>
            <h2>
              A campus is more than
              <br />
              <em>what’s on the calendar.</em>
            </h2>
            <p>
              Start with what sounds good. PennSide helps turn a passing idea into a plan with the
              right people.
            </p>
            <KeyButton onClick={openAuth}>Tell us what you want to do</KeyButton>
          </div>
          <div className="explore-options">
            {[
              {
                number: "01",
                title: "Find something happening.",
                copy: "Official events, campus opportunities, and ideas worth leaving your room for.",
                tag: "DISCOVER",
              },
              {
                number: "02",
                title: "Make your own plan.",
                copy: "Coffee, a movie, a museum afternoon, or a low-key board game night.",
                tag: "CREATE",
              },
              {
                number: "03",
                title: "Find your people.",
                copy: "Share the plan only after you review it. Match around real constraints and mutual interest.",
                tag: "CONNECT",
              },
            ].map((option) => (
              <button key={option.number} onClick={openAuth}>
                <span>{option.number}</span>
                <div>
                  <small>{option.tag}</small>
                  <h3>{option.title}</h3>
                  <p>{option.copy}</p>
                </div>
                <Arrow diagonal />
              </button>
            ))}
          </div>
          <div className="explore-community-strip">
            <img src={`${import.meta.env.BASE_URL}images/locust-gathering.jpg`} alt="" />
            <img src={`${import.meta.env.BASE_URL}images/campus-performance.jpg`} alt="" />
            <span>
              <strong>One campus.</strong>
              More ways in.
            </span>
            <img src={`${import.meta.env.BASE_URL}images/penn-commons-group.jpg`} alt="" />
          </div>
        </section>

        <section className="chapter-introduction legacy-homepage-section">
          <div className="reveal">
            <span className="eyebrow">LOOK A LITTLE CLOSER</span>
            <p>
              Same campus.
              <br />
              <em>A whole new perspective.</em>
            </p>
          </div>
          <div className="chapter-links" aria-label="Explore chapters">
            {[
              { id: "campus", title: "On campus" },
              { id: "possibilities", title: "In the unexpected" },
              { id: "beyond", title: "Beyond the familiar" },
            ].map((chapter, index) => (
              <a key={chapter.id} href={`#${chapter.id}`}>
                <span>0{index + 1}</span>
                {chapter.title}
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </section>

        <section
          className="scroll-scene campus-scene"
          data-scene
          id="campus"
          aria-labelledby="campus-title"
        >
          <div
            className="scene-sticky interactive-photograph"
            onPointerMove={movePhoto}
            onPointerLeave={resetPhoto}
          >
            <Photo index={0} className="campus-zoom" />
            <div className="scene-shade" />
            <div className="scene-topline">
              <span>01 / ON CAMPUS</span>
              <span className="location-label">
                <span className="location-dot" />
                Locust Walk
              </span>
            </div>
            <div className="campus-scene-copy reveal">
              <span className="eyebrow light">A LITTLE CLOSER TO EVERYTHING</span>
              <h2 id="campus-title">
                A campus full
                <br />
                of <em>possibilities.</em>
              </h2>
              <p>Discover what’s happening around you.</p>
              <a
                href="#possibilities"
                className="scene-next"
                aria-label="Continue to opportunities and conversations"
              >
                <Arrow down />
              </a>
            </div>
            <div className="scene-bottomline">
              <span>Between one class and the next.</span>
              <span>There’s a whole world here.</span>
            </div>
          </div>
        </section>

        <section
          className="scroll-scene possibilities-scene"
          data-scene
          id="possibilities"
          aria-labelledby="possibilities-title"
        >
          <div className="possibilities-sticky">
            <div className="possibilities-copy">
              <span className="eyebrow reveal">02 / IN THE UNEXPECTED</span>
              <h2 className="reveal" id="possibilities-title">
                Find what you
                <br />
                didn’t know you
                <br />
                were <em>looking for.</em>
              </h2>
              <p className="section-description reveal">
                From campus events and academic opportunities to the conversations worth having.
              </p>
              <div
                className="possibility-tabs"
                role="tablist"
                aria-label="Preview PennSide possibilities"
              >
                {previews.map((item, index) => (
                  <button
                    id={`possibility-tab-${index}`}
                    key={item.kind}
                    role="tab"
                    aria-controls="possibility-preview"
                    aria-selected={selectedPreview === index}
                    tabIndex={selectedPreview === index ? 0 : -1}
                    className={selectedPreview === index ? "selected" : ""}
                    onClick={() => setSelectedPreview(index)}
                    onKeyDown={(event) => {
                      const next =
                        event.key === "ArrowDown" || event.key === "ArrowRight"
                          ? (index + 1) % previews.length
                          : event.key === "ArrowUp" || event.key === "ArrowLeft"
                            ? (index + previews.length - 1) % previews.length
                            : event.key === "Home"
                              ? 0
                              : event.key === "End"
                                ? previews.length - 1
                                : null;
                      if (next !== null) {
                        event.preventDefault();
                        setSelectedPreview(next);
                        document.getElementById(`possibility-tab-${next}`)?.focus();
                      }
                    }}
                  >
                    <span className="tab-number">0{index + 1}</span>
                    <span>
                      <strong>{item.kind}</strong>
                      <small>{item.title}</small>
                    </span>
                    <Arrow diagonal />
                  </button>
                ))}
              </div>
              <span className="preview-disclaimer">
                A glimpse of what’s possible. Illustrative previews, not live listings.
              </span>
            </div>
            <div className="possibilities-image-column">
              <figure
                className="library-photograph interactive-photograph"
                onPointerMove={movePhoto}
                onPointerLeave={resetPhoto}
              >
                <Photo index={1} className="library-pan" />
                <div className="library-photo-caption">
                  <span className="location-label">
                    <span className="location-dot" />
                    Fisher Fine Arts Library
                  </span>
                  <span className="image-hover-caption">
                    Make room for a different kind of discovery.
                  </span>
                </div>
                <div
                  className="preview-note"
                  id="possibility-preview"
                  role="tabpanel"
                  aria-labelledby={`possibility-tab-${selectedPreview}`}
                  tabIndex={0}
                >
                  <div className="preview-note-inner" key={selectedPreview}>
                    <span className="eyebrow">{preview.label}</span>
                    <h3>{preview.name}</h3>
                    <p>{preview.detail}</p>
                    <div className="preview-note-footer">
                      <span>{preview.meta}</span>
                      <button
                        onClick={openAuth}
                        aria-label={`Join PennSide to discover ${preview.kind.toLowerCase()}`}
                      >
                        <Arrow diagonal />
                      </button>
                    </div>
                  </div>
                </div>
              </figure>
              <div className="library-baseline">
                <span>A place to get lost in something good.</span>
                <Mark />
              </div>
            </div>
          </div>
        </section>

        <section
          className="scroll-scene city-scene"
          data-scene
          id="beyond"
          aria-labelledby="city-title"
        >
          <div
            className="scene-sticky interactive-photograph"
            onPointerMove={movePhoto}
            onPointerLeave={resetPhoto}
          >
            <Photo index={0} className="city-campus-layer" />
            <Photo index={3} className="city-reveal-layer" />
            <div className="scene-shade city-shade" />
            <div className="scene-topline">
              <span>03 / BEYOND THE FAMILIAR</span>
              <span className="location-label">
                <span className="location-dot" />
                Philadelphia, PA
              </span>
            </div>
            <div className="city-scene-copy reveal">
              <span className="eyebrow light">THE CITY IS PART OF YOUR STORY</span>
              <h2 id="city-title">
                Your world extends
                <br />
                beyond <em>the classroom.</em>
              </h2>
              <p>Explore more. Experience more. Belong more.</p>
            </div>
            <span className="city-place-marker skyline-marker">
              <i />
              CENTER CITY
            </span>
            <span className="city-place-marker park-marker">
              <i />
              FAIRMOUNT PARK
            </span>
            <div className="scene-bottomline">
              <span>Just beyond the familiar.</span>
              <a href="#about">
                Keep going
                <Arrow down />
              </a>
            </div>
          </div>
        </section>

        <section className="vision-section" id="about" aria-labelledby="vision-title">
          <div className="vision-heading reveal">
            <span className="eyebrow">A SMALL IDEA. A BIGGER WORLD.</span>
            <Mark large />
            <h2 id="vision-title">
              Make Penn feel smaller.
              <br />
              <em>Make your world bigger.</em>
            </h2>
          </div>
          <div className="vision-bottom">
            <span className="vision-aside reveal">
              Not another feed.
              <br />A way into the real thing.
            </span>
            <div className="reveal">
              <p>
                Penn is full of people to meet, places to explore, and opportunities waiting to be
                discovered. We’re bringing campus experiences, opportunities, and conversations into
                one place—making it easier to explore beyond the familiar and feel part of something
                bigger.
              </p>
              <p className="vision-signoff">Student-built. Penn-only. Open to possibility.</p>
            </div>
          </div>
        </section>

        <section className="closing-section" id="join" aria-labelledby="closing-title">
          <Photo index={0} className="closing-background" />
          <div className="closing-shade" />
          <div className="closing-topline">
            <span>THERE’S A PLACE FOR YOU HERE.</span>
            <Mark />
          </div>
          <div className="closing-copy reveal">
            <span className="eyebrow light">GO ON. SEE WHAT’S OUT THERE.</span>
            <h2 id="closing-title">
              Your Penn experience
              <br />
              <em>starts here.</em>
            </h2>
            <KeyButton onClick={openAuth} variant="cream" />
            <p>Built for the Penn community.</p>
          </div>
          <div className="closing-baseline">
            <span>One campus. Countless ways to be part of it.</span>
            <a href="#home">
              Back to the beginning
              <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" aria-label="PennSide home">
          <Wordmark />
        </a>
        <p />
        <div>
          <button onClick={() => setCredits(true)}>
            Photography & sources
            <Arrow diagonal />
          </button>
          <span>© {new Date().getFullYear()} PennSide</span>
        </div>
      </footer>
      <nav className="chapter-progress" aria-label="Chapter progress">
        {[
          { id: "campus", label: "Campus life" },
          { id: "possibilities", label: "Opportunities & conversations" },
          { id: "beyond", label: "Beyond campus" },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeChapter === item.id ? "active" : ""}
            aria-label={item.label}
            aria-current={activeChapter === item.id ? "location" : undefined}
          >
            <span />
          </a>
        ))}
      </nav>

      {authStep && (
        <Modal className="auth-concept" label="auth-title" onClose={() => setAuthStep(null)}>
          <div className="auth-photo">
            <Photo index={0} eager />
            <div className="auth-photo-shade" />
            <a href="#home" onClick={() => setAuthStep(null)} aria-label="PennSide home">
              <Wordmark />
            </a>
            <div>
              <span className="eyebrow light">YOUR CAMPUS. YOUR NEXT CHAPTER.</span>
              <p>
                A little less familiar.
                <br />
                <em>A little more you.</em>
              </p>
            </div>
            <span className="auth-photo-location">Locust Walk · University of Pennsylvania</span>
          </div>
          <div className="auth-content">
            <button
              className="close-button"
              onClick={() => setAuthStep(null)}
              aria-label="Close PennKey concept"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="m6 6 12 12M6 18 18 6" />
              </svg>
            </button>
            <span className="prototype-badge">CONCEPT PREVIEW · NOT A LIVE SIGN-IN</span>
            <div className="auth-main" key={authStep}>
              {authStep === "intro" ? (
                <>
                  <Mark large />
                  <span className="eyebrow">ONE COMMUNITY. YOUR WAY IN.</span>
                  <h2 id="auth-title">
                    Your PennKey.
                    <br />
                    <em>Your PennSide.</em>
                  </h2>
                  <p>
                    PennKey is our planned way to keep this space just for the Penn community. One
                    familiar sign-in. A world of possibilities.
                  </p>
                  <div className="handoff-diagram">
                    <span>
                      <Mark />
                      PennSide
                    </span>
                    <span className="handoff-line" />
                    <span>
                      <svg
                        width="18"
                        height="21"
                        viewBox="0 0 24 26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="m12 2 9 4v8c0 7-9 11-9 11S3 21 3 14V6l9-4Z" />
                        <path d="m8 13 3 3 5-6" />
                      </svg>
                      PennKey
                    </span>
                  </div>
                  <KeyButton onClick={() => setAuthStep("handoff")}>
                    Preview PennKey handoff
                  </KeyButton>
                  <button
                    className="auth-secondary"
                    onClick={() => {
                      setAuthStep(null);
                      scrollTo("explore");
                    }}
                  >
                    I’ll explore first
                    <Arrow />
                  </button>
                </>
              ) : (
                <>
                  <div className="handoff-emblem">
                    <svg
                      viewBox="0 0 48 48"
                      width="48"
                      height="48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="m24 4 15 6v13c0 12-15 20-15 20S9 35 9 23V10l15-6Z" />
                      <path d="M18 24h12m-4-4 4 4-4 4" />
                    </svg>
                  </div>
                  <span className="eyebrow">THE NEXT STEP, IMAGINED.</span>
                  <h2 id="auth-title">
                    A familiar sign-in.
                    <br />
                    <em>A new beginning.</em>
                  </h2>
                  <p>
                    In the live platform, you would now continue to Penn’s official PennKey sign-in
                    page, then return to PennSide.
                  </p>
                  <div className="auth-safety-note">
                    <strong>This is where our prototype pauses.</strong>
                    <p>
                      There is no redirect or live authentication. No credentials are requested and
                      no account has been created.
                    </p>
                  </div>
                  <KeyButton onClick={onSignedIn}>Continue to PennSide setup</KeyButton>
                  <button className="auth-secondary" onClick={() => setAuthStep("intro")}>
                    Back to the introduction
                  </button>
                </>
              )}
            </div>
            <p className="auth-bottom-note">
              Never enter PennKey credentials into this prototype.
              <br />
              PennKey integration is planned for a future version.
            </p>
            <div
              className="auth-steps"
              role="img"
              aria-label={`Step ${authStep === "intro" ? 1 : 2} of 2`}
            >
              <span className={authStep === "intro" ? "current" : ""} />
              <span className={authStep === "handoff" ? "current" : ""} />
            </div>
          </div>
        </Modal>
      )}

      {credits && (
        <Modal className="credits-dialog" label="credits-title" onClose={() => setCredits(false)}>
          <button
            className="close-button"
            onClick={() => setCredits(false)}
            aria-label="Close photography credits"
          >
            ×
          </button>
          <span className="eyebrow">REAL PLACES. REAL SOURCES.</span>
          <h2 id="credits-title">Behind the photographs.</h2>
          <p className="credits-notice">
            Prototype use only. All images are flagged for licensing and photographer-attribution
            review before publication. Public availability does not establish permission to reuse.
          </p>
          <div className="credits-list">
            {photographs.map((photo) => (
              <article key={photo.id}>
                <img src={photo.src} alt="" loading="lazy" />
                <div>
                  <h3>{photo.location}</h3>
                  <span>{photo.publisher}</span>
                  <p>{photo.credit}</p>
                  <a href={photo.source} target="_blank" rel="noreferrer">
                    Original source
                    <Arrow diagonal />
                  </a>
                  <a href={photo.assetSource} target="_blank" rel="noreferrer">
                    Source image
                    <Arrow diagonal />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
