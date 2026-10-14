import { Star } from 'lucide-react';

export default function Rating({ value, count, size = 14 }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${value} out of 5`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            aria-hidden="true"
            className={n <= Math.round(value) ? 'fill-gold text-gold' : 'text-ink/20'}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-ink/80">{value.toFixed(1)}</span>
      {count != null && <span className="text-xs text-ink/50">({count})</span>}
    </div>
  );
}
