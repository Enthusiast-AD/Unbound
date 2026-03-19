"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Play, 
  Plus, 
  Minus, 
  Mail, 
  Twitter, 
  Instagram,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// --- Components ---

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-20 md:py-32 px-6 ${className}`}>
    {children}
  </section>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const { user } = useAuth();
  
  // FAQ Condition
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-orange-500/30">
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white py-6 px-6 md:px-12 flex justify-between items-center backdrop-blur-sm">
        <div className="text-xl font-medium tracking-tight">Unbound.</div>
        <div className="flex items-center gap-6">
          <Link 
            href={user ? "/dashboard" : "/login"}
            className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {user ? "Dashboard" : "Get Started"}
            {/* <div className="w-2 h-2 bg-orange-500 rounded-full" /> */}
          </Link>
          
          {/* Mobile Menu Icon Placeholder */}
          <div className="md:hidden">
            <div className="space-y-1.5 cursor-pointer">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] mb-8">
              Learn like <br />
              <span className="font-serif italic text-orange-400">a genius</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-md mb-10 leading-relaxed">
              Transform static PDFs into an interactive AI tutor. Improve your grades with an exclusive learning companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm font-medium tracking-wide transition-all duration-300"
              >
                START LEARNING
              </Link>
              {/* <div className="flex items-center gap-2 text-sm text-gray-400 px-4 py-4">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 AI Model Active
              </div> */}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative w-full aspect-square max-w-md mx-auto border border-white/10 rounded-full flex items-center justify-center p-12 bg-[#0a0a0a]">
                <div className="relative w-full h-full bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5 p-6 flex flex-col">
                    {/* Simulated App Interface */}
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 w-3/4 bg-white/10 rounded" />
                        <div className="h-2 w-1/2 bg-white/10 rounded" />
                        <div className="h-24 w-full bg-white/5 rounded mt-4 p-3 border border-white/5">
                            <p className="text-xs text-gray-400 italic">"According to Chapter 4, the concept of..."</p>
                        </div>
                    </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -right-4 top-1/3 bg-neutral-800 p-4 rounded-xl border border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <BrainCircuit size={20} />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Analysis</div>
                        <div className="text-sm font-medium">Complete</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* --- Mission Section --- */}
      <Section className="bg-[#0a0a0a]">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-light mb-8">Mission</h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                We believe that <span className="text-white">every student is unique</span>. 
                And we are sure that their learning style should show it.
              </p>
              <p>
                Our team is here to help people <span className="text-orange-400">reveal their potential through active learning</span>.
              </p>
              <p>
                Our service has already been appreciated by more than <span className="text-orange-400">500+ students worldwide</span>.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="relative">
                <div className="aspect-[4/5] md:aspect-square bg-neutral-900 rounded-2xl overflow-hidden relative">
                    {/* Placeholder for "Founder" or "Student" image */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <div className="text-white text-xl font-medium">Ansh  </div>
                        <div className="text-gray-400 text-sm">Lead Developer</div>
                    </div>
                    {/* Abstract visual */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 border border-white/40 rounded-full flex items-center justify-center">
                             <Sparkles className="text-white/60" />
                        </div>
                    </div>
                </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* --- Services Section --- */}
      <Section>
        <div className="container mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              We can help <br />
              you with it
            </h2>
          </FadeIn>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-5xl">
          <FadeIn delay={0.1}>
            <div className="bg-[#0a0a0a] p-10 rounded-2xl hover:bg-[#111] transition-colors border border-white/5 group h-full cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="w-32 h-32 border border-orange-400 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 border border-orange-400 rounded-full" />
                </div>
              </div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                 <h3 className="text-xl font-medium text-orange-400">Daily Study</h3>
              </div>
              <p className="text-gray-400 mb-8 h-20 relative z-10">
                Simple and beautiful, you can easily use it every day to quickly review chapters and concepts.
              </p>
              <div className="flex justify-center py-8 relative z-10">
                <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/40 group-hover:text-orange-400 transition-colors duration-500">
                  <path d="M10 50 C20 40, 40 20, 60 50 C80 80, 100 20, 110 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 55 C15 45, 35 25, 55 55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#0a0a0a] p-10 rounded-2xl hover:bg-[#111] transition-colors border border-white/5 group h-full cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <BrainCircuit className="w-32 h-32 text-purple-400" strokeWidth={0.5} />
              </div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                 <h3 className="text-xl font-medium text-white">Exam Prep</h3>
              </div>
              <p className="text-gray-400 mb-8 h-20 relative z-10">
                More complex, elegant testing for special occasions, when you really want to stand out.
              </p>
              <div className="flex justify-center py-8 relative z-10">
                 <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/40 group-hover:text-purple-400 transition-colors duration-500">
                   <path d="M10 30 Q 30 5, 50 30 T 90 30 T 130 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                   <circle cx="20" cy="30" r="3" fill="currentColor" />
                   <circle cx="60" cy="30" r="3" fill="currentColor" />
                   <circle cx="100" cy="30" r="3" fill="currentColor" />
                </svg>
              </div>
            </div>
          </FadeIn>
        </div>
        
        <div className="flex justify-center mt-16">
            <Link 
                href="/signup"
                className="border border-white/20 px-8 py-3 rounded-full text-sm hover:bg-white hover:text-black transition-all"
            >
                GET STARTED
            </Link>
        </div>
      </Section>

      {/* --- Process Section --- */}
      <Section className="relative">
         <div className="container mx-auto grid md:grid-cols-2 gap-16">
            <div>
                 <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-light mb-12">Work process</h2>
                 </FadeIn>
                 
                 <div className="space-y-12">
                     {[
                         { step: "01", title: "Upload PDF", desc: "Your personal library manager will process your PDF immediately.", time: "within 30 seconds" },
                         { step: "02", title: "AI Analysis", desc: "Our RAG engine extracts structure and creates a semantic index.", time: "less than 2 min" },
                         { step: "03", title: "Start Learning", desc: "Chat with your book, generate quizzes, and master the content.", time: "infinite potential" },
                     ].map((item, idx) => (
                         <FadeIn key={idx} delay={idx * 0.1}>
                             <div className="group">
                                 <div className="flex items-baseline gap-4 mb-2">
                                     <span className="text-4xl md:text-5xl font-light text-white group-hover:text-orange-400 transition-colors">{item.step}</span>
                                     <h3 className="text-lg md:text-xl text-gray-200">{item.title}</h3>
                                 </div>
                                 <p className="text-gray-400 text-sm md:text-base pl-14 md:pl-16 mb-2 max-w-sm">{item.desc}</p>
                                 <div className="pl-14 md:pl-16 flex items-center gap-2 text-xs text-orange-400">
                                     <span className="block w-2 h-2 rounded-full border border-orange-400"></span>
                                     {item.time}
                                 </div>
                             </div>
                         </FadeIn>
                     ))}
                 </div>
            </div>
            
            <div className="hidden md:block relative h-full min-h-[500px]">
                 <div className="sticky top-32">
                     <div className="aspect-[3/4] bg-neutral-900 relative rounded-lg overflow-hidden border border-white/5">
                         <div className="absolute inset-0 flex items-center justify-center">
                             <div className="text-center">
                                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                                     <Play className="ml-1 fill-white" size={24} />
                                 </div>
                                 <p className="text-sm tracking-widest uppercase">Creating<br/>Knowledge</p>
                             </div>
                         </div>
                         <Image 
                           src="/placeholder-process.jpg" 
                           fill 
                           className="object-cover opacity-30" 
                           alt="Process background"
                         />
                     </div>
                 </div>
            </div>
         </div>
      </Section>
      
      {/* --- Plans --- */}
      <Section className="bg-[#0a0a0a]">
        <div className="container mx-auto">
            <h2 className="text-4xl font-light mb-16">Plans</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
                {/* Standard */}
                <div className="bg-[#e5dcd3] text-black p-8 rounded-xl flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg tracking-widest uppercase mb-1">Standard</h3>
                        <p className="text-xs text-gray-600">Work with basic AI model</p>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1 text-sm">
                        {['1 Book Upload', 'Basic Chat', '5 Quizzes / day', 'Slow processing'].map((feat, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Check size={14} /> {feat}
                            </li>
                        ))}
                    </ul>
                    
                    <div className="mb-6">
                        <span className="text-3xl font-light">$0</span>
                    </div>
                    
                    <Link href="/login" className="block text-center w-full py-3 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        Get Started
                    </Link>
                    <div className="text-center mt-3 text-[10px] underline cursor-pointer">Make a gift</div>
                </div>
                
                 {/* Optimal */}
                 <div className="bg-[#cba6f7] text-black p-8 rounded-xl flex flex-col transform md:-translate-y-4 shadow-xl shadow-purple-900/10">
                    <div className="mb-4">
                        <h3 className="text-lg tracking-widest uppercase mb-1">Optimal</h3>
                        <p className="text-xs text-purple-900/70">Work with GPT-4 & Claude</p>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1 text-sm font-medium">
                        {['Unlimited Uploads', 'Advanced Reasoning', 'Unlimited Quizzes', 'Priority Processing', 'Export options'].map((feat, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Check size={14} strokeWidth={3} /> {feat}
                            </li>
                        ))}
                    </ul>
                    
                    <div className="mb-6 flex items-baseline gap-2">
                        <span className="text-3xl font-light">$19</span>
                        <span className="line-through text-black/40">$29</span>
                    </div>
                    
                    <Link href="/login" className="block text-center w-full py-3 bg-black text-white border border-black text-xs uppercase tracking-widest hover:bg-transparent hover:text-black transition-colors">
                        Order
                    </Link>
                    <div className="text-center mt-3 text-[10px] underline cursor-pointer">Make a gift</div>
                </div>
                
                {/* Premier */}
                <div className="bg-[#b4befe] text-black p-8 rounded-xl flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg tracking-widest uppercase mb-1">Premier</h3>
                        <p className="text-xs text-gray-600">For Teams & Schools</p>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1 text-sm">
                        {['Everything in Optimal', 'Team Management', 'API Access', 'Custom Domain', 'SAML SSO'].map((feat, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Check size={14} /> {feat}
                            </li>
                        ))}
                    </ul>
                    
                    <div className="mb-6 flex items-baseline gap-2">
                        <span className="text-3xl font-light">$190</span>
                        <span className="line-through text-black/40">$380</span>
                    </div>
                    
                    <Link href="/login" className="block text-center w-full py-3 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        Order
                    </Link>
                    <div className="text-center mt-3 text-[10px] underline cursor-pointer">Make a gift</div>
                </div>
            </div>
        </div>
      </Section>

      {/* --- Footer --- */}
      <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5">
          <div className="container mx-auto px-6">
              
              <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 pt-8">
                  <div className="flex gap-6 mb-4 md:mb-0">
                      <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                      <a href="#" className="hover:text-gray-400">Refund Policy</a>
                      <a href="#" className="hover:text-gray-400">Terms of Service</a>
                  </div>
                  <div>
                      All rights reserved 2026
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <span>Made in</span>
                      <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[8px]">U</div>
                      <span>Unbound</span>
                  </div>
              </div>
          </div>
      </footer>

    </div>
  );
}
