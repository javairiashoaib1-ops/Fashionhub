// ---------------------------------------------------------------------------
// Static data for FashionHub. No backend required – everything lives here.
// Product visuals are illustrated SVG artwork (see components/ProductArt.jsx),
// so each product only needs a `type` (shape) and its colour options.
// ---------------------------------------------------------------------------

const COLORS = {
  blush: ['Blush', '#e8a0ad'], emerald: ['Emerald', '#1f6f5c'], midnight: ['Midnight', '#1e2a4a'],
  ivory: ['Ivory', '#efe6d5'], sage: ['Sage', '#9fb59b'], terracotta: ['Terracotta', '#c4724e'],
  camel: ['Camel', '#c19a6b'], charcoal: ['Charcoal', '#3b3b40'], champagne: ['Champagne', '#d9c3a0'],
  black: ['Black', '#1c1c1f'], plum: ['Plum', '#6b3a5b'], white: ['White', '#f4f1ea'],
  dustyblue: ['Dusty Blue', '#8aa4c0'], cream: ['Cream', '#eadfc8'], burgundy: ['Burgundy', '#6e1f2f'],
  sky: ['Sky', '#a9c4e0'], navy: ['Navy', '#1d2c4d'], khaki: ['Khaki', '#b9a47b'],
  olive: ['Olive', '#6b705c'], brown: ['Brown', '#6f4e37'], forest: ['Forest', '#2f4a3a'],
  rust: ['Rust', '#a4502f'], indigo: ['Indigo', '#2f4565'], washed: ['Washed Blue', '#6f8ca8'],
  sand: ['Sand', '#d8c7a5'], red: ['Red', '#b3202f'], nude: ['Nude', '#d8b49c'], tan: ['Tan', '#a8693a'],
  pink: ['Pink', '#e3a6b0'], green: ['Green', '#4f7a5c'], silver: ['Silver', '#b8bcc4'],
  gold: ['Gold', '#c9a24b'], rosegold: ['Rose Gold', '#d4a28f'], tortoise: ['Tortoise', '#7a4a2a'],
  straw: ['Straw', '#d8be8a'], ruby: ['Ruby', '#a3122f'], rose: ['Rose', '#c9677a'],
  violet: ['Violet', '#5b3a7a'], amber: ['Amber', '#c98a2b'],
};

const cols = (...keys) => keys.map((k) => ({ name: COLORS[k][0], hex: COLORS[k][1] }));

const SIZES = {
  apparel: ['XS', 'S', 'M', 'L', 'XL'],
  menApparel: ['S', 'M', 'L', 'XL', 'XXL'],
  waist: ['30', '32', '34', '36'],
  shoe: ['38', '39', '40', '41', '42', '43'],
  one: ['One Size'],
  perfume: ['30 ml', '50 ml', '100 ml'],
  lipstick: ['3.5 g'],
};

export const CATEGORY_NAMES = ['Women', 'Men', 'Shoes', 'Bags', 'Accessories', 'Beauty'];

