import { motion, useReducedMotion } from 'framer-motion';

const FACES = ['rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'];

/**
 * Cube3D – a spinning CSS 3D cube. Pass `labels` to print text on the 4 sides
 * (used on the About page), or leave empty for a decorative cube.
 */
export default function Cube3D({ size = 80, labels = [], spin = 'both', duration = 20, className = '', faceClass = '' }) {
  const reduce = useReducedMotion();
  const half = size / 2;
  const initial = spin === 'y' ? { rotateY: 0 } : { rotateX: -20, rotateY: 0 };
  const animate = reduce ? {} : spin === 'y' ? { rotateY: 360 } : { rotateX: 340, rotateY: 360 };

  return (
    <div className={className} style={{ width: size, height: size, perspective: size * 6 }} aria-hidden={labels.length === 0 ? true : undefined}>
      <motion.div
        className="preserve-3d relative h-full w-full"
        style={reduce ? { rotateX: -20, rotateY: 30 } : undefined}
        initial={initial}
        animate={animate}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {FACES.map((t, i) => (
          <div
            key={t}
            className={`absolute inset-0 flex items-center justify-center text-center ${faceClass || 'border border-white/40 bg-gradient-to-br from-gold/70 to-clay/70'}`}
            style={{ transform: `${t} translateZ(${half}px)` }}
          >
            {labels[i]}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
