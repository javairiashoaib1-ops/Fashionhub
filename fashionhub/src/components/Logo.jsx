import { Link } from 'react-router-dom';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="FashionHub home">
      <span className={`grid h-9 w-9 place-items-center rounded-xl font-display text-lg font-bold ${light ? 'bg-cream text-ink' : 'bg-ink text-gold'}`}>F</span>
      <span className={`font-display text-xl font-semibold tracking-tight ${light ? 'text-cream' : 'text-ink'}`}>
        Fashion<span className="italic text-clay">Hub</span>
      </span>
    </Link>
  );
}
