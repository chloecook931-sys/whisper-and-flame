const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function applyProductFilter(filter) {
  let shown = 0;
  document.querySelectorAll("[data-category]").forEach((card) => {
    const visible = filter === "all" || card.dataset.category === filter;
    card.hidden = !visible;
    if (visible) shown += 1;
  });

  const empty = document.querySelector(".shop-results > .empty-state");
  if (empty) empty.hidden = shown > 0;
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    applyProductFilter(filter);
  });
});

const toast = document.querySelector(".toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".mini-cart").forEach((button) => {
  button.addEventListener("click", () => showToast("Added to cart"));
});

const productsGrid = document.querySelector("[data-products-grid]");
const productCount = document.querySelector("[data-product-count]");

function createProductVisual(product) {
  const visual = document.createElement("a");
  visual.className = `product-visual ${product.visualClass || ""}`.trim();
  visual.href = product.productPage || "product.html";
  visual.setAttribute("aria-label", `View ${product.name}`);

  if (product.image) {
    visual.style.background = `url("${product.image}") center / cover`;
  }

  return visual;
}

function renderProducts(products) {
  if (!productsGrid) return;
  productsGrid.innerHTML = "";
  if (productCount) productCount.textContent = `${products.length} products`;

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.category = product.category;

    const info = document.createElement("div");
    info.className = "product-info";

    const badge = document.createElement("p");
    badge.className = "product-kicker";
    badge.textContent = product.badge;

    const title = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = product.productPage || "product.html";
    titleLink.textContent = product.name;
    title.appendChild(titleLink);

    const description = document.createElement("p");
    description.textContent = product.description;

    const meta = document.createElement("div");
    meta.className = "product-meta";

    const price = document.createElement("span");
    price.textContent = product.price;

    const buyLink = document.createElement("a");
    buyLink.className = "mini-cart buy-now-link";
    buyLink.href = product.paymentLink;
    buyLink.target = "_blank";
    buyLink.rel = "noopener";
    buyLink.textContent = "Buy Now";

    meta.append(price, buyLink);
    info.append(badge, title, description, meta);
    card.append(createProductVisual(product), info);
    productsGrid.appendChild(card);
  });

  const activeFilter = document.querySelector("[data-filter].active")?.dataset.filter || "all";
  applyProductFilter(activeFilter);
}

if (productsGrid) {
  fetch("assets/products.json")
    .then((response) => {
      if (!response.ok) throw new Error("Product data unavailable");
      return response.json();
    })
    .then(renderProducts)
    .catch(() => {
      productsGrid.innerHTML = '<p class="empty-state">Products could not be loaded. Check assets/products.json.</p>';
    });
}

document.querySelectorAll("[data-signup]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    if (note) note.textContent = "You are on the list. Watch your inbox for the next drop.";
    form.reset();
  });
});

document.querySelectorAll("[data-contact]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    if (note) note.textContent = "Thanks. Your message is ready for the Whisper & Flame team.";
    form.reset();
  });
});

document.querySelectorAll(".quantity-control").forEach((control) => {
  const input = control.querySelector("input");
  control.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.qty === "increase" ? 1 : -1;
      const min = Number(input.min || 1);
      const max = Number(input.max || 99);
      const next = Math.min(max, Math.max(min, Number(input.value || min) + direction));
      input.value = String(next);
    });
  });
});

document.querySelectorAll(".product-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Blind Date With A Book added to cart");
  });
});

const marketList = document.querySelector("[data-markets-list]");

function renderMarkets(markets) {
  if (!marketList) return;
  marketList.innerHTML = "";

  markets.forEach((market) => {
    const article = document.createElement("article");
    const date = document.createElement("time");
    const content = document.createElement("div");
    const title = document.createElement("h3");
    const details = document.createElement("p");
    const mapLink = document.createElement("a");

    date.dateTime = market.date;
    date.textContent = market.displayDate;
    title.textContent = market.name;
    details.textContent = `${market.time} | ${market.location}`;
    mapLink.href = market.mapsUrl;
    mapLink.target = "_blank";
    mapLink.rel = "noopener";
    mapLink.className = "market-map-link";
    mapLink.textContent = "Open in Google Maps";

    content.append(title, details, mapLink);
    article.append(date, content);
    marketList.append(article);
  });
}

if (marketList) {
  fetch("assets/markets.json")
    .then((response) => {
      if (!response.ok) throw new Error("Market data unavailable");
      return response.json();
    })
    .then(renderMarkets)
    .catch(() => {
      renderMarkets([
        {
          name: "Rose Street Readers Market",
          date: "2026-07-12",
          displayDate: "12 Jul 2026",
          time: "9:00am - 2:00pm",
          location: "Rose Street, Fitzroy VIC",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rose%20Street%20Fitzroy%20VIC"
        },
        {
          name: "Brisbane Bookish Makers Fair",
          date: "2026-08-03",
          displayDate: "3 Aug 2026",
          time: "10:00am - 3:00pm",
          location: "West End, Brisbane QLD",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=West%20End%20Brisbane%20QLD"
        },
        {
          name: "Spring Romance Pop-Up",
          date: "2026-09-19",
          displayDate: "19 Sep 2026",
          time: "11:00am - 4:00pm",
          location: "Newtown, Sydney NSW",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Newtown%20Sydney%20NSW"
        }
      ]);
    });
}

