import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductImage from './ProductArt';
import Cube3D from './Cube3D';
import { formatPrice, getProductById } from '../data/products';

const RING = [3, 1, 14, 6, 15, 20].map(getProductById);
const RADIUS = 250;

/**
 * Hero3D – a rotating 3D carousel of products that also reacts to the mouse.
 * Built with CSS 3D transforms (perspective + preserve-3d) driven by Framer Motion.
 */
export default function Hero3D() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [14, -10]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="relative h-[430px] sm:h-[560px]" style={{ perspective: 1300 }} onPointerMove={onMove} onPointerLeave={onLeave} aria-label="Rotating showcase of featured products">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold/50 via-clay/30 to-transparent blur-3xl" />

      <motion.div className="preserve-3d absolute inset-0 grid place-items-center" style={reduce ? undefined : { rotateX, rotateY }}>
        <div className="preserve-3d origin-center scale-[0.62] sm:scale-100">
          {/* orbit ring */}
          <motion.div
            aria-hidden="true"
            className="preserve-3d absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/20"
            style={{ rotateX: 76 }}
            initial={{ rotateZ: 0 }}
            animate={reduce ? {} : { rotateZ: -360 }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          />

          {/* carousel */}
          <motion.div
            className="preserve-3d relative"
            style={{ width: 200, height: 270 }}
            initial={{ rotateY: 0 }}
            animate={reduce ? {} : { rotateY: 360 }}
            transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
          >
            {RING.map((p, i) => (
              <div key={p.id} className="backface-hidden absolute inset-0" style={{ transform: `rotateY(${(i * 360) / RING.length}deg) translateZ(${RADIUS}px)` }}>
                <Link to={`/products/${p.id}`} className="group block h-full w-full overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-black/5" aria-label={`${p.name}, ${formatPrice(p.price)}`}>
                  <div className="h-[82%]"><ProductImage type={p.type} color={p.colors[0].hex} /></div>
                  <div className="flex h-[18%] items-center justify-between bg-white px-3">
                    <span className="line-clamp-1 text-[11px] font-semibold">{p.name}</span>
                    <span className="text-[11px] font-bold text-clay">{formatPrice(p.price)}</span>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* floating 3D accents */}
      <motion.div className="absolute left-2 top-10 sm:left-6" animate={reduce ? {} : { y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <Cube3D size={46} duration={16} />
      </motion.div>
      <motion.div className="absolute bottom-10 right-4 sm:right-10" animate={reduce ? {} : { y: [0, 14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <Cube3D size={64} duration={24} />
      </motion.div>
      <motion.div className="absolute right-2 top-6 hidden sm:block" animate={reduce ? {} : { y: [0, -10, 0], rotate: [0, 6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-clay">Rated</p>
          <p className="font-display text-2xl font-semibold">4.8 / 5</p>
        </div>
      </motion.div>
    </div>
  );
}