export const products = [
  // ---------------------------------------------------------------- Women
  {
    id: 1, name: 'Aurora Satin Slip Dress', category: 'Women', type: 'dress', price: 89, oldPrice: 112,
    rating: 4.8, reviews: 214, sizes: SIZES.apparel, colors: cols('blush', 'emerald', 'midnight'),
    collections: ['party', 'summer'], isNew: true, trending: false,
    description: 'A fluid bias-cut slip dress in luminous satin. Delicate straps, a softly draped neckline and a floor-skimming hem make it effortless from sunset drinks to late-night dancing.',
  },
  {
    id: 2, name: 'Linen Breeze Wrap Top', category: 'Women', type: 'top', price: 44,
    rating: 4.5, reviews: 132, sizes: SIZES.apparel, colors: cols('ivory', 'sage', 'terracotta'),
    collections: ['summer', 'casual'], isNew: false, trending: false,
    description: 'Breathable European linen with a relaxed wrap front. Pre-washed for a lived-in softness that only gets better with every wear.',
  },
  {
    id: 3, name: 'Maison Wool Overcoat', category: 'Women', type: 'coat', price: 189,
    rating: 4.9, reviews: 98, sizes: SIZES.apparel, colors: cols('camel', 'charcoal'),
    collections: ['winter', 'formal'], isNew: true, trending: false,
    description: 'A timeless long overcoat in a heavyweight wool blend. Sharp lapels, deep pockets and a fully lined interior keep you warm and polished all season.',
  },
  {
    id: 4, name: 'Pleated Midi Skirt', category: 'Women', type: 'skirt', price: 59,
    rating: 4.6, reviews: 176, sizes: SIZES.apparel, colors: cols('champagne', 'black', 'plum'),
    collections: ['party', 'formal'], isNew: false, trending: false,
    description: 'Knife-pleated and endlessly swishy. This midi skirt moves beautifully and pairs with everything from a tucked tee to a tailored blazer.',
  },
  {
    id: 5, name: 'Everyday Ribbed Tee', category: 'Women', type: 'top', price: 28, oldPrice: 35,
    rating: 4.4, reviews: 389, sizes: SIZES.apparel, colors: cols('white', 'black', 'dustyblue'),
    collections: ['casual', 'summer'], isNew: false, trending: true,
    description: 'Your new wardrobe staple. Soft stretch-cotton rib with a clean crew neckline and a slightly cropped, easy fit.',
  },
  {
    id: 6, name: 'Tailored Crepe Blazer', category: 'Women', type: 'blazer', price: 129,
    rating: 4.7, reviews: 143, sizes: SIZES.apparel, colors: cols('black', 'cream', 'burgundy'),
    collections: ['formal'], isNew: false, trending: true,
    description: 'Sharp shoulders, a nipped waist and fluid crepe fabric. The blazer that makes every outfit look intentional.',
  },
  // ------------------------------------------------------------------ Men
  {
    id: 7, name: 'Oxford Button-Down Shirt', category: 'Men', type: 'shirt', price: 64,
    rating: 4.6, reviews: 261, sizes: SIZES.menApparel, colors: cols('sky', 'white', 'navy'),
    collections: ['formal', 'casual'], isNew: false, trending: true,
    description: 'Classic oxford cotton with a soft collar and a tailored-yet-comfortable cut. Wear it tucked for the office or loose over a tee.',
  },
  {
    id: 8, name: 'Slim Chino Trousers', category: 'Men', type: 'pants', price: 72,
    rating: 4.5, reviews: 207, sizes: SIZES.waist, colors: cols('khaki', 'navy', 'olive'),
    collections: ['casual', 'formal'], isNew: false, trending: false,
    description: 'Stretch-cotton twill chinos with a clean, tapered leg. Smart enough for meetings, relaxed enough for weekends.',
  },
  {
    id: 9, name: 'Heritage Wool Blazer', category: 'Men', type: 'blazer', price: 169,
    rating: 4.8, reviews: 87, sizes: SIZES.menApparel, colors: cols('charcoal', 'navy', 'brown'),
    collections: ['formal'], isNew: false, trending: false,
    description: 'A half-canvassed wool blazer with natural shoulders and refined detailing. Built to anchor a wardrobe for years.',
  },
  {
    id: 10, name: 'Quilted Winter Parka', category: 'Men', type: 'coat', price: 159, oldPrice: 199,
    rating: 4.7, reviews: 119, sizes: SIZES.menApparel, colors: cols('forest', 'black', 'rust'),
    collections: ['winter'], isNew: true, trending: false,
    description: 'Lightweight thermal insulation in a water-repellent shell. Fleece-lined pockets and an adjustable hood handle the coldest commutes.',
  },
  {
    id: 11, name: 'Classic Cotton Tee', category: 'Men', type: 'top', price: 24,
    rating: 4.3, reviews: 452, sizes: SIZES.menApparel, colors: cols('white', 'charcoal', 'olive'),
    collections: ['casual', 'summer'], isNew: false, trending: false,
    description: 'Heavyweight organic cotton with a clean collar and a boxy modern fit. The tee you will reach for every single day.',
  },
  {
    id: 12, name: 'Tapered Denim Jeans', category: 'Men', type: 'pants', price: 79,
    rating: 4.6, reviews: 318, sizes: SIZES.waist, colors: cols('indigo', 'washed', 'black'),
    collections: ['casual'], isNew: false, trending: true,
    description: 'Rigid-to-soft selvedge-style denim with just enough stretch. A tapered leg and a mid rise for an easy everyday silhouette.',
  },
  // --------------------------------------------------------------- Shoes
  {
    id: 13, name: 'Cloud Runner Sneakers', category: 'Shoes', type: 'sneaker', price: 98,
    rating: 4.8, reviews: 502, sizes: SIZES.shoe, colors: cols('white', 'black', 'sand'),
    collections: ['casual'], isNew: true, trending: false,
    description: 'Ultra-light foam midsole, breathable knit upper and a cushioned footbed. Designed to keep you comfortable from morning to midnight.',
  },
  {
    id: 14, name: 'Stiletto Velvet Pumps', category: 'Shoes', type: 'heel', price: 119,
    rating: 4.5, reviews: 76, sizes: SIZES.shoe, colors: cols('red', 'black', 'nude'),
    collections: ['party', 'formal'], isNew: false, trending: true,
    description: 'Plush velvet, a sculpted heel and a padded insole. The statement pair that finishes any evening look.',
  },
  {
    id: 15, name: 'Chelsea Leather Boots', category: 'Shoes', type: 'boot', price: 149,
    rating: 4.9, reviews: 164, sizes: SIZES.shoe, colors: cols('tan', 'black'),
    collections: ['winter', 'formal'], isNew: true, trending: false,
    description: 'Full-grain leather with elastic side panels and a grippy rubber sole. Break them in once and they become your forever boots.',
  },
  {
    id: 16, name: 'Canvas Low-Top Trainers', category: 'Shoes', type: 'sneaker', price: 54, oldPrice: 68,
    rating: 4.4, reviews: 289, sizes: SIZES.shoe, colors: cols('navy', 'cream', 'red'),
    collections: ['casual', 'summer'], isNew: false, trending: false,
    description: 'Timeless canvas trainers with a vulcanised sole. Lightweight, laid-back and ready for everything.',
  },
  // ---------------------------------------------------------------- Bags
  {
    id: 17, name: 'Structured Leather Tote', category: 'Bags', type: 'bag', price: 139,
    rating: 4.8, reviews: 121, sizes: SIZES.one, colors: cols('tan', 'black', 'cream'),
    collections: ['formal'], isNew: true, trending: false,
    description: 'Roomy enough for a laptop and all your essentials. Vegetable-tanned leather, suede lining and a magnetic closure.',
  },
  {
    id: 18, name: 'Mini Crossbody Bag', category: 'Bags', type: 'bag', price: 79,
    rating: 4.6, reviews: 233, sizes: SIZES.one, colors: cols('pink', 'black', 'green'),
    collections: ['party', 'casual'], isNew: false, trending: true,
    description: 'Compact, chic and hands-free. Fits your phone, cards and lipstick with an adjustable chain-and-leather strap.',
  },
  {
    id: 19, name: 'Weekender Canvas Bag', category: 'Bags', type: 'bag', price: 95,
    rating: 4.5, reviews: 91, sizes: SIZES.one, colors: cols('olive', 'navy', 'sand'),
    collections: ['summer', 'casual'], isNew: false, trending: false,
    description: 'Durable waxed canvas with leather trims and a roomy main compartment. Perfect for city breaks and beach escapes.',
  },
  // ---------------------------------------------------------- Accessories
  {
    id: 20, name: 'Minimal Steel Watch', category: 'Accessories', type: 'watch', price: 159,
    rating: 4.7, reviews: 188, sizes: SIZES.one, colors: cols('silver', 'gold', 'rosegold'),
    collections: ['formal'], isNew: false, trending: true,
    description: 'A clean dial, sapphire-coated glass and a slim stainless-steel case. Quiet luxury for every wrist.',
  },
  {
    id: 21, name: 'Aviator Sunglasses', category: 'Accessories', type: 'sunglasses', price: 69,
    rating: 4.6, reviews: 205, sizes: SIZES.one, colors: cols('black', 'gold', 'tortoise'),
    collections: ['summer'], isNew: false, trending: false,
    description: 'Polarised lenses with 100% UV protection and a featherweight metal frame. A true summer classic.',
  },
  {
    id: 22, name: 'Pearl Drop Necklace', category: 'Accessories', type: 'necklace', price: 54,
    rating: 4.8, reviews: 67, sizes: SIZES.one, colors: cols('gold', 'silver'),
    collections: ['party', 'formal'], isNew: true, trending: false,
    description: 'A single freshwater-style pearl on a delicate chain. Subtle shine that elevates even a plain tee.',
  },
  {
    id: 23, name: 'Wide-Brim Straw Hat', category: 'Accessories', type: 'hat', price: 42,
    rating: 4.4, reviews: 84, sizes: SIZES.one, colors: cols('straw', 'black'),
    collections: ['summer'], isNew: false, trending: false,
    description: 'Hand-woven straw with a generous brim for sun-soaked days. Lightweight, packable and effortlessly stylish.',
  },
  // -------------------------------------------------------------- Beauty
  {
    id: 24, name: 'Velvet Matte Lipstick', category: 'Beauty', type: 'lipstick', price: 26,
    rating: 4.7, reviews: 640, sizes: SIZES.lipstick, colors: cols('ruby', 'rose', 'nude'),
    collections: ['party'], isNew: false, trending: true,
    description: 'Rich, comfortable colour with a weightless matte finish. Enriched with vitamin E so lips never feel dry.',
  },
  {
    id: 25, name: 'Midnight Bloom Eau de Parfum', category: 'Beauty', type: 'perfume', price: 85,
    rating: 4.9, reviews: 142, sizes: SIZES.perfume, colors: cols('violet', 'amber', 'rose'),
    collections: ['party'], isNew: true, trending: false,
    description: 'A warm floral with notes of jasmine, amber and soft musk. Long-lasting, elegant and unmistakably you.',
  },
  {
    id: 26, name: 'Silk Glow Face Oil', category: 'Beauty', type: 'perfume', price: 38,
    rating: 4.5, reviews: 175, sizes: SIZES.perfume.slice(0, 2), colors: cols('gold', 'rosegold'),
    collections: ['summer'], isNew: false, trending: false,
    description: 'A lightweight blend of botanical oils that leaves skin dewy, smooth and radiant without feeling greasy.',
  },
];

