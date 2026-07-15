"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Radio, ChevronRight } from "lucide-react";
import Link from "next/link";

const dispatchLines = [
  { prefix: "dispatch", text: " Claude Sonnet 5 commoditizes cheap agents — $1 tasks become $0.01", tag: "tools" },
  { prefix: "dispatch", text: " NVIDIA GTC Taipei: Agents everywhere, chips fracturing the market", tag: "industry" },
  { prefix: "dispatch", text: " McKinsey deploys 20,000 AI agents as digital workforce", tag: "industry" },
  { prefix: "dispatch", text: " OpenAI Operator enters enterprise agentic workflows", tag: "tools" },
  { prefix: "dispatch", text: " MCP protocol becomes the standard for AI agent interop", tag: "research" },
  { prefix: "dispatch", text: " Salesforce Agentforce hits $800M ARR — proof of agentic commerce", tag: "industry" },
  { prefix: "dispatch", text: " Google AI-assisted engineering interviews reshape hiring 2026", tag: "research" },
  { prefix: "dispatch", text: " Vibe coding: Non-developers shipping production software", tag: "use-cases" },
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = [];
    const PARTICLE_COUNT = 60;
    const CONNECTION_DISTANCE = 150;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    const init = () => {
      resize();
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };
    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    init();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />;
}

function TerminalPreview() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [activeLine, setActiveLine] = useState<number>(0);
  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        const next = prev + 1;
        if (next > dispatchLines.length) return 0;
        return next;
      });
      setActiveLine((prev) => (prev + 1) % dispatchLines.length);
    }, 2500);
    return () => clearInterval(lineInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative w-full max-w-2xl mx-auto mt-12 lg:mt-0"
    >
      <div className="terminal-window overflow-hidden">
        <div className="terminal-scanline" />
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500/80" />
          <div className="terminal-dot bg-yellow-500/80" />
          <div className="terminal-dot bg-green-500/80" />
          <span className="ml-3 text-xs text-foreground/30 font-mono">neural-dispatch — live feed</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400/80 font-mono">LIVE</span>
          </div>
        </div>
        <div className="terminal-body h-[180px] overflow-hidden relative">
          <div className="space-y-1.5">
            {dispatchLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={`${i}-${line.text.slice(0, 20)}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i === activeLine ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-1 transition-opacity duration-500 ${i === activeLine ? "text-white/90" : ""}`}
              >
                <span className="terminal-prompt shrink-0">{"❯ "}</span>
                <span className="text-foreground/30 shrink-0">{line.prefix}:</span>
                <span className="flex-1">{line.text}</span>
                <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  line.tag === "tools" ? "bg-violet-500/20 text-violet-300"
                  : line.tag === "research" ? "bg-blue-500/20 text-blue-300"
                  : line.tag === "industry" ? "bg-amber-500/20 text-amber-300"
                  : "bg-emerald-500/20 text-emerald-300"
                }`}>{line.tag}</span>
              </motion.div>
            ))}
            {visibleLines > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <span className="terminal-prompt">{"❯ "}</span>
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgba(0,10,20,0.95)] to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20">
      <div className="particle-canvas-container"><ParticleCanvas /></div>
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      <motion.div style={{ y }} className="absolute top-10 right-[15%] w-[500px] h-[500px] bg-[#00d4ff]/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y }} className="absolute bottom-0 left-[10%] w-[600px] h-[400px] bg-violet-600/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00d4ff]/[0.02] rounded-full blur-[80px] pointer-events-none" style={{ animation: "pulse-glow 6s ease-in-out infinite" }} />
      <div className="absolute inset-0 cyber-grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <motion.div style={{ opacity }} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/8 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]" />
              </span>
              AI Intelligence · Updated Weekly
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
            >
              <span className="text-foreground">The</span>{" "}
              <span className="text-gradient glow-text">Neural</span>{" "}
              <span className="text-foreground">Dispatch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-foreground/60 max-w-2xl leading-relaxed mb-10 mx-auto lg:mx-0"
            >
              The frontline report on{" "}
              <span className="text-foreground/90 font-medium">AI tools</span>,{" "}
              <span className="text-foreground/90 font-medium">breakthroughs</span>,{" "}
              and{" "}
              <span className="text-[#00d4ff] font-medium">what&apos;s actually being built.</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="#featured" className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00d4ff] text-[#0a0f1e] font-semibold hover:bg-[#00d4ff]/90 active:scale-95 transition-all duration-200 shadow-lg shadow-[#00d4ff]/20 hover:shadow-[#00d4ff]/30">
                Start Reading
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </Link>
              <Link href="#newsletter" className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/15 text-foreground/80 font-medium hover:text-foreground hover:border-white/25 hover:bg-white/8 transition-all duration-200">
                Subscribe Free
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-10 mt-14"
            >
              {[
                { value: "Weekly", label: "Updates", color: "" },
                { value: "In-depth", label: "Analysis", color: "" },
                { value: "Zero", label: "Hype", color: "text-[#00d4ff]/60" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`font-heading font-bold text-lg text-foreground/60 ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-foreground/30">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="flex-1 w-full max-w-2xl">
            <TerminalPreview />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/20">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-foreground/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#00d4ff]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
