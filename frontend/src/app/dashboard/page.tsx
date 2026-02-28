"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  BrainCircuit, 
  MessageSquare, 
  Activity, 
  UploadCloud,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If user unauthenticates, dashboard should ideally have a protected route wrapper, 
  // but we can fast-fail here.
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Documents", value: "3", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Questions Asked", value: "48", icon: MessageSquare, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Quizzes Taken", value: "12", icon: BrainCircuit, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Learning Score", value: "94%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  const recentDocs = [
    { id: 1, title: "Biology_101_Syllabus.pdf", date: "2 hours ago", size: "2.4 MB" },
    { id: 2, title: "Machine_Learning_Notes.pdf", date: "Yesterday", size: "5.1 MB" },
    { id: 3, title: "Historical_Events_Summary.pdf", date: "3 days ago", size: "1.2 MB" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your study materials today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition shadow-sm">
            <Activity className="w-4 h-4" />
            View Analytics
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.title} 
            className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Quick Upload</h2>
          <div className="border-2 border-dashed border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-card/30 hover:bg-card/50 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload new document</h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Drag and drop your PDF course materials here, or click to browse. We'll automatically process it for AI chat and quizzes.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition shadow-md">
              Select PDF File
            </button>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Files</h2>
            <Link href="/dashboard/library" className="text-sm text-primary hover:underline flex items-center">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentDocs.map((doc, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                key={doc.id} 
                className="p-4 rounded-xl bg-card border border-border flex items-center gap-4 group hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{doc.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-xs text-muted-foreground">{doc.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Action */}
          <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-semibold text-lg mb-2">Ready for a Quiz?</h3>
              <p className="text-sm text-muted-foreground mb-4">Test your knowledge on Biology 101 Notes.</p>
              <button className="w-full bg-background border border-border shadow-sm text-foreground py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                Start Quiz
              </button>
            </div>
            <BrainCircuit className="absolute -bottom-4 -right-4 w-24 h-24 text-indigo-500/10 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