export const getProductById = (id) => products.find((p) => p.id === Number(id));

// ---------------------------------------------------------------- Collections
export const collections = [
  {
    id: 'summer', title: 'Summer Collection', tag: 'Warm-weather edit',
    description: 'Breathable linens, sunny tones and easy silhouettes for long golden days.',
    gradient: ['#ffe3b8', '#ff9e7a'], pieces: [{ type: 'dress', color: '#e8734a' }, { type: 'hat', color: '#d8be8a' }],
  },
  {
    id: 'winter', title: 'Winter Collection', tag: 'Cold-weather edit',
    description: 'Cosy layers, tailored coats and boots built to handle the frost in style.',
    gradient: ['#d6e4f0', '#8fa9c4'], pieces: [{ type: 'coat', color: '#3b3b40' }, { type: 'boot', color: '#a8693a' }],
  },
  {
    id: 'casual', title: 'Casual Wear', tag: 'Everyday essentials',
    description: 'Comfort-first staples that mix and match for effortless daily outfits.',
    gradient: ['#eadfcb', '#b7a58c'], pieces: [{ type: 'top', color: '#8aa4c0' }, { type: 'pants', color: '#2f4565' }],
  },
  {
    id: 'formal', title: 'Formal Wear', tag: 'Sharp & polished',
    description: 'Tailored blazers, crisp shirts and refined pieces for the boardroom and beyond.',
    gradient: ['#d4d4dc', '#4a4d5e'], pieces: [{ type: 'blazer', color: '#1d2c4d' }, { type: 'shirt', color: '#f4f1ea' }],
  },
  {
    id: 'party', title: 'Party Wear', tag: 'After-dark glamour',
    description: 'Statement dresses, sparkling accents and bold heels for unforgettable nights.',
    gradient: ['#5a2a5e', '#d6457a'], pieces: [{ type: 'dress', color: '#1f6f5c' }, { type: 'heel', color: '#b3202f' }],
  },
];

