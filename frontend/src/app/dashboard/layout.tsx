"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  MessageSquare, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Library", href: "/dashboard/library", icon: BookOpen },
    { name: "Chat Sessions", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex selection:bg-orange-500/30 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isDesktopSidebarCollapsed ? "80px" : "280px",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col border-r border-white/5 bg-[#0a0a0a] m-4 rounded-[2rem] relative shadow-2xl z-20"
      >
        {/* Header */}
        <div className={`p-8 flex items-center ${isDesktopSidebarCollapsed ? "justify-center" : "justify-between"}`}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all shrink-0">
                 <span className="text-black font-serif italic font-bold">U.</span>
            </div>
            {!isDesktopSidebarCollapsed && (
                <span className="text-xl font-medium tracking-tight text-white whitespace-nowrap overflow-hidden">Unbound.</span>
            )}
          </Link>
        </div>

        {/* Action Button */}
        <div className={`px-6 mb-8 transition-all ${isDesktopSidebarCollapsed ? "px-4" : ""}`}>
            <button className={`w-full bg-orange-600 hover:bg-orange-500 text-white rounded-xl flex items-center justify-center gap-2 transition-all p-3 shadow-lg shadow-orange-900/20 group ${isDesktopSidebarCollapsed ? "aspect-square p-0" : ""}`}>
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                {!isDesktopSidebarCollapsed && <span className="font-medium text-sm whitespace-nowrap">New Upload</span>}
            </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-white/10 text-white shadow-inner" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                } ${isDesktopSidebarCollapsed ? "justify-center px-2" : ""}`}
              >
                <item.icon size={20} className={`shrink-0 ${isActive ? "text-orange-400" : "group-hover:text-white transition-colors"}`} />
                {!isDesktopSidebarCollapsed && (
                    <span className="font-medium text-sm whitespace-nowrap overflow-hidden">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User / Footer */}
        <div className="p-4 mt-auto border-t border-white/5">
            <div className={`bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-white/5 ${isDesktopSidebarCollapsed ? "justify-center p-2" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-purple-500 p-[1px] shrink-0">
                     <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{user?.firstName?.[0] || "U"}</span>
                     </div>
                </div>
                {!isDesktopSidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{user?.firstName || "User"}</div>
                        <div className="text-xs text-gray-500 truncate">{user?.email || "Student"}</div>
                    </div>
                )}
                {!isDesktopSidebarCollapsed && (
                    <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors">
                        <LogOut size={18} />
                    </button>
                )}
            </div>
        </div>
        
        {/* Collapse Toggle - Absolute positioned on the border */}
        <button 
            onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
            className="absolute top-1/2 -right-3 w-6 h-12 bg-[#0a0a0a] border border-white/10 rounded-r-lg flex items-center justify-center text-gray-500 hover:text-white hover:w-8 transition-all z-50 transform -translate-y-1/2 shadow-xl"
        >
            {isDesktopSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </motion.aside>

      {/* Mobile Header & Sidebar Overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] border-b border-white/5 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                 <span className="text-black font-serif italic font-bold">U.</span>
            </div>
            <span className="text-xl font-medium tracking-tight text-white">Unbound.</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-400 hover:text-white">
          <Menu size={24} />
        </button>
      </div>

       <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.aside 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#0a0a0a] border-r border-white/10 z-50 flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                         <span className="text-black font-serif italic font-bold">U.</span>
                    </div>
                    <span className="text-xl font-medium tracking-tight text-white">Unbound.</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                 <button className="w-full bg-orange-600 hover:bg-orange-500 text-white rounded-xl flex items-center justify-center gap-2 transition-all p-3 shadow-lg shadow-orange-900/20">
                    <Plus size={20} />
                    <span className="font-medium text-sm">New Upload</span>
                </button>
              </div>

               <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        isActive 
                            ? "bg-white/10 text-white shadow-inner" 
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

               <div className="p-4 mt-auto border-t border-white/5">
                <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-white/5 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-purple-500 p-[1px] shrink-0">
                         <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{user?.firstName?.[0] || "U"}</span>
                         </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{user?.firstName || "User"}</div>
                        <div className="text-xs text-gray-500 truncate">{user?.email || "Student"}</div>
                    </div>
                </div>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all border border-white/5"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-hidden flex flex-col relative pt-16 lg:pt-0">
         {/* Top Bar - Desktop only for search, keeping it clean */}
         <header className="hidden lg:flex h-24 items-center justify-between px-8">
             <div className="flex-1 max-w-xl">
                 <div className="relative group">
                     <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                     <input 
                        type="text" 
                        placeholder="Search for documents, topics, or quizzes..." 
                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-full pl-12 pr-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all shadow-sm"
                     />
                 </div>
             </div>
             
             <div className="flex items-center gap-4">
                 <button className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/10 transition-all relative group shadow-sm">
                     <Bell size={18} className="group-hover:rotate-12 transition-transform" />
                     <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                 </button>
             </div>
         </header>

         {/* Scrollable Content Container */}
         <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4 lg:px-8 lg:pb-8">
            {children}
         </div>
      </main>
    </div>
  );
}
