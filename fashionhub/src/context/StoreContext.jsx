import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProductById } from '../data/products';

const StoreContext = createContext(null);

const CART_KEY = 'fashionhub_cart';
const WISHLIST_KEY = 'fashionhub_wishlist';
const FREE_SHIPPING_AT = 150;
const SHIPPING_FEE = 9.99;

// Safely read an array from localStorage (handles blocked storage / bad JSON).
const load = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

export const lineKey = (line) => `${line.id}-${line.size}-${line.color}`;

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load(CART_KEY));
  const [wishlist, setWishlist] = useState(() => load(WISHLIST_KEY));
  const [toasts, setToasts] = useState([]);

  // Persist whenever the data changes
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* storage unavailable */ }
  }, [cart]);
  useEffect(() => {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); } catch { /* storage unavailable */ }
  }, [wishlist]);

  // ----------------------------------------------------------------- toasts
  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const notify = useCallback((message, tone = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, message, tone }]);
    setTimeout(() => dismissToast(id), 2800);
  }, [dismissToast]);

  // ------------------------------------------------------------------- cart
  const addToCart = useCallback(({ id, size, color, qty = 1 }) => {
    setCart((prev) => {
      const key = lineKey({ id, size, color });
      const exists = prev.some((l) => lineKey(l) === key);
      return exists
        ? prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l))
        : [...prev, { id, size, color, qty }];
    });
  }, []);

  const updateQty = useCallback((key, delta) => {
    setCart((prev) =>
      prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.max(1, Math.min(10, l.qty + delta)) } : l))
    );
  }, []);

  const removeFromCart = useCallback((key) => setCart((prev) => prev.filter((l) => lineKey(l) !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  // --------------------------------------------------------------- wishlist
  const isWished = useCallback((id) => wishlist.includes(id), [wishlist]);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const removeFromWishlist = useCallback((id) => setWishlist((prev) => prev.filter((x) => x !== id)), []);

  const moveToCart = useCallback((id) => {
    const product = getProductById(id);
    if (!product) return;
    const size = product.sizes[Math.floor((product.sizes.length - 1) / 2)];
    const color = product.colors[0].name;
    addToCart({ id, size, color, qty: 1 });
    removeFromWishlist(id);
    return { size, color };
  }, [addToCart, removeFromWishlist]);

  // ----------------------------------------------------------------- totals
  const totals = useMemo(() => {
    const items = cart.reduce((n, l) => n + l.qty, 0);
    const subtotal = cart.reduce((sum, l) => sum + (getProductById(l.id)?.price || 0) * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
    return { items, subtotal, shipping, total: subtotal + shipping };
  }, [cart]);

  const value = {
    cart, wishlist, toasts, totals, FREE_SHIPPING_AT,
    addToCart, updateQty, removeFromCart, clearCart,
    isWished, toggleWishlist, removeFromWishlist, moveToCart,
    notify, dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a StoreProvider');
  return ctx;
}
