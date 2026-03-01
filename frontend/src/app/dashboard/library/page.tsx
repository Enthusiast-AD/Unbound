"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, MoreVertical, Plus, FileText, Loader2, ArrowRight } from "lucide-react";
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
      case "completed": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "processing": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "failed": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-secondary text-muted-foreground border-border";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Library</h1>
          <p className="text-muted-foreground">Manage your uploaded PDFs and study materials.</p>
        </div>
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
                    
                    // Axios automatically sets multipart/form-data and boundary with FormData
                    await api.post("/books", formData);
                    fetchBooks(); // Refresh list after upload
                  } catch (error) {
                    console.error("Failed to upload book", error);
                  }
                }
              }}
            />
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition shadow-sm w-fit pointer-events-none">
            <Plus className="w-4 h-4" />
            Upload Document
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl bg-card/30">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Your library is empty</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Upload your first PDF textbook or document to start interacting with it alongside your AI tutor.</p>
          <div className="relative inline-block mt-4">
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
                    
                    // Axios automatically sets multipart/form-data and boundary with FormData
                    await api.post("/books", formData);
                    fetchBooks();
                  } catch (error) {
                    console.error("Failed to upload book", error);
                  }
                }
              }}
            />
            <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition shadow-md pointer-events-none">
              Upload PDF
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
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/30 flex flex-col"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <button className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className="font-semibold text-lg line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Added on {new Date(book.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-auto">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(book.processingStatus)}`}>
                     {book.processingStatus === "processing" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                     {book.processingStatus.charAt(0).toUpperCase() + book.processingStatus.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-4 border-t border-border/50 bg-secondary/30">
                {book.processingStatus === "completed" ? (
                  <Link href={`/dashboard/book/${book._id}`} className="flex items-center justify-center w-full gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Open Reader <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button disabled className="flex items-center justify-center w-full gap-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
                    Processing...
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
