"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, FileText, Users, Zap } from "lucide-react";

const stats = [
  { icon: FileText, value: 24, suffix: "+", label: "Dispatches Published", description: "Deep-dive analyses on AI tools, research, and industry shifts" },
  { icon: Users, value: 5, suffix: "K+", label: "Readers Monthly", description: "Engineers, founders, and AI builders trust our weekly briefings" },
  { icon: TrendingUp, value: 4, suffix: "", label: "Core Verticals", description: "Tools, Research, Use Cases, and Industry coverage areas" },
  { icon: Zap, value: 98, suffix: "%", label: "Signal, No Noise", description: "Every dispatch is filtered for substance over hype" },
];

const trendingTopics = [
  "AI Agents", "Claude Sonnet 5", "MCP Protocol", "Vibe Coding",
  "Agentforce", "Neural Networks", "LLM Ops", "Agentic Commerce",
  "GTC Taipei", "OpenAI Operator", "Harvey AI", "Digital Workforce",
  "Copilot Studio", "PicoClaw", "Multi-Agent Systems", "Google Agentspace",
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return <span ref={ref} className="counter-value">{count}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4ff]/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass-card p-6 text-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00d4ff]/15 transition-colors">
                  <Icon className="w-5 h-5 text-[#00d4ff]" />
                </div>
                <div className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-foreground/70 mb-2">{stat.label}</div>
                <div className="text-xs text-foreground/35 leading-relaxed">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Trending Topics</span>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] py-3">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[hsl(222,47%,7%)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[hsl(222,47%,7%)] to-transparent z-10 pointer-events-none" />
            <div className="flex ticker-scroll whitespace-nowrap">
              {[...trendingTopics, ...trendingTopics].map((topic, i) => (
                <span key={`${topic}-${i}`} className="inline-flex items-center mx-4 text-sm text-foreground/30 hover:text-[#00d4ff] transition-colors duration-200 cursor-default">
                  <span className="w-1 h-1 rounded-full bg-[#00d4ff]/30 mr-3" />
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
