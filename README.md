# evenfold.day

Static product site for EvenFold / 晨昏报, deployed to Cloudflare Workers Static Assets (custom domain `evenfold.day`). Built with plain HTML, CSS, and vanilla JavaScript using system fonts — no bundler, analytics, cookies, or third-party requests.

## Pages

- `/` (English) and `/zh/` (Simplified Chinese, with automatic browser-language redirect unless English is chosen): 11 editorial newspaper spreads styled by `assets/home.css` and `assets/home.js`.
- `/privacy/` — App privacy summary (App Store privacy policy URL).
- `/terms/` — Terms of Use, BYOK disclosure, and Evenfold Pro subscription terms.
- `/support/` — Getting started and support (App Store support URL).
- `/404.html` — Not-found page.

Each spread scales proportionally to fill the viewport, follows system light/dark appearance, and honors Reduce Motion. On holidays, the masthead displays a matching illustration, and the seasons spread plots the year ahead using `assets/calendar.js` (Hong Kong Observatory Gregorian–Lunar tables for 2026–2100 and standard calendar rules).

## Configuration

Edit `assets/config.js` to update public links:

- `macDownload` — Optional direct Mac `.dmg` release URL. When empty, the homepage displays the App Store coming-soon state (or App Store links once configured).
- `appStore.mac` / `appStore.ios` — App Store product URLs once listed.
- `contactEmail` — Public privacy, terms, and support address; every page renders it from this one value.

## Deployment (Cloudflare Workers Static Assets)

Stage only public web files into `./dist/`:

```sh
node scripts/stage-static.mjs
```

`scripts/stage-static.mjs` copies `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `favicon.png`, `apple-touch-icon.png`, `assets/`, `zh/`, `privacy/`, `terms/`, and `support/` into `./dist/`; repository files such as `.git/`, `wrangler.jsonc`, `README.md` and `scripts/` are never published.

Deploy `./dist/` using `wrangler.jsonc`:

```sh
wrangler deploy
```

## Releases

EvenFold is closed source; this repository never holds application source. Each direct Mac release is a GitHub release tagged `v<version>` whose assets are the signed and notarized `EvenFold-<version>.dmg`, its `SHA256SUMS` list and the Sparkle `appcast.xml`. The app's update feed reads `releases/latest/download/appcast.xml`.

## Assets

- `assets/img/app/` holds synthetic light/dark macOS and iOS app screenshots (`en`/`zh`).
- `assets/img/bookstall.webp` and `assets/img/aircraft-wing.webp` are Unsplash photographs; credits are listed in `assets/img/CREDITS.md` and on the About spread.
- `assets/og-image.png`, `favicon.png`, `apple-touch-icon.png`, and `assets/brand/icon-512.png` are generated from the app icon and social-card scripts in the app repository.
