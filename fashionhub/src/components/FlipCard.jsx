import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * FlipCard – 3D card that flips on hover (mouse), tap (touch) or Enter/Space (keyboard).
 */
export default function FlipCard({ front, back, label, className = 'h-[420px]' }) {
  const [flipped, setFlipped] = useState(false);
  const canHover = () => window.matchMedia('(hover: hover)').matches;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={label}
      className={`cursor-pointer ${className}`}
      style={{ perspective: 1100 }}
      onMouseEnter={() => canHover() && setFlipped(true)}
      onMouseLeave={() => canHover() && setFlipped(false)}
      onClick={() => !canHover() && setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped((f) => !f); }
      }}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 14 }}
      >
        <div className="backface-hidden absolute inset-0 overflow-hidden rounded-3xl shadow-card">{front}</div>
        <div className="backface-hidden absolute inset-0 overflow-hidden rounded-3xl shadow-card" style={{ transform: 'rotateY(180deg)' }}>
          {back}
        </div>
      </motion.div>
    </div>
  );
}
