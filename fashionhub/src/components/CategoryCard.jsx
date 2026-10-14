import { motion } from 'framer-motion';
import { Garment } from './ProductArt';
import Tilt from './Tilt';

/**
 * CategoryCard – selectable category tile.
 * Pass `to` (Link) OR `onSelect` (button) depending on the page.
 */
export default function CategoryCard({ category, count, index = 0, active = false, onSelect }) {
  const [c1, c2] = category.bg;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
    >
      <Tilt className="relative" max={10} glare>
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={active}
          className={`preserve-3d group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl text-left shadow-card transition-all ${active ? 'ring-4 ring-clay ring-offset-2 ring-offset-cream' : ''}`}
          style={{ background: `linear-gradient(160deg, ${c1}, ${c2})` }}
        >
          <div className="absolute left-1/2 top-[44%] aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" />
          <div className="absolute inset-x-0 top-[2%] h-[68%]" style={{ transform: 'translateZ(40px)' }}>
            <Garment type={category.type} color={category.color} className="h-full w-full drop-shadow-xl transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/85 p-4 backdrop-blur" style={{ transform: 'translateZ(28px)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{category.id}</h3>
              <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-semibold text-cream">{count}</span>
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs text-ink/60">{category.blurb}</p>
          </div>
        </button>
      </Tilt>
    </motion.div>
  );
}
