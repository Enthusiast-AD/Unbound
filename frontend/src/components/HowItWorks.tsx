"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax for the beam or background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const beamX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const cards = [
    {
      id: 1,
      title: "Upload Content",
      description:
        "Drag & drop your textbooks, lecture notes, or research papers.",
      icon: (
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "AI Analysis",
      description:
        "Unbound analyzes structure, concepts, and generates a knowledge graph.",
      icon: (
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
          <path d="M12 2a3 3 0 0 1 3 3v.2a6 6 0 0 1 5.2 9.8 4 4 0 0 1-1.7 4.2 6 6 0 0 1-6.5.9 4 4 0 0 1-1.6-4.6A6 6 0 0 1 6.8 6.4 3 3 0 0 1 12 2Z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Start Learning",
      description:
        "Chat with your book, take quizzes, and master the material deeply.",
      icon: (
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
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className={styles.container} id="working" ref={containerRef}>
      {/* Background ambient effect */}
      <motion.div
        className={styles.gradientBlob}
        style={{
          x: beamX,
          opacity: opacity,
        }}
      />

      <div
        className="section-header"
        style={{ position: "relative", zIndex: 10 }}
      >
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          From PDF to interactive tutor in seconds
        </p>
      </div>

      <div className={styles.grid}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              borderColor: "var(--primary)",
            }}
          >
            {/* Spotlight Beam Effect on Card Hover */}
            <motion.div
              className=""
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at center, var(--primary-light) 0%, transparent 70%)",
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none",
              }}
              whileHover={{ opacity: 0.2 }}
            />

            <div className={styles.iconWrapper}>
              {card.icon}
              <span className={styles.badge}>{card.id}</span>

              {/* Spinning/Pulsing Pulse around Icon */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: -5,
                  borderRadius: "50%",
                  border: "2px solid var(--primary)",
                  borderTopColor: "transparent",
                  borderLeftColor: "transparent",
                  opacity: 0.5,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.description}>{card.description}</p>
          </motion.div>
        ))}

        {/* Animated Connecting Beam (Horizontal SVG) */}
        {/* We place this absolutely over the grid to draw lines between cards if needed, 
            but for responsive grid, a subtle background beam is safer */}
      </div>
    </section>
  );
}
