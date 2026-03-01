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
  Menu,
  X,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Library", href: "/dashboard/library", icon: BookOpen },
    { name: "Chat Sessions", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isDesktopSidebarCollapsed ? "80px" : "256px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col border-r border-border bg-card/50 backdrop-blur-sm relative"
      >
        {/* Collapse Toggle Button */}
        <button 
          onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
          className="absolute -right-3.5 top-8 bg-card border border-border rounded-full p-1 z-10 hover:bg-secondary transition-colors"
        >
          {isDesktopSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        <div className="p-6 flex items-center overflow-hidden whitespace-nowrap">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl shrink-0">
            {isDesktopSidebarCollapsed ? "U." : "Unbound."}
          </Link>
        </div>
        
        <div className="px-4 pb-6 overflow-hidden">
          <button className={`w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm ${isDesktopSidebarCollapsed ? "px-0" : "px-4"}`}>
            <Plus className="w-5 h-5 shrink-0" />
            {!isDesktopSidebarCollapsed && <span className="whitespace-nowrap">New Doc</span>}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            // Fix absolute match for root items if needed, but simple startsWith works mostly.
            // Better exact match logic:
            const isMatch = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isDesktopSidebarCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 py-2.5 rounded-lg transition-colors ${isDesktopSidebarCollapsed ? "justify-center px-0" : "px-3"} ${
                  isMatch 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isMatch ? "text-primary" : ""}`} />
                {!isDesktopSidebarCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto overflow-hidden">
          {!isDesktopSidebarCollapsed ? (
            <div className="mb-4 px-3 py-2 bg-muted/50 rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          ) : (
             <div className="mb-4 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0" title={user?.email}>
                {user?.firstName?.[0] || 'U'}
              </div>
             </div>
          )}
          <button 
            onClick={logout}
            title={isDesktopSidebarCollapsed ? "Sign Out" : undefined}
            className={`w-full flex items-center gap-3 py-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ${isDesktopSidebarCollapsed ? "justify-center px-0" : "px-3"}`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isDesktopSidebarCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Header & Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-40 flex items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl text-primary">Unbound.</Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-muted-foreground hover:text-foreground">
          <Menu className="w-6 h-6" />
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
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.aside 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-3/4 max-w-sm border-r border-border bg-card z-50 flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                <span className="font-bold text-xl text-primary">Unbound.</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-muted-foreground hover:text-foreground">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4">
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium shadow-sm">
                  <Plus className="w-5 h-5" />
                  New Document
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
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border">
                <div className="mb-4 px-3 py-2 bg-muted/50 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <div className="flex-1 p-6 lg:p-10 overflow-auto hide-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
