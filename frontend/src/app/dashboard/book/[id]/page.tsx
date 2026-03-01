"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ChevronDown, 
  MessageSquare, 
  BrainCircuit, 
  GraduationCap,
  Send,
  Loader2,
  BookOpen
} from "lucide-react";
import api from "@/lib/api";

type Chapter = {    
  _id: string;    
  title: string;    
  slug: string;    
  content?: string;    
  children?: Chapter[];    
};   

export default function BookReaderPage() {
  const params = useParams();
  const bookId = params.id as string;
  
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  
  // Chat state
  const [chatMode, setChatMode] = useState<"Beginner" | "Socratic" | "Advanced">("Beginner");
  const [messages, setMessages] = useState<{role: "user" | "ai", text: string}[]>([
    { role: "ai", text: "Hello! I'm your AI tutor for this document. What would you like to learn today?" }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  
  // ToC state
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<any>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  useEffect(() => {
    // Fetch book details
    const fetchBookAndChat = async () => {
      try {
        const res = await api.get(`/books/${bookId}`);
        setBook(res.data);
        if (res.data.structure && res.data.structure.length > 0) {
          setActiveChapter(res.data.structure[0]);
        }

        // Fetch Chat History
        const chatRes = await api.get(`/chat/${bookId}`);
        if (chatRes.data && chatRes.data.length > 0) {
          setMessages(prev => [prev[0], ...chatRes.data]); // Keep the greeting, append history
        }
      } catch (error) {
        console.error("Failed to load book or chat", error);
      } finally {
        setLoading(false);
      }
    };
    if (bookId) fetchBookAndChat();
  }, [bookId]);

  const toggleNode = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    
    const userText = inputMsg;
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setInputMsg("");
    
    try {
      const res = await api.post(`/chat/${bookId}`, {
        message: userText,
        mode: chatMode,
        chapterSlug: activeChapter?.slug
      });
      
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: res.data.text
      }]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: "ai", text: "Sorry, I am having trouble connecting to the server." }]);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsQuizModalOpen(true);
    setLoadingQuiz(true);
    setQuizResult(null);
    setSelectedAnswers({});
    try {
      const res = await api.post('/quizzes/generate', {
        bookId,
        chapterSlug: currentChapterContext.slug || currentChapterContext._id
      });
      setQuizData(res.data);
    } catch (error) {
      console.error("Failed to generate quiz", error);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quizData) return;
    
    // convert object { 0: 2, 1: 0 } to array based on question index
    const answersArray = quizData.questions.map((_: any, idx: number) => 
      selectedAnswers[idx] !== undefined ? selectedAnswers[idx] : -1
    );

    try {
      const res = await api.post('/quizzes/submit', {
        quizId: quizData._id,
        answers: answersArray
      });
      setQuizResult(res.data);
    } catch (error) {
      console.error("Submit error", error);
    }
  };

  const renderToc = (chapters: Chapter[], depth = 0) => {
    return (
      <ul className="space-y-1">
        {chapters.map(ch => {
          const isExpanded = expandedNodes[ch._id];
          const hasChildren = ch.children && ch.children.length > 0;
          const isActive = activeChapter?._id === ch._id;
          
          return (
            <li key={ch._id}>
              <div 
                onClick={() => setActiveChapter(ch)}
                className={`flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-colors text-sm ${isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary text-muted-foreground"}`}
                style={{ paddingLeft: `${depth * 1}rem` }}
              >
                {hasChildren ? (
                   <span onClick={(e) => toggleNode(ch._id, e)} className="p-0.5 hover:bg-secondary rounded-sm">
                     {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                   </span>
                ) : (
                  <span className="w-4 h-4" /> // spacing
                )}
                <span className="truncate">{ch.title}</span>
              </div>
              {hasChildren && isExpanded && (
                <div className="mt-1">
                  {renderToc(ch.children!, depth + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // If we have no book (e.g. backend not seeded yet), let's render a mock interface so we can test the UI Layout
  const isMock = !book || !book.title;
  const displayTitle = book?.title || "Mock Unbound Textbook";
  const displayStructure = book?.structure?.length > 0 ? book.structure : [
    { _id: "1", title: "Chapter 1: Introduction", slug: "intro", content: "# Introduction\n\nWelcome to Unbound. This is a mock chapter since the real PDF was not parsed yet.", children: [
      { _id: "1-1", title: "1.1 What is Unbound?", slug: "what-is", content: "## 1.1 What is Unbound?\nIt transforms static PDFs into interactive learning platforms." }
    ]},
    { _id: "2", title: "Chapter 2: Core Concepts", slug: "core", content: "# Core Concepts\nHere we discuss RAG and embeddings." }
  ];
  
  const currentChapterContext = activeChapter || displayStructure[0];

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col -m-6 lg:-m-10"> {/* Negative margin to undo dashboard padding, utilizing full space */}
      {/* Reader Header */}
      <header className="h-14 border-b border-border bg-card/50 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <h1 className="font-semibold text-lg truncate max-w-md">{displayTitle}</h1>
          {isMock && <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-0.5 rounded border border-yellow-500/20">Mock Data</span>}
        </div>
        <div>
          <button 
            onClick={handleGenerateQuiz}
            className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors"
          >
            Generate Quiz
          </button>
        </div>
      </header>

      {/* Reader Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Table of Contents */}
        <div className="w-64 border-r border-border bg-card/30 flex flex-col overflow-hidden hidden md:flex shrink-0">
          <div className="p-4 border-b border-border text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Contents
          </div>
          <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
            {renderToc(displayStructure)}
          </div>
        </div>

        {/* Center: Main Content */}
        <div className="flex-1 overflow-y-auto bg-background p-6 lg:p-12">
          <div className="max-w-3xl mx-auto prose dark:prose-invert">
            <h2 className="text-3xl font-bold mb-6">{currentChapterContext.title}</h2>
            {currentChapterContext.content ? (
              <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-lg">
                {currentChapterContext.content}
              </div>
            ) : (
                <div className="text-muted-foreground italic">
                  Content for this section is empty.
                </div>
            )}
            
            {/* Nav footer */}
            <div className="mt-16 pt-8 border-t border-border flex justify-between">
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
                ← Previous Section
              </button>
              <button className="text-sm font-medium text-primary hover:text-primary/80">
                Next Section →
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Tutor */}
        <div className="w-80 border-l border-border bg-card flex flex-col shrink-0 overflow-hidden">
          {/* Tutor Header */}
          <div className="p-4 border-b border-border flex flex-col gap-3">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                 <BrainCircuit className="w-4 h-4" />
               </div>
               <span className="font-semibold">AI Tutor</span>
             </div>
             
             {/* Mode Selector */}
             <div className="flex bg-secondary p-1 rounded-lg">
                {["Beginner", "Socratic", "Advanced"].map(mode => (
                  <button 
                    key={mode}
                    onClick={() => setChatMode(mode as any)}
                    className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${chatMode === mode ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {mode}
                  </button>
                ))}
             </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                  : 'bg-secondary text-foreground rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-card/50">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input 
                type="text" 
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
                placeholder="Ask about this chapter..." 
                className="w-full bg-background border border-border rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button 
                type="submit"
                disabled={!inputMsg.trim()}
                className="absolute right-1.5 p-1.5 bg-primary text-primary-foreground rounded-full disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Quiz Modal */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border shadow-xl rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Knowledge Check: {currentChapterContext.title}
              </h3>
              <button onClick={() => setIsQuizModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loadingQuiz ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                  <p>Generating questions from the AI...</p>
                </div>
              ) : quizData ? (
                <div className="space-y-8">
                  {quizResult && (
                    <div className={`p-4 rounded-xl mb-6 flex items-center gap-4 ${quizResult.score > 70 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                       <div className="text-4xl font-bold">{quizResult.score}%</div>
                       <div>
                         <p className="font-medium">You got {quizResult.correct} out of {quizResult.total} correct!</p>
                         <p className="text-sm opacity-80">Review the explanations below.</p>
                       </div>
                    </div>
                  )}

                  {quizData.questions.map((q: any, qIdx: number) => (
                    <div key={qIdx} className="space-y-3">
                      <p className="font-medium text-base">{qIdx + 1}. {q.questionText}</p>
                      <div className="space-y-2">
                        {q.options.map((opt: string, optIdx: number) => {
                          let btnClass = "border-border hover:border-primary/50 hover:bg-secondary";
                          if (selectedAnswers[qIdx] === optIdx) btnClass = "border-primary bg-primary/5 text-primary";
                          
                          // If submitted, show correctness
                          if (quizResult) {
                            if (q.correctOptionIndex === optIdx) {
                              btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600";
                            } else if (selectedAnswers[qIdx] === optIdx) {
                              btnClass = "border-red-500 bg-red-500/10 text-red-600";
                            } else {
                              btnClass = "border-border opacity-50";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={!!quizResult}
                              onClick={() => setSelectedAnswers(prev => ({...prev, [qIdx]: optIdx}))}
                              className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${btnClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizResult && (
                        <div className="p-3 bg-muted/50 rounded-lg text-sm text-foreground/80 mt-2">
                          <span className="font-semibold text-primary">Explanation:</span> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground p-8">Something went wrong.</div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-muted/30 flex justify-end">
               {!loadingQuiz && !quizResult && quizData && (
                 <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Submit Answers
                 </button>
               )}
               {quizResult && (
                 <button 
                  onClick={() => setIsQuizModalOpen(false)}
                  className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                 >
                   Close
                 </button>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
