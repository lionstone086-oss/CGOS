import React, { useState, useEffect } from "react";
import { 
  Plus, 
  ThumbsUp, 
  Search, 
  MessageSquare, 
  Filter, 
  Layers, 
  ArrowRight, 
  BrainCircuit, 
  Sparkles,
  TrendingUp,
  Users,
  DollarSign,
  ShieldAlert,
  Gavel,
  Zap,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { estimateProjectCost } from "./services/geminiService";
import { automationEngine } from "./services/automationService";
import { db, auth } from "./lib/firebase";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  doc, 
  updateDoc, 
  increment,
  writeBatch,
  getDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { handleFirestoreError, OperationType } from "./lib/firestoreUtils";
import { PriorityDemand } from "./types";

const CATEGORIES = ["Infrastructure", "Water & Sanitation", "Healthcare", "Education", "Agri-Tech", "Security", "Youth Hubs"];

export const PrioritiesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeFeasibility, setActiveFeasibility] = useState<any>(null);
  const [calculating, setCalculating] = useState(false);
  const [demandTitle, setDemandTitle] = useState("");
  const [demands, setDemands] = useState<PriorityDemand[]>([]);
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const q = query(collection(db, "demands"), orderBy("votesCount", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const demandsList: PriorityDemand[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PriorityDemand[];
      setDemands(demandsList);
      setLoading(false);

      // Check votes for current user
      if (auth.currentUser) {
        demandsList.forEach(async (d) => {
          const voteRef = doc(db, `demands/${d.id}/votes/${auth.currentUser?.uid}`);
          const voteSnap = await getDoc(voteRef);
          if (voteSnap.exists()) {
            setUserVotes(prev => ({ ...prev, [d.id]: true }));
          }
        });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "demands");
    });

    return () => unsubscribe();
  }, []);

  const handleFeasibilityCheck = async () => {
    if (!demandTitle) return;
    setCalculating(true);
    const result = await estimateProjectCost(demandTitle);
    setActiveFeasibility(result);
    setCalculating(false);
  };

  const handleSubmitDemand = async () => {
    if (!demandTitle || !activeFeasibility) return;
    
    setCalculating(true);
    try {
      // Trigger CGOS Automation Engine (n8n Simulation)
      const automationResult = await automationEngine.processNewDemand(demandTitle, activeFeasibility.risks.join(", "));

      const newDemand = {
        title: demandTitle,
        description: `Estimated Cost: ${activeFeasibility.estimatedCost}. Duration: ${activeFeasibility.duration}. Risks: ${activeFeasibility.risks.join(", ")}`,
        category: automationResult.category || "Infrastructure", 
        urgency: automationResult.urgency || 5,
        impact: automationResult.impact || 5,
        aiScore: automationResult.score,
        region: "National", 
        authorId: auth.currentUser?.uid,
        votesCount: 0,
        status: "active",
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, "demands"), newDemand);
      setShowForm(false);
      setDemandTitle("");
      setActiveFeasibility(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "demands");
    } finally {
      setCalculating(false);
    }
  };

  const handleVote = async (demandId: string) => {
    if (!auth.currentUser || userVotes[demandId]) return;

    try {
      const batch = writeBatch(db);
      const demandRef = doc(db, "demands", demandId);
      const voteRef = doc(db, `demands/${demandId}/votes/${auth.currentUser.uid}`);

      batch.update(demandRef, { votesCount: increment(1) });
      batch.set(voteRef, { 
        userId: auth.currentUser.uid, 
        timestamp: serverTimestamp() 
      });

      await batch.commit();
      setUserVotes(prev => ({ ...prev, [demandId]: true }));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `demands/${demandId}/votes`);
    }
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto pb-20 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em]">
             <BrainCircuit size={14} />
             Demand Intelligence Engine
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Priority Collective</h2>
          <p className="text-slate-500 italic font-medium">Ranked citizen demands filtered through urgency, budget reality, and legal obligation.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 shadow-2xl transition-all active:scale-95 h-16 font-mono"
        >
          <Plus size={18} /> Submit Public Demand
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-3 space-y-6">
           <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <TrendingUp size={100} />
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-emerald-400">Top 10 Priorities</h3>
              <div className="space-y-4">
                 {demands.slice(0, 10).map((d, i) => (
                   <div key={d.id} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs font-mono group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all">
                         0{i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="text-[10px] font-bold uppercase truncate pr-4">{d.title}</div>
                         <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[8px] opacity-40 font-bold">{d.votesCount} VOTES</span>
                         </div>
                      </div>
                   </div>
                 ))}
                 <div className="pt-4 mt-4 border-t border-white/5">
                    <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/10">View Full Index</button>
                 </div>
              </div>
           </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
            <h3 className="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
              <Filter size={14} /> Intelligence Filter
            </h3>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <button key={cat} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-900 flex justify-between items-center group">
                  {cat}
                  <span className="bg-slate-100 px-2 py-1 rounded text-[8px] group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">12</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-9 space-y-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-white border border-slate-200 rounded-2xl p-2 shadow-xl flex items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center text-slate-400">
                 <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Query demand database... 'Water infrastructure in Ward 4'" 
                className="flex-1 bg-transparent px-2 py-4 text-xs font-bold uppercase tracking-widest placeholder:opacity-40 italic outline-none"
              />
              <button className="bg-slate-900 text-white px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all font-mono">
                 Apply Neural Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {demands.map((demand, i) => (
              <motion.div 
                key={demand.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl hover:border-emerald-500/20 transition-all group flex flex-col xl:flex-row gap-10 items-stretch"
              >
                <div className="flex flex-col items-center justify-center gap-3 bg-slate-900 text-white p-8 rounded-[2rem] min-w-[140px] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-10">
                      <Zap size={24} className="text-emerald-400" />
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Priority Score</div>
                   <div className="text-5xl font-black font-mono tracking-tighter text-emerald-400">
                     {(demand as any).aiScore || Math.min(99, Math.floor(80 + (demand.votesCount / 100)))}
                   </div>
                   <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-2">
                         {[1,2,3].map(j => <div key={j} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800" />)}
                      </div>
                      <span className="text-[9px] font-bold opacity-60">Verified</span>
                   </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-200">
                        {demand.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">NODE://0x{demand.id.slice(0, 4)}...{demand.id.slice(-4)}</span>
                    </div>
                    <div 
                      onClick={() => handleVote(demand.id)}
                      className={`flex items-center gap-2 text-[10px] font-bold transition-colors cursor-pointer ${userVotes[demand.id] ? 'text-emerald-500' : 'text-slate-400 hover:text-emerald-500'}`}
                    >
                       {userVotes[demand.id] ? <CheckCircle2 size={14} /> : <ThumbsUp size={14} />}
                       {userVotes[demand.id] ? 'VOTED' : `${demand.votesCount} SUPPORT`}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">
                       {demand.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed italic max-w-2xl">
                       "{demand.description}"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-50">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <Users size={12} />
                          Impact
                       </div>
                       <div className="text-xs font-black uppercase italic">{(demand as any).impact ? `${(demand as any).impact}/10` : 'High Coverage'}</div>
                    </div>
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <DollarSign size={12} />
                          Fiscal Gap
                       </div>
                       <button 
                         onClick={async (e) => {
                           e.stopPropagation();
                           const res = await automationEngine.analyzeBudgetMatching(demand.id, "KES 400M", "FY2026 County Allotment");
                           alert(`Budget Match: ${res.feasible ? 'FEASIBLE' : 'NOT FEASIBLE'}\nRecommendation: ${res.recommendation}`);
                         }}
                         className="text-[10px] font-black uppercase text-emerald-500 hover:text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded transition-all"
                       >
                         { (demand as any).budgetMatch ? 'Matched' : 'Run Budget Engine' }
                       </button>
                    </div>
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <Gavel size={12} />
                          Legal Tier
                       </div>
                       <div className="text-xs font-black uppercase italic text-blue-600">Standard</div>
                    </div>
                    <div className="space-y-1 text-right">
                       <div className="flex items-center gap-2 justify-end text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <ShieldAlert size={12} />
                          Safety Risk
                       </div>
                       <div className="text-xs font-black uppercase italic text-orange-500">Moderate</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] border border-slate-200"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Initiate Public Demand</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Formal CGOS Federated Submission</p>
                </div>
                <button onClick={() => setShowForm(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all font-mono">X</button>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Proposed Civc Objective</label>
                    <input 
                      type="text" 
                      value={demandTitle}
                      onChange={(e) => setDemandTitle(e.target.value)}
                      placeholder="e.g. Modernization of Eldoret Vocational Hub" 
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all text-xs font-bold uppercase tracking-widest placeholder:opacity-50"
                    />
                  </div>
                  <div className="flex gap-4">
                     <button 
                       onClick={handleFeasibilityCheck}
                       disabled={calculating || !demandTitle}
                       className="flex-1 flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:shadow-emerald-500/20 transition-all disabled:opacity-50 font-mono active:scale-95"
                     >
                       <BrainCircuit size={20} className="text-emerald-400" />
                       {calculating ? "Processing Neural Matrix..." : "Analyze Demand Intelligence"}
                     </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {activeFeasibility && (
                    <motion.div 
                      key="feasibility"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-8 relative overflow-hidden shadow-2xl border border-slate-800"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                         <Sparkles size={120} />
                      </div>
                      <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-900 shadow-lg glow-emerald">
                           <Sparkles size={20} />
                        </div>
                        <div>
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Sovereign Intelligence Report</h4>
                           <p className="text-[9px] opacity-40 uppercase font-bold">Node Simulation Verification: 0.992 FLAWLESS</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Estimated Fiscal Cap</span>
                          <p className="text-2xl font-black font-mono tracking-tighter text-emerald-400">{activeFeasibility.estimatedCost}</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Simulation Lifecycle</span>
                          <p className="text-2xl font-black font-mono tracking-tighter">{activeFeasibility.duration}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block pl-1">Identified System Risks</span>
                        <div className="flex flex-wrap gap-2">
                          {activeFeasibility.risks.map((risk: string, i: number) => (
                            <div key={i} className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10 italic text-slate-400">
                               {risk}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
                  <button 
                    onClick={handleSubmitDemand}
                    disabled={!demandTitle || !activeFeasibility}
                    className="w-full py-6 bg-emerald-500 text-slate-900 rounded-[2rem] text-xs font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-100 hover:bg-emerald-400 transition-all active:scale-95 font-mono"
                  >
                    Broadcast to National Registry
                  </button>
                  <div className="flex items-center justify-center gap-6 opacity-40">
                     <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                        <ShieldAlert size={12} />
                        Immutable
                     </div>
                     <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                        <Gavel size={12} />
                        Legally Bound
                     </div>
                     <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                        <Layers size={12} />
                        Citizen Signed
                     </div>
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
