# Deployment Instructions

## Website Type

This is a static HTML/CSS/JavaScript website.

It is not React, Next.js, Shopify, Wix, Squarespace, WordPress, or a database-backed app.

There is no build step. The browser reads the files directly.

## Recommended Free Hosting

Best option: Cloudflare Pages.

Why:

- Free static hosting
- Easy custom domain setup
- Fast global CDN
- No monthly subscription required
- No build command needed for this project

GitHub Pages and Netlify free plan will also work.

## Files To Upload

Upload the whole project folder contents:

```text
index.html
shop.html
product.html
about.html
faq.html
contact.html
quiz.html
assets/
README.md
DEPLOYMENT.md
.gitignore
```

The `assets/` folder must include:

```text
assets/styles.css
assets/main.js
assets/products.json
assets/markets.json
assets/images/whisper-flame-hero.png
```

Optional local preview file:

```text
dev-server.mjs
```

You can upload it, but it is not required for hosting.

## Build Settings

Use these settings on static hosts:

```text
Framework preset: None / Static site
Build command: leave blank
Output directory: /
Install command: leave blank
```

There is no `npm install`, no `npm run build`, and no server required.

## Deploy On Cloudflare Pages

1. Create a free Cloudflare account or log in.
2. Put these website files into a GitHub repository.
3. In Cloudflare, open Workers & Pages.
4. Choose Create application.
5. Choose Pages.
6. Choose Connect to Git.
7. Select your GitHub repository.
8. Use these build settings:
   - Framework preset: None
   - Build command: leave blank
   - Output directory: `/`
9. Click Save and Deploy.
10. Cloudflare will publish a temporary URL like:

```text
your-project.pages.dev
```

## Connect A Domain On Cloudflare Pages

If your domain is already on Cloudflare:

1. Open your Cloudflare Pages project.
2. Go to Custom domains.
3. Click Set up a custom domain.
4. Enter your domain, for example:

```text
whisperandflame.com.au
```

5. Follow Cloudflare's prompts.
6. Cloudflare will create the needed DNS records automatically.
7. Wait for the domain status to become Active.

If your domain is registered somewhere else:

1. Open your domain registrar account.
2. Change the nameservers to the nameservers Cloudflare gives you.
3. Wait for nameserver changes to complete.
4. Add the domain to your Cloudflare Pages project under Custom domains.

## Deploy On GitHub Pages

1. Create a GitHub repository.
2. Upload all website files to the repository root.
3. Open the repository on GitHub.
4. Go to Settings.
5. Go to Pages.
6. Under Build and deployment, choose Deploy from a branch.
7. Choose:
   - Branch: `main`
   - Folder: `/root`
8. Save.
9. GitHub will publish the site at a URL like:

```text
https://yourusername.github.io/repository-name/
```

## Connect A Domain On GitHub Pages

1. In your repository, go to Settings.
2. Go to Pages.
3. Under Custom domain, enter your domain.
4. Save.
5. In your domain registrar DNS settings, add the DNS records GitHub asks for.
6. Enable Enforce HTTPS after GitHub finishes checking the domain.

For an apex/root domain like `whisperandflame.com.au`, GitHub usually requires A records.

For a subdomain like `www.whisperandflame.com.au`, GitHub usually requires a CNAME record.

## Deploy On Netlify Free Plan

1. Create a free Netlify account.
2. Add a new site from GitHub, or drag and drop the project folder into Netlify.
3. Use these settings:
   - Build command: leave blank
   - Publish directory: `.`
4. Deploy.
5. Add a custom domain in Site configuration > Domain management.

## Updating Products

Edit:

```text
assets/products.json
```

Update these fields:

```text
name
price
description
category
image
paymentLink
```

Replace each `paymentLink` with the real Square Payment Link.

If using a product photo:

1. Add the image file to `assets/images/`.
2. Set the product `image` value:

```json
"image": "assets/images/example-product.jpg"
```

## Updating Market Dates

Edit:

```text
assets/markets.json
```

Update:

```text
name
date
displayDate
time
location
mapsUrl
```

## Updating Pages

Edit the matching HTML file:

```text
index.html
shop.html
product.html
about.html
faq.html
contact.html
quiz.html
```

## Updating Styles

Edit:

```text
assets/styles.css
```

## Updating Interactions

Edit:

```text
assets/main.js
```

## After Making Changes

If hosted through GitHub:

1. Commit and push changes to GitHub.
2. Cloudflare Pages, GitHub Pages, or Netlify will redeploy automatically.

If using drag-and-drop Netlify:

1. Upload the updated project folder again.