// ----------------------------------------------------------------- Categories
export const categories = [
  { id: 'Women', blurb: 'Dresses, tops, coats & more', type: 'dress', color: '#e8a0ad', bg: ['#fde8ec', '#f4b6c2'] },
  { id: 'Men', blurb: 'Shirts, tailoring & denim', type: 'shirt', color: '#8aa4c0', bg: ['#e4edf6', '#a9c0d8'] },
  { id: 'Shoes', blurb: 'Sneakers, boots & heels', type: 'sneaker', color: '#c19a6b', bg: ['#f3e6d3', '#d8b98f'] },
  { id: 'Bags', blurb: 'Totes, crossbodies & travel', type: 'bag', color: '#a8693a', bg: ['#f1e0cf', '#cfa27a'] },
  { id: 'Accessories', blurb: 'Watches, shades & jewellery', type: 'watch', color: '#c9a24b', bg: ['#f6ecd2', '#dcc17f'] },
  { id: 'Beauty', blurb: 'Colour, scent & skincare', type: 'lipstick', color: '#a3122f', bg: ['#f7dde2', '#e49aa9'] },
];

// ---------------------------------------------------------------- Style guide
export const styleGuide = [
  {
    id: 'casual', title: 'Casual Styling', blurb: 'Relaxed outfits that still look put-together.',
    tips: [
      { title: 'Elevate the everyday tee', text: 'Pair a well-fitted tee with tailored trousers and clean sneakers. Tuck the front only to define your waist.', outfit: [{ type: 'top', color: '#f4f1ea' }, { type: 'pants', color: '#b9a47b' }], bg: ['#efe4d2', '#d4c2a2'], shop: '/products?collection=casual' },
      { title: 'Denim, done right', text: 'Stick to one wash per outfit. Dark indigo reads smarter; light wash feels weekend-ready. Add a crisp shirt for balance.', outfit: [{ type: 'shirt', color: '#a9c4e0' }, { type: 'pants', color: '#2f4565' }], bg: ['#dfe8f2', '#9cb3cc'], shop: '/products?q=denim' },
      { title: 'The sneaker rule', text: 'A clean white sneaker goes with nearly everything. Keep them spotless and your whole look levels up.', outfit: [{ type: 'sneaker', color: '#f4f1ea' }, { type: 'bag', color: '#a8693a' }], bg: ['#f1e6d6', '#d9c4a5'], shop: '/products?category=Shoes' },
    ],
  },
  {
    id: 'formal', title: 'Formal Styling', blurb: 'Polished looks for work, events and interviews.',
    tips: [
      { title: 'Tailoring comes first', text: 'Fit beats price. A blazer that sits cleanly on your shoulders instantly makes any outfit look expensive.', outfit: [{ type: 'blazer', color: '#1d2c4d' }, { type: 'pants', color: '#3b3b40' }], bg: ['#d9dce6', '#8c93a8'], shop: '/products?collection=formal' },
      { title: 'Mind the monochrome', text: 'Dress head-to-toe in one colour family with different textures. It looks elongating, modern and intentional.', outfit: [{ type: 'blazer', color: '#d9c3a0' }, { type: 'skirt', color: '#c19a6b' }], bg: ['#f0e6d6', '#cdb48c'], shop: '/products?category=Women' },
      { title: 'Finish with a watch', text: 'A slim watch and a structured bag signal quiet confidence. Keep jewellery minimal and metals matching.', outfit: [{ type: 'watch', color: '#b8bcc4' }, { type: 'bag', color: '#1c1c1f' }], bg: ['#e2e4ea', '#9ea3b3'], shop: '/products?category=Accessories' },
    ],
  },
  {
    id: 'seasonal', title: 'Seasonal Styling', blurb: 'Dress for the weather without losing your style.',
    tips: [
      { title: 'Summer: breathe in linen', text: 'Light fabrics, light colours and a wide-brim hat. Choose loose cuts that let air move.', outfit: [{ type: 'dress', color: '#e8734a' }, { type: 'hat', color: '#d8be8a' }], bg: ['#ffe9c7', '#ffb08a'], shop: '/products?collection=summer' },
      { title: 'Autumn: layer in earth tones', text: 'Camel, rust and olive blend beautifully. Layer a light jacket over a knit and finish with leather boots.', outfit: [{ type: 'coat', color: '#c19a6b' }, { type: 'boot', color: '#6f4e37' }], bg: ['#f1dcc1', '#cf9c6a'], shop: '/products?q=coat' },
      { title: 'Winter: invest in a coat', text: 'One great coat carries your entire winter wardrobe. Go for wool, a clean cut and a neutral shade.', outfit: [{ type: 'coat', color: '#3b3b40' }, { type: 'boot', color: '#1c1c1f' }], bg: ['#dbe6f1', '#92abc6'], shop: '/products?collection=winter' },
    ],
  },
  {
    id: 'occasion', title: 'Occasion Styling', blurb: 'Know exactly what to wear for the moments that matter.',
    tips: [
      { title: 'Date night', text: 'Choose one statement: a satin dress or a bold lip. Soft fabrics and a little shine always photograph beautifully.', outfit: [{ type: 'dress', color: '#c9677a' }, { type: 'heel', color: '#1c1c1f' }], bg: ['#4a2150', '#d6457a'], shop: '/products?collection=party' },
      { title: 'Office to evening', text: 'Swap sneakers for heels, add a pearl necklace and a swipe of lipstick – your blazer outfit is now dinner-ready.', outfit: [{ type: 'blazer', color: '#1c1c1f' }, { type: 'necklace', color: '#c9a24b' }], bg: ['#d8d9e2', '#7b7f96'], shop: '/products?category=Accessories' },
      { title: 'Wedding guest', text: 'Pick rich jewel tones, avoid white and keep accessories refined. A pleated skirt moves beautifully on the dance floor.', outfit: [{ type: 'skirt', color: '#6b3a5b' }, { type: 'perfume', color: '#5b3a7a' }], bg: ['#e6d3e6', '#a67ab0'], shop: '/products?collection=party' },
    ],
  },
];

export const PRICE_RANGES = [
  { id: 'all', label: 'Any price', min: 0, max: Infinity },
  { id: 'u50', label: 'Under $50', min: 0, max: 50 },
  { id: '50-100', label: '$50 – $100', min: 50, max: 100 },
  { id: '100-150', label: '$100 – $150', min: 100, max: 150 },
  { id: '150+', label: '$150 & up', min: 150, max: Infinity },
];

export const formatPrice = (n) => `$${n.toFixed(2)}`;
