# Privacy Policy Page

Static HTML page for MoniBook Privacy Policy.

## Deployment

This folder is designed to be deployed as a subdomain on GitHub Pages (e.g., `privacy.monibook.com`).

### Setup for GitHub Pages

1. Go to repository Settings > Pages
2. Set Source to "Deploy from a branch"
3. Select the `gh-pages` branch and `/ (root)` folder
4. The site will be available at `https://[username].github.io/[repo]/`

Or for custom subdomain:

1. Add CNAME record in your DNS settings pointing to `username.github.io`
2. Create a file named `CNAME` in this folder with your subdomain (e.g., `privacy.monibook.com`)

### Build

No build required - this is a pure static HTML file.

To test locally:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8080