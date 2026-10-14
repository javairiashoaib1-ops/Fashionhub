import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Logo from './Logo';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/style-guide', label: 'Style Guide' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function CountBadge({ count }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.3, y: 6 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[10px] font-bold text-white"
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { cart, wishlist, totals } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const iconBtn = 'relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/85 shadow-card backdrop-blur-lg' : 'bg-cream'}`}>
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `relative px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'}`}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-clay" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <NavLink to="/wishlist" className={iconBtn} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart size={20} />
              <CountBadge count={wishlist.length} />
            </NavLink>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <NavLink to="/cart" className={iconBtn} aria-label={`Cart, ${totals.items} items`}>
              <ShoppingBag size={20} />
              <CountBadge count={totals.items} />
            </NavLink>
          </motion.div>
          <button className={`${iconBtn} lg:hidden`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-ink/10 bg-cream lg:hidden"
          >
            <ul className="container-x flex flex-col py-3">
              {LINKS.map((l, i) => (
                <motion.li key={l.to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `block border-b border-ink/5 py-3 font-display text-xl ${isActive ? 'text-clay' : 'text-ink'}`}>
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
