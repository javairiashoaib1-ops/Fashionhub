import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import CollectionCard from '../components/CollectionCard';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import FlipCard from '../components/FlipCard';
import OutfitArt from '../components/OutfitArt';
import Cube3D from '../components/Cube3D';
import Reveal from '../components/Reveal';
import { categories, collections, products, styleGuide } from '../data/products';

const HEADLINE = ['Style', 'that', 'steps', 'out', 'of', 'the', 'frame.'];
const MARQUEE = ['New season arrivals', 'Free shipping over $150', 'Easy 30-day returns', 'Autumn / Winter 2026', 'Curated for every occasion'];

function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-b from-sand via-cream to-cream">
      <div className="container-x grid items-center gap-6 py-10 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow mb-5 inline-flex items-center gap-2">
            <span className="h-px w-8 bg-clay" /> Autumn / Winter 2026
          </motion.p>

          <h1 className="text-[2.75rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            {HEADLINE.map((w, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className={`inline-block ${w === 'frame.' ? 'italic text-clay' : ''}`}
                  initial={{ y: '110%', rotateX: -70 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }} className="mt-6 max-w-lg text-base leading-relaxed text-ink/65 sm:text-lg">
            Discover curated collections, timeless essentials and bold statement pieces. Build a wardrobe that feels unmistakably you – in every season and for every occasion.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.7 }} className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/products" variant="primary" className="!px-8 !py-4">Shop Now <ArrowRight size={16} /></Button>
            <Button to="/collections" variant="outline" className="!px-8 !py-4">Explore Collections</Button>
          </motion.div>

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }} className="mt-10 flex gap-8 sm:gap-12">
            {[[`${products.length}+`, 'Styles'], ['5', 'Collections'], ['4.8★', 'Avg. rating']].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl font-semibold">{n}</dd>
                <dd className="text-xs uppercase tracking-widest text-ink/50">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <Hero3D />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden bg-ink py-4 text-cream" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg italic">{t} <span className="text-gold">✦</span></span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const trending = products.filter((p) => p.trending).slice(0, 4);
  const inspiration = [styleGuide[0].tips[0], styleGuide[1].tips[0], styleGuide[3].tips[0]];

  return (
    <>
      <Hero />
      <Marquee />

      {/* Perks */}
      <section className="border-b border-ink/10 bg-white">
        <div className="container-x grid gap-6 py-8 sm:grid-cols-3">
          {[[Truck, 'Free shipping', 'On every order over $150'], [RefreshCw, 'Easy returns', '30-day hassle-free returns'], [ShieldCheck, 'Quality promise', 'Premium fabrics, built to last']].map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sand text-clay"><Icon size={22} /></span>
              <div><p className="font-semibold">{t}</p><p className="text-sm text-ink/60">{d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section container-x">
        <SectionHeading eyebrow="Featured Collections" title="Curated edits for every mood" subtitle="Step into a collection and let the season, the occasion or your mood guide the look." to="/collections" linkLabel="All collections" />
        <div className="grid gap-6 md:grid-cols-3">
          {collections.slice(0, 3).map((c, i) => <CollectionCard key={c.id} collection={c} index={i} />)}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section bg-sand/60">
        <div className="container-x">
          <SectionHeading eyebrow="New Arrivals" title="Just landed" subtitle="Fresh pieces added this week – be the first to wear them." to="/products" linkLabel="Shop all" />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} reveal />)}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="section container-x">
        <SectionHeading eyebrow="Popular Categories" title="Shop by category" subtitle="From wardrobe staples to finishing touches – find exactly what you need." to="/categories" linkLabel="All categories" />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} count={products.filter((p) => p.category === c.id).length} onSelect={() => navigate(`/products?category=${c.id}`)} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="section bg-sand/60">
        <div className="container-x">
          <SectionHeading eyebrow="Trending Now" title="What everyone is wearing" subtitle="Our most-loved pieces this month, chosen by you." to="/products?sort=rating" linkLabel="See top rated" />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} reveal rank={i + 1} />)}
          </div>
        </div>
      </section>

      {/* Style inspiration – 3D flip cards */}
      <section className="section container-x">
        <SectionHeading eyebrow="Style Inspiration" title="Looks worth stealing" subtitle="Hover, tap or press Enter on a card to flip it and read the styling tip." to="/style-guide" linkLabel="Full style guide" />
        <div className="grid gap-6 md:grid-cols-3">
          {inspiration.map((tip, i) => (
            <Reveal key={tip.title} delay={i * 0.1}>
              <FlipCard
                label={`${tip.title} – flip card for styling tip`}
                front={
                  <div className="relative h-full">
                    <OutfitArt outfit={tip.outfit} bg={tip.bg} />
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
                      <p className="eyebrow !text-[10px]">Style tip</p>
                      <h3 className="mt-1 text-xl font-semibold">{tip.title}</h3>
                    </div>
                  </div>
                }
                back={
                  <div className="flex h-full flex-col justify-between bg-ink p-7 text-cream">
                    <div>
                      <p className="eyebrow !text-gold">Stylist note</p>
                      <h3 className="mt-3 text-2xl font-semibold">{tip.title}</h3>
                      <p className="mt-4 leading-relaxed text-cream/75">{tip.text}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">Tap again to flip back</span>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-clay/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute left-[8%] top-[18%] hidden md:block"><Cube3D size={56} duration={18} /></div>
        <div className="absolute bottom-[14%] right-[9%] hidden md:block"><Cube3D size={84} duration={26} /></div>
        <Reveal className="container-x relative text-center">
          <p className="eyebrow !text-gold mb-4">Find your signature style</p>
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Ready to dress the way you feel?</h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/70">Save favourites to your wishlist, build your cart and create outfits that tell your story.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/products" variant="light" className="!px-8 !py-4">Shop Now <ArrowRight size={16} /></Button>
            <Button to="/style-guide" variant="ghostLight" className="!px-8 !py-4">Read the Style Guide</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
