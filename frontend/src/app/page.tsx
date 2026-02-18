"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [isAnnual, setIsAnnual] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Check Local Storage or System Preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    // Default to what was saved or system preference
    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  // Sync theme changes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (navbarRef.current) {
        if (scrollTop > 50) {
          navbarRef.current.style.boxShadow = "var(--shadow-md)";
        } else {
          navbarRef.current.style.boxShadow = "var(--shadow-sm)";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <nav className="navbar" ref={navbarRef}>
        <div className="nav-container">
          <div className="logo">Unbound</div>
          <div className="nav-links">
            <a
              href="#home"
              className="nav-link"
              onClick={(e) => smoothScroll(e, "#home")}
            >
              Home
            </a>
            <a
              href="#features"
              className="nav-link"
              onClick={(e) => smoothScroll(e, "#features")}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="nav-link"
              onClick={(e) => smoothScroll(e, "#pricing")}
            >
              Pricing
            </a>
          </div>
          <div
            className="nav-actions"
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <button
              id="theme-toggle"
              className="theme-btn"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              <svg
                className="sun-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: theme === "dark" ? "block" : "none" }}
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg
                className="moon-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: theme === "light" ? "block" : "none" }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
            <button
              id="signin"
              className="SignIn-btn"
              onClick={() => setIsAuthOpen(true)}
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your Textbooks Into Interactive Learning Experiences
            </h1>
            <p className="hero-subtitle">
              Turn static PDFs into dynamic, intelligent learning platforms with
              built-in AI tutoring and interactive quizzes.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary auth-trigger"
                onClick={() => setIsAuthOpen(true)}
              >
                Get Started Free
              </button>
              <a href="#working" onClick={(e) => smoothScroll(e, "#working")}>
                <button className="btn btn-secondary">See How It Works</button>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  src="/hero-image.png"
                  alt="Hero Image"
                  fill
                  style={{ borderRadius: "10px" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Everything you need to master any subject
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="feature-title">Smart Structure Extraction</h3>
            <p className="feature-description">
              Automatic conversion of PDFs into navigable, hierarchical content
              with preserved chapters and sections.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              </svg>
            </div>
            <h3 className="feature-title">AI Tutor Assistant</h3>
            <p className="feature-description">
              Context-aware AI that answers questions directly from your
              textbook with cited sources.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                <path d="M12 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"></path>
                <path d="M12 16h.01"></path>
              </svg>
            </div>
            <h3 className="feature-title">Auto-Generated Quizzes</h3>
            <p className="feature-description">
              Intelligent quiz generation based on chapter content with multiple
              learning modes.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h3 className="feature-title">Socratic Tutoring Mode</h3>
            <p className="feature-description">
              Interactive learning where the AI asks guiding questions to deepen
              understanding.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 className="feature-title">Responsive Design</h3>
            <p className="feature-description">
              Learn on any device - desktop, tablet, or mobile with seamless
              synchronization.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className="feature-title">Instant Processing</h3>
            <p className="feature-description">
              Convert your PDFs in minutes, not hours, with advanced document
              parsing.
            </p>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="section-header">
          <h2 className="section-title">Simple Pricing</h2>
          <p className="section-subtitle">Choose the plan that works for you</p>

          {/* Pricing Toggle */}
          <div className="pricing-toggle-container">
            <span
              className={`billing-label monthly ${!isAnnual ? "active" : ""}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </span>
            <label className="switch">
              <input
                type="checkbox"
                id="billing-toggle"
                checked={isAnnual}
                onChange={(e) => setIsAnnual(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <span
              className={`billing-label annually ${isAnnual ? "active" : ""}`}
              onClick={() => setIsAnnual(true)}
            >
              Annually <span className="discount-badge">Save 20%</span>
            </span>
          </div>
        </div>
        <div className="pricing-cards">
          <div className="price-card">
            <div className="plan-name">Starter</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount">0</span>
              <span className="period">/month</span>
            </div>
            <p className="plan-description">Perfect for trying out Unbound</p>
            <ul className="plan-features">
              <li>✓ 1 PDF upload per month</li>
              <li>✓ Basic AI tutor</li>
              <li>✓ Limited quiz generation</li>
              <li>✗ Socratic mode</li>
            </ul>
            <button
              className="btn btn-secondary btn-full auth-trigger"
              onClick={() => setIsAuthOpen(true)}
            >
              Get Started
            </button>
          </div>
          <div className="price-card featured">
            <div className="popular-badge">Most Popular</div>
            <div className="plan-name">Professional</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount">{isAnnual ? "24" : "29"}</span>
              <span className="period">/month</span>
            </div>
            <p className="plan-description">
              For serious learners and educators
            </p>
            <ul className="plan-features">
              <li>✓ Unlimited PDF uploads</li>
              <li>✓ Advanced AI tutor</li>
              <li>✓ Unlimited quizzes</li>
              <li>✓ Socratic mode</li>
            </ul>
            <button
              className="btn btn-primary btn-full auth-trigger"
              onClick={() => setIsAuthOpen(true)}
            >
              Go For Professional
            </button>
          </div>
          <div className="price-card">
            <div className="plan-name">Enterprise</div>
            <div className="plan-price">Custom</div>
            <p className="plan-description">
              For institutions and organizations
            </p>
            <ul className="plan-features">
              <li>✓ Everything in Professional</li>
              <li>✓ Custom AI models</li>
              <li>✓ Admin dashboard</li>
              <li>✓ Dedicated support</li>
            </ul>
            <a
              href="#footer-contact"
              onClick={(e) => smoothScroll(e, "#footer-contact")}
            >
              <button className="btn btn-secondary btn-full">
                Contact Sales
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li>
                <a
                  href="#features"
                  onClick={(e) => smoothScroll(e, "#features")}
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => smoothScroll(e, "#pricing")}>
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div className="footer-section" id="footer-contact">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
            <ul style={{ marginTop: "1rem" }}>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2026 Unbound. All rights reserved. Transforming education,
            one PDF at a time.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <div
        id="auth-modal"
        className={`modal ${isAuthOpen ? "active" : ""}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
            setIsAuthOpen(false);
          }
        }}
      >
        <div className="modal-overlay"></div>
        <div className="modal-container">
          <button
            className="modal-close"
            aria-label="Close modal"
            onClick={() => setIsAuthOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="auth-header">
            <h2 id="auth-title">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p id="auth-subtitle">
              {isSignUp
                ? "Start your learning journey today"
                : "Sign in to continue your learning journey"}
            </p>
          </div>

          <form
            id="auth-form"
            className="auth-form"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Name field (hidden by default for login) */}
            {isSignUp && (
              <div className="form-group" id="name-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="input-icon"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input type="text" id="name" placeholder="John Doe" />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="input-icon"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="input-icon"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full submit-btn"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p id="auth-switch-text">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                id="auth-switch-btn"
                className="text-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                }}
              >
                {isSignUp ? "Sign In" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
