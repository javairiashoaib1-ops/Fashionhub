import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, subtitle, to, linkLabel = 'View all', center = false, light = false }) {
  return (
    <Reveal className={`mb-10 flex flex-col gap-4 sm:mb-14 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-xl'}>
        {eyebrow && <p className={`eyebrow mb-3 ${light ? '!text-gold' : ''}`}>{eyebrow}</p>}
        <h2 className={`text-3xl font-semibold leading-tight sm:text-5xl ${light ? 'text-cream' : ''}`}>{title}</h2>
        {subtitle && <p className={`mt-4 text-base leading-relaxed ${light ? 'text-cream/70' : 'text-ink/65'}`}>{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className={`group inline-flex shrink-0 items-center gap-2 text-sm font-semibold ${light ? 'text-cream' : 'text-ink'}`}>
          <span className="border-b border-current pb-0.5">{linkLabel}</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
