import React from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  User, 
  Building, 
  MapPin, 
  DollarSign, 
  Camera, 
  Users, 
  ShieldCheck,
  TrendingUp,
  Layout
} from "lucide-react";
import { motion } from "motion/react";

import { db } from "./lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "./lib/firestoreUtils";
import { Project } from "./types";
import { useState, useEffect } from "react";

const MOCK_PROJECTS_FALLBACK = [
  {
    id: "1",
    title: "County Level 4 Hospital Maternity Wing",
    region: "Nyandarua Central",
    budget: 180000000,
    progress: 75,
    status: "On Track",
    contractor: "BuildEast Infrastructure Ltd",
    timeline: "Ends Oct 2026",
    color: "emerald",
    delayReason: null,
    citizenRating: 4.5,
    lastUpdate: "3 hours ago"
  }
];

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("progress", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsList);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "projects");
    });
    return () => unsubscribe();
  }, []);

  const displayProjects = projects.length > 0 ? projects : MOCK_PROJECTS_FALLBACK;

  const getStatusColor = (status: string) => {
    if (status?.toLowerCase().includes('delayed')) return 'orange';
    if (status?.toLowerCase().includes('on track')) return 'emerald';
    return 'blue';
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto pb-20 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em]">
             <Layout size={14} />
             Project Sovereignty Tracker
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Digital Construction Audit</h1>
          <p className="text-slate-500 italic font-medium">Every government project is a live object. Track budget, progress, and contractors in real-time.</p>
        </div>
        <div className="flex gap-4 items-center bg-white rounded-2xl border border-slate-200 p-4 shadow-xl">
          <div className="flex items-center gap-3 text-emerald-600 font-bold text-[10px] uppercase tracking-widest border-r border-slate-100 pr-6">
            <CheckCircle2 size={16} /> 
            <div className="flex flex-col">
               <span className="text-sm font-mono leading-none">{displayProjects.filter(p => p.progress === 100).length || 12}</span>
               <span className="opacity-60 text-[8px] mt-1">Completed</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-blue-600 font-bold text-[10px] uppercase tracking-widest border-r border-slate-100 pr-6">
            <Clock size={16} /> 
            <div className="flex flex-col">
               <span className="text-sm font-mono leading-none">{displayProjects.filter(p => p.progress > 0 && p.progress < 100).length || 54}</span>
               <span className="opacity-60 text-[8px] mt-1">Active</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-red-600 font-bold text-[10px] uppercase tracking-widest">
            <AlertTriangle size={16} /> 
            <div className="flex flex-col">
               <span className="text-sm font-mono leading-none">08</span>
               <span className="opacity-60 text-[8px] mt-1">Stalled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {displayProjects.map((project, i) => {
          const color = getStatusColor(project.status);
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all group flex flex-col xl:flex-row"
            >
              <div className={`w-3 xl:w-8 bg-${color}-500 shrink-0 shadow-lg`} />
              
              <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white italic ${color === 'orange' ? 'bg-orange-500 shadow-orange-500/20' : color === 'emerald' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-blue-500 shadow-blue-500/20'}`}>
                      {project.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">TRANSACTION_ID: PRJ-00{String(project.id).slice(0, 4)}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 leading-none tracking-tighter uppercase italic group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                      <span className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100"><MapPin size={12} className="text-slate-400" /> {project.region || 'National'}</span>
                      <span className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100"><Building size={12} className="text-slate-400" /> {project.contractor || 'Public Tender'}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-4 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp size={64} />
                     </div>
                     <div className="flex justify-between items-end relative z-10">
                        <div className="space-y-1">
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Budget Execution</p>
                           <p className="text-2xl font-black font-mono tracking-tighter text-emerald-400">KES {typeof project.budget === 'number' ? (project.budget / 1e6).toFixed(0) + 'M' : project.budget}</p>
                        </div>
                        <div className="text-right space-y-1">
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Est. Completion</p>
                           <p className="text-sm font-black italic">{project.timeline || 'TBA'}</p>
                        </div>
                     </div>
                  </div>

                {project.delayReason && (
                   <div className="flex items-center gap-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-700 italic">
                      <AlertTriangle size={18} className="shrink-0" />
                      <p className="text-[10px] font-bold">DELAY_PROTOCOL: {project.delayReason}</p>
                   </div>
                )}
              </div>

              <div className="lg:col-span-3 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Physical Audit Progress</span>
                     <span className="text-3xl font-black font-mono text-slate-900 tracking-tighter leading-none">{project.progress}%</span>
                   </div>
                   <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner p-[1px]">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${project.progress}%` }}
                       className="h-full bg-slate-900 rounded-full group-hover:bg-emerald-500 transition-colors"
                     />
                   </div>
                   <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse glow-emerald" />
                      <span>Node Verification Sync: {project.lastUpdate}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center space-y-1 group-hover:border-emerald-500/20 transition-all">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Citizen Score</p>
                      <p className="text-lg font-black font-mono text-slate-900">{project.citizenRating}/5</p>
                   </div>
                   <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center space-y-1 group-hover:border-emerald-500/20 transition-all">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Feedbacks</p>
                      <p className="text-lg font-black font-mono text-slate-900">842</p>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col justify-between items-stretch gap-4">
                <div className="relative h-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden group/image cursor-pointer">
                   <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity z-10">
                      <Camera size={32} className="text-white mb-2" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">View Audit Photo</span>
                   </div>
                   <img 
                      src={`https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=400&h=400&fit=crop`} 
                      alt="Project site" 
                      className="w-full h-full object-cover grayscale group-hover/image:grayscale-0 transition-all" 
                   />
                </div>
                <button className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all shadow-xl font-mono active:scale-95">
                  Interrogate Audit
                </button>
              </div>
            </div>
          </motion.div>
        )})}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-12"
      >
        <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none">
           <ShieldCheck size={300} />
        </div>
        <div className="flex-1 space-y-6 relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[9px] font-black uppercase tracking-widest">
              <Users size={14} />
              Citizen Audit Protocol
           </div>
           <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">Become a Project Auditor</h2>
           <p className="text-xl text-slate-400 font-medium italic max-w-xl pr-12">
             "Verified citizens who live within 5km of a project site can submit photgraphic evidence and verify milestone completion for Authority Points."
           </p>
        </div>
        <div className="relative z-10">
           <button className="px-12 py-6 bg-emerald-500 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-500/40 hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 font-mono">
              Apply for Audit Node
           </button>
        </div>
      </motion.div>
    </div>
  );
};
