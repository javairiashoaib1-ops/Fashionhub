import { Snowflake, Sparkles, Sun } from 'lucide-react';
import { Garment } from './ProductArt';

const FLAKES = [[10, 14, 18], [72, 10, 26], [84, 46, 16], [18, 52, 22], [50, 28, 14], [34, 8, 12], [90, 80, 20]];
const SPARKS = [[12, 16, 22], [78, 12, 30], [88, 52, 18], [8, 58, 16], [56, 30, 14]];

/** Illustrated collection cover – gradient, themed decor and two garments. */
export default function CollectionArt({ collection }) {
  const [c1, c2] = collection.gradient;
  const [a, b] = collection.pieces;

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(150deg, ${c1}, ${c2})` }}>
      {collection.id === 'summer' && (
        <>
          <Sun className="absolute -right-6 -top-6 text-yellow-100/90" size={170} strokeWidth={1.2} />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-yellow-100/50 blur-xl" />
        </>
      )}
      {collection.id === 'winter' && FLAKES.map(([x, y, s], i) => <Snowflake key={i} className="absolute text-white/70" style={{ left: `${x}%`, top: `${y}%` }} size={s} />)}
      {collection.id === 'casual' && (
        <>
          <div className="absolute -left-10 top-6 h-48 w-48 rounded-full border-[14px] border-white/30" />
          <div className="absolute -right-8 bottom-10 h-32 w-32 rounded-full border-[10px] border-white/25" />
        </>
      )}
      {collection.id === 'formal' && (
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.5) 0 1px, transparent 1px 42px)' }} />
      )}
      {collection.id === 'party' && SPARKS.map(([x, y, s], i) => <Sparkles key={i} className="absolute text-yellow-200/90" style={{ left: `${x}%`, top: `${y}%` }} size={s} />)}

      <div className="absolute bottom-[-6%] left-[4%] h-[88%] w-[62%]">
        <Garment type={a.type} color={a.color} className="h-full w-full drop-shadow-xl" />
      </div>
      <div className="absolute bottom-[-2%] right-[2%] h-[62%] w-[48%]">
        <Garment type={b.type} color={b.color} className="h-full w-full drop-shadow-xl" />
      </div>
    </div>
  );
}
