import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { auth, onAuthStateChanged } from "./firebase";

// Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ShopManagement from "./pages/ShopManagement";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Cart Functions
  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => 
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-900 uppercase tracking-tighter">
            BS
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-slate-100">
      <ScrollToTop />
      
      {/* Fixed Sidebar */}
      <Sidebar user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 min-w-0 h-full relative">
        <Header user={user} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="min-h-[calc(100vh-112px)]"> {/* 72px header + 40px footer approx */}
            <Routes>
              <Route path="/" element={<Home onAddToCart={addToCart} />} />
              <Route path="/search" element={<Search onAddToCart={addToCart} />} />
              <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} onClearCart={clearCart} />} />
              <Route path="/management" element={<ShopManagement />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
