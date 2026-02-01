# What's for Dinner

A simple family app to help decide what to eat for dinner—choose a meal direction, pick a base protein, then get meal options or a random pick.

**Project design and roadmap:** See **[PLAN.md](./PLAN.md)** for the source of truth on vision, MVP flow, data model, and technical direction.

---

## Getting Started

**Run locally (no build required):**

1. Clone the repo and open the project folder.
2. Serve the app with a simple static server (so `fetch` for `data/meals.json` works). Options:
   - **Python 3:** `python3 -m http.server 8000` then open http://localhost:8000
   - **Node (npx):** `npx serve` then open the URL shown
   - Or open `index.html` directly in a browser (may work if your browser allows local file fetch; otherwise use a server).

---

## Tech Stack

- **MVP:** Vanilla HTML, CSS, and JavaScript. No build step. Static files only.
- **Data:** `data/meals.json` (meals, meal types, proteins, favorites). Edit locally and push to update the deployed app.
- **Hosting:** GitHub Pages (see below).

---

## Deploying with GitHub Pages

When you're ready to use the app from a public URL:

1. Push your code to GitHub (e.g. branch `main`).
2. On GitHub, open your repository and go to **Settings**.
3. In the left sidebar, under **Code and automation**, click **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Under **Branch**, choose your branch (e.g. `main`) and select **/ (root)** as the folder. Click **Save**.
6. After a minute or two, your site will be live at:
   - `https://<your-username>.github.io/whats_for_dinner/`
   - (Replace `whats_for_dinner` with your repo name if different.)

**Notes:**

- The repository must be **public** on the free plan for GitHub Pages to serve it.
- To update the site after changes: edit files (e.g. `data/meals.json`), commit, and push; GitHub will redeploy automatically.
- To use a custom domain later, you can configure it in the same Pages settings.

---

## Changelog

*New features and notable updates. Newest first.*

### Unreleased

- Initial MVP: decision flow, JSON data, favorites filter, responsive layout.
- Project plan and README added.

---

*Last updated as the project evolves.*
