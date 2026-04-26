import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BOOKS } from '../types';
import { ShoppingCart, ArrowLeft, Star, Heart, Truck, ShieldCheck, CornerUpLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const book = MOCK_BOOKS.find(b => b.id === id);

  if (!book) {
    return (
      <div className="h-screen flex items-center justify-center p-8">
        <div className="text-center pp-card">
          <h2 className="text-lg font-bold mb-4">Book Not Found</h2>
          <Link to="/" className="text-sky-500 font-bold hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-5 lg:col-span-4"
        >
          <div className="pp-card p-2 aspect-[3/4] overflow-hidden">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-7 lg:col-span-8 flex flex-col gap-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="pp-badge">{book.category}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map(s => <Star key={s} className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />)}
                <Star className="w-3.5 h-3.5 text-slate-200 fill-slate-200" />
              </div>
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{book.title}</h1>
            <p className="text-slate-500 font-semibold">Written by <span className="text-slate-900">{book.author}</span></p>
          </div>

          <div className="pp-card bg-slate-50 border-none p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pricing</p>
              <span className="text-3xl font-extrabold text-slate-900">฿{book.price.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onAddToCart(book)}
                className="flex-1 sm:flex-none pp-btn-primary px-8 py-3.5 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button className="p-3.5 border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-100 transition-all bg-white">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">About this book</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              {book.description}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl">
              <Truck className="w-5 h-5 text-sky-500" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-800">Quick Ship</p>
                <p className="text-slate-400">2-3 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-800">Secure Play</p>
                <p className="text-slate-400">Encrypted</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl">
              <CornerUpLeft className="w-5 h-5 text-sky-500" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-800">Easy Returns</p>
                <p className="text-slate-400">7-day policy</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
