import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Users, 
  Scale, 
  Hammer, 
  ArrowRight, 
  Shield, 
  Activity, 
  Lock, 
  Users2, 
  AlertCircle,
  FileText,
  CheckCircle2,
  PenTool,
  Zap,
  ChevronRight,
  Gavel
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db, auth } from "./lib/firebase";
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy, 
  addDoc, 
  limit, 
  serverTimestamp,
  doc,
  getDoc
} from "firebase/firestore";
import { handleFirestoreError, OperationType } from "./lib/firestoreUtils";
import { DiscussionMessage } from "./types";

const FALLBACK_SESSIONS = [
  {
    id: "fallback-1",
    title: "Ol Kalou Bypass Rehabilitation Agreement",
    status: "Negotiating",
    participants: 1240,
    deadlines: "48h remaining",
    parties: ["County Executive", "Transport Committee", "Ol Kalou Citizen Assembly"],
    desc: "Negotiating the timeline and vendor quality standards for the bypass repair.",
    progress: 72,
    latestAction: "Citizen counter-proposal submitted for 24/7 construction schedule."
  }
];

export const NegotiationPage = () => {
  const [selected, setSelected] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // In a real app, discussions might be linked to specific demands/projects
    const q = query(collection(db, "discussions"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSessions(list.length > 0 ? list : FALLBACK_SESSIONS);
    }, (err) => handleFirestoreError(err, OperationType.LIST, "discussions"));

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selected) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, `discussions/${selected.id}/messages`),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
      })) as DiscussionMessage[];
      setMessages(list.reverse());
    }, (err) => handleFirestoreError(err, OperationType.LIST, `discussions/${selected.id}/messages`));

    return () => unsubscribe();
  }, [selected]);

  const handleSendMessage = async () => {
    if (!selected || !newMessage.trim() || !auth.currentUser) return;

    setSending(true);
    try {
      await addDoc(collection(db, `discussions/${selected.id}/messages`), {
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || "Anonymous Citizen",
        content: newMessage,
        createdAt: serverTimestamp()
      });
      setNewMessage("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `discussions/${selected.id}/messages`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">
             <Scale size={14} />
             Public Decision System
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Negotiation Room</h1>
          <p className="text-slate-500 italic font-medium">Turn citizen demands into legally binding digital contracts of governance.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-slate-900 text-white px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-2xl flex items-center gap-3">
              <Activity size={16} className="text-blue-400" />
              Live Mediation
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl">
                 <PenTool size={32} />
              </div>
              <div className="flex-1">
                 <h3 className="text-xl font-bold uppercase italic tracking-tighter">Agreement Pipeline</h3>
                 <p className="text-xs text-blue-800 font-medium italic">3 Top demands are currently in the official negotiation queue.</p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-blue-500 transition-all font-mono">
                 View Pipeline
              </button>
           </div>

            <div className="grid grid-cols-1 gap-6">
               {sessions.map((session, i) => (
                 <motion.div 
                   key={session.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   onClick={() => setSelected(session)}
                   className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl hover:border-blue-500/20 group transition-all cursor-pointer relative overflow-hidden"
                 >
                    <div className="flex justify-between items-start mb-8">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${session.status === 'Negotiating' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-slate-900 shadow-emerald-500/20'}`}>
                                {session.status}
                             </span>
                             <span className="text-[10px] font-mono font-bold text-slate-400">SESSION_ID: 0x{String(session.id || "").slice(0, 4)}42</span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 leading-none group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">{session.title}</h3>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Resolution Fidelity</p>
                          <p className="text-3xl font-black font-mono text-slate-900 tracking-tighter">{session.progress || 0}%</p>
                       </div>
                    </div>

                    <p className="text-sm text-slate-500 font-medium italic leading-relaxed mb-8 pr-12">"{session.desc || session.description}"</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                       <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                             {(session.parties || ["Citizens", "Government"]).map((p: any, pi: number) => (
                               <span key={pi} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black text-slate-600 uppercase tracking-widest">
                                  {p}
                               </span>
                             ))}
                          </div>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                             <Users size={14} />
                             {(session.participants || 0).toLocaleString()} Verified Delegates
                          </div>
                       </div>
                       <div className="flex justify-end gap-3">
                          <button className="flex-1 md:flex-none px-6 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all h-14">
                             View Ledger
                          </button>
                          <button className="flex-1 md:flex-none px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl h-14 font-mono">
                             Join Deck
                          </button>
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-3">
                       <Zap size={14} className="text-orange-500" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate italic font-medium">
                          <span className="text-slate-900">Latest Pulse:</span> {session.latestAction || "Awaiting transmission."}
                       </p>
                    </div>
                 </motion.div>
               ))}
            </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0F172A] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                 <Shield size={150} />
              </div>
              <div className="space-y-8 relative z-10">
                 <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-2">Mediation Engine</h3>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Civic Agreement Document</h2>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed italic font-medium">"Digital governance contracts are generated once a 75% consensus is reached between all mediating parties."</p>
                 
                 <div className="space-y-4">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 hover:bg-white/10 transition-all cursor-pointer">
                       <FileText size={24} className="text-emerald-500" />
                       <div className="space-y-1">
                          <p className="text-xs font-black uppercase">Standard CGOS-1 Agreement</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">SHA-256 Verified Protocol</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-white/10 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                       <span className="opacity-40">Active Observers</span>
                       <span className="text-emerald-400 font-mono italic">1,482 LIVE</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div animate={{ x: [-100, 100] }} transition={{ repeat: Infinity, duration: 3 }} className="w-1/2 h-full bg-emerald-500 shadow-lg glow-emerald" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50 pb-6 flex items-center gap-2">
                 <Hammer size={16} className="text-slate-900" />
                 Negotiation Toolkit
              </h3>
              <div className="space-y-3">
                 {[
                   { l: "Mediation Rules G1", i: Scale, c: "blue" },
                   { l: "Consensus API Stats", i: Activity, c: "emerald" },
                   { l: "Public Hearing Logs", i: Gavel, c: "slate" },
                   { l: "Digital Signature SDK", i: Lock, c: "emerald" }
                 ].map((res, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-900 hover:text-white transition-all cursor-pointer group shadow-sm">
                      <div className="flex items-center gap-4">
                         <res.i size={18} className={`text-${res.c}-500 group-hover:text-white`} />
                         <span className="text-[10px] font-black uppercase tracking-widest italic">{res.l}</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-white" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
      
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelected(null)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200"
            >
               <div className="p-10 space-y-8">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-8">
                     <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                           <Activity size={14} />
                           Live Multi-Party Stream
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{selected.title}</h3>
                     </div>
                     <button onClick={() => setSelected(null)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-mono text-slate-400 hover:text-slate-900 transition-all">X</button>
                  </div>

                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 italic">Active Transactional Ledger</h4>
                     <div className="space-y-4 max-h-80 overflow-y-auto no-scrollbar pr-4 flex flex-col-reverse">
                        {messages.length === 0 && (
                          <div className="p-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Quiet epoch. Initiating mediation logs...</p>
                          </div>
                        )}
                        {messages.map((m, i) => {
                          const isMe = m.authorId === auth.currentUser?.uid;
                          return (
                            <div key={i} className={`p-6 rounded-2xl border ${isMe ? 'bg-blue-600 text-white border-blue-500 self-end ml-12' : 'bg-slate-50 border-slate-100 self-start mr-12'}`}>
                               <div className="flex justify-between items-center mb-2 gap-4">
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${isMe ? 'text-blue-100' : 'text-blue-500'}`}>{m.authorName}</span>
                                  <span className={`text-[9px] font-mono font-bold uppercase ${isMe ? 'text-blue-200' : 'opacity-40'}`}>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                               </div>
                               <p className="text-xs italic font-medium leading-relaxed">"{m.content}"</p>
                            </div>
                          );
                        })}
                     </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex gap-4">
                     <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus-within:border-blue-500 transition-all">
                        <input 
                          type="text" 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Draft counter-proposal..." 
                          className="w-full bg-transparent text-xs font-bold uppercase tracking-widest outline-none placeholder:opacity-40 italic" 
                        />
                     </div>
                     <button 
                       onClick={handleSendMessage}
                       disabled={sending || !newMessage.trim()}
                       className="px-8 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl font-mono active:scale-95 disabled:opacity-50"
                     >
                        {sending ? 'Transmitting...' : 'Transmit Proposal'}
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
