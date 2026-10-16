# VMR Trucking Log

Mobile app prototype for VMR Trucking, built by team Data Vibing (5040).

## Live app
After GitHub Pages is turned on, the app lives at:
`https://<github-username>.github.io/<repo-name>/`

## Install on a phone
- **iPhone:** open the link in Safari, tap Share, then **Add to Home Screen**.
- **Android:** open the link in Chrome, tap **Install app** (or the menu, then **Add to Home screen**).

## Files
- `index.html` – the whole app
- `manifest.json` – app name, icon and colors for the home screen
- `sw.js` – lets the app open with no signal
- `icons/` – home screen icons

## Data
Entries are saved on the phone itself (browser storage). Each phone keeps its own entries.
To share entries between the owner and driver, connect a free database (Firebase or Supabase)
by replacing `saveEntry` and `deleteEntry` in `index.html`.
