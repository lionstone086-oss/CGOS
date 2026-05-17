import React, { useState } from "react";
import { Gavel, FileText, Send, Shield, Search, ArrowRight, Download, CheckCircle2, AlertCircle, Clock, Plus, Scale } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PETITIONS = [
  {
    id: "PET-2024-042",
    title: "Petition on Unconstitutional Healthcare Levies",
    category: "Public Finance",
    status: "In Committee",
    filedDate: "2024-05-02",
    updates: "Judiciary review requested for Section 12B compliance.",
    signatories: 14200,
    progress: 45
  },
  {
    id: "PET-2024-039",
    title: "Recall Petition: Ward 4 Representative",
    category: "Recount & Recall",
    status: "Filed",
    filedDate: "2024-05-08",
    updates: "Signatures undergoing cryptographic validation.",
    signatories: 840,
    progress: 15
  }
];

export const LegalActionEngine = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [drafting, setDrafting] = useState(false);

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-900">
            <Gavel size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Civic Legal Action Engine</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none">Accountability Mobilization</h2>
          <p className="text-slate-500 text-sm italic">Converting citizen collective intent into structured, lawful institutional petitions.</p>
        </div>
        
        <button 
          onClick={() => setDrafting(true)}
          className="px-6 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95"
        >
           <Plus size={18} /> Initiate Legal Challenge
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Litigation & Petition Pipeline</h3>
              <div className="flex gap-4">
                 <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Historical Rulings</button>
              </div>
           </div>

           <div className="space-y-4">
             {PETITIONS.map((pet, i) => (
               <motion.div 
                 key={pet.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group hover:border-slate-300 transition-all"
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest">
                              {pet.category}
                           </span>
                           <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">REF: {pet.id}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 tracking-tight">{pet.title}</h4>
                     </div>
                     <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase tracking-widest">{pet.status}</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Latest Update</p>
                     <p className="text-xs text-slate-600 font-medium italic">"{pet.updates}"</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                     <div className="flex-1 w-full space-y-2">
                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                           <span>Commitment Threshold</span>
                           <span className="text-slate-900">{pet.signatories} / 15,000 Signatures</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${pet.progress}%` }}
                             className="h-full bg-slate-900 rounded-full"
                           />
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                           <Download size={18} />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                           Endorse <ArrowRight size={14} />
                        </button>
                     </div>
                  </div>
               </motion.div>
             ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0F172A] p-8 rounded-xl text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <Shield className="absolute top-0 right-0 p-4 opacity-5" size={120} />
              <div className="space-y-6 relative">
                 <div className="space-y-2">
                    <h3 className="text-lg font-bold">Constitutional Safeguards</h3>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      "Every citizen has the right to institute court proceedings claiming that a right or fundamental freedom in the Bill of Rights has been denied, violated or infringed."
                    </p>
                 </div>
                 
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Verified Legal Partners</h4>
                    <div className="flex -space-x-2">
                       {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">LS</div>)}
                    </div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">42 Legal Clinics Online</p>
                 </div>

                 <button className="w-full py-4 bg-white text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">
                    Access Pro-Bono Network
                 </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-4">Petition Success Metrics</h3>
              <div className="space-y-6">
                 {[
                   { label: "Signatures Verified", val: "842k", trend: "up" },
                   { label: "Institutional Response", val: "22%", trend: "down" },
                   { label: "Legal Precedents Set", val: "14", trend: "up" },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-end">
                      <div>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                         <p className="text-xl font-bold font-mono text-slate-900 leading-none">{stat.val}</p>
                      </div>
                      <div className={`p-1 rounded ${stat.trend === 'up' ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                         <TrendingUp size={12} className={stat.trend === 'down' ? 'rotate-180' : ''} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {drafting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setDrafting(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 30 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 30 }}
               className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
               <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <Scale size={24} className="text-emerald-400" />
                     <h3 className="text-xl font-bold tracking-tight">Legal Challenge Composer</h3>
                  </div>
                  <button onClick={() => setDrafting(false)} className="opacity-60 hover:opacity-100 transition-opacity">
                     <AlertCircle size={24} />
                  </button>
               </div>

               <div className="p-8 space-y-8">
                  <div className="flex gap-4 border-b border-slate-100 pb-2">
                     {[
                       { id: 1, label: "Intent" },
                       { id: 2, label: "Evidence" },
                       { id: 3, label: "Drafting" },
                       { id: 4, label: "File" },
                     ].map(step => (
                       <button 
                         key={step.id} 
                         onClick={() => setActiveStep(step.id)}
                         className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${activeStep === step.id ? 'border-emerald-500 text-slate-900' : 'border-transparent text-slate-400'}`}
                       >
                         {step.id}. {step.label}
                       </button>
                     ))}
                  </div>

                  <div className="min-h-[300px]">
                     {activeStep === 1 && (
                        <div className="space-y-6">
                           <div className="space-y-4">
                              <h4 className="text-sm font-bold text-slate-900">What is the constitutional basis for your challenge?</h4>
                              <div className="grid grid-cols-1 gap-3">
                                 {["Misuse of Public Funds", "Violation of Service Rights", "Environmental Misconduct", "Governance Recall"].map(opt => (
                                   <label key={opt} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-500 transition-all">
                                      <input type="radio" name="legal_basis" className="accent-slate-900" />
                                      <span className="text-xs font-bold text-slate-700">{opt}</span>
                                   </label>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}
                     {activeStep === 2 && (
                        <div className="space-y-6">
                           <h4 className="text-sm font-bold text-slate-900">Select evidence from the blockchain verified system</h4>
                           <div className="space-y-3">
                              {[
                                { title: "On-site Video: Project A Deviation", hash: "0x8a1...2f", date: "2d ago" },
                                { title: "Certified Budget Variance Report", hash: "0x3b2...c1", date: "1w ago" },
                              ].map((ev, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                   <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-slate-900 text-emerald-400 rounded flex items-center justify-center">
                                         <CheckCircle2 size={16} />
                                      </div>
                                      <div className="space-y-0.5">
                                         <p className="text-xs font-bold text-slate-900">{ev.title}</p>
                                         <p className="text-[10px] font-mono text-slate-400 uppercase">{ev.hash}</p>
                                      </div>
                                   </div>
                                   <input type="checkbox" className="accent-slate-900 w-4 h-4" />
                                </div>
                              ))}
                           </div>
                        </div>
                     )}
                     {activeStep >= 3 && (
                        <div className="text-center py-12 space-y-4">
                           <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-300">
                              <FileText size={32} />
                           </div>
                           <p className="text-sm text-slate-500 italic">"AI engine is currently synthesizing legal clauses for the High Court based on provided evidence and Constitutional Article 22(1)..."</p>
                        </div>
                     )}
                  </div>

                  <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} /> Drafting Progress: {activeStep * 25}%
                     </p>
                     <div className="flex gap-4">
                        <button 
                          disabled={activeStep === 1}
                          onClick={() => setActiveStep(prev => prev - 1)}
                          className="px-6 py-3 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 disabled:opacity-30"
                        >
                           Previous
                        </button>
                        <button 
                          onClick={() => activeStep < 4 ? setActiveStep(prev => prev + 1) : setDrafting(false)}
                          className="px-8 py-3 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
                        >
                           {activeStep === 4 ? "Finalize & File" : "Next Step"} <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TrendingUp = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
