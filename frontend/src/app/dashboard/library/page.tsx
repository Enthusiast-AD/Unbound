"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, MoreVertical, Plus, FileText, Loader2, ArrowRight, Search, Filter } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

interface Book {
  _id: string;
  title: string;
  processingStatus: string;
  createdAt: string;
  fileUrl: string;
}

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "processing": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "failed": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-white/5 text-gray-400 border-white/10";
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Library</h1>
          <p className="text-gray-400">Manage your uploaded PDFs and study materials.</p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Search - Mobile/Tablet only since Layout has top search */}
             <div className="relative group md:hidden">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-[#0a0a0a] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all w-32 focus:w-48"
                />
            </div>
            
             <button className="flex items-center gap-2 bg-[#0a0a0a] hover:bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                <Filter size={16} className="text-gray-400" />
                <span>Filter</span>
            </button>
            
            <div className="relative">
                <input 
                    type="file" 
                    accept=".pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                        try {
                            const formData = new FormData();
                            formData.append("title", e.target.files[0].name);
                            formData.append("file", e.target.files[0]);
                            
                            // Optimistic UI update could go here
                            await api.post("/books", formData);
                            fetchBooks(); 
                        } catch (error) {
                            console.error("Failed to upload book", error);
                        }
                        }
                    }}
                    />
                <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-900/20">
                    <Plus size={16} />
                    <span>Upload New</span>
                </button>
            </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-[2rem] bg-[#0a0a0a] border border-white/5 border-dashed">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Your library is empty</h3>
          <p className="text-gray-400 mb-8 max-w-sm text-center text-sm">Upload your first PDF textbook or document to start interacting with it alongside your AI tutor.</p>
          
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <input 
              type="file" 
              accept=".pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  try {
                    const formData = new FormData();
                    formData.append("title", e.target.files[0].name);
                    formData.append("file", e.target.files[0]);
                    await api.post("/books", formData);
                    fetchBooks();
                  } catch (error) {
                    console.error("Failed to upload book", error);
                  }
                }
              }}
            />
            <button className="relative flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl font-medium border border-white/10 hover:bg-zinc-900 transition-all">
               <Plus size={18} /> Upload PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={book._id}
              className="group bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] overflow-hidden hover:border-white/20 transition-all flex flex-col relative"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 flex items-center justify-center text-gray-300 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-all">
                    <FileText className="w-6 h-6" />
                  </div>
                  <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className="font-bold text-lg text-white line-clamp-2 mb-2 group-hover:text-orange-400 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Added on {new Date(book.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(book.processingStatus)}`}>
                     {book.processingStatus === "processing" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                     {book.processingStatus.charAt(0).toUpperCase() + book.processingStatus.slice(1)}
                  </span>
                </div>
              </div>

               {/* Hover Overlay Action */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 cursor-pointer pointer-events-none group-hover:pointer-events-auto">
                {book.processingStatus === "completed" ? (
                  <Link href={`/dashboard/book/${book._id}`} className="w-full bg-white text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-200">
                    Open Reader <ArrowRight size={18} />
                  </Link>
                ) : (
                  <div className="text-white font-medium flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                     <Loader2 className="animate-spin" size={18} /> Processing...
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