const quizForm = document.querySelector("[data-blind-date-quiz]");
const quizResult = document.querySelector("[data-quiz-result]");

function getCheckedValues(form, name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function chooseBlindDateMatch(data) {
  const scores = {
    romance: 0,
    fantasy: 0,
    dark: 0,
    cosy: 0
  };

  data.genres.forEach((genre) => {
    if (scores[genre] !== undefined) scores[genre] += 3;
  });

  data.tropes.forEach((trope) => {
    if (["slow-burn", "small-town"].includes(trope)) scores.romance += 2;
    if (["fated", "found-family"].includes(trope)) scores.fantasy += 2;
    if (["enemies", "morally-grey"].includes(trope)) scores.dark += 2;
    if (["small-town", "found-family"].includes(trope)) scores.cosy += 2;
  });

  if (data.spice === "closed") scores.cosy += 2;
  if (data.spice === "medium") scores.romance += 2;
  if (data.spice === "high") scores.dark += 2;
  if (data.spice === "surprise") scores.fantasy += 1;

  if (data.length === "short") scores.cosy += 1;
  if (data.length === "medium") scores.romance += 1;
  if (data.length === "long") scores.fantasy += 1;

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const authorNote = data.authors ? `We will avoid duplicates and use "${data.authors}" as your shelf compass.` : "Add favourite authors at checkout for an even sharper match.";
  const triggerNote = data.triggers ? `We will avoid: ${data.triggers}.` : "No hard no triggers listed.";

  const matches = {
    romance: {
      title: "The Soft Flame Romance Date",
      description: "Your perfect blind date is a contemporary romance with emotional warmth, magnetic chemistry, and a gift-ready cosy reading ritual.",
      tags: ["Contemporary romance", "Slow burn friendly", "Premium cosy extras"],
      notes: `${authorNote} Best paired with tea, page tabs, and one evening you refuse to overbook.`
    },
    fantasy: {
      title: "The Enchanted Shelf Date",
      description: "Your match is a fantasy romance blind date with sweeping stakes, a touch of magic, and keepsakes that feel pulled from a hidden library.",
      tags: ["Fantasy romance", "Magical atmosphere", "Long-read friendly"],
      notes: `${authorNote} We will lean into lush worldbuilding, romantic tension, and immersive extras.`
    },
    dark: {
      title: "The Midnight Flame Date",
      description: "Your recommendation is a dark romance blind date with broody tension, high drama, and clear comfort notes before you unwrap.",
      tags: ["Dark romance", "Morally grey energy", "Content-noted"],
      notes: `${authorNote} We will keep the mystery intact while respecting your boundaries.`
    },
    cosy: {
      title: "The Cosy Corner Date",
      description: "Your ideal match is a gentle, comforting blind date with soft stakes, charming tropes, and accessories made for a quiet night in.",
      tags: ["Cosy romance or mystery", "Low-spice friendly", "Comfort read"],
      notes: `${authorNote} Expect approachable pacing, warm atmosphere, and bookshop charm.`
    }
  };

  return { ...matches[winner], triggerNote };
}

if (quizForm && quizResult) {
  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      genres: getCheckedValues(quizForm, "genres"),
      tropes: getCheckedValues(quizForm, "tropes"),
      spice: quizForm.elements.spice.value,
      authors: quizForm.elements.authors.value.trim(),
      length: quizForm.elements.length.value,
      triggers: quizForm.elements.triggers.value.trim(),
      email: quizForm.elements["quiz-email"].value.trim()
    };

    const message = quizForm.querySelector(".quiz-message");
    if (!data.genres.length || !data.tropes.length) {
      if (message) message.textContent = "Choose at least one genre and one trope so we can match you properly.";
      return;
    }

    if (!data.email) {
      if (message) message.textContent = "Enter your email to reveal your match notes.";
      return;
    }

    const match = chooseBlindDateMatch(data);
    quizResult.querySelector("[data-result-title]").textContent = match.title;
    quizResult.querySelector("[data-result-description]").textContent = match.description;
    quizResult.querySelector("[data-result-notes]").textContent = match.notes;
    quizResult.querySelector("[data-result-triggers]").textContent = match.triggerNote;

    const tags = quizResult.querySelector("[data-result-tags]");
    tags.innerHTML = "";
    match.tags.forEach((tag) => {
      const item = document.createElement("span");
      item.textContent = tag;
      tags.appendChild(item);
    });

    if (message) message.textContent = `Your match notes are ready for ${data.email}.`;
    quizResult.hidden = false;
    quizResult.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll("[data-quiz-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      quizForm.reset();
      quizResult.hidden = true;
      quizForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
