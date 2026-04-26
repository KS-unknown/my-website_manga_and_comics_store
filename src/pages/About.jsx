import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Code2, Heart, Rocket, Send } from 'lucide-react';

export default function About() {
  const developers = [
    {
      name: "Kittiphat Sontipong",
      role: "Lead Fullstack Developer",
      bio: "Passionate about building scalable web applications and intuitive user experiences. Love reading Sci-fi and Tech journals.",
      avatar: "https://picsum.photos/seed/dev1/200/200",
      social: { linkedin: "#", github: "#" }
    }
  ];

  return (
    <div className="p-8 space-y-12">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">เกี่ยวกับผู้พัฒนา</h1>
        <p className="text-sm text-slate-500 font-medium">Created by manga lovers, for manga lovers. Meet the team behind Manga & Comics.</p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-4">
          <div className="pp-card p-8 text-center space-y-6">
            <div className="relative inline-block">
               <img 
                 src={developers[0].avatar} 
                 alt={developers[0].name} 
                 className="w-24 h-24 rounded-full mx-auto grayscale-[0.5] hover:grayscale-0 transition-all border-2 border-slate-50"
               />
               <div className="absolute -bottom-1 -right-1 p-1.5 bg-slate-900 text-white rounded-lg shadow-sm">
                 <Code2 className="w-3.5 h-3.5" />
               </div>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900">{developers[0].name}</h3>
              <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">{developers[0].role}</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              "{developers[0].bio}"
            </p>
            <div className="flex justify-center gap-3 pt-4 border-t border-slate-100">
               <a href="#" className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <Github className="w-4 h-4" />
               </a>
               <a href="#" className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
                  <Linkedin className="w-4 h-4" />
               </a>
               <a href="#" className="p-2 text-slate-400 hover:text-sky-400 transition-colors">
                  <Twitter className="w-4 h-4" />
               </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="pp-card p-4 flex flex-col items-center justify-center text-center space-y-2">
               <Heart className="w-5 h-5 text-red-400" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Values</span>
            </div>
            <div className="pp-card p-4 flex flex-col items-center justify-center text-center space-y-2">
               <Rocket className="w-5 h-5 text-sky-400" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quality</span>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="lg:col-span-8">
          <div className="pp-card p-8 lg:p-12 space-y-12">
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="space-y-6 flex-1">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-sky-500" /> Get in Touch
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    66113041@dpu.ac.th
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    +66 (0) 2 123 4567
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    Bangkok, Thailand
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</label>
                    <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                    <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiry Message</label>
                  <textarea rows={4} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-200" />
                </div>
                <button className="w-full pp-btn-primary py-3.5 text-xs flex items-center justify-center gap-2 group">
                  <Send className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  ส่งข้อความ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
