import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Cart({ cart, onUpdateQuantity, onRemove }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="p-8 h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
            <ShoppingCart className="w-8 h-8 text-slate-200" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">ตะกร้าสินค้ายังว่างอยู่</h2>
            <p className="text-slate-500 text-sm">เริ่มต้นเลือกหนังสือที่น่าสนใจเพื่อเข้าสู่คอลเลกชันของคุณ</p>
          </div>
          <Link 
            to="/search"
            className="inline-block pp-btn-primary px-8 py-3.5 text-xs"
          >
            ไปที่ร้านค้า
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ตะกร้าสินค้า</h1>
          <p className="text-sm text-slate-500 font-medium">{cart.length} items in your basket</p>
        </div>
        <Link to="/search" className="text-xs font-bold text-sky-500 hover:underline flex items-center gap-1">
          <Plus className="w-3 h-3" /> เพิ่มสินค้าอื่น
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="pp-card p-4 flex gap-6 group"
            >
              <div className="w-20 h-28 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{item.title}</h3>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.author}</p>
                </div>
                
                <div className="flex justify-between items-end pt-4">
                  <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-100">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-6 text-center text-slate-700">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="font-extrabold text-slate-900 text-sm">฿{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="pp-card p-6 space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="text-slate-900 font-bold">฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Shipping</span>
                <span className={shipping === 0 ? "text-green-500 font-bold" : "text-slate-900 font-bold"}>
                  {shipping === 0 ? "FREE" : `฿${shipping.toLocaleString()}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-slate-400 text-center bg-slate-50 py-1 rounded">
                   Add ฿{(1001 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Total</span>
                <span className="text-xl font-extrabold text-sky-500">฿{total.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full pp-btn-primary py-4 text-xs flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100 italic">
               <div className="flex items-center gap-2 text-[10px] text-slate-400">
                 <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                 Securely processed by Manga & Comics POS
               </div>
               <div className="flex items-center gap-2 text-[10px] text-slate-400">
                 <Truck className="w-3.5 h-3.5 text-sky-500" />
                 Estimated Delivery: 2-4 business days
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
