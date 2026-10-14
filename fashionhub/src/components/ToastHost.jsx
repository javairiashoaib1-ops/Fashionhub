import { AnimatePresence, motion } from 'framer-motion';
import { Check, Heart, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ToastHost() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:items-end" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 40, rotateX: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{ transformPerspective: 600 }}
            className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-cream shadow-lift"
          >
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${t.tone === 'wish' ? 'bg-clay' : 'bg-emerald-600'}`}>
              {t.tone === 'wish' ? <Heart size={14} className="fill-white" /> : <Check size={14} />}
            </span>
            <span className="flex-1">{t.message}</span>
            <button onClick={() => dismissToast(t.id)} className="text-cream/60 hover:text-cream" aria-label="Dismiss notification"><X size={16} /></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
