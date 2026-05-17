import React, { useState } from "react";
import { Shield, Camera, AlertOctagon, MapPin, Clock, CheckCircle2, Search, Filter, ArrowRight, UserX, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INCIDENTS = [
  {
    id: "INC-8291",
    type: "Unlawful Detention",
    region: "Nairobi Central",
    desc: "Citizen held for over 48 hours without being produced in court. Location: Station B.",
    status: "Escalated to IPC",
    severity: "High",
    officer: "Unknown (Unit 42)",
    time: "4h ago",
    witnesses: 12
  },
  {
    id: "INC-8288",
    type: "Excessive Force",
    region: "Kisumu CBD",
    desc: "Unauthorized use of tear-gas in residential area during peaceful assembly.",
    status: "Under Investigation",
    severity: "Medium",
    officer: "Sergeant Malick",
    time: "14h ago",
    witnesses: 84
  }
];

export const SafetyPage = () => {
  const [reporting, setReporting] = useState(false);

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-600">
            <Shield size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Public Safety & Accountability</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none">Institutional Misconduct Tracker</h2>
          <p className="text-slate-500 text-sm italic">Monitoring state actor compliance with the Use of Force and Human Rights protocols.</p>
        </div>
        
        <button 
          onClick={() => setReporting(true)}
          className="px-6 py-4 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-red-700 shadow-xl shadow-red-100 transition-all active:scale-95"
        >
           <AlertOctagon size={18} /> Lodge Accountability Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
           <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
              <h3 className="text-sm font-bold text-slate-900">Active Incident Registry</h3>
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                    <Filter size={14} /> Filter Heatmap
                 </button>
              </div>
           </div>

           {INCIDENTS.map((inc, i) => (
             <motion.div 
               key={inc.id}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-slate-300 transition-all border-l-4"
               style={{ borderLeftColor: inc.severity === 'High' ? '#ef4444' : '#f59e0b' }}
             >
                <div className="flex justify-between items-start mb-6">
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest text-white ${inc.severity === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}>
                            {inc.type}
                         </span>
                         <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">ID: {inc.id}</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 italic mt-3 leading-relaxed">"{inc.desc}"</h4>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <p className={`text-[10px] font-bold uppercase ${inc.status === 'Verified' ? 'text-emerald-500' : 'text-slate-600'}`}>{inc.status}</p>
                   </div>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <MapPin size={14} className="text-slate-400" /> {inc.region}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <Clock size={14} className="text-slate-400" /> {inc.time}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <UserX size={14} className="text-slate-400" /> {inc.officer}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest ml-auto">
                      <CheckCircle2 size={14} /> {inc.witnesses} Linked Evidence Nodes
                   </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8">
                   <button className="text-slate-900 hover:text-red-500">
                      <ArrowRight size={24} />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0F172A] p-8 rounded-xl text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="space-y-6 relative">
                 <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-red-500 mb-4">
                    <AlertOctagon size={28} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-lg font-bold">Internal Affairs Hub</h3>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      "Real-time monitoring of disciplinary cases and systemic failure points. Verified incidents are automatically queued for the Independent Policing Oversight Authority (IPOA) and Legal Engine."
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                       <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Conviction Rate</p>
                       <p className="text-sm font-bold font-mono text-emerald-400">4.2%</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                       <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Cases</p>
                       <p className="text-sm font-bold font-mono text-amber-400">1,240</p>
                    </div>
                 </div>

                 <button className="w-full py-4 bg-white text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-all font-mono">
                    View Officer Scorecards
                 </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-4">Accountability Heatmap</h3>
              <div className="aspect-square bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-800">
                 <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,red_1px,transparent_1px)] bg-[size:20px_20px]" />
                 <div className="text-center space-y-2 relative z-10">
                    <MapPin className="text-red-500 mx-auto" size={32} />
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Regional Anomaly Detected</p>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest italic">Syncing with Geo-Spatial Engine...</p>
                 </div>
              </div>
              <div className="space-y-3">
                 {[
                   { label: "Station A (Nairobi)", score: 12, trend: "UP" },
                   { label: "Central Post (Mombasa)", score: 4, trend: "STABLE" },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-slate-500">{stat.label}</span>
                      <span className={stat.trend === 'UP' ? 'text-red-500' : 'text-slate-400'}>{stat.score} Incidents</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {reporting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setReporting(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 30 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 30 }}
               className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
               <div className="p-8 space-y-8">
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center">
                           <AlertOctagon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Evidence Vault Incident Report</h3>
                     </div>
                     <button onClick={() => setReporting(false)} className="text-slate-400 hover:text-slate-900 text-[10px] font-bold uppercase tracking-widest">Dismiss</button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Incident Category</label>
                        <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                           <option>Excessive Force</option>
                           <option>Unlawful Arrest</option>
                           <option>Bribery / Corruption</option>
                           <option>Disappearance</option>
                           <option>Stalking / Harassment</option>
                        </select>
                     </div>
                     <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geo-Precise Location</label>
                        <div className="relative">
                           <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                           <input type="text" placeholder="Detecting GPS..." className="w-full pl-9 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <textarea 
                       placeholder="Provide a granular description of the incident, including officer badges, names, and vehicle registrations if known..." 
                       className="w-full p-6 bg-slate-50 border border-slate-200 rounded-xl h-40 focus:bg-white focus:border-red-500 focus:outline-none transition-all text-sm font-sans"
                     />
                     
                     <div className="grid grid-cols-3 gap-4">
                        {[1,2,3].map(i => (
                          <button key={i} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-red-500 hover:bg-white transition-all">
                             <Camera size={20} />
                             <span className="text-[9px] font-bold uppercase tracking-widest">Media {i}</span>
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                     <div className="flex-1">
                        <p className="text-[10px] text-slate-500 font-medium italic">"By submitting, you agree to cross-verified witness validation. False reports are subject to civil liability under the Integrity Act."</p>
                     </div>
                     <button className="px-8 py-4 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
                        Commit Incident to Blockchain <ArrowRight size={16} />
                     </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
