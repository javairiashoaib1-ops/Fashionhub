import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { categories, products } from '../data/products';

export default function Categories() {
  const [params, setParams] = useSearchParams();
  const selected = params.get('cat') || '';
  const list = products.filter((p) => p.category === selected);

  const select = (id) => {
    setParams(id === selected ? {} : { cat: id }, { replace: true });
    if (id !== selected) setTimeout(() => document.getElementById('category-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  };

  return (
    <>
      <PageHeader eyebrow="Categories" title="Shop by category" subtitle="Pick a category to instantly browse everything inside it." />
      <section className="section !pb-10 container-x">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} active={selected === c.id} count={products.filter((p) => p.category === c.id).length} onSelect={() => select(c.id)} />
          ))}
        </div>
      </section>

      <section id="category-results" className="container-x scroll-mt-24 pb-20">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div key={selected} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SectionHeading eyebrow={`${list.length} items`} title={selected} to={`/products?category=${selected}`} linkLabel="Open in shop" />
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} reveal />)}
              </div>
            </motion.div>
          ) : (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-3xl border border-dashed border-ink/20 py-12 text-center text-ink/55">
              Select a category above to view its products.
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
