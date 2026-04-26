import React from 'react';

export default function Footer() {
  return (
    <footer className="h-10 bg-slate-50 border-t border-slate-200 flex items-center justify-between px-8 text-[11px] text-slate-500 font-medium">
      <div>
        © 2026 Bookstore Application | พัฒนาโดย: <b className="text-slate-800">Kittiphat Sontipong</b> (Contact: 66113041@dpu.ac.th)
      </div>
      <div className="flex gap-6 uppercase tracking-wider font-bold">
        <a href="#" className="hover:text-slate-900 transition-colors">เงื่อนไขการใช้งาน</a>
        <a href="#" className="hover:text-slate-900 transition-colors">นโยบายความเป็นส่วนตัว</a>
      </div>
    </footer>
  );
}
