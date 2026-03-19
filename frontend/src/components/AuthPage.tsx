"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2, Sparkles, ChevronLeft } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthPageProps {
  initialMethod: "login" | "signup";
}

export default function AuthPage({ initialMethod }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(initialMethod === "login");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await api.post(endpoint, payload);
      
      login(res.data);
      toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
      router.push("/dashboard"); // Redirect to dashboard after auth
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Optional: update URL without full reload if desired, but internal state toggle is smoother for UX
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10">
        
        <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-white flex items-center gap-2 transition-colors">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back</span>
        </Link>
        
        <div className="max-w-md w-full mx-auto">
            <div className="mb-10">
                <div className="w-12 h-12 bg-white rounded-full mb-8 flex items-center justify-center shadow-lg shadow-white/10">
                    <span className="text-black font-serif italic font-bold text-xl">U.</span>
                </div>
                <h1 className="text-4xl font-medium tracking-tight mb-4">
                    {isLogin ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-gray-400 text-lg">
                    {isLogin 
                        ? "Enter your details to access your workspace." 
                        : "Join thousands of students learning smarter."}
                </p>
            </div>

            <button className="w-full bg-white text-black font-medium py-3.5 rounded-xl flex items-center justify-center gap-3 mb-8 hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign {isLogin ? "in" : "up"} with Google
            </button>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-[#050505] px-4 text-gray-500">Or continue with email</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-wider font-medium ml-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600"
                            placeholder="John"
                            required={!isLogin}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-wider font-medium ml-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600"
                            placeholder="Doe"
                            required={!isLogin}
                        />
                    </div>
                </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-medium ml-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600"
                        placeholder="name@example.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-medium ml-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600"
                        placeholder="••••••••"
                        required
                        minLength={6}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#2a2a2a] hover:bg-[#333] text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 border border-white/5 shadow-lg group"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                        {isLogin ? "Sign In" : "Create Account"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={toggleAuthMode}
                        className="text-white hover:underline font-medium transition-colors ml-1"
                    >
                        {isLogin ? "Sign up" : "Log in"}
                    </button>
                </p>
            </div>
        </div>
      </div>

      {/* Right Side: Visual */}
      <div className="hidden lg:flex w-1/2 bg-[#080808] relative items-center justify-center p-12 overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
        
        <div className="relative max-w-md space-y-8 text-center p-8">
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
                "We value the individuality of every student, and their learning style should reflect that."
            </blockquote>
            
            <div className="flex flex-col items-center gap-4">
                {/* <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 border border-white/20 shadow-xl" /> */}
                <div className="space-y-1">
                    <div className="text-white font-medium">Ansh</div>
                    <div className="text-gray-500 text-sm">Lead Developer</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}