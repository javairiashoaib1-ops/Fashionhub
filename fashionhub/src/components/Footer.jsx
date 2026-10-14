import { Link } from 'react-router-dom';
import Logo from './Logo';

const COLS = [
  { title: 'Shop', links: [['New Arrivals', '/products'], ['Collections', '/collections'], ['Categories', '/categories'], ['Wishlist', '/wishlist'], ['Cart', '/cart']] },
  { title: 'Discover', links: [['Style Guide', '/style-guide'], ['About FashionHub', '/about'], ['Contact Us', '/contact']] },
  { title: 'Popular', links: [['Women', '/products?category=Women'], ['Men', '/products?category=Men'], ['Shoes', '/products?category=Shoes'], ['Accessories', '/products?category=Accessories']] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-cream/75">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-clay/20 blur-3xl" />
      <div className="container-x relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Modern fashion and timeless style, curated for every season, every occasion and every you.</p>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">{c.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {c.links.map(([label, to]) => (
                <li key={label}><Link to={to} className="transition-colors hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FashionHub. All rights reserved.</p>
          <p>A frontend project by Allied Axis · Demo store – no real payments or orders.</p>
        </div>
      </div>
    </footer>
  );
}
