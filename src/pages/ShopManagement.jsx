import React, { useState } from 'react';
import { CreditCard, ShoppingBag, FileText, Info, Save, Trash2, Camera, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function ShopManagement() {
  const [activeTab, setActiveTab] = useState('shop-info');
  const [shopData, setShopData] = useState({
    name: 'Manga & Comics Store',
    description: 'We are a boutique bookstore dedicated to bringing the best literature to your home. Established in 2026, our mission is to foster a love for reading across all generations.',
    paymentMethods: [
      { id: '1', type: 'Bank Transfer', details: 'Kasikorn Bank (K-Bank) - 123-4-56789-0' },
      { id: '2', type: 'PromptPay', details: '081-234-5678' }
    ],
    orderingInstructions: 'Simply browse our catalog, add books to your basket, and follow the secure checkout process. Once payment is confirmed, we will dispatch your books within 24-48 hours.'
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  }

  const sidebarItems = [
    { id: 'shop-info', label: 'Shop Details', icon: Info },
    { id: 'payments', label: 'Payment Channels', icon: CreditCard },
    { id: 'orders', label: 'Order Logic', icon: ShoppingBag },
    { id: 'content', label: 'Help Articles', icon: FileText },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">⚙️ จัดการร้านค้า</h1>
        <p className="text-sm text-slate-500 font-medium">Configure your store settings, payment methods, and policies.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Management Nav */}
        <div className="w-full lg:w-64 space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3.5 rounded-xl text-xs font-bold transition-all border ${activeTab === item.id ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-sky-500' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <div className="pp-card p-8">
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
               <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 {activeTab === 'shop-info' && <Info className="w-5 h-5 text-sky-500" />}
                 {activeTab === 'payments' && <CreditCard className="w-5 h-5 text-sky-500" />}
                 {sidebarItems.find(i => i.id === activeTab)?.label}
               </h2>
               <button 
                  onClick={handleSave}
                  className="pp-btn-primary flex items-center gap-2 text-xs"
               >
                  <Save className="w-4 h-4" />
                  Save Changes
               </button>
            </header>

            {activeTab === 'shop-info' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shop Name</label>
                    <input 
                      type="text" 
                      value={shopData.name}
                      onChange={(e) => setShopData({...shopData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sky-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Domain Alias</label>
                    <div className="flex">
                      <span className="bg-slate-100 px-3 border border-r-0 border-slate-100 rounded-l-xl flex items-center text-[10px] text-slate-400 font-bold uppercase">Bookstore.com/</span>
                      <input 
                        type="text" 
                        value="store"
                        readOnly
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-r-xl text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shop Description</label>
                  <textarea 
                    rows={4}
                    value={shopData.description}
                    onChange={(e) => setShopData({...shopData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sky-200"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 p-8 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-100 transition-all cursor-pointer group">
                    <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Update Banner</span>
                  </div>
                  <div className="flex-1 p-8 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-100 transition-all cursor-pointer group">
                    <Globe className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">SEO Settings</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {shopData.paymentMethods.map(pm => (
                  <div key={pm.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <CreditCard className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{pm.type}</h4>
                        <p className="text-[11px] font-medium text-slate-500">{pm.details}</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-red-500 transition-opacity opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button className="w-full p-4 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 hover:border-sky-100 transition-all">
                  + Add New Method
                </button>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer Viewable Instructions</label>
                  <textarea 
                    rows={6}
                    value={shopData.orderingInstructions}
                    onChange={(e) => setShopData({...shopData, orderingInstructions: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sky-200"
                  />
                </div>
              </motion.div>
            )}
            
            {activeTab === 'content' && (
              <div className="h-64 flex flex-col items-center justify-center text-slate-300 space-y-4">
                 <FileText className="w-12 h-12 opacity-10" />
                 <p className="text-xs font-bold uppercase tracking-widest">Editor Coming Soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
