import React, { useState } from "react";
import { Gamepad2, TrendingUp, Users, Droplets, Zap, Shield, ArrowRight, RefreshCcw, Info } from "lucide-react";
import { motion } from "motion/react";

const INITIAL_BUDGET = 15000000000; // 15 Billion
const SECTORS = [
  { id: 'health', label: 'Healthcare', icon: Shield, min: 10, initial: 15, current: 15, color: 'bg-emerald-500', desc: 'Medical supplies, clinic expansion, and salaries.' },
  { id: 'edu', label: 'Education', icon: Users, min: 15, initial: 20, current: 20, color: 'bg-blue-500', desc: 'Primary/Secondary support and teacher funding.' },
  { id: 'infra', label: 'Infrastructure', icon: TrendingUp, min: 5, initial: 30, current: 30, color: 'bg-slate-900', desc: 'Roads, bridges, and civic buildings.' },
  { id: 'water', label: 'Water & Sanitation', icon: Droplets, min: 5, initial: 10, current: 10, color: 'bg-cyan-500', desc: 'Boreholes, piping, and waste management.' },
  { id: 'energy', label: 'Energy Reticulation', icon: Zap, min: 2, initial: 5, current: 5, color: 'bg-amber-500', desc: 'Last mile connectivity and market lighting.' },
  { id: 'admin', label: 'Administration', icon: Info, min: 10, initial: 20, current: 20, color: 'bg-slate-400', desc: 'Operations, oversight, and legal frameworks.' },
];

export const SimulatorPage = () => {
  const [allocations, setAllocations] = useState(SECTORS.map(s => ({ ...s })));
  const totalAllocated = allocations.reduce((acc, curr) => acc + curr.current, 0);
  const remainingPercent = 100 - totalAllocated;

  const handleUpdate = (id: string, newVal: number) => {
    setAllocations(prev => prev.map(s => {
      if (s.id === id) {
        // Clamp between min and 50 (arbitrary max for 1 sector)
        const val = Math.max(s.min, Math.min(50, newVal));
        return { ...s, current: val };
      }
      return s;
    }));
  };

  const getOutcome = () => {
    if (totalAllocated > 100) return { title: "Fiscal Deficit", desc: "You are spending money that doesn't exist. High risk of national debt crisis.", color: "text-red-500" };
    if (allocations.find(s => s.id === 'infra')?.current < 20) return { title: "Infrastructure Decay", desc: "Low capex investment will lead to connectivity collapse in 24 months.", color: "text-orange-500" };
    if (allocations.find(s => s.id === 'health')?.current > 25) return { title: "Health Focus", desc: "World-class health outcomes predicted, but at the cost of development.", color: "text-emerald-500" };
    return { title: "Balanced Growth", desc: "Sustainable trajectory with manageable service delivery metrics.", color: "text-blue-500" };
  };

  const outcome = getOutcome();

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Gamepad2 size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Governance Simulation Engine</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none">Fiscal Tradeoff Sandbox</h2>
          <p className="text-slate-500 text-sm italic">Simulate the complexity of resource allocation in a KSh 15B county economy.</p>
        </div>
        
        <div className="flex gap-4">
           <button 
             onClick={() => setAllocations(SECTORS.map(s => ({ ...s })))}
             className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-colors"
           >
             <RefreshCcw size={14} /> Reset Scenario
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {allocations.map((sector) => (
                  <div key={sector.id} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${sector.color} text-white`}>
                           <sector.icon size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{sector.label}</span>
                      </div>
                      <span className="text-sm font-mono font-bold text-slate-900">{sector.current}%</span>
                    </div>
                    <input 
                      type="range" 
                      min={sector.min} 
                      max="50" 
                      value={sector.current} 
                      onChange={(e) => handleUpdate(sector.id, parseInt(e.target.value))}
                      className="w-full accent-slate-900 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400 font-medium italic">Min required: {sector.min}% — {sector.desc}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 text-white p-8 rounded-xl shadow-2xl space-y-8 sticky top-24">
              <div className="space-y-2">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Simulation Impact Analysis</p>
                 <h3 className={`text-xl font-bold ${outcome.color}`}>{outcome.title}</h3>
                 <p className="text-xs text-slate-400 leading-relaxed font-medium italic">"{outcome.desc}"</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Budget Utilization</span>
                    <span className={`text-2xl font-mono font-bold ${totalAllocated > 100 ? 'text-red-500' : 'text-emerald-400'}`}>{totalAllocated}%</span>
                 </div>
                 <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                    {allocations.map((s, i) => (
                      <div 
                        key={i} 
                        style={{ width: `${s.current}%` }} 
                        className={`${s.color} h-full border-r border-slate-900/20`} 
                      />
                    ))}
                    {remainingPercent > 0 && <div style={{ width: `${remainingPercent}%` }} className="h-full bg-slate-800" />}
                 </div>
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-500">Total: 100%</span>
                    <span className={totalAllocated > 100 ? 'text-red-500' : 'text-emerald-400'}>
                      {totalAllocated > 100 ? `Over: ${(totalAllocated - 100).toFixed(1)}%` : `Unspent: ${remainingPercent.toFixed(1)}%`}
                    </span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Debt Risk</p>
                    <p className="text-sm font-bold font-mono">{totalAllocated > 100 ? 'EXTREME' : 'LOW'}</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Public Trust</p>
                    <p className="text-sm font-bold font-mono">{allocations.find(s=>s.id==='edu')!.current < 18 ? 'DROP' : 'STABLE'}</p>
                 </div>
              </div>

              <button className="w-full py-4 bg-emerald-500 text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10 active:scale-95">
                 Submit Strategy for AI Audit <ArrowRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
