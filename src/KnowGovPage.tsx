import React from "react";
import { Network, Users, ShieldCheck, Landmark, Gavel, User, ArrowRight, Info } from "lucide-react";
import { motion } from "motion/react";

const HIERARCHY = [
  {
    level: "National Executive",
    role: "President",
    desc: "Heads state and government. Commander-in-chief. Directs national security and executive authority.",
    icon: ShieldCheck,
    responsibilities: ["National Security", "Foreign Policy", "Assent to laws"],
    accountability: "Parliamentary oversight, Judiciary review"
  },
  {
    level: "National Legislature",
    role: "Parliament (Senate & National Assembly)",
    desc: "Makes laws, oversight of executive, and budget allocation.",
    icon: Landmark,
    responsibilities: ["Lawmaking", "Oversight", "Budgeting"],
    accountability: "Constituent recall power, Elections"
  },
  {
    level: "County Executive",
    role: "Governor",
    desc: "Heads county government. Responsible for service delivery at the local level.",
    icon: User,
    responsibilities: ["Healthcare", "Agriculture", "County Roads"],
    accountability: "County Assembly oversight, Senate review"
  },
  {
    level: "Local Administration",
    role: "Ward Representative (MCA)",
    desc: "Legislation at the county assembly. Represents the smallest administrative unit.",
    icon: Users,
    responsibilities: ["Ward Development", "Community Mobilization"],
    accountability: "Public participation, Ward votes"
  }
];

export const KnowGovPage = () => {
  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600">
            <Network size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Know Your Government System</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none">Institutional Architecture</h2>
          <p className="text-slate-500 text-sm italic">Deconstructing the flow of power from village elders to the presidency.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              <Info size={14} /> View Constitutional Map
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
           {HIERARCHY.map((hq, i) => (
             <motion.div 
               key={hq.role}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-slate-300 transition-all"
             >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                   <hq.icon size={28} />
                </div>
                
                <div className="flex-1 space-y-4">
                   <div>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest leading-none mb-1 block">{hq.level}</span>
                      <h4 className="text-xl font-bold text-slate-900 tracking-tight">{hq.role}</h4>
                      <p className="text-xs text-slate-500 mt-2 italic leading-relaxed max-w-2xl">"{hq.desc}"</p>
                   </div>
                   
                   <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-slate-50">
                      <div className="space-y-2">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Core Mandate</p>
                         <div className="flex flex-wrap gap-2">
                            {hq.responsibilities.map(r => (
                              <span key={r} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium border border-slate-200">{r}</span>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Accountability Path</p>
                         <p className="text-[10px] font-bold text-slate-900 flex items-center gap-2">
                            <ShieldCheck size={12} className="text-emerald-500" /> {hq.accountability}
                         </p>
                      </div>
                   </div>
                </div>

                <div className="md:w-32 flex flex-col justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="flex items-center gap-2 text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                     In-Depth <ArrowRight size={14} />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0F172A] p-8 rounded-xl text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <Landmark className="absolute top-0 right-0 p-4 opacity-5" size={140} />
              <div className="space-y-6 relative">
                 <div className="space-y-2">
                    <h3 className="text-lg font-bold">The Judiciary</h3>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      "The ultimate arbiter of constitutional truth. Responsible for settling disputes between citizens and the state, and ensuring no law contradicts the Supreme Will of the People."
                    </p>
                 </div>
                 
                 <div className="space-y-3">
                    <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Active Judicial Scorecard</p>
                    <div className="flex items-center justify-between text-[11px] font-bold py-2 border-b border-white/5">
                       <span className="opacity-60">Case Clearance Rate</span>
                       <span>64.2%</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold py-2 border-b border-white/5">
                       <span className="opacity-60">Public Confidence Index</span>
                       <span>72/100</span>
                    </div>
                 </div>

                 <button className="w-full py-4 bg-emerald-500 text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10">
                    Search Supreme Court Rulings
                 </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center">
                    <Gavel size={20} />
                 </div>
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest">Bill Lifecycle</h4>
                    <p className="text-[10px] text-slate-500 italic">Tracking how a promise becomes law.</p>
                 </div>
              </div>
              <div className="space-y-4">
                 {[
                   { label: "Idea / Promise", done: true },
                   { label: "Drafting", done: true },
                   { label: "Public Participation", done: true },
                   { label: "Parliamentary Reading", done: false },
                   { label: "Presidential Assent", done: false },
                 ].map((step, i) => (
                   <div key={i} className={`flex items-center gap-3 ${step.done ? 'text-emerald-600' : 'text-slate-300 opacity-60'}`}>
                      <div className={`w-2 h-2 rounded-full ${step.done ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{step.label}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
