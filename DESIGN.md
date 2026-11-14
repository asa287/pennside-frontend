# PennSide — a different side of campus

An independent, student-built landing-page concept for the Penn community.
The deliverable in this repository is an editable React/Figma Make website, not a native Figma Design file.

## Art direction

Quiet editorial typography, warm paper, restrained Penn-red accents, authentic photography, and scroll-led chapters. No university crest or official university lockup is used. PennSide's four-petal mark is an original, independent identity.

## Reusable foundations

- Paper: `#F6F5F0`
- Ink: `#292D26`
- Penn-red accent: `#8E293C`
- Supporting copy: `#6B6E64`
- Hairline: `#DDDED5`
- Sans: DM Sans, weights 400–700
- Editorial: Libre Caslon Display, regular with italic styling
- Spacing scale: 8, 16, 24, 40, 64, 96px
- Layout: responsive gutters, 64px at 1440px and 24px at 390px
- Reusable components: Wordmark, Mark, KeyButton, Photo, Modal
- Target viewports: desktop 1440px, mobile 390px

## Connected interactions

1. Header, hero, preview notes, and closing CTAs open the PennKey concept.
2. PennKey introduction → mock handoff → five-step needs setup → personalized discovery.
3. Explore first → chapter introduction → campus → possibilities → Philadelphia → vision → closing.
4. The experiences/opportunities/conversations tabs change the illustrative editorial preview.
5. The footer opens the photography/source and licensing-review dialog.
6. Escape, backdrop click, and close controls dismiss dialogs. Keyboard focus is trapped and restored.

## Post-sign-in prototype

- Three-stage request intake: raw user statement, one simulated extraction/review form, and confirmation.
- The opening composer lists six essential hints—activity, date and time, location, budget, group size, and duration—plus optional social context.
- Missing essentials are completed inline on the single review screen; there is no separate clarification round.
- The extraction form captures activity/scenario, date and flexibility, location, budget, party-size range, duration, language, social energy, and soft preferences.
- Hard constraints are visibly separated from soft ranking preferences.
- A complete expandable record exposes all 30 supplied pipeline and evaluation fields for each synthetic case.
- Five selectable synthetic records cover complete requests, missing time, urgency risk, zero-candidate outcomes, invitation results, simulated resource states, and feedback-loop routing.
- Discovery supports search, category, date, and location filters and labels official-source verification and updates.
- Event detail keeps official registration separate from companion/teammate matching.
- AI clarification asks one material event-specific question and explains why it is needed.
- Matching explains the recommendation and keeps contact details hidden until mutual confirmation.
- The needs profile documents what is used, what may be shared as context, and what is not collected.
- All state is session-only mock data in the browser; no PennKey authentication, event ingestion, source monitoring, background refresh, or durable storage is connected.

## Motion

- Homepage Hero: seven lightly overlapping polaroids follow a wave path and continuously cycle through staggered appearance, a full-group hold, staggered disappearance, and restart.
- Polaroids use restrained sepia, reduced saturation, vignette, and grain treatments; location names and coordinates sit directly over the image.
- The public homepage is intentionally limited to three visible sections: Hero, Explore, and closing CTA.
- Reveal transitions: IntersectionObserver, one-time entrance.
- Desktop: restrained pointer-responsive image movement and magnetic CTA feedback.
- Reduced-motion preference disables parallax, zoom, pointer transforms, entrance animation, and smooth scrolling.

## Authentication boundary

This is a mock, not a working PennKey integration. It requests no credentials, stores no identity information, creates no account, and does not redirect to an identity provider.

## Photography

Local assets are stored in `public/images`. Exact source URLs, publisher information, and attribution-review notes are in `src/Landing.tsx`, and are visible through the footer's **Photography & sources** control.

All photographs require licensing review and confirmation of photographer credits before publication. Publicly accessible photography is not assumed to be licensed for reuse.

| Local asset                | Location                              | Publisher                               | Attribution status                                         |
| -------------------------- | ------------------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `locust-walk.jpg`          | Locust Walk                           | Penn Today / University of Pennsylvania | Photographer unconfirmed                                   |
| `fisher-reading-room.jpg`  | Fisher Fine Arts Library              | Penn Libraries                          | Photographer unconfirmed                                   |
| `fisher-exterior.jpg`      | Fisher Fine Arts Library exterior     | Penn Libraries                          | Photographer unconfirmed                                   |
| `philadelphia-skyline.jpg` | Fairmount Park / Philadelphia skyline | Visit Philadelphia                      | Source credits Visit Philadelphia; exact credit to confirm |
| `penn-commons-group.jpg`   | Penn Commons                          | University of Pennsylvania              | Photographer unconfirmed                                   |
| `locust-gathering.jpg`     | Locust Walk / Covenant                | University of Pennsylvania              | Photographer unconfirmed                                   |
| `campus-performance.jpg`   | Campus conversation                   | Penn Today / University of Pennsylvania | Photographer unconfirmed                                   |

Only size/quality optimization has been applied to the local photos. Source files remain linked in the credits dialog.
