import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastHost from './components/ToastHost';
import PageTransition from './components/PageTransition';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import StyleGuide from './pages/StyleGuide';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const page = (element) => <PageTransition>{element}</PageTransition>;

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(<Home />)} />
        <Route path="/collections" element={page(<Collections />)} />
        <Route path="/products" element={page(<Products />)} />
        <Route path="/products/:id" element={page(<ProductDetails />)} />
        <Route path="/categories" element={page(<Categories />)} />
        <Route path="/wishlist" element={page(<Wishlist />)} />
        <Route path="/cart" element={page(<Cart />)} />
        <Route path="/style-guide" element={page(<StyleGuide />)} />
        <Route path="/about" element={page(<About />)} />
        <Route path="/contact" element={page(<Contact />)} />
        <Route path="*" element={page(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    // reducedMotion="user" respects the OS "reduce motion" setting for transform animations
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream">Skip to content</a>
        <Navbar />
        <main id="main" className="min-h-[70vh] overflow-x-clip">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ToastHost />
      </StoreProvider>
    </MotionConfig>
  );
}
