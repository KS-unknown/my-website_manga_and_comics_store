import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search as SearchIcon, Settings, Info, HelpCircle } from 'lucide-react';
import { signOut, auth } from '../firebase';

export default function Sidebar({ user }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'หน้าแรก & สินค้า', icon: Home },
    { path: '/search', label: 'ค้นหา & ชำระเงิน', icon: SearchIcon },
    { path: '/management', label: 'จัดการร้านค้า', icon: Settings },
    { path: '/about', label: 'ผู้พัฒนา & ติดต่อ', icon: Info },
    { path: '/faq', label: 'คำถามที่พบบ่อย (FAQ)', icon: HelpCircle },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="w-64 bg-slate-900 h-screen fixed inset-y-0 left-0 flex flex-col p-6 text-slate-50 z-50">
      <div className="text-xl font-extrabold mb-12 tracking-tight">
        BOOKSTORE<span className="text-sky-400">.</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`pp-sidebar-item ${isActive ? 'active' : 'hover:bg-slate-800/50 hover:text-white'}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="mt-auto pt-6 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Logged in via Google</p>
          <div className="flex items-center gap-3 group">
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="w-10 h-10 rounded-full border-2 border-slate-700 bg-slate-800"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{user.displayName || user.email}</p>
              <button 
                onClick={handleLogout}
                className="text-[10px] text-slate-400 hover:text-sky-400 transition-colors uppercase font-bold"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
