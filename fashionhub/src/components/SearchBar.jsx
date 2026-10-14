import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <label htmlFor="product-search" className="sr-only">Search products by name</label>
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/45" />
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products by name…"
        className="field !rounded-full !py-3.5 !pl-11 !pr-11 shadow-card [&::-webkit-search-cancel-button]:hidden"
        autoComplete="off"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-ink/10" aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
