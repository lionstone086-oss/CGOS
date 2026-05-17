import React from "react";
import { History, Search, Filter, Bookmark, ArrowRight, Shield, Award, Landmark, Gavel } from "lucide-react";
import { motion } from "motion/react";

const ARCHIVES = [
  {
    year: "2024",
    title: "The Health Equity Decree",
    desc: "Constitutional ruling mandating the allocation of 15% budget to primary care. A landmark case in citizen-led fiscal litigation.",
    category: "Judicial Precedent",
    icon: Gavel
  },
  {
    year: "2023",
    title: "Regional Devolution Audit v2.0",
    desc: "National transition to a cryptographically verified procurement system following the 2022 corruption inquiry.",
    category: "Reform Milestone",
    icon: Shield
  },
  {
    year: "2010",
    title: "Supreme Constitution Enactment",
    desc: "The birth of the modern Republic. The legal core of CGCS was established in this singular epoch.",
    category: "Foundational Doc",
    icon: Landmark
  }
];

export const MemoryPage = () => {
  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600">
            <History size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Public Governance Memory</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none">The Civic Ledger</h2>
          <p className="text-slate-500 text-sm italic">Preserving the struggle, reforms, and legal milestones of the democratic journey.</p>
        </div>
        
        <div className="relative w-full max-w-md">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input type="text" placeholder="Search archive (e.g. '2010 Constitution')..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 shadow-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
           {ARCHIVES.map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex gap-8 items-start relative group hover:border-slate-300 transition-all"
             >
                <div className="w-20 flex flex-col items-center flex-shrink-0">
                   <p className="text-2xl font-bold font-mono text-slate-900">{item.year}</p>
                   <div className="w-[1px] h-20 bg-slate-100 my-2" />
                </div>
                
                <div className="flex-1 space-y-4">
                   <div className="flex justify-between items-start">
                      <div className="space-y-2">
                         <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest leading-none block">{item.category}</span>
                         <h4 className="text-xl font-bold text-slate-900 tracking-tight">{item.title}</h4>
                      </div>
                      <button className="text-slate-300 hover:text-emerald-500">
                         <Bookmark size={20} />
                      </button>
                   </div>
                   
                   <p className="text-sm text-slate-500 leading-relaxed italic max-w-2xl">"{item.desc}"</p>
                   
                   <div className="pt-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                         <item.icon size={20} />
                      </div>
                      <button className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 hover:underline">
                         View Source Document <ArrowRight size={14} />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0F172A] p-8 rounded-xl text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <Award className="absolute top-0 right-0 p-4 opacity-10" size={140} />
              <div className="space-y-6 relative">
                 <h3 className="text-lg font-bold">National Reform Scoreboard</h3>
                 <p className="text-xs text-slate-400 leading-relaxed italic">"Since the 2010 constitutional epoch, service delivery fidelity has increased by 420% across ward-level infrastructure projects."</p>
                 
                 <div className="space-y-4">
                    {[
                      { l: "Total Reforms Logged", v: "1,290" },
                      { l: "Immutability Factor", v: "99.9%" },
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] font-bold">
                         <span className="opacity-60">{s.l}</span>
                         <span className="text-emerald-400 font-mono italic">{s.v}</span>
                      </div>
                    ))}
                 </div>

                 <button className="w-full py-4 bg-white text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">
                    Download Annual Report
                 </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-4">Ancestral Civic Data</h3>
              <p className="text-[10px] text-slate-500 font-medium italic">"Mapping governance metrics from pre-digital eras into the current neural registry."</p>
              <div className="space-y-3">
                 {[1990, 1980, 1970].map(yr => (
                   <div key={yr} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <span className="text-xs font-bold text-slate-900">{yr} Registry</span>
                      <ArrowRight size={14} className="text-slate-300" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
