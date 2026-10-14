import { motion } from 'framer-motion';

/** Wraps every page so route changes get a soft 3D slide/fade transition. */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: -4 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
