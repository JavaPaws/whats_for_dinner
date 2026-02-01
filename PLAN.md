# What's for Dinner — Project Plan

A simple family app to help decide what to eat for dinner by guiding choices (meals, base protein, then options). Personal project; may be opened to the public later.

---

## Vision

Reduce "what do you want for dinner?" friction by walking the family through a short decision flow: choose a direction (e.g., type of meal), pick a base protein, then see or pick from concrete options.

---

## Core Flow (MVP)

1. **Start** — User opens the app and begins a "What's for dinner?" session.
2. **Meal type / direction** — Present a small set of high-level options (e.g., "Quick weeknight," "Comfort food," "Try something new," "Use what's in the fridge," or similar). User picks one (or "surprise me").
3. **Base protein** — From the chosen direction, narrow by protein (e.g., chicken, beef, pork, fish, vegetarian/beans, "no preference"). User picks one.
4. **Choices** — Show a short list of actual meal ideas that match the selected meal type + protein (e.g., "Grilled chicken with rice," "Chicken stir-fry," "Sheet-pan chicken and veggies").
5. **Result** — Either pick one meal from the list or use a "pick for me" / random choice to land on a single dinner idea.

---

## Meal Management (MVP) — Option A: JSON in repo

- **How updates work** — No "Manage meals" UI on the deployed site. You (or anyone with repo access) manage meals by **editing the JSON data file locally and pushing** to GitHub. The deployed app is **read-only**: family and others use the decision flow and see meals; they do not add, edit, or delete meals from the app.
- **Meal data** — For MVP, only the **meal name** is required in the JSON. Meal type and protein are **optional but encouraged** so the meal appears in the decision flow; name-only meals are allowed.
- **Favorites** — Stored **in the JSON only**. You set favorites when you edit the file and push; everyone sees the same hearts. Favorites show a **heart icon** next to the meal name. There is an **option to show favorites only** (filter). Favorites are **not** sorted to the top—just indicated with the heart icon.

---

## Out of Scope for MVP

- Full recipe management or detailed recipes (can link out later).
- User accounts / login / individual user access.
- "Manage meals" UI on the deployed site (Option A: manage by editing JSON and pushing).
- Shopping lists or inventory (possible future phase).
- Complex dietary filters (can add later if needed).

---

## Technical Direction (Decided for MVP)

- **Hosting:** GitHub Pages (no hosting cost). Static site only.
- **Platform:** Web app, responsive—must work on **iPhone browser, iPad browser, and computer browser**. No native app.
- **Data:** All data (meals, meal types, proteins, favorites) lives in a **static JSON file** in the repo. You update by editing the file locally and pushing; the deployed app loads JSON at runtime and is read-only. No backend, no database, no auth.
- **Stack:** **Vanilla HTML/CSS/JS** for MVP. No build step; static files only. Deploy as-is to GitHub Pages. Keep it simple so a working version is in use quickly; gather feedback and then define requirements for an update.

---

## Data Model (Conceptual)

- **Meal types / directions** — List in JSON; each has an id and label. You can add or change these by editing the JSON (no code change).
- **Proteins** — List in JSON; each has an id and label. Same as above.
- **Meals** — Each meal has: name (required), optional short description, optional meal_type(s), optional protein(s), and a **favorite** flag (boolean). Meal type and protein are optional; meals with neither still appear (e.g., in "all" or when no filter excludes them). Future may add ingredients and cooking instructions (TBD).
- **Single JSON file** (or one file per concern) holds meal types, proteins, and meals so one edit-and-push updates the whole app.

---

## Success Criteria for MVP

- Family (and others) can complete the flow: choose direction → choose protein → see matching meals → get a single suggestion (chosen or random).
- **Works on iPhone browser, iPad browser, and computer browser** (responsive; touch-friendly where needed).
- No login; deploy as static site to GitHub Pages.
- Meal data and favorites live in JSON; you update by editing JSON and pushing. Deployed app is read-only (decision flow + "show favorites only" filter). Favorites show heart icon; option to show favorites only (no sort-by-favorite).

---

## Open Questions / Later

- Exact list of meal types and proteins (to be filled in as we build).
- Initial set of meals (can grow over time).
- "Surprise me" / random at meal-type or protein step.
- Optional: remember last N picks or "we had this recently" to avoid repetition.
- If we open it to the public: optional accounts, sharing meal sets, or community suggestions.

---

## Next Steps

1. Set up project structure for vanilla HTML/CSS/JS and GitHub Pages (e.g. `index.html`, `data/meals.json`, `css/`, `js/`).
2. Define JSON shape and add initial meal types, proteins, and a small seed list of meals.
3. Implement the decision flow (meal type → protein → choices → result), load data from JSON, "pick for me" / random, favorites (heart icon + "show favorites only" filter). Responsive for iPhone, iPad, desktop.
4. Deploy to GitHub Pages.
5. **Use it for a while and gather feedback** on what feels missing or what changes are needed, then document requirements for the next update.

---

*This plan is the single source of truth for Cursor when implementing "What's for Dinner." Update this file as decisions are made and scope changes.*
