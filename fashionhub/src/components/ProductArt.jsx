import { useId } from 'react';
import { mix, shade } from '../utils/color';

// Vertical position of the soft ground shadow for each shape.
const SHADOW_Y = { sneaker: 176, heel: 194, boot: 206, watch: 238, necklace: 232, sunglasses: 222 };

/**
 * Garment – illustrated SVG for every product type. Colours are derived from a
 * single base colour so a colour swatch can re-tint the whole product.
 */
export function Garment({ type = 'top', color = '#c9677a', className = '', title }) {
  const gid = 'g' + useId().replace(/:/g, '');
  const base = color;
  const dark = shade(color, -0.22);
  const light = shade(color, 0.3);
  const line = shade(color, -0.4);
  const fill = `url(#${gid})`;
  const s = { stroke: line, strokeWidth: 1.4, strokeLinejoin: 'round', strokeLinecap: 'round' };

  const coat = (
    <>
      <path d="M68 30 L100 22 L132 30 L172 66 L166 198 L146 198 L140 108 L142 222 L58 222 L60 108 L54 198 L34 198 L28 66 Z" fill={fill} {...s} />
      <path d="M100 22 L78 66 L100 108 Z" fill={light} {...s} />
      <path d="M100 22 L122 66 L100 108 Z" fill={dark} {...s} />
      <path d="M100 108 L100 222" stroke={line} strokeOpacity=".5" fill="none" />
      <path d="M68 160 L88 160 M112 160 L132 160" stroke={line} strokeOpacity=".5" fill="none" strokeWidth="2" />
      {[134, 164, 194].map((y) => <circle key={y} cx="108" cy={y} r="3" fill={line} />)}
    </>
  );

  let body = null;
  switch (type) {
    case 'dress':
      body = (
        <>
          <path d="M78 26 L90 26 L100 50 L110 26 L122 26 L128 84 L124 100 L160 208 Q100 228 40 208 L76 100 L72 84 Z" fill={fill} {...s} />
          <path d="M74 98 L126 98 L124 110 L76 110 Z" fill={dark} {...s} />
          <path d="M88 112 L70 210 M100 114 L100 220 M112 112 L130 210" stroke={line} strokeOpacity=".3" fill="none" />
        </>
      );
      break;
    case 'top':
      body = (
        <>
          <path d="M72 34 L92 28 Q100 42 108 28 L128 34 L166 64 L150 92 L132 80 L132 204 L68 204 L68 80 L50 92 L34 64 Z" fill={fill} {...s} />
          <path d="M92 28 Q100 42 108 28" fill="none" stroke={dark} strokeWidth="4" strokeLinecap="round" />
          <path d="M68 196 L132 196" stroke={line} strokeOpacity=".3" />
        </>
      );
      break;
    case 'shirt':
      body = (
        <>
          <path d="M70 34 L92 28 L100 40 L108 28 L130 34 L170 70 L162 188 L142 188 L134 100 L134 208 L66 208 L66 100 L58 188 L38 188 L30 70 Z" fill={fill} {...s} />
          <path d="M92 28 L100 58 L82 44 Z" fill={light} {...s} />
          <path d="M108 28 L100 58 L118 44 Z" fill={light} {...s} />
          <path d="M100 58 L100 208" stroke={line} strokeOpacity=".5" fill="none" />
          {[80, 108, 136, 164, 192].map((y) => <circle key={y} cx="100" cy={y} r="2.2" fill={line} />)}
        </>
      );
      break;
    case 'coat':
      body = coat;
      break;
    case 'blazer':
      body = <g transform="translate(0 20) scale(1 .9)">{coat}</g>;
      break;
    case 'skirt':
      body = (
        <>
          <path d="M66 40 L134 40 L170 214 Q100 232 30 214 Z" fill={fill} {...s} />
          <rect x="64" y="32" width="72" height="14" rx="3" fill={dark} {...s} />
          <path d="M78 48 L56 218 M92 48 L84 224 M108 48 L116 224 M122 48 L144 218" stroke={line} strokeOpacity=".3" fill="none" />
        </>
      );
      break;
    case 'pants':
      body = (
        <>
          <path d="M64 30 L136 30 L148 220 L108 220 L100 100 L92 220 L52 220 Z" fill={fill} {...s} />
          <rect x="62" y="26" width="76" height="14" rx="3" fill={dark} {...s} />
          <path d="M100 40 L100 100 M70 46 Q82 62 84 78 M130 46 Q118 62 116 78" stroke={line} strokeOpacity=".5" fill="none" />
        </>
      );
      break;
    case 'sneaker':
      body = (
        <g transform="translate(0 -22)">
          <path d="M22 168 L182 168 Q192 168 192 178 L192 186 Q192 194 182 194 L32 194 Q22 194 22 184 Z" fill="#f3efe8" {...s} />
          <path d="M28 168 L32 108 Q34 94 50 94 L72 94 Q84 120 112 128 L158 138 Q192 146 192 168 Z" fill={fill} {...s} />
          <path d="M150 136 Q190 144 192 168 L150 168 Z" fill={dark} {...s} />
          <path d="M28 168 L32 108 Q34 94 50 94 L52 130 L28 140 Z" fill={dark} {...s} />
          <path d="M84 112 L98 104 M96 124 L110 116 M110 132 L124 124" stroke="#fff" strokeOpacity=".85" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
      break;
    case 'heel':
      body = (
        <g transform="translate(0 -20)">
          <path d="M40 140 L64 154 L52 214 L44 214 Z" fill={dark} {...s} />
          <path d="M36 96 Q56 92 70 118 Q100 150 176 176 Q190 182 182 192 Q150 198 118 194 Q84 188 62 158 Q38 142 36 96 Z" fill={fill} {...s} />
          <path d="M62 158 Q84 188 118 194 Q150 198 182 192" fill="none" stroke={dark} strokeWidth="5" strokeLinecap="round" />
          <path d="M44 106 Q54 104 62 124" fill="none" stroke={light} strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
      break;
    case 'boot':
      body = (
        <g transform="translate(0 -4)">
          <path d="M56 24 L112 24 L114 118 Q156 126 180 150 Q190 160 186 186 L50 186 Z" fill={fill} {...s} />
          <rect x="56" y="24" width="56" height="16" fill={dark} {...s} />
          <path d="M46 186 L190 186 L190 206 Q190 208 188 208 L48 208 Q46 208 46 206 Z" fill={dark} {...s} />
          <path d="M64 58 L104 58 M64 76 L104 76 M64 94 L106 94" stroke={light} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
      break;
    case 'bag':
      body = (
        <>
          <path d="M70 104 Q70 40 100 40 Q130 40 130 104" fill="none" stroke={dark} strokeWidth="7" strokeLinecap="round" />
          <path d="M34 98 L166 98 L176 206 Q176 216 166 216 L34 216 Q24 216 24 206 Z" fill={fill} {...s} />
          <path d="M30 98 L170 98 L166 138 Q100 162 34 138 Z" fill={dark} {...s} />
          <circle cx="100" cy="142" r="8" fill="#d8b46a" stroke="#8a6a25" strokeWidth="1.4" />
        </>
      );
      break;
    case 'watch':
      body = (
        <>
          <path d="M80 8 L120 8 L124 66 L76 66 Z" fill={shade(color, -0.35)} {...s} />
          <path d="M76 174 L124 174 L120 232 L80 232 Z" fill={shade(color, -0.35)} {...s} />
          <rect x="154" y="113" width="9" height="14" rx="2" fill={dark} {...s} />
          <circle cx="100" cy="120" r="58" fill={fill} {...s} />
          <circle cx="100" cy="120" r="46" fill="#fbf8f2" {...s} />
          {[...Array(12)].map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return <line key={i} x1={100 + Math.sin(a) * 38} y1={120 - Math.cos(a) * 38} x2={100 + Math.sin(a) * 43} y2={120 - Math.cos(a) * 43} stroke="#333" strokeWidth={i % 3 === 0 ? 2.5 : 1.2} />;
          })}
          <path d="M100 120 L100 92" stroke="#222" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 120 L120 130" stroke="#222" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="100" cy="120" r="3.5" fill="#222" />
        </>
      );
      break;
    case 'sunglasses':
      body = (
        <g transform="translate(0 10)">
          <path d="M30 94 L10 88 M170 94 L190 88" stroke={dark} strokeWidth="5" strokeLinecap="round" />
          {[false, true].map((flip) => (
            <g key={String(flip)} transform={flip ? 'translate(200 0) scale(-1 1)' : undefined}>
              <path d="M28 92 Q28 84 40 84 L84 84 Q96 84 94 100 Q90 138 60 138 Q30 138 28 100 Z" fill="#26262c" stroke={base} strokeWidth="5" strokeLinejoin="round" />
              <path d="M40 96 L58 96 L42 122 Z" fill="#fff" opacity=".22" />
            </g>
          ))}
          <path d="M94 96 Q100 88 106 96" fill="none" stroke={base} strokeWidth="4" strokeLinecap="round" />
        </g>
      );
      break;
    case 'necklace':
      body = (
        <>
          <path d="M44 36 Q100 190 156 36" fill="none" stroke={base} strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="114" r="3.5" fill={dark} />
          <circle cx="100" cy="132" r="17" fill={fill} {...s} />
          <circle cx="94" cy="126" r="6" fill="#fff" opacity=".85" />
        </>
      );
      break;
    case 'hat':
      body = (
        <>
          <ellipse cx="100" cy="150" rx="88" ry="22" fill={dark} {...s} />
          <path d="M54 150 Q52 68 100 68 Q148 68 146 150 Q100 164 54 150 Z" fill={fill} {...s} />
          <path d="M55 134 Q100 150 145 134 L146 148 Q100 164 54 148 Z" fill={shade(color, -0.55)} />
        </>
      );
      break;
    case 'lipstick':
      body = (
        <>
          <path d="M86 128 L86 82 L114 62 L114 128 Z" fill={fill} {...s} />
          <rect x="82" y="128" width="36" height="14" fill="#c9a24b" stroke="#8a6a25" strokeWidth="1.2" />
          <rect x="78" y="142" width="44" height="76" rx="4" fill="#2a2523" />
          <rect x="84" y="150" width="4" height="62" rx="2" fill="#fff" opacity=".18" />
          <rect x="78" y="176" width="44" height="4" fill="#c9a24b" />
        </>
      );
      break;
    case 'perfume':
      body = (
        <>
          <rect x="82" y="40" width="36" height="34" rx="5" fill="#c9a24b" stroke="#8a6a25" strokeWidth="1.2" />
          <rect x="90" y="74" width="20" height="18" fill="#9a7b36" />
          <rect x="56" y="92" width="88" height="124" rx="16" fill={fill} {...s} />
          <rect x="72" y="130" width="56" height="44" rx="4" fill="#fbf8f2" />
          <text x="100" y="158" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fill="#222">FH</text>
          <path d="M66 106 L66 202" stroke="#fff" strokeOpacity=".4" strokeWidth="5" strokeLinecap="round" />
        </>
      );
      break;
    default:
      body = <rect x="50" y="40" width="100" height="160" rx="12" fill={fill} {...s} />;
  }

  return (
    <svg viewBox="0 0 200 240" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={base} />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy={SHADOW_Y[type] || 230} rx="62" ry="6" fill="#000" opacity=".13" />
      {body}
    </svg>
  );
}

/** ProductImage – Garment on a soft, colour-matched studio backdrop. */
export default function ProductImage({ type, color, bg, title, className = '' }) {
  const bg1 = bg?.[0] || mix(color, '#f7f0e5', 0.8);
  const bg2 = bg?.[1] || mix(color, '#e8dcc7', 0.62);
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ background: `linear-gradient(160deg, ${bg1}, ${bg2})` }}>
      <div className="absolute left-1/2 top-[52%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45" />
      <Garment type={type} color={color} title={title} className="relative h-full w-full p-[8%]" />
    </div>
  );
}
