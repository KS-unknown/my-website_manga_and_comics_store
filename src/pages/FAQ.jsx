import React, { useState } from 'react';
import { Search as SearchIcon, ChevronDown, ChevronUp, BookOpen, Truck, CreditCard, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQ_DATA = [
  {
    category: 'Ordering',
    icon: BookOpen,
    questions: [
      { q: 'ฉันจะสั่งซื้อหนังสือได้อย่างไร?', a: 'คุณสามารถเลือกหนังสือที่ต้องการลงในตะกร้าสินค้า และดำเนินการชำระเงินตามขั้นตอนในหน้า Checkout ได้เลยค่ะ' },
      { q: 'สามารถยกเลิกคำสั่งซื้อได้หรือไม่?', a: 'หากสินค้ายังไม่ถูกจัดส่ง คุณสามารถแจ้งยกเลิกได้ผ่านทางหน้าติดต่อเรา มมโดยระบุหมายเลขคำสั่งซื้อค่ะ' }
    ]
  },
  {
    category: 'Shipping',
    icon: Truck,
    questions: [
      { q: 'ใช้เวลานานเท่าไหร่ในการจัดส่ง?', a: 'สำหรับกรุงเทพฯ และปริมณฑล ใช้เวลา 1-2 วันทำการ ส่วนต่างจังหวัดใช้เวลา 2-4 วันทำการค่ะ' },
      { q: 'ค่าจัดส่งราคาเท่าไหร่?', a: 'ค่าจัดส่งเริ่มต้นที่ 50 บาท แต่สั่งซื้อครบ 1,000 บาทขึ้นไป จัดส่งฟรีทั่วประเทศค่ะ' }
    ]
  },
  {
      category: "Payments",
      icon: CreditCard,
      questions: [
        { q: "ช่องทางการชำระเงินมีอะไรบ้าง?", a: "เรารองรับการชำระเงินผ่านบัตรเครดิต/เดบิต, PromptPay และการโอนเงินผ่านธนาคาร (กสิกรไทย, ไทยพาณิยพ์) ค่ะ" },
        { q: "การชำระเงินออนไลน์ปลอดภัยหรือไม่?", a: "ปลอดภัยแน่นอนค่ะ เราใช้ระบบเข้ารหัส SSL มาตรฐานสากลและระบบชำระเงินที่มีความปลอดภัยสูงเพื่อปกป้องข้อมูลทางการเงินของคุณ" }
      ]
  },
  {
      category: "Returns",
      icon: RefreshCw,
      questions: [
        { q: "นโยบายการคืนสินค้าเป็นอย่างไร?", a: "เรามีนโยบายคืนสินค้าภายใน 7 วันหากหนังสือชำรุดจากการขนส่งหรือได้รับสินค้าไม่ถูกต้อง โดยสินค้าต้องอยู่ในสภาพเดิมค่ะ" }
      ]
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState('0-0');

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const filteredFaqs = FAQ_DATA.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="p-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">คำถามที่พบบ่อย (FAQ)</h1>
        <p className="text-sm text-slate-500 font-medium">Everything you need to know about shopping at BookHaven.</p>
      </div>

      <div className="relative max-w-xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input 
          type="text"
          placeholder="Search for answers..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredFaqs.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <cat.icon className="w-4 h-4 text-sky-500" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{cat.category}</h3>
            </div>
            <div className="space-y-3">
              {cat.questions.map((item, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                const isOpen = openIndex === id;
                return (
                  <div key={qIdx} className="pp-card border-slate-100 p-0 overflow-hidden">
                    <button 
                      onClick={() => toggle(id)}
                      className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm font-bold text-slate-700">{item.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-sm text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="lg:col-span-2 text-center py-12 text-slate-400 text-sm italic">
            No questions found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
