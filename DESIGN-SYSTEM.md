# Design System — "Signal"

Sanchar Telesystems sells mission-critical wireless equipment to public
safety, railways, utilities and government. The visual language should read
as **engineered and trustworthy**, not as a generic SaaS marketing site —
this is closer to the design register of Motorola Solutions or Cisco than
to a consumer startup.

## Palette

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0F1B2D` | Dark section backgrounds (hero, stats, CTAs) |
| `navy-light` | `#16273D` | Image placeholders / cards on dark bg |
| `navy-border` | `#26374C` | Hairlines on dark sections |
| `paper` | `#F6F7F5` | Light section backgrounds |
| `ink` | `#10151C` | Primary text on light backgrounds |
| `steel` | `#5B6B7E` | Secondary text, hairline borders |
| `beacon` | `#E8A33D` | The **one** accent — primary CTAs and status indicators only |

Why amber, not the more common tech-teal or SaaS-purple: radio and
telecom hardware universally uses amber/green LED indicators for
"active/standby" status. It's a color with real meaning in this
industry's own visual vocabulary, not a decoration borrowed from
somewhere else.

## Type

- **Display / headlines**: Space Grotesk (600/700) — a geometric grotesk
  with slightly technical, mechanical letterforms. Used for all `h1`–`h4`.
- **Body**: IBM Plex Sans (400/500) — designed by IBM for technical
  documentation; stays legible at small sizes in spec tables and dense
  product copy.

Line length is capped implicitly by `max-w-content` (1200px) combined with
narrower `max-w-xl`/`max-w-2xl` wrappers around prose blocks — nothing runs
edge-to-edge on large screens.

## The one motion moment

`Components/SignalWave.jsx` — an animated waveform line in the homepage
hero, evoking radio-signal propagation. This is the single deliberate,
non-user-triggered animation on the site. Everything else (image scale on
hover, mobile menu open/close, form focus states) responds to a user
action, per the "motion that answers a person's action" principle — it is
not decorative animation scattered across every card.

## Structural devices

- **Numbered steps** (`About.jsx` process section) are used only because
  that content genuinely is a sequence (conceptualization → design →
  execution). They are not used elsewhere as decoration.
- **Flat panels with hairline borders** (`.panel` in `app.css`) replace the
  generic "rounded card + soft grey shadow" SaaS default — appropriate for
  a brand about precision hardware, not friendliness.
- No tracked-out ALL-CAPS eyebrows, no middle-dot-joined meta strings, no
  arrow-suffixed button labels — these were deliberately avoided as the
  most common tells of generated, un-opinionated design.

## Extending this system

If you add a new page or section:
1. Alternate `navy` and `paper`/`white` section backgrounds to keep rhythm
   (see `Home.jsx` for the pattern) — don't let two dark or two light
   sections sit back-to-back without a visual break.
2. Reach for `beacon` at most once per screen — it loses meaning as a
   "this matters" signal if every button and link uses it.
3. Before adding a card grid, ask whether a flat `panel` with a hairline
   border communicates the content better than a rounded, shadowed card.
   Default to `panel`.
