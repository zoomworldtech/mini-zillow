# Nacosauditaope

onlyforape

# BlueRent – Mini Zillow-style rentals (Netlify + Decap CMS)

A modern, responsive, blue-and-white rental listing site built with HTML, CSS, and vanilla JavaScript. Listings live as JSON files, editable through Decap CMS, and applications submit via Netlify Forms.

## Features

- Mobile-first UI with hero search and newest-first listings
- Decap CMS admin panel at `/admin` (Git Gateway + Identity)
- Listings stored as individual JSON files in `data/listings`
- Simple image carousel on listing detail pages
- Netlify Form-powered rental application with required validation
- Lightweight, framework-free stack deployable on Netlify

## File structure

- `/index.html` – Home with hero search and latest listings
- `/listings.html` – All listings with instant filtering
- `/listing.html` – Listing details + image carousel + Book Tour CTA
- `/application.html` – Netlify Form with required rental fields
- `/assets/css/styles.css` – Styling (blue/white theme)
- `/assets/js/*.js` – Vanilla JS for data loading and page logic
- `/data/listings/` – JSON listings plus `index.json` manifest
- `/admin/index.html` + `/admin/config.yml` – Decap CMS admin
- `/netlify.toml` – Helpful Netlify config

## Manage listings with Decap CMS

1. Deploy to Netlify and enable **Identity** + **Git Gateway**.
2. Invite your admin user from Netlify Identity.
3. Sign in at `/admin`. Create or edit listings in the **Listings** collection.
4. Each listing saves to `data/listings/<id>.json`. Update `data/listings/index.json` (via the Manifest entry) so the site knows which files to load.

## Netlify deployment

1. Push this repo to GitHub.
2. In Netlify, **New site from Git**, pick the repo, and deploy (no build command needed).
3. Under **Site settings → Identity**, enable Identity and Git Gateway.
4. Invite yourself as an admin, accept the invite, then log in at `/admin` to manage content.

## Local preview

Open `index.html` in a local server (e.g., `npx serve` or VS Code Live Server). Listings load from the static JSON files; the application form posts to Netlify Forms in production.

## Sample data

Three starter listings are included: `skyline-loft`, `lakeside-condo`, and `cozy-studio`, with SVG hero images under `assets/img/`.
