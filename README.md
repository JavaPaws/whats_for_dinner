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

## Deploying to a local NAS (QNAP)

You can copy the app to a QNAP NAS web share so it’s served from your local network. Use the included script after you’ve set the path.

### How to find your NAS path (Mac)

On macOS, when you connect to a network share it’s usually **SMB** and it gets **mounted** under `/Volumes/`. To find the path:

1. **Connect to the share**
   - In Finder: **Go → Connect to Server** (or press **Cmd + K**).
   - Enter your QNAP address, e.g. `smb://192.168.1.100` or `smb://myqnap.local`, then choose the share that your web server uses (e.g. `web` or `Web`).
   - Log in if prompted. The share will appear in the Finder sidebar and on the desktop if you have that option on.

2. **See the mounted path**
   - Open **Terminal** and run:
     ```bash
     ls /Volumes
     ```
   - You’ll see your Mac disk and any mounted shares. The NAS share will be listed by name (e.g. `web` or `QNAP`). The full path is:
     ```bash
     /Volumes/ShareName
     ```
   - If the web server is supposed to serve from a subfolder (e.g. `whats_for_dinner`), use that in the script (see below).

3. **If the share isn’t in `/Volumes`**
   - You’re probably opening the share in a different way (e.g. an app or a different URL). As long as you know the **folder path on your Mac** that corresponds to the NAS web folder, you can use that path in the script.

### Using the deploy script

1. Open `deploy-to-nas.sh` and set **NAS_PATH** at the top to your folder. Examples:
   - `NAS_PATH="/Volumes/web/whats_for_dinner"` — share named `web`, app in subfolder `whats_for_dinner`.
   - `NAS_PATH="/Volumes/QNAP/Web/whats_for_dinner"` — share named `QNAP`, then `Web/whats_for_dinner` inside it.

2. Connect to the NAS share in Finder (so `/Volumes/...` exists).

3. From the project root, run:
   ```bash
   ./deploy-to-nas.sh
   ```
   The script copies `index.html`, `editor.html`, `save-meals.php`, and the `css/`, `js/`, and `data/` folders to the NAS path. If **NAS_PATH** isn’t set or the folder isn’t found, the script will print instructions.

**Saving from the editor on the NAS:** If the app is served from a server with PHP (e.g. your QNAP), the editor page includes a **Save to server** button. Click it after adding or editing meals to write `data/meals.json` directly on the server—no copy-paste needed. Ensure the web server user has write permission to the `data/` folder (and `data/meals.json`).

---

## Changelog

*New features and notable updates. Newest first.*

### Unreleased

- Initial MVP: decision flow, JSON data, favorites filter, responsive layout.
- Project plan and README added.

---

*Last updated as the project evolves.*
