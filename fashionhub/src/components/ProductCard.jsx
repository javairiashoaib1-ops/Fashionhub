import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';
import ProductImage from './ProductArt';
import Rating from './Rating';
import Tilt from './Tilt';
import Button from './Button';

const EASE = [0.22, 1, 0.36, 1];

/**
 * ProductCard – reusable product tile with 3D tilt, reveal animation,
 * wishlist heart and a View Details button.
 *  - reveal: animate when scrolled into view (home page)
 *  - otherwise it animates on mount / filter changes (products page)
 */
const ProductCard = forwardRef(function ProductCard({ product, index = 0, reveal = false, rank }, ref) {
  const { isWished, toggleWishlist, notify } = useStore();
  const wished = isWished(product.id);

  const handleWish = () => {
    toggleWishlist(product.id);
    notify(wished ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`, 'wish');
  };

  const entrance = reveal
    ? { initial: { opacity: 0, y: 44 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' } }
    : { initial: { opacity: 0, y: 30, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.18, delay: 0 } } };

  return (
    <motion.article ref={ref} layout={!reveal} {...entrance} transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: EASE }}>
      <Tilt className="relative" max={7} glare>
        <div className="preserve-3d relative rounded-2xl bg-white p-3 shadow-card transition-shadow duration-300 hover:shadow-lift">
          <Link to={`/products/${product.id}`} aria-label={`${product.name} – view details`} className="relative block aspect-[4/5] overflow-hidden rounded-xl" style={{ transform: 'translateZ(24px)' }}>
            <ProductImage type={product.type} color={product.colors[0].hex} />
            <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
              {rank && <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">Top {rank}</span>}
              {product.isNew && !rank && <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">New</span>}
              {product.oldPrice && <span className="rounded-full bg-clay px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Sale</span>}
            </div>
          </Link>

          <motion.button
            type="button"
            onClick={handleWish}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.15 }}
            aria-pressed={wished}
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-card"
            style={{ transform: 'translateZ(56px)' }}
          >
            <motion.span key={String(wished)} initial={{ scale: 0.3, rotate: -25 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }} className="grid place-items-center">
              <Heart size={18} className={wished ? 'fill-clay text-clay' : 'text-ink'} />
            </motion.span>
          </motion.button>

          <div className="px-1 pb-1 pt-4" style={{ transform: 'translateZ(18px)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">{product.category}</p>
            <h3 className="mt-1 line-clamp-1 font-display text-lg font-semibold">
              <Link to={`/products/${product.id}`} className="hover:text-clay">{product.name}</Link>
            </h3>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <p className="flex items-baseline gap-2">
                <span className="text-base font-bold">{formatPrice(product.price)}</span>
                {product.oldPrice && <span className="text-xs text-ink/40 line-through">{formatPrice(product.oldPrice)}</span>}
              </p>
              <Rating value={product.rating} />
            </div>
            <Button to={`/products/${product.id}`} variant="outline" size="sm" className="mt-4 w-full">View Details</Button>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
});

export default ProductCard;
