import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import OutfitArt from '../components/OutfitArt';
import Tilt from '../components/Tilt';
import Reveal from '../components/Reveal';
import { styleGuide } from '../data/products';

function TipCard({ tip, index }) {
  return (
    <motion.article initial={{ opacity: 0, y: 50, rotateX: -10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65, delay: index * 0.1 }} style={{ transformPerspective: 900 }}>
      <Tilt className="relative h-full" max={6} glare>
        <div className="preserve-3d flex h-full flex-col rounded-3xl bg-white p-3 shadow-card transition-shadow hover:shadow-lift">
          <div className="aspect-[4/3.4] overflow-hidden rounded-2xl" style={{ transform: 'translateZ(22px)' }}>
            <OutfitArt outfit={tip.outfit} bg={tip.bg} />
          </div>
          <div className="flex flex-1 flex-col px-3 pb-3 pt-5" style={{ transform: 'translateZ(14px)' }}>
            <h3 className="text-xl font-semibold">{tip.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{tip.text}</p>
            <Link to={tip.shop} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay">
              Shop the look <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}

export default function StyleGuide() {
  return (
    <>
      <PageHeader eyebrow="Style Guide" title="Simple styling tips that always work" subtitle="Casual, formal, seasonal and occasion-based advice from our stylists." />

      <nav aria-label="Style guide sections" className="sticky top-16 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur sm:top-[72px]">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {styleGuide.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip shrink-0">{s.title}</a>
          ))}
        </div>
      </nav>

      <div className="container-x">
        {styleGuide.map((section, si) => (
          <section key={section.id} id={section.id} className="scroll-mt-36 py-14 sm:py-20">
            <Reveal className="mb-10 flex items-end gap-5">
              <span className="font-display text-6xl font-semibold italic text-clay/30 sm:text-8xl">0{si + 1}</span>
              <div className="pb-2">
                <h2 className="text-3xl font-semibold sm:text-4xl">{section.title}</h2>
                <p className="mt-2 text-ink/65">{section.blurb}</p>
              </div>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {section.tips.map((t, i) => <TipCard key={t.title} tip={t} index={i} />)}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
