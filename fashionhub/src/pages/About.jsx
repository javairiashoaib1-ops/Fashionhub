import { motion } from 'framer-motion';
import { Eye, Gem, Leaf, Sparkles, Target } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Cube3D from '../components/Cube3D';
import Reveal from '../components/Reveal';
import Tilt from '../components/Tilt';
import Button from '../components/Button';

const VALUES = [
  { icon: Gem, title: 'Quality first', text: 'Premium fabrics and thoughtful construction so every piece lasts beyond the season.' },
  { icon: Leaf, title: 'Conscious choices', text: 'We favour responsible materials and honest production, one collection at a time.' },
  { icon: Sparkles, title: 'Inclusive style', text: 'Fashion should fit everyone – every body, budget and personality.' },
];

const CUBE_FACES = ['Craft', 'Care', 'Style', 'Joy'];

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About FashionHub" title="Fashion that feels like you" subtitle="We’re a modern fashion platform helping people explore, discover and express their personal style." />

      <section className="section container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-3">Our story</p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">Born from a love of everyday style</h2>
          <p className="mt-6 leading-relaxed text-ink/70">FashionHub started with a simple idea: great style shouldn’t be complicated. We curate thoughtfully designed collections, practical styling advice and effortless shopping, so you can spend less time deciding and more time enjoying what you wear.</p>
          <p className="mt-4 leading-relaxed text-ink/70">From weekend staples to statement evening pieces, every product is chosen to mix, match and move with your life.</p>
          <div className="mt-8"><Button to="/products">Explore the shop</Button></div>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center py-8">
          <Cube3D
            size={230}
            spin="y"
            duration={24}
            faceClass="border border-gold/60 bg-ink text-cream shadow-lift"
            labels={CUBE_FACES.map((f) => <span key={f} className="font-display text-3xl italic text-gold">{f}</span>)}
          />
        </Reveal>
      </section>

      <section className="section bg-sand/60">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[[Target, 'Our mission', 'To make modern, quality fashion easy to discover and a joy to wear – by pairing beautiful products with simple, inspiring styling guidance.'], [Eye, 'Our vision', 'A world where everyone dresses with confidence, expressing who they are through clothes that are made with care.']].map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.12}>
              <Tilt className="relative h-full" max={5} glare>
                <div className="preserve-3d h-full rounded-3xl bg-white p-8 shadow-card sm:p-10">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-gold" style={{ transform: 'translateZ(30px)' }}><Icon size={26} /></span>
                  <h3 className="mt-6 text-3xl font-semibold" style={{ transform: 'translateZ(20px)' }}>{t}</h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{d}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container-x">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-3">Brand values</p>
          <h2 className="text-3xl font-semibold sm:text-5xl">What we stand for</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }} whileHover={{ y: -8 }} className="rounded-3xl border border-ink/10 bg-white p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-clay/10 text-clay"><Icon size={22} /></span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
