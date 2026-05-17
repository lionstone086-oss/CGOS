import React, { useState } from "react";
import { FileDown, ShieldCheck, User, MapPin, Calendar, Clock, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const MOCK_CONTRACT = {
  candidate: "Hon. Jane Doe",
  party: "Democratic Reform Alliance",
  region: "Nyeri County",
  role: "Governor Candidate",
  commitments: [
    { title: "Universal Healthcare Access", desc: "Build or upgrade 5 level-4 hospitals across the county wings.", status: "Negotiated" },
    { title: "Agri-Value Addition Hubs", desc: "Establish 3 processing plants for coffee and milk within 18 months.", status: "Verified" },
    { title: "Transparency Protocol", desc: "Publish monthly budget vs expenditure reports on CGCS.", status: "Enforced" },
  ],
  validity: "2022 - 2027",
  signature: "SIGNED_HASH_0x4F2A9..."
};

export const ContractsPage = () => {
  return (
    <div className="p-6 max-w-[1440px] mx-auto pb-32 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">Public Governance Contracts</h2>
          <p className="text-slate-500 mt-2 text-sm italic">Transforming election promises into measurable, cryptographically-signed public service agreements.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-3 py-1.5 bg-white text-emerald-600 rounded-lg text-[10px] font-bold font-mono border border-emerald-100 flex items-center gap-2 shadow-sm">
            <ShieldCheck size={14} /> IMMUTABLE RECORD_LOCKED
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-slate-100 transition-colors" />
            <div className="text-center space-y-4 mb-8 relative">
              <div className="w-20 h-20 bg-slate-900 text-white rounded-xl mx-auto flex items-center justify-center font-bold text-3xl shadow-xl">JD</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{MOCK_CONTRACT.candidate}</h3>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-2">{MOCK_CONTRACT.role}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                 <span className="flex items-center gap-2"><MapPin size={14} /> Regional Scope</span>
                 <span className="text-slate-900">{MOCK_CONTRACT.region}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                 <span className="flex items-center gap-2"><Calendar size={14} /> Mandate Duration</span>
                 <span className="text-slate-900">{MOCK_CONTRACT.validity}</span>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Public Signing Hash</span>
                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 truncate">
                  <Clock size={12} className="flex-shrink-0" />
                  <span className="truncate tracking-tighter">{MOCK_CONTRACT.signature}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
              <FileDown size={16} /> Download Certified Decree
            </button>
          </div>

          <div className="p-6 rounded-xl bg-[#0F172A] text-white border border-slate-800 shadow-xl">
            <AlertCircle className="mb-4 text-emerald-400" size={24} />
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Oversight Protocol</h4>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed font-medium italic">
              "This contract was negotiated by 42 verified ward representatives. Failure to meet primary milestones triggers automatic fiscal blockade and public audit escalation."
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-lg font-bold text-slate-900 tracking-tight">Negotiated Commitments</h4>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest border-b-2 border-slate-100 pb-1">03 TOTAL DELIVERABLES</span>
          </div>

          <div className="space-y-4">
            {MOCK_CONTRACT.commitments.map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-8 group hover:border-slate-300 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                  <CheckCircle2 size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h5 className="text-lg font-bold text-slate-900 leading-tight">{c.title}</h5>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 self-start">{c.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed italic mb-6">
                    "{c.desc}"
                  </p>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex gap-8">
                       <div className="flex flex-col">
                         <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mb-1">Measurability</span>
                         <span className="text-[11px] font-bold text-slate-900">Audit-Ready (98%)</span>
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mb-1">Citizen Consensus</span>
                         <span className="text-[11px] font-bold text-slate-900">92% Supported</span>
                       </div>
                    </div>
                    <button className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:underline group-hover:translate-x-1 transition-transform">
                      Interrogate Plan <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-slate-50 p-10 rounded-xl border-dashed border-2 border-slate-200 flex flex-col items-center justify-center text-center space-y-4 py-16">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shadow-inner">
              <User size={32} />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3">Historical Execution Engine</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium italic">
                "Once the mandate progresses, this neural engine will map real-time infrastructure performance against the signed agreement baseline."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
