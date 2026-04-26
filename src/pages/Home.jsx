import React from 'react';
import { motion } from 'motion/react';
import { MOCK_BOOKS } from '../types';
import { ShoppingCart, Star, ArrowRight, BookOpen, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home({ onAddToCart }) {
  const featuredBooks = MOCK_BOOKS.slice(0, 4);

  return (
    <div className="p-8 space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 min-h-[400px] flex items-center px-12 group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10" />
        <img 
          src="https://yellow-important-reindeer-810.mypinata.cloud/ipfs/bafybeigk6k3jnw4oxaxlrjd2wltkyq4aqg7622bdva2xcj4ngio7di4o4e" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          alt="Bookshelf"
        />
        
        <div className="relative z-20 max-w-lg space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
             <span className="pp-badge bg-sky-500/10 text-sky-400 border-sky-500/20 px-3 py-1 mb-2">Editor Choice</span>
             <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
               Discover Your Next <br /> <span className="text-sky-500">Literary Escape.</span>
             </h1>
             <p className="text-slate-400 text-sm mt-4 leading-relaxed max-w-sm">
               Explore thousands of titles from timeless classics to modern masterpieces, all curated for curious minds.
             </p>
          </motion.div>
          <div className="flex gap-4 pt-4">
             <Link to="/search" className="pp-btn-primary px-8 py-3.5 text-xs">
                Explore Library
             </Link>
             <button className="px-8 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                Learn More
             </button>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">หนังสือแนะนำประจำสัปดาห์</h2>
            <p className="text-sm text-slate-500 font-medium">คัดสรรเรื่องราวที่ดีที่สุดเพื่อการเดินทางครั้งใหม่ของคุณ</p>
          </div>
          <Link to="/search" className="text-xs font-bold text-sky-500 flex items-center gap-1 group">
             View All <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="pp-card p-3 group hover:border-slate-200 transition-all">
                <Link to={`/product/${book.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-50 shadow-sm border border-slate-50">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2 scale-90 translate-x-12 group-hover:scale-100 group-hover:translate-x-0 transition-all">
                     <button className="p-2 bg-white/80 backdrop-blur-md rounded-lg text-slate-400 hover:text-red-500 shadow-sm">
                        <Heart className="w-4 h-4" />
                     </button>
                     <button 
                       onClick={(e) => { e.preventDefault(); onAddToCart(book); }}
                       className="p-2 bg-slate-900 rounded-lg text-white shadow-sm"
                     >
                        <ShoppingCart className="w-4 h-4" />
                     </button>
                  </div>
                </Link>
                <div className="mt-4 px-1 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors">{book.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-extrabold text-slate-900">฿{book.price.toLocaleString()}</span>
                    <div className="flex items-center gap-0.5">
                       <Star className="w-3 h-3 text-sky-400 fill-sky-400" />
                       <span className="text-[10px] font-bold text-slate-400">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="pp-card p-8 flex gap-5 items-start">
           <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-sky-500" />
           </div>
           <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Curated Library</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Handpicked collection from the world’s most renowned authors and independent publishers.</p>
           </div>
        </div>
        <div className="pp-card p-8 flex gap-5 items-start">
           <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-500" />
           </div>
           <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Swift Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Most orders are processed within 24 hours. Your reading schedule won’t be delayed.</p>
           </div>
        </div>
        <div className="pp-card p-8 flex gap-5 items-start bg-slate-900 text-white border-none">
           <div>
              <h3 className="font-bold">Join Community</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">Stay updated with our newsletter and exclusive literary events across the city.</p>
              <div className="flex gap-2">
                 <input className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-sky-500" placeholder="Email" />
                 <button className="pp-btn-primary px-4 py-1.5 text-[10px]">Invite</button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
