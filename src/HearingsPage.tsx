import React from 'react';
import { motion } from 'motion/react';
import { 
  Radio, 
  Users, 
  MessageSquare, 
  Mic2, 
  Video, 
  Calendar, 
  Clock, 
  Play,
  Gavel,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const sessions = [
  {
    id: 1,
    title: "County Budget Public Participation Session",
    host: "Ministry of Finance",
    status: "live",
    viewers: 1242,
    desc: "Discussing the allocation of KES 1.2B for rural roads and water infrastructure.",
    tags: ["Budget", "Infrastructure"],
    color: "emerald"
  },
  {
    id: 2,
    title: "Project Audit Hearing: Ward 4 Bridge",
    host: "Judicial Committee",
    status: "upcoming",
    time: "14:00 UTC",
    desc: "Reviewing evidence of structural variance and material quality complaints.",
    tags: ["Audit", "Legal"],
    color: "blue"
  },
  {
    id: 3,
    title: "Healthcare Service Standards Review",
    host: "Health Oversight Office",
    status: "recorded",
    date: "12 May 2026",
    desc: "Assessment of hospital equipment delivery and staffing levels across the sub-county.",
    tags: ["Health", "Standards"],
    color: "orange"
  }
];

export const HearingsPage = () => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-500 font-bold text-[10px] uppercase tracking-[0.3em]">
             <Radio size={14} className="animate-pulse" />
             Live Civic Broadcast Protocol
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Civic Hearings</h1>
          <p className="text-slate-500 italic font-medium">Synchronous governance. Watch, participate, and hold officials accountable in real-time.</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-2">
              <Users size={14} />
              Live Now: 3.4K Citizens
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
           {/* Featured Live Session */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-slate-900 rounded-[2.5rem] overflow-hidden text-white relative flex flex-col min-h-[500px] shadow-2xl"
           >
              <div className="absolute inset-0 opacity-20 technical-grid pointer-events-none" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                 <div className="bg-red-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    Live Transmission
                 </div>
                 <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    Sovereign Feed 042
                 </div>
              </div>

              <div className="p-12 flex-1 flex flex-col justify-center items-center text-center space-y-8 relative z-10">
                 <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group cursor-pointer hover:bg-emerald-500 transition-all shadow-2xl">
                    <Play size={40} className="text-white group-hover:text-slate-900 transition-colors ml-2" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none max-w-2xl">
                       County Budget Public Participation Session
                    </h2>
                    <p className="text-xl text-slate-400 font-medium italic max-w-lg mx-auto">
                       "Officials are currently explaining the KES 420M allocation for the Ol Kalou Market expansion."
                    </p>
                 </div>
                 <div className="flex flex-wrap justify-center gap-4">
                    {["Budget_2026", "Infrastructure", "Public_Sync"].map(tag => (
                       <span key={tag} className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded">#{tag}</span>
                    ))}
                 </div>
              </div>

              <div className="p-6 bg-white/5 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" />
                       ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">1,242 Citizens Participating</span>
                 </div>
                 <div className="flex gap-2">
                    <button className="bg-emerald-500 text-slate-900 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-emerald-400 transition-all font-mono">
                       Ask Question
                    </button>
                    <button className="bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
                       Submit Evidence
                    </button>
                 </div>
              </div>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sessions.slice(1).map((session, i) => (
                <div key={session.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl space-y-6 hover:shadow-2xl transition-all">
                   <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-xl bg-slate-50 text-slate-400 font-bold text-[9px] uppercase tracking-widest`}>
                         {session.status === 'upcoming' ? (
                           <div className="flex items-center gap-2 text-blue-500">
                             <Calendar size={14} />
                             {session.time}
                           </div>
                         ) : (
                           <div className="flex items-center gap-2 text-orange-500">
                             <CheckCircle2 size={14} />
                             {session.date}
                           </div>
                         )}
                      </div>
                      <Mic2 size={18} className="text-slate-300" />
                   </div>
                   <h3 className="text-xl font-bold uppercase italic tracking-tight leading-tight">{session.title}</h3>
                   <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">"{session.desc}"</p>
                   <button className="w-full py-4 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                      {session.status === 'upcoming' ? 'Set Reminder' : 'Watch Recording'}
                   </button>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-8 bg-slate-50 border-b border-slate-200">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                    <MessageSquare size={14} className="text-emerald-500" />
                    Live Participation Feed
                 </h3>
              </div>
              <div className="p-8 space-y-6 max-h-[600px] overflow-auto no-scrollbar">
                 {[
                   { user: "Citizen_Kiama", msg: "Will the KES 420M cover the drainage systems as well?", time: "2m ago" },
                   { user: "Validator_A", msg: "The procurement docs show drainage is a separate budget item.", time: "1m ago" },
                   { user: "Official_Wairimu", msg: "Excellent question. Drainage is integrated into the Phase 2 budget.", time: "Just now" },
                   { user: "Citizen_Kariuki", msg: "We need to see the vendor list for transparency.", time: "Just now" },
                 ].map((chat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                         <span className={chat.user.startsWith('Official') ? 'text-blue-500' : chat.user.startsWith('Validator') ? 'text-emerald-500' : 'text-slate-400'}>{chat.user}</span>
                         <span className="opacity-40">{chat.time}</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-[10px] font-medium italic leading-relaxed">
                         "{chat.msg}"
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-6 border-t border-slate-200 bg-white">
                 <div className="flex gap-2">
                    <input 
                      placeholder="Comment..." 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-all font-mono">
                       <Play size={16} />
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-emerald-500 p-8 rounded-[2rem] text-slate-900 space-y-4 shadow-2xl">
              <div className="flex justify-between items-start">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em]">Oversight Token</h4>
                 <TrendingUp size={20} />
              </div>
              <p className="text-[10px] font-bold italic leading-relaxed">"Participating in live hearings increases your Authority Status and unlocks higher-level audit tools."</p>
              <div className="flex items-end justify-between">
                 <div>
                    <p className="text-[9px] uppercase font-bold opacity-60 mb-0.5 tracking-widest">Current Multiplier</p>
                    <p className="text-2xl font-black font-mono">2.4x</p>
                 </div>
                 <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest">Active Booster</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
