import { useState } from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CATEGORY_NAMES, PRICE_RANGES } from '../data/products';

/** FilterBar – category, price range, sorting and Reset Filters. */
export default function FilterBar({ category, price, sort, onCategory, onPrice, onSort, onReset, hasFilters }) {
  const [open, setOpen] = useState(false);

  return (
    <section aria-label="Product filters" className="rounded-3xl bg-white p-4 shadow-card sm:p-6">
      <div className="flex items-center justify-between lg:hidden">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="inline-flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal size={16} /> Filters & sorting
        </button>
        {hasFilters && <button type="button" onClick={onReset} className="text-xs font-semibold text-clay underline">Reset</button>}
      </div>

      <div className={`${open ? 'mt-5 block' : 'hidden'} space-y-5 lg:mt-0 lg:block`}>
        <div>
          <h3 className="mb-2.5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Category</h3>
          <div className="flex flex-wrap gap-2">
            {['All', ...CATEGORY_NAMES].map((c) => {
              const active = (c === 'All' && !category) || c === category;
              return (
                <button key={c} type="button" aria-pressed={active} onClick={() => onCategory(c === 'All' ? '' : c)} className={`chip ${active ? 'chip-active' : ''}`}>{c}</button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h3 className="mb-2.5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Price range</h3>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((r) => (
                <button key={r.id} type="button" aria-pressed={price === r.id} onClick={() => onPrice(r.id)} className={`chip ${price === r.id ? 'chip-active' : ''}`}>{r.label}</button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div className="flex-1 sm:w-48">
              <label htmlFor="sort" className="mb-2.5 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => onSort(e.target.value)} className="field !py-2.5">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <button type="button" onClick={onReset} disabled={!hasFilters} className="btn btn-outline btn-sm !py-3 disabled:opacity-40">
              <RotateCcw size={14} /> Reset Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
