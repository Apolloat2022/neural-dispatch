"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

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
    <section id="newsletter" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card gradient-border overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00d4ff]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
          </div>

          <div className="relative px-8 py-14 md:px-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/25 text-[#00d4ff] text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              Weekly dispatches
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay on the frontline
            </h2>
            <p className="text-foreground/55 max-w-lg mx-auto mb-10 leading-relaxed">
              Get the week&apos;s most important AI developments, tool releases, and
              deep-dives delivered to your inbox every Thursday.
            </p>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium"
              >
                <Sparkles className="w-4 h-4" />
                You&apos;re on the list — welcome to the dispatch!
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/8 transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00d4ff] text-navy-950 font-semibold text-sm hover:bg-[#00d4ff]/90 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Subscribe
                </button>
              </form>
            )}

            {isError && (
              <p className="text-xs text-red-400 mt-3">
                Something went wrong — please try again.
              </p>
            )}
            <p className="text-xs text-foreground/30 mt-4">
              No spam, ever. Unsubscribe in one click.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
