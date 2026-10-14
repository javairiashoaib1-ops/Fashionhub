import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProductImage from '../components/ProductArt';
import Rating from '../components/Rating';
import Button from '../components/Button';
import Tilt from '../components/Tilt';
import { useStore } from '../context/StoreContext';
import { formatPrice, getProductById } from '../data/products';

export function EmptyState({ icon: Icon, title, text, cta, to }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30, rotateX: -15 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} style={{ transformPerspective: 900 }} className="mx-auto max-w-lg rounded-3xl bg-white px-6 py-16 text-center shadow-card">
      <motion.span animate={{ y: [0, -8, 0], rotateY: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-sand text-clay">
        <Icon size={34} />
      </motion.span>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-sm text-ink/60">{text}</p>
      <div className="mt-7"><Button to={to}>{cta}</Button></div>
    </motion.div>
  );
}

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart, notify } = useStore();
  const items = wishlist.map(getProductById).filter(Boolean);

  const handleMove = (p) => {
    const res = moveToCart(p.id);
    if (res) notify(`${p.name} moved to cart (${res.size}, ${res.color})`);
  };

  return (
    <>
      <PageHeader eyebrow="Wishlist" title="Your saved favourites" subtitle={items.length ? `${items.length} saved ${items.length === 1 ? 'piece' : 'pieces'} waiting for you.` : 'Tap the heart on any product to save it here.'} />
      <section className="section !pt-10 container-x">
        {items.length === 0 ? (
          <EmptyState icon={Heart} title="Your wishlist is empty" text="Save the pieces you love and come back to them any time." cta="Discover products" to="/products" />
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((p, i) => (
                <motion.article key={p.id} layout initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.6, rotateZ: -8, y: -40, transition: { duration: 0.25, delay: 0 } }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Tilt className="relative" max={6} glare>
                    <div className="preserve-3d rounded-2xl bg-white p-3 shadow-card">
                      <Link to={`/products/${p.id}`} className="relative block aspect-[4/5] overflow-hidden rounded-xl" style={{ transform: 'translateZ(22px)' }} aria-label={`${p.name} – view details`}>
                        <ProductImage type={p.type} color={p.colors[0].hex} />
                      </Link>
                      <motion.button type="button" whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.15 }} onClick={() => { removeFromWishlist(p.id); notify(`Removed ${p.name} from wishlist`, 'wish'); }} className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-ink shadow-card hover:text-red-600" aria-label={`Remove ${p.name} from wishlist`} style={{ transform: 'translateZ(50px)' }}>
                        <Trash2 size={17} />
                      </motion.button>
                      <div className="px-1 pb-1 pt-4" style={{ transform: 'translateZ(16px)' }}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">{p.category}</p>
                        <h3 className="mt-1 line-clamp-1 font-display text-lg font-semibold">{p.name}</h3>
                        <div className="mt-1.5 flex items-center justify-between"><span className="font-bold">{formatPrice(p.price)}</span><Rating value={p.rating} /></div>
                        <Button onClick={() => handleMove(p)} size="sm" className="mt-4 w-full"><ShoppingBag size={15} /> Move to Cart</Button>
                      </div>
                    </div>
                  </Tilt>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  );
}
