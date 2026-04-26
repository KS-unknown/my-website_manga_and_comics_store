import React, { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout({ cart, onClearCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'bank'
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    onClearCart();
  };

  if (isSuccess) {
    return (
      <div className="p-8 h-[calc(100vh-120px)] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pp-card p-12 text-center space-y-6 max-w-sm"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Order Complete</h2>
            <p className="text-slate-500 text-sm">Thank you for shopping with Manga & Comics. Your literary escape is being prepared!</p>
          </div>
          <Link 
            to="/"
            className="inline-block pp-btn-primary px-8 py-3.5 text-xs"
          >
            Return to Library
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
         <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ชำระเงิน</h1>
         <p className="text-sm text-slate-500 font-medium">Step {step} of 2: {step === 1 ? 'Shipping' : 'Payment'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="pp-card p-8 space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-bold">1</div>
                  <h2 className="font-bold text-slate-900">Shipping Details</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sky-200"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      required
                      type="email"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sky-200"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivery Address</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sky-200"
                    placeholder="Street, City, Postal Code"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button 
                    type="button"
                    onClick={handleNext}
                    className="pp-btn-primary px-10 py-4 text-xs font-bold flex items-center gap-2 group"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="pp-card p-8 space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-bold">2</div>
                  <h2 className="font-bold text-slate-900">Payment Selection</h2>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Method</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: 'bank'})}
                      className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${formData.paymentMethod === 'bank' ? 'border-sky-500 bg-sky-50/10' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${formData.paymentMethod === 'bank' ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>
                           <Truck className="w-4 h-4" />
                         </div>
                         <span className="text-xs font-bold text-slate-900">Bank Transfer</span>
                      </div>
                      {formData.paymentMethod === 'bank' && <CheckCircle className="w-4 h-4 text-sky-500" />}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: 'promptpay'})}
                      className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${formData.paymentMethod === 'promptpay' ? 'border-sky-500 bg-sky-50/10' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${formData.paymentMethod === 'promptpay' ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>
                           <CreditCard className="w-4 h-4" />
                         </div>
                         <span className="text-xs font-bold text-slate-900">PromptPay</span>
                      </div>
                      {formData.paymentMethod === 'promptpay' && <CheckCircle className="w-4 h-4 text-sky-500" />}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instructions</h4>
                   <p className="text-xs text-slate-600 leading-relaxed">
                     Please transfer the final amount to <strong>Kasikorn Bank: 123-4-56789-0</strong>. Once payment is made, keep your slip as proof of purchase.
                   </p>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Shipping
                  </button>
                  <button 
                    type="submit"
                    className="pp-btn-primary px-10 py-4 text-xs font-bold"
                  >
                    Complete Purchase ฿{total.toLocaleString()}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Mini Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="pp-card p-6 divide-y divide-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Cart Glance</h3>
            <div className="py-4 space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 line-clamp-1 flex-1 pr-4">{item.title}  x{item.quantity}</span>
                  <span className="text-slate-900 font-bold">฿{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="py-4 space-y-2">
               <div className="flex justify-between text-xs">
                 <span className="text-slate-400">Shipping</span>
                 <span className="text-slate-900 font-bold">{shipping === 0 ? 'Free' : `฿${shipping}`}</span>
               </div>
               <div className="flex justify-between text-base pt-2">
                 <span className="font-bold text-slate-900">Total</span>
                 <span className="font-extrabold text-sky-500">฿{total.toLocaleString()}</span>
               </div>
            </div>
            <div className="pt-4 flex items-center gap-2 text-[10px] text-slate-400">
               <ShieldCheck className="w-4 h-4 text-sky-500" />
               100% Secure Payment Protocol
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
