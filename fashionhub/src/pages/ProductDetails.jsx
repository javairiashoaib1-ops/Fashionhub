import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { Check, ChevronRight, Heart, RefreshCw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice, getProductById, products } from '../data/products';
import ProductImage from '../components/ProductArt';
import Rating from '../components/Rating';
import QuantityControl from '../components/QuantityControl';
import Tilt from '../components/Tilt';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <section className="container-x section text-center">
        <h1 className="text-4xl font-semibold">Product not found</h1>
        <p className="mt-3 text-ink/60">The product you are looking for does not exist.</p>
        <div className="mt-6"><Button to="/products">Back to products</Button></div>
      </section>
    );
  }
  // key={id} resets selections when navigating between products
  return <Details key={product.id} product={product} />;
}

function Details({ product }) {
  const { addToCart, isWished, toggleWishlist, notify } = useStore();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '');
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const wished = isWished(product.id);
  const shake = useAnimationControls();

  const sizeLabel = product.category === 'Beauty' ? 'Option' : 'Size';

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      shake.start({ x: [0, -10, 10, -8, 8, 0], transition: { duration: 0.4 } });
      return;
    }
    addToCart({ id: product.id, size, color: color.name, qty });
    notify(`${qty} × ${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWish = () => {
    toggleWishlist(product.id);
    notify(wished ? 'Removed from wishlist' : 'Saved to wishlist', 'wish');
  };

  const related = [
    ...products.filter((p) => p.category === product.category && p.id !== product.id),
    ...products.filter((p) => p.category !== product.category && p.collections.some((c) => product.collections.includes(c)) && p.id !== product.id),
  ].slice(0, 4);

  return (
    <>
      <div className="container-x pt-6 sm:pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink/55">
          <Link to="/" className="hover:text-ink">Home</Link><ChevronRight size={12} />
          <Link to="/products" className="hover:text-ink">Products</Link><ChevronRight size={12} />
          <Link to={`/products?category=${product.category}`} className="hover:text-ink">{product.category}</Link><ChevronRight size={12} />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <section className="container-x grid gap-8 py-8 sm:py-12 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -40, rotateY: 18 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ transformPerspective: 1200 }}>
          <Tilt className="relative" max={8} scale={1.01} glare perspective={1100}>
            <div className="preserve-3d relative aspect-[4/5] rounded-3xl bg-white p-3 shadow-lift">
              <div className="relative h-full overflow-hidden rounded-2xl" style={{ transform: 'translateZ(20px)' }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={color.hex} className="h-full w-full" initial={{ opacity: 0, scale: 1.06, rotateY: -25 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} exit={{ opacity: 0, scale: 0.96, rotateY: 25 }} transition={{ duration: 0.3 }}>
                    <ProductImage type={product.type} color={color.hex} title={`${product.name} in ${color.name}`} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="absolute left-7 top-7 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow-card" style={{ transform: 'translateZ(50px)' }}>{color.name}</span>
            </div>
          </Tilt>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} count={product.reviews} size={16} />
          </div>
          <p className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-lg text-ink/40 line-through">{formatPrice(product.oldPrice)}</span>}
            {product.oldPrice && <span className="rounded-full bg-clay px-2.5 py-1 text-xs font-bold text-white">Save {Math.round((1 - product.price / product.oldPrice) * 100)}%</span>}
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-ink/70">{product.description}</p>

          {/* Colour */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold">Colour: <span className="font-normal text-ink/65">{color.name}</span></p>
            <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Select colour">
              {product.colors.map((c) => {
                const active = c.name === color.name;
                return (
                  <motion.button key={c.name} type="button" role="radio" aria-checked={active} aria-label={c.name} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} onClick={() => setColor(c)} className={`relative grid h-11 w-11 place-items-center rounded-full ring-offset-2 ring-offset-cream transition ${active ? 'ring-2 ring-ink' : 'ring-1 ring-ink/15'}`}>
                    <span className="h-8 w-8 rounded-full border border-black/10" style={{ background: c.hex }} />
                    {active && <Check size={14} className="absolute text-white mix-blend-difference" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Size */}
          <motion.div className="mt-7" animate={shake}>
            <p className="mb-3 text-sm font-semibold">{sizeLabel}: <span className="font-normal text-ink/65">{size || `Select a ${sizeLabel.toLowerCase()}`}</span></p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`Select ${sizeLabel.toLowerCase()}`}>
              {product.sizes.map((s) => (
                <motion.button key={s} type="button" role="radio" aria-checked={size === s} whileTap={{ scale: 0.92 }} onClick={() => { setSize(s); setSizeError(false); }} className={`min-w-12 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${size === s ? 'border-ink bg-ink text-cream' : 'border-ink/20 bg-white hover:border-ink'}`}>{s}</motion.button>
              ))}
            </div>
            <AnimatePresence>
              {sizeError && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 text-sm font-medium text-red-600" role="alert">Please select a {sizeLabel.toLowerCase()} first.</motion.p>}
            </AnimatePresence>
          </motion.div>

          {/* Quantity + actions */}
          <div className="mt-8 flex items-center gap-5">
            <span className="text-sm font-semibold">Quantity</span>
            <QuantityControl value={qty} onChange={setQty} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={handleAdd} variant="primary" className="flex-1 !py-4 sm:flex-none sm:!px-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={added ? 'added' : 'add'} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.15 }} className="inline-flex items-center gap-2">
                  {added ? <><Check size={17} /> Added to Cart</> : <><ShoppingBag size={17} /> Add to Cart</>}
                </motion.span>
              </AnimatePresence>
            </Button>
            <Button onClick={handleWish} variant="outline" aria-pressed={wished} className="!py-4">
              <motion.span key={String(wished)} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }} className="inline-flex">
                <Heart size={17} className={wished ? 'fill-clay text-clay' : ''} />
              </motion.span>
              {wished ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>

          <ul className="mt-10 grid gap-3 border-t border-ink/10 pt-6 text-sm text-ink/70 sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck size={18} className="text-clay" /> Free shipping $150+</li>
            <li className="flex items-center gap-2"><RefreshCw size={18} className="text-clay" /> 30-day returns</li>
            <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-clay" /> Quality guaranteed</li>
          </ul>
        </motion.div>
      </section>

      {related.length > 0 && (
        <section className="section bg-sand/60">
          <div className="container-x">
            <SectionHeading eyebrow="You may also like" title="Related products" to={`/products?category=${product.category}`} linkLabel={`More ${product.category}`} />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} reveal />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
