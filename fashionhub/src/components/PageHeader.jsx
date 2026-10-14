import { motion } from 'framer-motion';
import Cube3D from './Cube3D';

/** Shared page banner with a floating 3D cube. */
export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="relative overflow-hidden bg-sand">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-clay/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
      <div className="container-x relative py-14 sm:py-20">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow mb-3">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6 }} className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">{title}</motion.h1>
        {subtitle && <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.6 }} className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">{subtitle}</motion.p>}
        {children}
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 md:block">
          <Cube3D size={72} duration={22} />
        </div>
        <div className="absolute right-40 top-8 hidden lg:block opacity-70">
          <Cube3D size={34} duration={14} />
        </div>
      </div>
    </header>
  );
}
