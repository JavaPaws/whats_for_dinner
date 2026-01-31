# What's for Dinner — Project Plan

A simple family app to help decide what to eat for dinner by guiding choices (meals, base protein, then options). Personal project; may be opened to the public later.

---

## Vision

Reduce “what do you want for dinner?” friction by walking the family through a short decision flow: choose a direction (e.g., type of meal), pick a base protein, then see or pick from concrete options.

---

## Core Flow (MVP)

1. **Start** — User opens the app and begins a “What’s for dinner?” session.
2. **Meal type / direction** — Present a small set of high-level options (e.g., “Quick weeknight,” “Comfort food,” “Try something new,” “Use what’s in the fridge,” or similar). User picks one (or “surprise me”).
3. **Base protein** — From the chosen direction, narrow by protein (e.g., chicken, beef, pork, fish, vegetarian/beans, “no preference”). User picks one.
4. **Choices** — Show a short list of actual meal ideas that match the selected meal type + protein (e.g., “Grilled chicken with rice,” “Chicken stir-fry,” “Sheet-pan chicken and veggies”).
5. **Result** — Either pick one meal from the list or use a “pick for me” / random choice to land on a single dinner idea.

---

## Out of Scope for MVP

- Full recipe management or detailed recipes (can link out later).
- User accounts / login (keep it single-device / family shared for now).
- Shopping lists or inventory (possible future phase).
- Complex dietary filters (can add later if needed).

---

## Technical Direction (To Be Decided)

- **Platform:** Web app (responsive) is a good default for “personal, maybe public later.” Native mobile can be a later phase.
- **Stack:** To be chosen (e.g., simple static site + JS, or a small framework if we want state and reuse).
- **Data:** Meals and options can start as static data (JSON or similar); no backend required for MVP unless we want persistence (e.g., “recent picks,” favorites).

---

## Data Model (Conceptual)

- **Meal types / directions** — Small fixed list; each has an id and label.
- **Proteins** — Small fixed list; each has an id and label.
- **Meals** — Each meal has: name, optional short description, associated meal_type(s), associated protein(s). Enough to filter “meal type + protein → list of meals.”

---

## Success Criteria for MVP

- Family can complete the flow: choose direction → choose protein → see matching meals → get a single suggestion (chosen or random).
- Works on at least one device type (e.g., phone or tablet) without feeling broken.
- No login required; minimal setup to run or deploy.

---

## Open Questions / Later

- Exact list of meal types and proteins (to be filled in as we build).
- Initial set of meals (can grow over time).
- “Surprise me” / random at meal-type or protein step.
- Optional: remember last N picks or “we had this recently” to avoid repetition.
- If we open it to the public: optional accounts, sharing meal sets, or community suggestions.

---

## Next Steps

1. Choose tech stack and project structure (e.g., repo layout, tooling).
2. Define initial meal types and proteins and a small seed list of meals.
3. Implement the flow (screens/pages and state).
4. Add “pick for me” / random and basic styling so it’s usable by the family.
5. Iterate on content (more meals, better labels) and optional features.

---

*This plan is the single source of truth for Cursor when implementing “What’s for Dinner.” Update this file as decisions are made and scope changes.*
