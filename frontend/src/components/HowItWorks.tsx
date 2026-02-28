"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UploadCloud, Brain, GraduationCap } from "lucide-react";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const beamX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const steps = [
    {
      id: 1,
      title: "Upload Content",
      description: "Drag & drop your textbooks, lecture notes, or research papers.",
      icon: <UploadCloud className="w-8 h-8 text-primary" />,
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "Unbound analyzes structure, concepts, and generates a knowledge graph.",
      icon: <Brain className="w-8 h-8 text-primary" />,
    },
    {
      id: 3,
      title: "Start Learning",
      description: "Chat with your book, take quizzes, and master the material deeply.",
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section id="working" ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background ambient effect */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-64 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-3xl -translate-y-1/2 pointer-events-none"
        style={{
          x: beamX,
          opacity: opacity,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Three simple steps to transform your learning experience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border -z-10">
            <motion.div 
              className="h-full bg-primary"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-card border-4 border-background shadow-xl flex items-center justify-center mb-8 relative z-10">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping-slow"></div>
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
                  {step.id}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
