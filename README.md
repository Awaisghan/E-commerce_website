# VERDANT — Modern, Premium E-Commerce Website

**VERDANT** is a high-end, responsive e-commerce web application built with **React.js**, **Vite**, **React Router DOM**, **Lucide Icons**, and **Vanilla CSS**. It integrates live product data from the **DummyJSON API**, featuring a fresh green & pure white color palette, alternating layout sections, a slide-out cart drawer, persistent wishlist, live search suggestions, and a demo checkout flow.

---

## 🎨 Design Theme & Palette

* **Primary Background:** Pure White (`#FFFFFF`)
* **Secondary Background:** Very Light Green (`#F0F7F0`)
* **Accent Color:** Fresh Green (`#76A878`)
* **Dark Text:** Deep Charcoal (`#202820`)
* **Secondary Text:** Soft Gray (`#777777`)
* **Cards:** White with subtle borders (`#EBF2EB`) & soft atmospheric shadows
* **Typography:** Plus Jakarta Sans (Google Fonts)

---

## 🚀 Key Features

1. **Sticky Navigation & Announcement Bar**:
   - Modern top announcement bar with promo banner.
   - Sticky backdrop-blur navigation with brand logo, dropdown menu, search trigger, account popover, wishlist counter, and cart badge.
2. **Split Hero Section**:
   - Split-layout design with lifestyle photography, animated floating trust chips, verified buyer stats, and dual CTAs.
3. **Real Product Catalog via DummyJSON API**:
   - Live products with high-resolution imagery, real ratings, stock status, and reviews.
   - Fallback image handling if an image fails to load.
   - Skeleton pulse loaders during API fetches.
4. **Faceted Filtering & Sorting**:
   - Category filtering (Electronics, Fashion, Men's Clothing, Women's Clothing, Accessories, Home & Living, Beauty & Personal Care).
   - Price range filters (Under $25, $25–$50, $50–$100, Over $100).
   - Star rating filters and sorting (Featured, Price: Low to High, Price: High to Low, Highest Rated, A-Z).
5. **Interactive Search**:
   - Real-time debounced live suggestions popup dialog.
   - Dedicated `/search` results page with filter pills.
6. **Dynamic Product Details (`/product/:id`)**:
   - Interactive multi-image gallery with thumbnail switcher.
   - Color / variant picker, quantity stepper, stock indicator.
   - Tabbed specifications, dimensions, shipping guarantees, and real customer reviews.
   - Related products and recently viewed products saved in `localStorage`.
7. **Shopping Cart & Drawer**:
   - Slide-out cart drawer with live quantity adjustments.
   - Free shipping progress bar (orders over $150).
   - Dedicated `/cart` page with coupon code validator (`VERDANT15`, `VERDANT25`).
8. **Wishlist**:
   - Add/remove items with persistent `localStorage` syncing.
   - One-click "Move All to Cart".
9. **Interactive Checkout Demonstration**:
   - Modal with shipping address form, payment method selector, and animated order confirmation screen.
10. **Additional Pages**:
    - `/about`: Brand heritage, circularity pillars, and studio photography.
    - `/contact`: Message form, showroom atelier details, and FAQ accordion.
    - `*`: Custom 404 Not Found page with quick collection shortcuts.

---

## 🛠️ Project Structure

```
my-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── index.css
    ├── App.css
    ├── App.jsx
    ├── main.jsx
    ├── services/
    │   └── productApi.js
    ├── context/
    │   ├── CartContext.jsx
    │   └── WishlistContext.jsx
    ├── hooks/
    │   └── useProducts.js
    ├── utils/
    │   └── formatPrice.js
    ├── components/
    │   ├── AnnouncementBar.jsx & .css
    │   ├── Navbar.jsx & .css
    │   ├── Hero.jsx & .css
    │   ├── Benefits.jsx & .css
    │   ├── CategoryCard.jsx & .css
    │   ├── ProductCard.jsx & .css
    │   ├── ProductGrid.jsx & .css
    │   ├── PromoBanner.jsx & .css
    │   ├── Testimonials.jsx & .css
    │   ├── Newsletter.jsx & .css
    │   ├── SearchBar.jsx & .css
    │   ├── CartDrawer.jsx & .css
    │   ├── CheckoutModal.jsx & .css
    │   ├── LoadingSkeleton.jsx & .css
    │   ├── ScrollToTop.jsx & .css
    │   ├── ToastNotification.jsx & .css
    │   └── Footer.jsx & .css
    └── pages/
        ├── Home.jsx & .css
        ├── Shop.jsx & .css
        ├── Category.jsx & .css
        ├── ProductDetails.jsx & .css
        ├── SearchResults.jsx & .css
        ├── Cart.jsx & .css
        ├── Wishlist.jsx & .css
        ├── About.jsx & .css
        ├── Contact.jsx & .css
        └── NotFound.jsx & .css
```

---

## 💻 How to Run Locally

Navigate into the project directory and run:

```bash
cd my-app
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
