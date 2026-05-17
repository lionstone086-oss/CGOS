import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Activity, 
  FileText, 
  ShieldCheck, 
  Gavel, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  Camera
} from 'lucide-react';
import { db } from './lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './lib/firestoreUtils';

export const FeedPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Combine demands and reports into a single feed
    const demandsQuery = query(collection(db, "demands"), orderBy("createdAt", "desc"), limit(10));
    const reportsQuery = query(collection(db, "reports"), orderBy("createdAt", "desc"), limit(10));

    let demands: any[] = [];
    let reports: any[] = [];

    const updateFeed = () => {
      const combined = [
        ...demands.map(d => ({
          ...d,
          feedType: 'demand',
          displayIcon: MessageSquare,
          displayColor: 'emerald',
          displayStatus: d.status,
          displayTitle: d.title,
          displayMeta: 'CIVIC_DEMAND',
          displayDesc: d.description
        })),
        ...reports.map(r => ({
          ...r,
          feedType: 'report',
          displayIcon: Camera,
          displayColor: r.type === 'corruption' ? 'red' : 'blue',
          displayStatus: r.isVerified ? 'verified' : 'under-review',
          displayTitle: r.type === 'corruption' ? 'Integrity Deviation Reported' : 'Project Performance Log',
          displayMeta: 'EVIDENCE_REPORT',
          displayDesc: r.content
        }))
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setItems(combined);
      setLoading(false);
    };

    const unsubDemands = onSnapshot(demandsQuery, (snap) => {
      demands = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateFeed();
    }, (err) => handleFirestoreError(err, OperationType.LIST, "demands"));

    const unsubReports = onSnapshot(reportsQuery, (snap) => {
      reports = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateFeed();
    }, (err) => handleFirestoreError(err, OperationType.LIST, "reports"));

    return () => {
      unsubDemands();
      unsubReports();
    };
  }, []);

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-[0.3em]">
             <Activity size={14} className="text-emerald-500" />
             Governance Streaming Protocol
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Transparency Feed</h1>
          <p className="text-slate-500 italic font-medium">The live, immutable stream of government activity. Citizen demands and evidence reports aggregated in real-time.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
           <Zap size={14} className="animate-pulse" />
           Live Node Sync
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
           {["All", "Demands", "Evidence", "Budgets", "Legal"].map((filter, i) => (
             <button 
               key={i} 
               className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${i === 0 ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
             >
               {filter}
             </button>
           ))}
        </div>

        <div className="space-y-4">
           {items.length === 0 && !loading && (
             <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-black uppercase text-xs tracking-widest italic">No live transmissions detected in current epoch.</p>
             </div>
           )}
           {items.map((item, i) => (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
             >
                <div className={`absolute top-0 left-0 w-2 h-full bg-${item.displayColor}-500/20 group-hover:bg-${item.displayColor}-500 transition-colors duration-500`} />
                
                <div className="flex gap-6 items-start">
                   <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-emerald-400 group-hover:border-slate-800 transition-all duration-300 shadow-sm flex-shrink-0`}>
                      <item.displayIcon size={24} />
                   </div>
                   
                   <div className="flex-1 space-y-3 min-w-0">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                         <div className="flex items-center gap-2">
                            <span className={`text-${item.displayColor}-500 font-black italic`}>{item.displayMeta}</span>
                            <span className="opacity-20">|</span>
                            <span className="opacity-40">{new Date(item.createdAt).toLocaleDateString()}</span>
                         </div>
                         <div className={`flex items-center gap-1.5 ${item.displayColor === 'red' ? 'text-red-500' : 'text-emerald-500'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.displayColor === 'red' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                            {item.displayStatus}
                         </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 uppercase italic tracking-tighter leading-tight group-hover:text-emerald-600 transition-colors pr-8">
                         {item.displayTitle}
                      </h3>
                      
                      <p className="text-xs text-slate-500 font-medium italic leading-relaxed opacity-80 pr-12 line-clamp-2">
                         "{item.displayDesc}"
                      </p>

                      <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                         <div className="flex gap-2">
                            <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-400 uppercase tracking-widest">Hash: 0x{item.id.slice(0, 6)}</div>
                            <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                               <Clock size={10} />
                               Mined Securely
                            </div>
                         </div>
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                            <ArrowRight size={18} />
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3 font-mono">
           Load Full History <Activity size={16} />
        </button>
      </div>
    </div>
  );
};
