import React, { useState } from "react";
import { Zap, ShieldAlert, FileWarning, Users, Scale, MessageSquare, Phone, MapPin, Send, ArrowRight, AlertCircle, CheckCircle2, Siren } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const EMERGENCY_ACTIONS = [
  {
    id: 1,
    title: "Petition Campaign: Emergency Audit Request",
    type: "petition",
    target: "Sector 4 Infrastructure Bureau",
    reason: "Fiscal variance exceeded 15% threshold in Q1 report.",
    support: 1240,
    required: 5000,
    severity: "High"
  },
  {
    id: 2,
    title: "Public Hearing Activation: Ward 7 Water Rights",
    type: "hearing",
    target: "County Assembly Water Committee",
    reason: "Systematic exclusion of lower-ward residents from borehole allocations.",
    support: 842,
    required: 1000,
    severity: "Critical"
  },
  {
    id: 3,
    title: "Civic Assembly Coordination: Education Reform",
    type: "assembly",
    target: "Regional Education Board",
    reason: "Drafting a collaborative budget alternative for ward dispensaries.",
    support: 450,
    required: 2000,
    severity: "Medium"
  }
];

export const EmergencyPage = () => {
  const [selectedAction, setSelectedAction] = useState<any>(null);

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
       {/* Top Warning Banner */}
       <div className="bg-red-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
             <Siren size={200} />
          </div>
          
          <div className="space-y-4 relative">
             <div className="flex items-center gap-3">
                <ShieldAlert size={32} />
                <h2 className="text-3xl font-bold tracking-tight uppercase">Emergency Civic Action Node</h2>
             </div>
             <p className="text-red-100 max-w-2xl text-lg italic font-medium leading-tight">
               "When the standard governance cycle fails to address critical structural anomalies, Article 37 mandates immediate non-violent civic coordination."
             </p>
             <div className="flex items-center gap-6 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">System Status: ALERT_LEVEL_2</div>
                <div className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">Active Mobilizations: 14</div>
             </div>
          </div>

          <button className="px-8 py-4 bg-white text-red-600 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-red-50 transition-all shadow-xl active:scale-95 whitespace-nowrap relative">
             Initiate Rapid Mobilization
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Active Mobilization Deck</h3>
                <div className="flex gap-2">
                   {["All", "Petitions", "Hearings", "Legal"].map(t => (
                     <button key={t} className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest border border-slate-200 rounded-lg hover:border-slate-900 transition-colors">{t}</button>
                   ))}
                </div>
             </div>

             <div className="grid gap-4">
                {EMERGENCY_ACTIONS.map((action, i) => (
                  <motion.div 
                    key={action.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-400 cursor-pointer group transition-all"
                  >
                     <div className="flex justify-between items-start mb-6">
                        <div className="space-y-2">
                           <div className="flex items-center gap-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest text-white ${action.severity === 'Critical' ? 'bg-red-600' : action.severity === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                 {action.severity} Priority
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                 <Users size={12} /> {action.type}
                              </span>
                           </div>
                           <h4 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-red-600 transition-colors uppercase italic">{action.title}</h4>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Support Progress</p>
                           <p className="text-sm font-mono font-bold text-slate-900">{Math.round((action.support/action.required)*100)}%</p>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                           <p className="text-xs text-slate-600 italic">"{action.reason}"</p>
                        </div>
                        
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${(action.support/action.required)*100}%` }}
                             className={`h-full ${action.severity === 'Critical' ? 'bg-red-600' : 'bg-slate-900'}`}
                           />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest pt-2">
                           <span className="text-slate-400">Target: {action.target}</span>
                           <button className="flex items-center gap-2 text-slate-900 hover:underline">
                              Authorize My Support <ArrowRight size={14} />
                           </button>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden border border-slate-800">
                <Zap className="absolute top-0 right-0 p-4 opacity-10" size={140} />
                <div className="space-y-6 relative">
                   <h3 className="text-lg font-bold">Constitutional Safeguards</h3>
                   <p className="text-xs text-slate-400 leading-relaxed italic">"Section 19: Citizens have the unalienable right to request emergency auditing of any public contract exceeding 1B KES if variance signals are detected."</p>
                   
                   <div className="space-y-3">
                      {[
                        { l: "Petition Drafting AI", i: FileWarning },
                        { l: "Legal Observer Network", i: Scale },
                        { l: "Escalation Dashboard", i: Siren }
                      ].map((tool, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                           <tool.i size={18} className="text-red-400" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{tool.l}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-4">Crisis Liaison Contact</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
                      <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center">
                         <Phone size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-red-600 uppercase">Emergency Hotline</p>
                         <p className="text-sm font-mono font-bold text-slate-900">0800-CIVIC-ALERT</p>
                      </div>
                   </div>

                   <button className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 shadow-lg shadow-slate-100 transition-all">
                      Transmit Evidence Payload
                   </button>
                </div>
             </div>

             <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex gap-3 items-start">
                   <CheckCircle2 size={18} className="text-emerald-500 mt-1" />
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Peaceful Engagement Protocol</p>
                      <p className="text-[10px] text-emerald-800 opacity-80 leading-relaxed font-medium">All emergency actions within CGCS are strictly non-violent and legally validated against the 2010 Constitution.</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
