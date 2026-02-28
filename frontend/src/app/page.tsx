"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sun, Moon, BookOpen, BrainCircuit, FileQuestion, MessageSquare, Smartphone, Zap, Check, ArrowRight, Twitter, Github, Linkedin, LogOut } from "lucide-react";
import HowItWorks from "../components/HowItWorks";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [isAnnual, setIsAnnual] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Smart Structure Extraction",
      description: "Automatic conversion of PDFs into navigable, hierarchical content with preserved chapters and sections."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-primary" />,
      title: "AI Tutor Assistant",
      description: "Context-aware AI that answers questions directly from your textbook with cited sources."
    },
    {
      icon: <FileQuestion className="w-6 h-6 text-primary" />,
      title: "Auto-Generated Quizzes",
      description: "Intelligent quiz generation based on chapter content with multiple learning modes."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Socratic Tutoring Mode",
      description: "Interactive learning where the AI asks guiding questions to deepen understanding."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: "Responsive Design",
      description: "Learn on any device - desktop, tablet, or mobile with seamless synchronization."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Instant Processing",
      description: "Convert your PDFs in minutes, not hours, with advanced document parsing."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navigation Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-3" : "bg-transparent border-transparent py-5"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Unbound
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" onClick={(e) => smoothScroll(e, "#home")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</a>
            <a href="#features" onClick={(e) => smoothScroll(e, "#features")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#pricing" onClick={(e) => smoothScroll(e, "#pricing")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Toggle Theme">
              {theme === "dark" ? <Sun className="w-5 h-5 text-muted-foreground hover:text-primary" /> : <Moon className="w-5 h-5 text-muted-foreground hover:text-primary" />}
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium hidden md:block">Hi, {user.firstName}</span>
                <button onClick={logout} className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors" aria-label="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
                <a href="/dashboard" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <button onClick={() => setIsAuthOpen(true)} className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-full border border-border hover:bg-secondary hover:text-primary">
                  Sign In
                </button>
                <button onClick={() => setIsAuthOpen(true)} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Transform Your Textbooks Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Interactive Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Turn static PDFs into dynamic, intelligent learning platforms with built-in AI tutoring and interactive quizzes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <a href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5">
                  Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              ) : (
                <button onClick={() => setIsAuthOpen(true)} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5">
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              )}
              <a href="#working" onClick={(e) => smoothScroll(e, "#working")} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all rounded-full border-2 border-border hover:border-primary hover:text-primary hover:bg-secondary">
                See How It Works
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20"></div>
            <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
              {/* Placeholder for Hero Image */}
              <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
                <p className="text-muted-foreground font-medium">App Interface Preview</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to master any subject, built right into your reading experience.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-lg text-muted-foreground mb-8">Choose the plan that works for you</p>
            
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-1"}`} />
              </button>
              <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Annually <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl border border-border bg-card shadow-sm flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-muted-foreground mb-6">Perfect for trying out Unbound</p>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold">$</span>
                <div className="relative h-[40px] overflow-hidden inline-block w-[24px]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={isAnnual ? "0-annual" : "0-monthly"}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
                      className="inline-block text-4xl font-extrabold absolute"
                    >
                      0
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>1 PDF upload per month</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Basic AI tutor</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Limited quiz generation</span></li>
              </ul>
              <button onClick={() => setIsAuthOpen(true)} className="w-full py-3 rounded-xl font-medium border-2 border-border hover:border-primary hover:text-primary transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl border-2 border-primary bg-card shadow-xl relative flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-muted-foreground mb-6">For serious learners and educators</p>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold">$</span>
                <div className="relative h-[40px] overflow-hidden inline-block w-[48px]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={isAnnual ? "24" : "29"}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
                      className="inline-block text-4xl font-extrabold absolute"
                    >
                      {isAnnual ? "24" : "29"}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Unlimited PDF uploads</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Advanced AI tutor</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Unlimited quiz generation</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Socratic tutoring mode</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Priority support</span></li>
              </ul>
              <button onClick={() => setIsAuthOpen(true)} className="w-full py-3 rounded-xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg">
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-3xl border border-border bg-card shadow-sm flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-6">For teams and institutions</p>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold">$</span>
                <div className="relative h-[40px] overflow-hidden inline-block w-[48px]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={isAnnual ? "79" : "99"}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
                      className="inline-block text-4xl font-extrabold absolute"
                    >
                      {isAnnual ? "79" : "99"}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Everything in Professional</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Custom AI model fine-tuning</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Team collaboration tools</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Analytics dashboard</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> <span>Dedicated account manager</span></li>
              </ul>
              <button onClick={() => setIsAuthOpen(true)} className="w-full py-3 rounded-xl font-medium border-2 border-border hover:border-primary hover:text-primary transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4 inline-block">
                Unbound
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Transforming static textbooks into dynamic, intelligent learning platforms with built-in AI tutoring.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#features" onClick={(e) => smoothScroll(e, "#features")} className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" onClick={(e) => smoothScroll(e, "#pricing")} className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#working" onClick={(e) => smoothScroll(e, "#working")} className="hover:text-primary transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Unbound. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <span className="text-red-500">♥</span> for learners everywhere
            </div>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
