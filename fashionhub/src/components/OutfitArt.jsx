import { Garment } from './ProductArt';

/** OutfitArt – 2-3 garments arranged on a gradient (used by style guide cards). */
export default function OutfitArt({ outfit, bg }) {
  const [c1, c2] = bg;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(155deg, ${c1}, ${c2})` }}>
      <div className="absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25" />
      <div className="absolute inset-0 flex items-center justify-center gap-0 px-4">
        {outfit.map((o, i) => (
          <div key={i} className={`h-[78%] w-1/2 ${i === 0 ? '-mr-3' : '-ml-3'}`} style={{ transform: `rotate(${i === 0 ? -4 : 5}deg) translateY(${i === 0 ? 0 : 10}px)` }}>
            <Garment type={o.type} color={o.color} className="h-full w-full drop-shadow-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
