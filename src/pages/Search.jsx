import React, { useState, useMemo } from 'react';
import { MOCK_BOOKS, CATEGORIES } from '../types';
import { Search as SearchIcon, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Search({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("title");

  const filteredBooks = useMemo(() => {
    let result = MOCK_BOOKS.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "title") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title, 'th', { numeric: true }));
}

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ค้นหา & ชำระเงิน</h1>
          <p className="text-sm text-slate-500 font-medium">Browse our full catalog and manage your selections.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-100 text-xs font-bold text-slate-600 appearance-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">เรียงตาม ชื่อเรื่อง</option>
            <option value="price-low">เรียงตาม ราคา: น้อยไปมาก</option>
            <option value="price-high">เรียงตาม ราคา: มากไปน้อย</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Panel */}
        <div className="w-full lg:w-56 flex-shrink-0">
          <div className="pp-card p-4 space-y-6 sticky top-24">
            <div>
              <div className="flex items-center gap-2 mb-4 text-slate-900">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Categories</h3>
              </div>
              <div className="space-y-1">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${!selectedCategory ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  All Books
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                 <SearchIcon className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Filter Search</span>
              </div>
              <input 
                type="text"
                placeholder="Keyword..."
                className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 space-y-6">
          {filteredBooks.length === 0 ? (
            <div className="h-64 pp-card flex flex-col items-center justify-center space-y-4 text-slate-400">
              <SearchIcon className="w-8 h-8 opacity-20" />
              <p className="text-sm font-medium">ไม่พบหนังสือที่คุณต้องการ</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                className="text-xs font-bold text-sky-500 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBooks.map((book) => (
                <motion.div
                  layout
                  key={book.id}
                  className="pp-card p-3 hover:border-sky-100 hover:shadow-md transition-all group"
                >
                  <Link to={`/product/${book.id}`} className="aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-slate-50 block">
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="space-y-1">
                    <h3 className="font-bold text-xs text-slate-900 truncate">{book.title}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{book.author}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-extrabold text-slate-600">฿{book.price.toLocaleString()}</span>
                      <button 
                        onClick={() => onAddToCart(book)}
                        className="p-1.5 bg-slate-50 text-slate-400 hover:bg-sky-500 hover:text-white rounded-lg transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
