# Design Brief: Hum Honge Kamyab

## Purpose & Tone
Government CSR career platform for Shree Raipur Cement Plant. Emotional arc: inspiration → empowerment → action. Tone: authoritative (institutional legitimacy), aspirational (career growth), welcoming (accessible to all backgrounds). Premium institutional aesthetic. OTP + notification layers integrate seamlessly into secure, real-time engagement loop.

## Visual Direction
Professional government branding with saffron/orange primary, deep grey accents, and teal accent for CTAs. Card-based layout. Hero sections with saffron accents. Leadership section with official imagery. Bilingual integration (Hindi/English). High-contrast accessibility. Mobile-first responsive. OTP entry uses monospace fonts for digit clarity. Notifications auto-update with subtle pulse on unread items, cyan type icons, destructive badge for count.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|-----------|-----------|-------|
| Primary | `0.64 0.18 37` | `0.68 0.16 38` | Saffron: government authenticity, CTAs, hero accents, OTP focus state |
| Secondary | `0.50 0 0` | `0.25 0 0` | Deep grey: navigation, secondary actions |
| Accent | `0.65 0.15 240` | `0.70 0.14 245` | Teal: highlights, job badges, notification type icons, countdown timer, data visualization |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Red: unread badge, error messages (invalid OTP, rate limit) |
| Success | `0.65 0.16 142` | `0.72 0.14 140` | Green: status indicators, placement confirmations |
| Background | `0.98 0 0` | `0.14 0 0` | Page base |
| Card | `1.0 0 0` | `0.18 0 0` | Card surfaces, elevated zones |
| Muted | `0.92 0 0` | `0.22 0 0` | Subtle backgrounds, disabled states, read notifications |

## Typography

| Layer | Font | Sizes | Use |
|-------|------|-------|-----|
| Display | Bricolage Grotesque (400–900) | 48–56px | Page titles, hero text, leadership names |
| Body | DM Sans (400–700) | 16–20px | Paragraphs, content, form labels, notification text |
| Mono | Geist Mono (400–700) | 12–14px | Code blocks, OTP digits, data tables, timestamps |

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
- **OTP Input**: 6 monospace digit slots (48×48px each), 2px border-border, focus: primary border + ring. Auto-advance on digit entry. Paste support. Error state: border-destructive.
- **Notification Item**: Flex row. Type icon (cyan accent, 20px) left. Unread bold, read muted. Badge: destructive red circle, 20px, right-aligned. Hover: bg-muted/30.
- **Unread Badge**: Circular, 20px diameter, bg-destructive, white text, 12px bold. Positioned top-right of header.
- **Countdown Timer**: Disabled state: muted-foreground, no-cursor. Active state (≤60s): accent color, bold, clickable.
- **Tables**: Header row: secondary background, bold. Rows: alternating muted/card. Border-b between rows. Hover: muted background shift.
- **Badges**: Pill-shaped (rounded-full). Colors: primary, accent, success, destructive. Text: 12px bold, foreground color per badge.

## Spacing & Rhythm

- **Grid Gap**: 12px (cards), 24px (sections), 48px (major blocks).
- **Padding**: Card: 20px. Section: 32px. Hero: 48px vertical.
- **Type Scale**: sm 12px, base 16px, lg 20px, xl 24px, 2xl 32px, 3xl 40px, 4xl 48px.

## Motion & Interaction

- **Transition**: All interactive elements use `transition-smooth` (300ms, cubic-bezier). No bouncy or playful easing.
- **Hover**: Cards lift via shadow, text color shifts to accent. Buttons: opacity fade or background shift.
- **Focus**: Ring-primary (saffron) 2px ring on all focusable elements. OTP inputs: border-primary + ring-primary/20.
- **Unread Pulse**: Notifications with unread status: subtle opacity pulse (2s cycle, 100% → 75% → 100%) to draw attention without distraction.
- **Notification Appearance**: Fade-in + slide-down (0.3s) on new notification entry.
- **Loading**: Subtle pulse animation on placeholder cards. No spinners.

## Signature Detail

Bilingual CTAs: "Apne Aap Ko Rajistar Kare" (Hindi) + "Register Now" (English) on primary saffron button. Reinforces government mandate + inclusive access. OTP flow: +91 country code hint, 6 monospace digit slots auto-advance, resend countdown anchors trust. Notification badge: destructive red, live count, unread items pulse subtly. Leadership section: official portraits + motivational quotes below each. These details anchor the platform's authority, security, and aspirational tone.

## Constraints

- No gradients (avoid cheap effects; elevation via shadows and layering).
- No custom illustrations (rely on icons + official imagery).
- Animations: entrance fades, hover transitions, unread pulse (2s subtle opacity), countdown timer state shift. No bouncy easing.
- All text: minimum 14px body, 48px hero. AA+ contrast enforced. OTP digits: 18px monospace.
- Mobile-first: responsive via `sm:`, `md:`, `lg:` breakpoints. OTP inputs stack on mobile (<768px).
