import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User } from 'lucide-react';
import { auth, googleProvider, signInWithPopup } from '../firebase';

export default function Header({ user, cartCount }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="relative w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="ค้นหาหนังสือที่คุณต้องการ..."
          onClick={() => navigate('/search')}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all cursor-pointer"
          readOnly
        />
      </div>

      <div className="flex items-center gap-6">
        <Link to="/cart" className="flex items-center gap-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">ตะกร้าสินค้าของคุณ</p>
            <p className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">{cartCount} รายการ</p>
          </div>
          <div className="relative p-2.5 bg-slate-100 rounded-xl group-hover:bg-sky-50 transition-colors">
            <ShoppingCart className="w-5 h-5 text-slate-600 group-hover:text-sky-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
        
        {!user && (
          <button 
            onClick={handleLogin}
            className="flex items-center gap-2 pp-btn-primary py-2.5"
          >
            <User className="w-4 h-4" />
            Login
          </button>
        )}
      </div>
    </header>
  );
}
