import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ShoppingBag, Trash2, Truck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProductImage from '../components/ProductArt';
import QuantityControl from '../components/QuantityControl';
import Button from '../components/Button';
import Cube3D from '../components/Cube3D';
import { EmptyState } from './Wishlist';
import { lineKey, useStore } from '../context/StoreContext';
import { formatPrice, getProductById } from '../data/products';

function CheckoutModal({ total, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        role="dialog" aria-modal="true" aria-labelledby="checkout-title"
        initial={{ opacity: 0, scale: 0.7, rotateX: -35, y: 60 }} animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 30 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }} style={{ transformPerspective: 900 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lift" onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 flex justify-center">
          <Cube3D size={64} spin="y" duration={6} faceClass="border border-white/40 bg-emerald-600/90 text-white" labels={Array(6).fill(<Check size={26} />)} />
        </div>
        <h2 id="checkout-title" className="text-3xl font-semibold">Thank you!</h2>
        <p className="mt-3 text-ink/65">Your demo order of <strong>{formatPrice(total)}</strong> was placed successfully.</p>
        <p className="mt-2 text-xs text-ink/45">This is a frontend-only demo – no payment or order was processed.</p>
        <Button onClick={onClose} className="mt-7 w-full" autoFocus>Continue shopping</Button>
      </motion.div>
    </motion.div>
  );
}

export default function Cart() {
  const { cart, totals, updateQty, removeFromCart, clearCart, notify, FREE_SHIPPING_AT } = useStore();
  const [done, setDone] = useState(null);

  const lines = cart.map((l) => ({ ...l, product: getProductById(l.id) })).filter((l) => l.product);
  const progress = Math.min(100, (totals.subtotal / FREE_SHIPPING_AT) * 100);

  const checkout = () => {
    setDone(totals.total);
    clearCart();
  };

  return (
    <>
      <PageHeader eyebrow="Shopping Cart" title="Your bag" subtitle={lines.length ? `${totals.items} ${totals.items === 1 ? 'item' : 'items'} ready for checkout.` : 'Nothing here yet – let’s change that.'} />
      <section className="section !pt-10 container-x">
        {lines.length === 0 ? (
          <EmptyState icon={ShoppingBag} title="Your cart is empty" text="Add a few pieces you love and they’ll appear here." cta="Start shopping" to="/products" />
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
            <motion.ul layout className="space-y-4">
              <AnimatePresence mode="popLayout">
                {lines.map((l) => {
                  const key = lineKey(l);
                  const hex = l.product.colors.find((c) => c.name === l.color)?.hex || l.product.colors[0].hex;
                  return (
                    <motion.li key={key} layout initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 120, rotateZ: 4 }} transition={{ duration: 0.35 }} className="flex gap-4 rounded-2xl bg-white p-3 shadow-card sm:gap-6 sm:p-4">
                      <Link to={`/products/${l.id}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-32" aria-label={l.product.name}>
                        <ProductImage type={l.product.type} color={hex} />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link to={`/products/${l.id}`} className="line-clamp-1 font-display text-lg font-semibold hover:text-clay">{l.product.name}</Link>
                            <p className="mt-1 flex items-center gap-2 text-sm text-ink/60">
                              <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: hex }} /> {l.color} · {l.size}
                            </p>
                            <p className="mt-1 text-sm font-semibold">{formatPrice(l.product.price)}</p>
                          </div>
                          <motion.button whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.15 }} onClick={() => { removeFromCart(key); notify(`${l.product.name} removed from cart`); }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/50 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${l.product.name} from cart`}>
                            <Trash2 size={17} />
                          </motion.button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <QuantityControl small value={l.qty} onChange={(v) => updateQty(key, v - l.qty)} />
                          <p className="font-bold">{formatPrice(l.product.price * l.qty)}</p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>

            <aside aria-label="Order summary" className="rounded-3xl bg-white p-6 shadow-card lg:sticky lg:top-28">
              <h2 className="text-2xl font-semibold">Order summary</h2>

              <div className="mt-5 rounded-2xl bg-sand/70 p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Truck size={16} className="text-clay" />
                  {totals.subtotal >= FREE_SHIPPING_AT ? 'You’ve unlocked free shipping!' : `Add ${formatPrice(FREE_SHIPPING_AT - totals.subtotal)} more for free shipping`}
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <motion.div className="h-full rounded-full bg-clay" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} />
                </div>
              </div>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-ink/65">Subtotal</dt><dd className="font-semibold">{formatPrice(totals.subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink/65">Shipping</dt><dd className="font-semibold">{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</dd></div>
                <div className="flex items-baseline justify-between border-t border-ink/10 pt-4 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="relative h-8 overflow-hidden text-2xl font-bold">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span key={totals.total} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} transition={{ duration: 0.25 }} className="block">{formatPrice(totals.total)}</motion.span>
                    </AnimatePresence>
                  </dd>
                </div>
              </dl>

              <Button onClick={checkout} className="mt-6 w-full !py-4">Checkout</Button>
              <p className="mt-3 text-center text-xs text-ink/45">Demo checkout – no real payment is taken.</p>
              <button onClick={() => { clearCart(); notify('Cart cleared'); }} className="mt-4 w-full text-center text-xs font-semibold text-ink/50 underline hover:text-clay">Clear cart</button>
            </aside>
          </div>
        )}
      </section>

      <AnimatePresence>{done != null && <CheckoutModal total={done} onClose={() => setDone(null)} />}</AnimatePresence>
    </>
  );
}
