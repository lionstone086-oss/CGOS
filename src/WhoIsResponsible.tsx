import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const WhoIsResponsible = () => {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = () => {
    if (!query) return;
    setSearching(true);
    setResult(null);
    
    // Simulate AI Search
    setTimeout(() => {
      setResult({
        office: "Department of Infrastructure & Public Works",
        official: "Eng. Robert Karuri",
        role: "Chief Officer",
        location: "County Headquarters, Block B, 2nd Floor",
        budgetSource: "County Revenue Fund (CRF) - Road Maintenance Levy",
        contact: {
          phone: "+254 7XX XXX XXX",
          email: "infrastructure@nyandarua.go.ke"
        },
        escalationPath: "County Executive Committee Member (CECM) -> Governor",
        requirements: ["Geotagged Photo", "Location ID", "Citizen Witness"],
        avgResponse: "14 working days"
      });
      setSearching(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 py-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-emerald-400 bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/10"
        >
          <Sparkles size={16} />
          Responsible Office Identification Protocol
        </motion.div>
        <h1 className="text-6xl font-black tracking-tighter text-slate-900 uppercase italic">Who is responsible?</h1>
        <p className="text-xl text-slate-500 font-medium italic max-w-2xl mx-auto">
          "The AI layer that maps issues to the exact government office responsible. No more confusion, no more bouncing between offices."
        </p>
      </div>

      <div className="relative group max-w-3xl mx-auto">
         <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition-opacity duration-1000" />
         <div className="relative flex items-center bg-white border border-slate-200 rounded-[2rem] p-3 shadow-2xl overflow-hidden">
            <div className="w-14 h-14 flex items-center justify-center text-slate-400">
               <Search size={24} />
            </div>
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ask anything... Who fixes bypass road in Ol Kalou?"
              className="flex-1 bg-transparent outline-none text-lg font-medium text-slate-900 py-4 placeholder:italic"
            />
            <button 
              onClick={handleSearch}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl hover:bg-emerald-500 transition-all active:scale-95 flex items-center gap-2 font-mono"
            >
               {searching ? 'Processing...' : 'Ask CGOS AI'}
               {!searching && <ArrowRight size={14} />}
            </button>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {searching && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-6 py-12"
          >
             <div className="w-16 h-1 w-48 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-full w-1/2 bg-emerald-500"
                />
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Mapping Institutional Responsibility Nodes...</p>
          </motion.div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-2xl space-y-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Building2 size={120} />
                 </div>
                 <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                       <ShieldCheck size={14} />
                       Verified Office Accountable
                    </div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none border-b border-slate-100 pb-6">{result.office}</h2>
                 </div>

                 <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-5">
                       <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden">
                          <User size={32} />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 italic">Responsible Official</p>
                          <h4 className="text-xl font-bold uppercase italic tracking-tighter">{result.official}</h4>
                          <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded uppercase mt-1">{result.role}</p>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-medium italic">
                          <MapPin size={16} className="text-slate-400" />
                          {result.location}
                       </div>
                       <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-2xl text-white text-xs font-bold italic shadow-xl">
                          <Clock size={16} className="text-emerald-400" />
                          Avg. Resolution: {result.avgResponse}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6 shadow-2xl border border-slate-800">
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Reporting Protocol</p>
                       <h3 className="text-2xl font-black uppercase italic tracking-tighter">Escalation Path</h3>
                    </div>
                    <div className="space-y-4">
                       {result.escalationPath.split(' -> ').map((step: string, i: number) => (
                         <div key={i} className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold font-mono">0{i+1}</div>
                            <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-bold uppercase tracking-widest italic">{step}</div>
                            {i < 2 && <ChevronRight size={14} className="text-white/20" />}
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl space-y-6">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4 flex items-center gap-2">
                       <AlertCircle size={14} className="text-orange-500" />
                       Mandatory Requirements
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                       {result.requirements.map((req: string, i: number) => (
                         <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {req}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex gap-4">
               <button className="flex-1 bg-emerald-500 text-slate-900 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all font-mono active:scale-95 h-20">
                  Initiate Official Report
               </button>
               <button className="flex-1 bg-slate-900 text-white py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 h-20">
                  View Budget Source <ExternalLink size={16} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-slate-100 border border-slate-200 rounded-[2.5rem] p-12 text-center space-y-6">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em]">Viral Capability Check</h4>
         <p className="text-sm text-slate-500 italic max-w-xl mx-auto font-medium">
           "This system uses verified government gazettes, procurement reports, and county charters to ensure institutional accuracy."
         </p>
         <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
               <p className="text-2xl font-black text-slate-900 font-mono tracking-tighter uppercase">542</p>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Offices Mapped</p>
            </div>
            <div className="w-px h-10 bg-slate-300" />
            <div className="text-center">
               <p className="text-2xl font-black text-slate-900 font-mono tracking-tighter uppercase">12K+</p>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Civic Queries</p>
            </div>
         </div>
      </div>
    </div>
  );
};
