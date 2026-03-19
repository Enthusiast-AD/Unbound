"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  BrainCircuit, 
  MessageSquare, 
  Activity, 
  UploadCloud,
  ChevronRight,
  TrendingUp,
  Clock,
  Zap,
  MoreHorizontal
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [recentDocs, setRecentDocs] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      api.get("/books")
        .then(res => {
           if (Array.isArray(res.data)) {
               setRecentDocs(res.data.slice(0, 3));
           }
        })
        .catch(err => console.error("Could not fetch recent docs", err));
    }
  }, [user]);

  const statCards = [
    { title: "Total Documents", value: "12", change: "+2 this week", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { title: "Knowledge Gap", value: "84%", change: "+5% improvement", icon: Activity, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { title: "Quiz Average", value: "92%", change: "Top 10%", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { title: "Study Streaks", value: "5 Days", change: "Keep it up!", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Overview
          </h1>
          <p className="text-gray-400">Welcome back, {user?.firstName}. Here is your learning activity.</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="bg-[#0a0a0a] border border-white/5 px-4 py-2 rounded-xl text-sm text-gray-400 flex items-center gap-2">
                <Clock size={14} />
                <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
             </div>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Streak - Hero Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 p-6 rounded-[1.5rem] bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 relative overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
             <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500/20 text-orange-500 rounded-lg">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="text-orange-200 font-medium">Study Streak</span>
                 </div>
                 <h3 className="text-4xl font-bold text-white mb-1">5 Days</h3>
                 <p className="text-orange-200/60 text-sm">You're on fire! Keep it up to reach a 7-day streak.</p>
             </div>
             
             {/* Visual representation of days */}
             <div className="flex gap-2 mt-4 relative z-10">
                 {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                     <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 5 ? 'bg-orange-500 text-black' : 'bg-white/5 text-gray-500'}`}>
                         {day}
                     </div>
                 ))}
             </div>

             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full pointer-events-none" />
        </motion.div>

        {/* Quiz Average */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-[1.5rem] bg-[#0a0a0a] border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors relative overflow-hidden group"
        >
             <div className="flex justify-between items-start mb-4">
                 <div>
                     <p className="text-gray-400 text-sm font-medium">Quiz Average</p>
                     <h3 className="text-3xl font-bold text-white mt-1">92%</h3>
                 </div>
                 <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                     <BrainCircuit size={20} />
                 </div>
             </div>
             <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-purple-500 h-full w-[92%] rounded-full" />
             </div>
             <p className="text-xs text-purple-400 mt-2 font-medium">Top 10% of users</p>
        </motion.div>

        {/* Knowledge Gap & Total Docs - Split Column */}
        <div className="space-y-4">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-[1.5rem] bg-[#0a0a0a] border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors"
            >
                 <div>
                     <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Documents</p>
                     <h3 className="text-2xl font-bold text-white">12</h3>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                     <FileText size={18} />
                 </div>
            </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-5 rounded-[1.5rem] bg-[#0a0a0a] border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors"
            >
                  <div>
                     <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Knowledge Gap</p>
                     <h3 className="text-2xl font-bold text-white">84%</h3>
                 </div>
                 <div className="text-emerald-400 flex items-center text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-md">
                     +5%
                 </div>
            </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Main Chart / Activity Area (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
            <div className="rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8 flex-1 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-white">Learning Activity</h3>
                     <select className="bg-black/20 border border-white/5 text-gray-400 text-sm rounded-lg px-3 py-1 outline-none">
                         <option>This Week</option>
                         <option>Last Month</option>
                     </select>
                </div>
                
                {/* Mock Chart Visualization */}
                <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4">
                    {[40, 65, 30, 85, 55, 90, 45, 60, 75, 50, 80, 65].map((h, i) => (
                         <div key={i} className="w-full bg-white/5 hover:bg-orange-500/80 transition-colors rounded-t-lg relative group" style={{ height: `${h}%` }}>
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                 {h}%
                             </div>
                         </div>
                    ))}
                </div>
                 <div className="flex justify-between text-xs text-gray-500 px-4 mt-2">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Action 1 */}
                 <div onClick={() => router.push('/dashboard/library')} className="group cursor-pointer rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-6 hover:border-orange-500/30 transition-all relative overflow-hidden">
                     <div className="relative z-10 space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-500">
                             <UploadCloud size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-white">Upload Documents</h4>
                        <p className="text-sm text-gray-400">Drag & drop course materials to generate quizzes instantly.</p>
                     </div>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-10 transition-all duration-300">
                         <ChevronRight className="text-white" />
                     </div>
                 </div>

                 {/* Quick Action 2 */}
                 <div className="group cursor-pointer rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-6 hover:border-purple-500/30 transition-all relative overflow-hidden">
                     <div className="relative z-10 space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform duration-500">
                             <BrainCircuit size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-white">Start Quiz</h4>
                        <p className="text-sm text-gray-400">Test your knowledge on recent topics.</p>
                     </div>
                 </div>
            </div>
        </div>

        {/* Right Sidebar (1/3) */}
        <div className="space-y-6">
           {/* Recent Files */}
           <div className="rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-6 h-full min-h-[400px]">
               <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Recent Files</h3>
                    <Link href="/dashboard/library" className="text-sm text-orange-500 hover:text-orange-400">View All</Link>
               </div>
               
               <div className="space-y-4">
                 {recentDocs.length > 0 ? recentDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-lg bg-[#050505] flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors">
                            <FileText size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium text-white truncate">{doc.title}</h5>
                            <p className="text-xs text-gray-500">{new Date(doc.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button className="text-gray-500 hover:text-white">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                 )) : (
                     <div className="text-center py-10 text-gray-500 text-sm">
                         No files yet. Upload one!
                     </div>
                 )}
               </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4">Study Focus</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-orange-300">In Progress</span>
                                <span className="text-xs font-bold text-white">75%</span>
                            </div>
                            <h4 className="text-white font-medium text-sm mb-3">Biology Chapter 4: Cells</h4>
                            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[75%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
}
