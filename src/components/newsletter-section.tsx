"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Mail, Shield, Bell } from "lucide-react";

const perks = [
  { icon: Mail, text: "Every Thursday, no exceptions" },
  { icon: Shield, text: "Zero spam, one-click unsubscribe" },
  { icon: Bell, text: "First access to breaking dispatches" },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const isError = status === "error";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="newsletter" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card-elevated gradient-border-animated overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#00d4ff]/[0.06] rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-violet-500/[0.04] rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
          <div className="relative px-8 py-16 md:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/25 text-[#00d4ff] text-xs font-medium mb-8"
            >
              <Sparkles className="w-3 h-3" />
              Join 5,000+ AI builders
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5"
            >
              Stay on the <span className="text-gradient-static">frontline</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-foreground/50 max-w-lg mx-auto mb-12 leading-relaxed text-lg"
            >
              The week&apos;s most important AI developments, tool releases, and
              deep-dives — delivered every Thursday morning.
            </motion.p>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-medium text-lg"
              >
                <Sparkles className="w-5 h-5" />
                You&apos;re on the list — welcome to the dispatch!
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white/5 border border-white/12 text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-[#00d4ff]/20 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#00d4ff] text-navy-950 font-semibold text-sm hover:bg-[#00d4ff]/90 active:scale-[0.97] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-[#00d4ff]/15 hover:shadow-[#00d4ff]/25"
                >
                  {status === "loading" ? (
                    <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Subscribe
                </button>
              </motion.form>
            )}
            {isError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 mt-2">
                Something went wrong — please try again.
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-8"
            >
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.text} className="flex items-center gap-2 text-foreground/30">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-xs">{perk.text}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
