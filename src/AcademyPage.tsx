import React from "react";
import { GraduationCap, BookOpen, Trophy, Play, CheckCircle2, Award, Zap } from "lucide-react";
import { motion } from "motion/react";

const COURSES = [
  {
    id: 1,
    title: "The Constitution 101",
    desc: "Understanding individual rights and government limitations.",
    progress: 100,
    modules: 12,
    xp: 500,
    icon: BookOpen,
    completed: true,
  },
  {
    id: 2,
    title: "Public Participation 2.0",
    desc: "How to effectively engage in ward-level budget sessions.",
    progress: 45,
    modules: 8,
    xp: 350,
    icon: Zap,
    completed: false,
  },
  {
    id: 3,
    title: "Anti-Corruption Literacy",
    desc: "Detecting ghost projects and tracking fiscal procurement.",
    progress: 0,
    modules: 15,
    xp: 1200,
    icon: GraduationCap,
    completed: false,
  }
];

export const AcademyPage = () => {
  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600">
            <GraduationCap size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Civic Education Academy</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-none">Continuity Learning Layer</h2>
          <p className="text-slate-500 text-sm italic">Master the mechanics of governance to better influence national outcomes.</p>
        </div>
        
        <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-right">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total Civic XP</p>
             <p className="text-xl font-bold font-mono text-slate-900 leading-none">12,840</p>
          </div>
          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-emerald-400 shadow-xl">
             <Trophy size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-2">
             <h3 className="font-bold text-slate-900">Enrolled Curriculums</h3>
             <button className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest border-b border-emerald-200 pb-1">Browse All Units</button>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
             {COURSES.map((course, i) => (
               <motion.div 
                 key={course.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group hover:border-slate-300 transition-all flex flex-col md:flex-row gap-6 items-center"
               >
                 <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                    <course.icon size={32} />
                 </div>
                 
                 <div className="flex-1 space-y-2 p-2">
                    <div className="flex justify-between items-start">
                       <div>
                         <h4 className="font-bold text-slate-900">{course.title}</h4>
                         <p className="text-xs text-slate-500 mt-1 italic leading-relaxed">{course.desc}</p>
                       </div>
                       {course.completed && <CheckCircle2 size={16} className="text-emerald-500" />}
                    </div>
                    
                    <div className="pt-4 flex items-center gap-6">
                       <div className="flex-1 space-y-2">
                         <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                           <span>Module Progress</span>
                           <span className="text-slate-900">{course.progress}%</span>
                         </div>
                         <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            className="h-full bg-slate-900 rounded-full"
                          />
                         </div>
                       </div>
                       <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-100">
                          {course.progress > 0 ? "Continue" : "Enroll"} <Play size={12} fill="currentColor" />
                       </button>
                    </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0F172A] text-white p-8 rounded-xl shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <GraduationCap size={120} />
              </div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4 leading-none">Scholarship Status</p>
              <h3 className="text-2xl font-bold font-mono tracking-tighter">Certified Advocate</h3>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed font-medium italic">
                "You have demonstrated exceptional understanding of Article 1 of the Constitution. Your participation weight in ward priorities is now adjusted to 1.2x."
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <span>Certificates Issued</span>
                    <span>04</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 bg-white/5 border border-white/10 rounded flex items-center justify-center text-emerald-400">
                        <Award size={16} />
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-4">Daily Civic Quiz</h3>
              <div className="space-y-4">
                 <p className="text-sm font-bold text-slate-900 leading-snug">"Who has the power to recall an elected Member of Parliament according to Section 45 of CC-Act?"</p>
                 <div className="space-y-2">
                    {["The President", "The EACC", "The Registered Voters", "The Speaker"].map((opt, i) => (
                      <button key={i} className="w-full text-left p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-all text-[11px] font-medium text-slate-600">
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
