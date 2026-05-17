import React, { useState } from "react";
import { Map as MapIcon, Layers, MapPin, Search, Filter, Shield, Droplets, Zap, TrendingUp, Info, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PROJECTS = [
  { id: 1, lat: 45, lng: 30, title: "Road Tarmacking - Sector A", type: "infra", status: "Active", budget: "450M" },
  { id: 2, lat: 60, lng: 50, title: "Borehole Drilling - Ward 4", type: "water", status: "Stalled", budget: "12M" },
  { id: 3, lat: 30, lng: 70, title: "Market Electrification", type: "energy", status: "Completed", budget: "85M" },
  { id: 4, lat: 70, lng: 40, title: "Level 4 Hospital Upgrade", type: "health", status: "Active", budget: "1.2B" },
];

export const MapPage = () => {
  const [selected, setSelected] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState("all");

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col">
       {/* Top Bar Map Controls */}
       <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-slate-900">
                <MapIcon size={18} className="text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Geospatial Governance Interface</span>
             </div>
             <div className="h-6 w-[1px] bg-slate-200" />
             <div className="flex gap-2">
                {["all", "infra", "water", "health", "energy"].map(layer => (
                  <button 
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeLayer === layer ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search coordinates or ward..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
             </div>
             <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900">
                <Layers size={18} />
             </button>
          </div>
       </div>

       <div className="flex-1 relative bg-slate-900 overflow-hidden flex">
          {/* Main Map Visualizer */}
          <div className="flex-1 relative technical-grid opacity-20" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {/* Stylized SVG Map Overlay */}
             <svg width="600" height="400" viewBox="0 0 600 400" className="opacity-80 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <path 
                  d="M100,100 Q150,50 300,100 T500,150 L550,300 Q450,350 300,320 T50,280 Z" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  className="animate-[pulse_4s_infinite]"
                />
                <circle cx="300" cy="200" r="180" fill="none" stroke="#1E293B" strokeWidth="1" />
                <circle cx="300" cy="200" r="100" fill="none" stroke="#1E293B" strokeWidth="1" />
                {/* Simulated Data Points */}
                {PROJECTS.map(p => (
                  <g 
                    key={p.id} 
                    className="pointer-events-auto cursor-pointer group"
                    onClick={() => setSelected(p)}
                  >
                    <circle 
                      cx={`${p.lng}%`} 
                      cy={`${p.lat}%`} 
                      r="6" 
                      fill={p.status === 'Completed' ? '#10B981' : p.status === 'Stalled' ? '#EF4444' : '#3B82F6'} 
                      className="animate-pulse"
                    />
                    <circle cx={`${p.lng}%`} cy={`${p.lat}%`} r="12" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20 transform scale-150 group-hover:scale-200 transition-transform" />
                  </g>
                ))}
             </svg>
          </div>

          {/* Map Overlay UI: Stats */}
          <div className="absolute top-6 left-6 space-y-4 pointer-events-none">
             <div className="glass-card bg-slate-900/80 border-slate-700/50 p-4 rounded-xl text-white backdrop-blur-md pointer-events-auto">
                <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-3">Live Infrastructure Density</p>
                <div className="space-y-3">
                   {[
                     { label: "Active Nodes", val: "142", trend: "up" },
                     { label: "Oversight Alerts", val: "14", trend: "down" },
                   ].map((s, i) => (
                     <div key={i} className="flex justify-between items-center gap-8">
                        <span className="text-[10px] uppercase font-bold text-slate-400">{s.label}</span>
                        <span className="text-sm font-mono font-bold">{s.val}</span>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="glass-card bg-slate-900/80 border-slate-700/50 p-4 rounded-xl text-white backdrop-blur-md pointer-events-auto">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">System Health</p>
                <div className="flex items-center gap-3">
                   <Activity size={16} className="text-emerald-500" />
                   <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-emerald-500 animate-pulse" />
                   </div>
                   <span className="text-[10px] font-mono">92%</span>
                </div>
             </div>
          </div>

          {/* Info Panel */}
          <AnimatePresence>
            {selected && (
              <motion.div 
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                exit={{ x: 400 }}
                className="w-96 bg-white border-l border-slate-200 shadow-2xl z-20 overflow-y-auto no-scrollbar"
              >
                 <div className="p-8 space-y-8">
                    <div className="flex justify-between items-start">
                       <div className="space-y-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest text-white ${selected.status === 'Completed' ? 'bg-emerald-500' : selected.status === 'Stalled' ? 'bg-red-500' : 'bg-blue-500'}`}>
                             {selected.status}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900 leading-tight">{selected.title}</h3>
                       </div>
                       <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-900">×</button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Budget Certified</p>
                          <p className="text-sm font-bold font-mono text-slate-900">{selected.budget} KES</p>
                       </div>
                       <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Integrity Score</p>
                          <p className="text-sm font-bold font-mono text-emerald-600">92/100</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Site Visual Analytics</h4>
                       <div className="aspect-video bg-slate-100 rounded-xl shadow-inner flex items-center justify-center text-slate-300">
                          <Shield size={48} />
                       </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Public Accountability Hub</h4>
                       <p className="text-xs text-slate-500 leading-relaxed italic">"Project expenditure is cross-validated against 42 individual citizen witness hashes from the ward-level audit network."</p>
                    </div>

                    <button className="w-full py-4 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200">
                       Interrogate Full Audit Ledger <TrendingUp size={14} />
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 glass-card bg-white/90 p-3 rounded-lg flex gap-4 text-[9px] font-bold uppercase tracking-widest text-slate-500 shadow-2xl backdrop-blur-md">
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Completed</div>
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> In Progress</div>
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> Stalled / Blocked</div>
          </div>
       </div>
    </div>
  );
};
