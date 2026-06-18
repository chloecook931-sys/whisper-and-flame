# Whisper & Flame Static Website

This site is plain HTML, CSS, and JavaScript. It is ready for free static hosting on Cloudflare Pages or GitHub Pages.

No Shopify, Wix, Squarespace, WordPress plugins, databases, server code, or monthly subscription platform is required.

## Files To Edit

### Products, prices, images, and Square links

Edit:

```text
assets/products.json
```

Each product looks like this:

```json
{
  "id": "blind-date-book",
  "name": "Blind Date With A Book",
  "badge": "Bestseller",
  "category": "books",
  "price": "$34.00 AUD",
  "description": "Choose your genre, tropes, and spice comfort for a wrapped surprise paperback.",
  "visualClass": "blind-date",
  "image": "",
  "productPage": "product.html",
  "paymentLink": "https://square.link/u/replace-blind-date-book"
}
```

Replace `paymentLink` with the real Square Payment Link for that item.

To use a real product photo, add the image to:

```text
assets/images/
```

Then set `image` like this:

```json
"image": "assets/images/my-product-photo.jpg"
```

If `image` is blank, the site uses the built-in illustrated product style from `visualClass`.

### Market dates

Edit:

```text
assets/markets.json
```

Each market card includes:

```json
{
  "name": "Rose Street Readers Market",
  "date": "2026-07-12",
  "displayDate": "12 Jul 2026",
  "time": "9:00am - 2:00pm",
  "location": "Rose Street, Fitzroy VIC",
  "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Rose%20Street%20Fitzroy%20VIC"
}
```

### Homepage text

Edit:

```text
index.html
```

### Main styling

Edit:

```text
assets/styles.css
```

### Interactions

Edit:

```text
assets/main.js
```

## Hosting On Cloudflare Pages

1. Upload this folder to a GitHub repository.
2. In Cloudflare Pages, create a new project from that repository.
3. Use these settings:
   - Framework preset: None
   - Build command: leave blank
   - Output directory: `/`
4. Deploy.

## Hosting On GitHub Pages

1. Upload this folder to a GitHub repository.
2. Go to repository Settings.
3. Open Pages.
4. Select Deploy from branch.
5. Choose the main branch and `/root`.
6. Save.

## Square Payments

Create a Square Payment Link for each product in Square, then paste the URL into `assets/products.json`.

The website does not process payments itself. Customers click Buy Now and complete payment on Square.
