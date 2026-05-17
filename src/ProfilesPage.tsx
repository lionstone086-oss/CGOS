import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  FileText,
  Star,
  Zap,
  Building2,
  Phone
} from 'lucide-react';

const leaders = [
  {
    id: 1,
    name: "Hon. Jane Wairimu",
    role: "County Governor",
    district: "Ol Kalou Region",
    promises: 24,
    completed: 18,
    budget: "KES 4.2B",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    projects: ["Ward Hospital Phase 2", "Market Road Upgrade"]
  },
  {
    id: 2,
    name: "Hon. Samuel Mwangi",
    role: "Member of Parliament",
    district: "Nyandarua Central",
    promises: 12,
    completed: 4,
    budget: "KES 140M (CDF)",
    rating: 2.8,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    projects: ["Primary School Library", "Borehole Project"]
  },
  {
    id: 3,
    name: "Hon. Grace Njeri",
    role: "Member of County Assembly",
    district: "Kaimbaga Ward",
    promises: 8,
    completed: 7,
    budget: "KES 20M (Ward Fund)",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    projects: ["Street Lighting Ward-wide", "Youth Center Rehab"]
  }
];

export const ProfilesPage = () => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em]">
             <ShieldCheck size={14} />
             Leadership Accountability Index
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Official Profiles</h1>
          <p className="text-slate-500 italic font-medium">Public performance tracking for every elected leader. No hiding, just data.</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm">
              Total Monitored: 842
           </div>
           <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg">
              Live Q&A Active
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {leaders.map((leader, i) => (
          <motion.div
            key={leader.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="relative h-48">
               <img src={leader.image} alt={leader.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent pt-32 px-6">
                  <div className="flex justify-between items-end">
                     <div className="bg-emerald-500 text-slate-900 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                        Verified Official
                     </div>
                     <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold">
                        <Star size={10} className="fill-current" />
                        {leader.rating}
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 space-y-6">
               <div className="space-y-1">
                  <h3 className="text-2xl font-bold uppercase italic tracking-tight">{leader.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                     <Building2 size={12} />
                     {leader.role} • {leader.district}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Promises Made</p>
                     <div className="flex items-end justify-between">
                        <span className="text-xl font-bold font-mono">{leader.promises}</span>
                        <TrendingUp size={16} className="text-slate-300" />
                     </div>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                     <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Fulfilled</p>
                     <div className="flex items-end justify-between">
                        <span className="text-xl font-bold font-mono text-emerald-700">{leader.completed}</span>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-white p-3 rounded-xl shadow-lg">
                     <div className="flex items-center gap-2 italic">
                        <Zap size={14} className="text-emerald-400" />
                        Budget Controlled
                     </div>
                     <span className="font-mono text-emerald-400">{leader.budget}</span>
                  </div>

                  <div className="space-y-2">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Active Projects</p>
                     {leader.projects.map((p, pi) => (
                        <div key={pi} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-[10px] font-bold border border-slate-100 group-hover:border-emerald-200 transition-colors">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                           {p}
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95">
                     View Contract
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                     <MessageSquare size={18} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden flex flex-col items-center text-center space-y-8"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Building2 size={300} />
        </div>
        <div className="flex flex-col items-center gap-4 relative z-10">
           <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-2xl">
              <ShieldCheck size={32} />
           </div>
           <h2 className="text-5xl font-black leading-none uppercase italic tracking-tighter">
              Can't find your representative?
           </h2>
           <p className="max-w-2xl text-xl text-slate-400 font-medium italic">
             "Our node network is currently mapping local official data. Verified citizens can submit new official profiles for verification."
           </p>
           <button className="mt-4 px-12 py-5 bg-emerald-500 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-500/40 hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95">
              Submit Official Record
           </button>
        </div>
      </motion.div>
    </div>
  );
};
