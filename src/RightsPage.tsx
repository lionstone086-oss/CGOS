import React, { useState } from "react";
import { Scale, Search, Shield, Book, Heart, Users, ArrowRight, Info, AlertTriangle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const RIGHTS = [
  {
    id: "protest",
    title: "Art 37: Right to Protest",
    summary: "Every person has the right, peaceably and unarmed, to assemble, to demonstrate, to picket, and to present petitions to public authorities.",
    details: "This right is absolute as long as it is done peaceably and unarmed. Authorities must be notified but permission is NOT required.",
    icon: Users,
    color: "emerald"
  },
  {
    id: "arrest",
    title: "Art 49: Rights of Arrested Persons",
    summary: "The right to be informed promptly, in a language that the person understands, of the reason for the arrest.",
    details: "Includes the right to remain silent, to communicate with an advocate, and to be brought before a court as soon as reasonably possible (max 24 hours).",
    icon: Shield,
    color: "blue"
  },
  {
    id: "health",
    title: "Art 43: Economic & Social Rights",
    summary: "Every person has the right to the highest attainable standard of health, which includes the right to health care services.",
    details: "Also includes right to accessible housing, reasonable standards of sanitation, freedom from hunger, and clean water.",
    icon: Heart,
    color: "red"
  },
  {
    id: "privacy",
    title: "Art 31: Right to Privacy",
    summary: "Every person has the right to privacy, which includes the right not to have their person, home or property searched.",
    details: "Also protects against information relating to family or private affairs being unnecessarily required or revealed.",
    icon: Book,
    color: "slate"
  }
];

export const RightsPage = () => {
  const [selected, setSelected] = useState(RIGHTS[0]);
  const [query, setQuery] = useState("");

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-600">
            <Scale size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Constitutional Rights Intelligence</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none">The Bill of Rights</h2>
          <p className="text-slate-500 text-sm italic">De-jargonizing the Supreme Law to empower citizen accountability.</p>
        </div>
        
        <div className="relative w-full max-w-md">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input 
             type="text" 
             placeholder="Search legal concepts (e.g. 'unlawful arrest')..." 
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 shadow-sm transition-all"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-3">
           {RIGHTS.map((r, i) => (
             <motion.button 
               key={r.id}
               onClick={() => setSelected(r)}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
               className={`w-full text-left p-6 rounded-xl border transition-all flex items-start gap-4 group ${
                 selected.id === r.id 
                  ? 'bg-slate-900 border-slate-900 shadow-xl' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
               }`}
             >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                  selected.id === r.id 
                    ? 'bg-white/10 border-white/20 text-emerald-400' 
                    : 'bg-slate-50 border-slate-100 text-slate-900'
                }`}>
                   <r.icon size={20} />
                </div>
                <div className="min-w-0">
                   <h4 className={`text-sm font-bold truncate ${selected.id === r.id ? 'text-white' : 'text-slate-900'}`}>{r.title}</h4>
                   <p className={`text-[10px] mt-1 font-medium leading-tight line-clamp-2 ${selected.id === r.id ? 'text-slate-400' : 'text-slate-500'}`}>
                      {r.summary}
                   </p>
                </div>
             </motion.button>
           ))}
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
           <AnimatePresence mode="wait">
             <motion.div 
               key={selected.id}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm flex-1 space-y-8"
             >
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-900 text-emerald-400 rounded-xl flex items-center justify-center shadow-xl">
                         <selected.icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{selected.title}</h3>
                   </div>
                   <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-600 leading-relaxed">
                      "{selected.summary}"
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Info size={14} /> Practical Interpretation
                   </h4>
                   <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {selected.details}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-slate-100">
                   <div className="p-6 rounded-xl border border-amber-100 bg-amber-50/50 space-y-3">
                      <div className="flex items-center gap-2 text-amber-600 font-bold text-[10px] uppercase tracking-widest">
                         <AlertTriangle size={14} /> Critical Limitation
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed italic">
                         Rights can be limited by law only to the extent that the limitation is reasonable and justifiable in an open and democratic society.
                      </p>
                   </div>
                   <div className="p-6 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                         <Shield size={14} /> Protection Pathway
                      </div>
                      <p className="text-[11px] text-emerald-800 leading-relaxed italic">
                         If this right is violated, you can file a constitutional petition in the High Court under Article 22. CGCS can auto-draft this in the Legal Engine.
                      </p>
                   </div>
                </div>
             </motion.div>
           </AnimatePresence>

           <div className="bg-[#0F172A] p-6 rounded-xl text-white flex flex-col md:flex-row items-center gap-6 shadow-2xl border border-slate-800">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                 <MessageSquare size={32} />
              </div>
              <div className="flex-1 space-y-1">
                 <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-400">AI Legal Intelligence Assistant</h4>
                 <p className="text-xs text-slate-400 font-medium italic">"Ask me anything about the Constitution or specific legal scenarios. I can provide relevant articles and case laws immediately."</p>
              </div>
              <button className="px-6 py-3 bg-white text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-all flex-shrink-0 whitespace-nowrap">
                 Ask AI Tutor <ArrowRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
