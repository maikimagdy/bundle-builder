# Wyze Bundle Builder

A frontend take-home prototype: a multi-step bundle builder with a live review panel, built in React. Users configure a personalized security system through a 4-step accordion, see their selections update live in a review panel, and can persist their configuration to localStorage to return to later.

---

## 🚀 Run Instructions

### Prerequisites
- Node.js 18+ and npm

### Install & Start
```bash
# Clone the repo
git clone <your-repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for Production
npm run build

# Tech Stack
React 18 (functional components + hooks)
Vite (dev server + build)
Tailwind CSS v4 (styling + responsive utilities)
localStorage (configuration persistence)
JSON-driven data — all products, variants, and pricing rendered from src/data/products.json


# Project Structure
src/
├── components/
│   ├── BundleBuilder.jsx          # Top-level state container
│   ├── builder/
│   │   ├── Builder.jsx            # Wraps the accordion
│   │   ├── Accordion.jsx          # Maps over steps
│   │   ├── AccordionStep.jsx      # Single accordion step
│   │   ├── StepHeader.jsx         # Header with chevron + counter
│   │   ├── ProductCard.jsx        # Product display (responsive)
│   │   └── VariantSelector.jsx    # Color/variant chips
│   ├── review/
│   │   ├── ReviewPanel.jsx        # Right-side summary panel
│   │   ├── ReviewSection.jsx      # Category grouping
│   │   ├── ReviewLineItem.jsx     # Single product row
│   │   ├── ShippingRow.jsx        # Fast Shipping row
│   │   └── CheckoutSummary.jsx    # Badge + total + checkout
│   └── shared/
│       ├── Badge.jsx              # "Save 22%" pill
│       ├── PriceTag.jsx           # Strikethrough + price
│       └── QuantityStepper.jsx    # - / qty / + stepper
├── data/
│   └── products.json              # All product/variant/pricing data
├── hooks/
│   └── useLocalStorage.js         # Persistence helpers
├── utils/
│   └── pricing.js                 # Total / savings calculations
└── index.css                      # Tailwind imports + responsive overrides

## Features
- Multi-step accordion with 4 steps
- Live review panel showing selected products and pricing
- Variant selection (color/size) with quantity stepper
- Fast Shipping row with toggle
- "Save 22%" badge and total calculation
- LocalStorage persistence for configurations
- Responsive design using Tailwind CSS v4
- JSON-driven data from src/data/products.json

## Responsive Layout Strategy
- Mobile: Fully stacked, 1-col products, all steps closed by default (iPhone Figma frame)
- Tablet: Builder full-width on top, products in a horizontal row, review panel stacked below with internal 2-column split (Frame 1736)
- Desktop: Side-by-side layout — builder left, sticky review panel right (Frame 1735)
- Large Desktop: Side-by-side layout — builder left, sticky review panel right (Frame 1735)
This way the user gets the best layout for their device rather than a single rigid breakpoint switch.

## Design & UX Decisions Most Important
These are deliberate choices I made beyond the spec — each is meant to improve UX or polish:

1. Plan is opt-in (toggle button) rather than pre-populated
Subscriptions are recurring charges and shouldn't be silently added to a cart. The Plan step uses an "Add to bundle / Added ✓" toggle instead of a quantity stepper, making the user's consent explicit. (The spec mentions a pre-populated plan, but I prioritized intentional opt-in for subscription clarity.)

2. "Let's get started!" header on mobile only
Added via a CSS pseudo-element scoped to < 768px. Gives mobile users a clear entry point without cluttering desktop.

3. All accordion steps closed on mobile by default
Mobile screens are short — defaulting all steps closed prevents the user from drowning in content on load. Desktop keeps Step 1 open as per Figma.

4. Smooth scroll-to-step on mobile
When a user opens an accordion step on mobile, the step smoothly scrolls into view so they don't have to hunt for the newly expanded content. Desktop doesn't need this — content is already visible.

5. ProductCard adapts its orientation
On large desktop: image LEFT + content RIGHT (horizontal)
On smaller screens: image TOP + content BELOW (vertical)
This keeps cards readable whether they're 600px wide (desktop) or 180px wide (tablet 5-in-a-row).

6. Review panel shows variant-specific images
If a user selects the "Black" variant of a camera, the review thumbnail shows the black image — not the default product image. Helps users visually confirm their choices.

7. Variant name displayed next to product title in review
E.g., Wyze Cam v4 (White) instead of just Wyze Cam v4. Especially useful when multiple variants of the same product are in the cart.

8. Internal 2-column split in review panel (768–885px only)
At small tablet widths, the review panel splits internally — product list LEFT, checkout summary RIGHT — to use horizontal space efficiently. Outside this range it's a single column.

9. Pricing math is calculated dynamically
All line totals and grand totals are computed from unit prices in products.json (unitPrice × quantity). Some values in the Figma reference appeared to be design placeholders that didn't mathematically reconcile (e.g., per-line totals didn't match unit price × quantity); the implementation uses consistent calculated math throughout.

10. Monthly financing estimate uses subtotal ÷ 12
Standard Affirm-style financing term. The Figma value ($19.19/mo) appeared to be a placeholder that didn't divide cleanly into any displayed total; the implementation uses a transparent subtotal ÷ 12 calculation.

## Persistence
Clicking "Save my system for later" writes the current selections and activeVariants to localStorage under a single key. On page load, BundleBuilder checks for saved data and uses it as the initial state (falling back to JSON defaults if nothing is saved).

## Tradeoffs & Notes
- No backend. The data is served from a local JSON file (the spec marks this as acceptable).
- Checkout button is a placeholder — it triggers an alert() as the spec allows.
- Variant chip styling (active highlight) is functional but minimal — the spec explicitly said not to worry about it.
- No animations on accordion open/close — kept it instant for snappy feel. Could add a transition in a future pass.
- No error boundaries — for a prototype of this size, not needed; would add for production.

## Thanks
Thanks for the well-scoped take-home — it was a fun build! Happy to walk through any of the decisions above in a follow-up.