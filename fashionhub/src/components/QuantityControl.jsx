import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export default function QuantityControl({ value, onChange, min = 1, max = 10, small = false }) {
  const btn = `grid place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-cream disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink ${small ? 'h-8 w-8' : 'h-10 w-10'}`;
  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label="Quantity">
      <motion.button type="button" whileTap={{ scale: 0.85 }} className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={small ? 14 : 16} />
      </motion.button>
      <span className="relative inline-block w-6 overflow-hidden text-center text-sm font-semibold tabular-nums" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.18 }} className="block">
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.button type="button" whileTap={{ scale: 0.85 }} className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus size={small ? 14 : 16} />
      </motion.button>
    </div>
  );
}
