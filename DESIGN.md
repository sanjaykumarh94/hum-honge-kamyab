# Design Brief: Hum Honge Kamyab

## Purpose & Tone
Government CSR career platform for Shree Raipur Cement Plant. Emotional arc: inspiration → empowerment → action. Tone: authoritative (institutional legitimacy), aspirational (career growth), welcoming (accessible to all backgrounds). Premium institutional aesthetic.

## Visual Direction
Professional government branding with saffron/orange primary, deep grey accents, and teal accent for CTAs. Card-based layout. Hero sections with saffron accents. Leadership section with official imagery. Bilingual integration (Hindi/English). High-contrast accessibility. Desktop-first responsive.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|-----------|-----------|-------|
| Primary | `0.64 0.18 37` | `0.68 0.16 38` | Saffron: government authenticity, CTAs, hero accents |
| Secondary | `0.50 0 0` | `0.25 0 0` | Deep grey: navigation, secondary actions |
| Accent | `0.65 0.15 240` | `0.70 0.14 245` | Teal: highlights, job badges, data visualization |
| Success | `0.65 0.16 142` | `0.72 0.14 140` | Green: status indicators, placement confirmations |
| Background | `0.98 0 0` | `0.14 0 0` | Page base |
| Card | `1.0 0 0` | `0.18 0 0` | Card surfaces, elevated zones |
| Muted | `0.92 0 0` | `0.22 0 0` | Subtle backgrounds, disabled states |

## Typography

| Layer | Font | Sizes | Use |
|-------|------|-------|-----|
| Display | Bricolage Grotesque (400–900) | 48–56px | Page titles, hero text, leadership names |
| Body | DM Sans (400–700) | 16–20px | Paragraphs, content, form labels |
| Mono | Geist Mono (400–700) | 12–14px | Code blocks, data tables, timestamps |

## Structural Zones

| Zone | Background | Border | Detail |
|------|-----------|--------|--------|
| Header | Card (white/dark card) | `border-border` | Logo + navigation + role badge. Saffron accent line below. |
| Hero | Background | None | Saffron accent bar left. Large title. Optional decorative icon. |
| Content | Background | None | Card grid layout. 12px gap between cards. |
| Card | Card | `border-border` | Rounded-sm (8px). Hover: subtle shadow lift. |
| CTA Zone | Card with border | `border-primary` | Saffron text/button, accent teal for secondary. Centered. Padding: 24px. |
| Footer | Muted background | `border-t border-border` | Links grid, social icons, contact info. Darker baseline. |
| Sidebar | Sidebar token | `border-sidebar-border` | Icon + label. Primary color on active state. Accent bar on hover. |

## Component Patterns

- **Buttons**: 4 variants — primary (saffron), secondary (grey), outline (border), ghost (text-only). Rounded-sm. Padding: 10px 20px. No shadows, hover via opacity or background shift.
- **Cards**: Border + shadow-sm. Title (DM Sans bold), description (regular). Action button or icon in top-right. Hover: border color shift to accent.
- **Form Fields**: Input: `bg-input` border. Focus: `ring-2 ring-primary`. Label: secondary color, 12px uppercase tracking.
- **Tables**: Header row: secondary background, bold. Rows: alternating muted/card. Border-b between rows. Hover: muted background shift.
- **Badges**: Pill-shaped (rounded-full). Colors: primary, accent, success, destructive. Text: 12px bold, foreground color per badge.

## Spacing & Rhythm

- **Grid Gap**: 12px (cards), 24px (sections), 48px (major blocks).
- **Padding**: Card: 20px. Section: 32px. Hero: 48px vertical.
- **Type Scale**: sm 12px, base 16px, lg 20px, xl 24px, 2xl 32px, 3xl 40px, 4xl 48px.

## Motion & Interaction

- **Transition**: All interactive elements use `transition-smooth` (300ms, cubic-bezier). No bouncy or playful easing.
- **Hover**: Cards lift via shadow, text color shifts to accent. Buttons: opacity fade or background shift.
- **Focus**: Ring-primary (saffron) 2px ring on all focusable elements.
- **Loading**: Subtle pulse animation on placeholder cards. No spinners.

## Signature Detail

Bilingual CTAs: "Apne Aap Ko Rajistar Kare" (Hindi) + "Register Now" (English) on primary saffron button. Reinforces government mandate + inclusive access. Leadership section: official portraits + motivational quotes below each. These two details anchor the platform's authority and aspirational tone.

## Constraints

- No gradients (avoid cheap effects; elevation via shadows and layering).
- No custom illustrations (rely on icons + official imagery).
- No animations beyond entrance fades and hover transitions.
- All text: minimum 14px body, 48px hero. AA+ contrast enforced.
- Desktop-first: mobile refinements via `sm:`, `md:`, `lg:` breakpoints.
