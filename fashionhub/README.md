# FashionHub – Fashion & Style Platform
Allied Axis beginner frontend project · React + Vite + Tailwind CSS + Framer Motion

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Routes
`/` · `/collections` · `/products` · `/products/:id` · `/categories` · `/wishlist` · `/cart` · `/style-guide` · `/about` · `/contact`

Filters are stored in the URL, e.g. `/products?category=Shoes&price=100-150&sort=rating&collection=party&q=boots`.

## Structure
```
src/
├── components/  Navbar, Footer, ProductCard, CollectionCard, CategoryCard, SearchBar, FilterBar
│                + Tilt, Hero3D, Cube3D, FlipCard, Reveal, Button, ProductArt (SVG artwork), ...
├── pages/       Home, Collections, Products, ProductDetails, Categories, Wishlist, Cart,
│                StyleGuide, About, Contact, NotFound
├── context/     StoreContext.jsx  (cart + wishlist state, saved to localStorage)
├── data/        products.js       (products, collections, categories, style guide)
├── utils/       color.js
├── App.jsx      routes + page transitions
└── main.jsx
```

## 3D & motion
- **Hero3D** – rotating 3D product carousel (CSS perspective + preserve-3d) that also follows the mouse
- **Tilt** – pointer-tracking 3D tilt with glare; used on product, collection, category and style cards
- **FlipCard** – 3D flip (hover / tap / Enter) for style inspiration
- **Cube3D** – spinning cubes (hero, page banners, CTA, About page, checkout)
- Page transitions, scroll reveals, button hover/tap, wishlist heart pop, cart badge bounce, toasts, animated totals
- Respects the OS "reduce motion" setting

## Notes
- Product images are illustrated SVG artwork that re-tints with the selected colour. To use real photos, replace `<ProductImage>` with an `<img>` and add an `image` field to `products.js`.
- localStorage keys: `fashionhub_cart`, `fashionhub_wishlist`.
- Checkout is a frontend-only demo (no payment, no auth, no backend).
