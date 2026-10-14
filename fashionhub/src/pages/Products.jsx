import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchX, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { collections, PRICE_RANGES, products } from '../data/products';

/**
 * Products – search, category + price filters, sorting and reset.
 * Filter state lives in the URL (?q=&category=&price=&sort=&collection=) so
 * links from other pages (Categories, Collections, Footer) work automatically.
 */
export default function Products() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const price = params.get('price') || 'all';
  const sort = params.get('sort') || 'featured';
  const collectionId = params.get('collection') || '';
  const collection = collections.find((c) => c.id === collectionId);

  const setParam = (key, value, fallback = '') => {
    const next = new URLSearchParams(params);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const resetFilters = () => setParams({}, { replace: true });
  const hasFilters = Boolean(q || category || collectionId || price !== 'all' || sort !== 'featured');

  const results = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === price) || PRICE_RANGES[0];
    const term = q.trim().toLowerCase();
    let list = products.filter((p) =>
      (!term || p.name.toLowerCase().includes(term)) &&
      (!category || p.category === category) &&
      (!collectionId || p.collections.includes(collectionId)) &&
      p.price >= range.min && p.price < range.max
    );
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, category, price, sort, collectionId]);

  return (
    <>
      <PageHeader eyebrow="Shop" title={collection ? collection.title : 'All products'} subtitle={collection ? collection.description : 'Search, filter and sort to find your next favourite piece.'} />

      <section className="section !pt-10 container-x">
        <div className="space-y-5">
          <SearchBar value={q} onChange={(v) => setParam('q', v)} />
          <FilterBar
            category={category} price={price} sort={sort}
            onCategory={(v) => setParam('category', v)}
            onPrice={(v) => setParam('price', v, 'all')}
            onSort={(v) => setParam('sort', v, 'featured')}
            onReset={resetFilters} hasFilters={hasFilters}
          />
        </div>

        <div className="mb-6 mt-8 flex flex-wrap items-center gap-3">
          <p className="text-sm text-ink/60" aria-live="polite">
            Showing <strong className="text-ink">{results.length}</strong> of {products.length} products
          </p>
          {collection && (
            <button type="button" onClick={() => setParam('collection', '')} className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-3 py-1.5 text-xs font-semibold text-clay-dark hover:bg-clay/20">
              {collection.title} <X size={13} />
            </button>
          )}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </AnimatePresence>
        </motion.div>

        {results.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9, rotateX: -20 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} style={{ transformPerspective: 800 }} className="mx-auto max-w-md rounded-3xl bg-white px-6 py-14 text-center shadow-card">
            <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-sand text-clay"><SearchX size={28} /></span>
            <h2 className="text-2xl font-semibold">No products found</h2>
            <p className="mt-2 text-sm text-ink/60">Try a different search term or adjust your filters.</p>
            <Button onClick={resetFilters} className="mt-6">Reset Filters</Button>
          </motion.div>
        )}
      </section>
    </>
  );
}
