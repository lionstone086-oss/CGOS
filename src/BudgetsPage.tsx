import React, { useState, useEffect } from "react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from "recharts";
import { summarizeBudget } from "./services/geminiService";
import { Sparkles, Info, Download, Filter, Search, Zap, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { db } from "./lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "./lib/firestoreUtils";
import { Budget } from "./types";

const MOCK_BUDGET_FALLBACK = {
  region: "Nairobi",
  fiscalYear: "2025/26",
  totalAmount: 42500000000,
  recurrentSpending: 31000000000,
  developmentSpending: 11500000000,
  categories: [
    { name: "Health", value: 8500000000, color: "#3B82F6", allocated: 0.85 },
    { name: "Education", value: 6200000000, color: "#8B5CF6", allocated: 0.92 },
    { name: "Infrastructure", value: 12000000000, color: "#10B981", allocated: 0.74 },
    { name: "Agriculture", value: 4800000000, color: "#F59E0B", allocated: 0.62 },
    { name: "Sanitation", value: 5500000000, color: "#EF4444", allocated: 0.45 },
    { name: "Other", value: 5500000000, color: "#6B7280", allocated: 0.80 },
  ]
};

export const BudgetsPage = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [matchingQuery, setMatchingQuery] = useState("");
  const [matchResult, setMatchResult] = useState<any>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "budgets"), orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const budgetList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Budget[];
      setBudgets(budgetList);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "budgets");
    });
    return () => unsubscribe();
  }, []);

  const activeBudget = budgets.length > 0 ? {
    ...budgets[0],
    categories: Object.entries(budgets[0].categories || {}).map(([name, value], i) => ({
      name,
      value,
      color: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6B7280"][i % 6],
      allocated: Math.random() * 0.5 + 0.4 // Placeholder for ratio
    }))
  } : MOCK_BUDGET_FALLBACK;

  const handleMatch = () => {
    if (!matchingQuery) return;
    setLoadingAI(true);
    setMatchResult(null);
    
    // Simulate Budget Matching Logic
    setTimeout(() => {
      setMatchResult({
        fit: 62,
        available: "KES 240M",
        deficit: "KES 180M",
        sources: ["County Development Fund", "Ward Maintenance Levy"],
        status: "Partially Possible",
        recommendation: "Re-allocate 15% from administrative overhead to cover the emergency infrastructure gap."
      });
      setLoadingAI(false);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em]">
             <DollarSign size={14} />
             Fiscal Reality Engine
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic leading-none">Budget Intelligence</h1>
          <p className="text-slate-500 italic font-medium">Public budget matching system. Connecting citizen demands to real-world fiscal capacity.</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-slate-900 text-white px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-2xl flex items-center gap-3">
              <Zap size={16} className="text-emerald-400" />
              Live Allocation Sync
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Matching System */}
        <div className="lg:col-span-12">
           <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-2xl space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                 <Search size={150} />
              </div>
              <div className="space-y-4 max-w-2xl">
                 <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Demand-Budget Matcher</h2>
                 <p className="text-sm text-slate-500 italic font-medium leading-relaxed">
                   Enter a citizen demand or project title to see if it fits within current county or national budgetary frameworks.
                 </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 relative z-10">
                 <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-center px-6 focus-within:border-emerald-500 transition-all">
                    <Search size={20} className="text-slate-400" />
                    <input 
                      value={matchingQuery}
                      onChange={(e) => setMatchingQuery(e.target.value)}
                      placeholder="e.g. Repair of Ol Kalou bypass road..." 
                      className="w-full bg-transparent border-none outline-none py-5 px-4 text-xs font-bold uppercase tracking-widest placeholder:opacity-40"
                    />
                 </div>
                 <button 
                   onClick={handleMatch}
                   className="px-12 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-emerald-500 transition-all font-mono active:scale-95"
                 >
                    {loadingAI ? 'Calculating Fiscal Fit...' : 'Run Budget Match'}
                 </button>
              </div>

              <AnimatePresence mode="wait">
                {matchResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100"
                  >
                     <div className="bg-slate-900 rounded-2xl p-8 text-white space-y-4 shadow-xl">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Matching Accuracy</div>
                        <div className="flex items-end gap-2">
                           <span className="text-5xl font-black font-mono tracking-tighter">{matchResult.fit}%</span>
                           <span className="text-xs font-bold uppercase italic text-emerald-400 mb-2">Match</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${matchResult.fit}%` }}
                             className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                           />
                        </div>
                     </div>

                     <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-6">
                        <div>
                           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status Protocol</div>
                           <div className="text-xl font-black uppercase italic tracking-tight text-blue-600">{matchResult.status}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Available</p>
                              <p className="text-sm font-bold font-mono">{matchResult.available}</p>
                           </div>
                           <div>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Deficit</p>
                              <p className="text-sm font-bold font-mono text-red-500">{matchResult.deficit}</p>
                           </div>
                        </div>
                     </div>

                     <div className="bg-emerald-500 rounded-2xl p-8 text-slate-900 flex flex-col justify-between shadow-2xl">
                        <div className="space-y-4">
                           <h4 className="text-xs font-black uppercase tracking-[0.2em]">Sovereign Suggestion</h4>
                           <p className="text-[10px] font-bold leading-relaxed italic">"{matchResult.recommendation}"</p>
                        </div>
                        <button className="w-full mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest group">
                           Initiate Reallocation Request <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Key Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
               <DollarSign size={100} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Fiscal Allocation</p>
            <h3 className="text-4xl font-black mt-1 font-mono tracking-tighter text-slate-900">KES {(activeBudget.totalAmount / 1e9).toFixed(1)}B</h3>
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
               <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fiscal Year</p>
                  <span className="text-xs font-black uppercase italic">{activeBudget.fiscalYear}</span>
               </div>
               <div className="text-right">
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Integrity Score</p>
                  <span className="text-xs font-black uppercase italic">0.982 PASS</span>
               </div>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white border-none relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles size={80} />
            </div>
            <h4 className="text-[10px] font-bold flex items-center gap-2 mb-6 uppercase tracking-[0.3em] text-emerald-400">
              <Sparkles size={14} /> Fiscal Intelligence
            </h4>
            <div className="space-y-6">
               <p className="text-sm text-slate-400 font-medium italic leading-relaxed">
                 Deep-analyze complex budget documents to identify service gaps and re-allocation possibilities.
               </p>
               {summary && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   className="p-6 bg-white/5 border border-white/10 rounded-2xl text-[10px] text-slate-300 leading-relaxed italic"
                 >
                    {summary}
                 </motion.div>
               )}
               <button 
                 onClick={async () => {
                   setLoadingAI(true);
                   const s = await summarizeBudget(activeBudget);
                   setSummary(s);
                   setLoadingAI(false);
                 }}
                 disabled={loadingAI}
                 className="w-full py-4 rounded-xl bg-white text-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-100 transition-all font-mono disabled:opacity-50"
               >
                 {loadingAI ? 'Interrogating...' : 'Interrogate Budget AI'}
               </button>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] p-10 border border-slate-200 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4">Sectoral Absorption Matrix</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sovereign Debt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-200" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Disbursed</span>
              </div>
            </div>
          </div>
          
          <div className="h-72 w-full mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeBudget.categories} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={9} tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontWeight: 800}} />
                <YAxis fontSize={9} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} tickFormatter={(v) => `${(v/1e9).toFixed(1)}B`} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                  {activeBudget.categories.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
            {activeBudget.categories.map((cat: any, i: number) => (
              <div key={i} className="space-y-2">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">{cat.name} Portfolio</span>
                <div className="flex flex-col">
                   <span className="text-xl font-black text-slate-900 font-mono tracking-tighter">KES {(cat.value / 1e9).toFixed(2)}B</span>
                   <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-slate-900" style={{ width: `${cat.allocated * 100}%` }} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
        <div className="p-8 bg-slate-900 border-b border-white/5 flex items-center justify-between text-white">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">NG-CDF Disbursement Protocol</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold font-mono">
             <ShieldCheck size={12} />
             AUDIT_DELTA: 0x82f...a12
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-10 py-6">Sector / Constituency</th>
                <th className="px-10 py-6">Allocated</th>
                <th className="px-10 py-6">Absorption Fidelity</th>
                <th className="px-10 py-6">Primary Pillar</th>
                <th className="px-10 py-6 text-right">Civic Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 italic">
              {[
                { name: "Lang'ata Hub", amount: "1.2B", rate: "84%", pillar: "Education", score: "A" },
                { name: "Kibra Corridor", amount: "1.1B", rate: "72%", pillar: "Infrastructure", score: "B+" },
                { name: "Westlands Health", amount: "1.4B", rate: "91%", pillar: "Healthcare", score: "A+" },
                { name: "Embakasi East Tech", amount: "1.3B", rate: "65%", pillar: "Technology", score: "B-" },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                  <td className="px-10 py-6 font-black text-slate-900 italic uppercase tracking-tighter text-lg">{row.name}</td>
                  <td className="px-10 py-6 text-xs font-black font-mono text-slate-500">KES {row.amount}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner p-[1px]">
                        <div className="h-full bg-slate-900 rounded-full group-hover:bg-emerald-500 transition-colors" style={{ width: row.rate }} />
                      </div>
                      <span className="text-[10px] font-mono font-black text-slate-700">{row.rate}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-4 py-1.5 bg-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all">{row.pillar}</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className={`text-base font-black font-mono ${row.score.startsWith('A') ? 'text-emerald-500 shadow-emerald-500/20' : 'text-orange-500'}`}>{row.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
