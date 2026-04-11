import type { Metadata } from "next";
import { Zap, Target, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "The Neural Dispatch is a premium AI publication covering the tools, research, and builders shaping artificial intelligence.",
};

const values = [
  {
    icon: Target,
    title: "No hype, only signal",
    body: "We cut through the PR-driven noise to report on what AI tools and research actually deliver — in production, for real builders.",
  },
  {
    icon: BookOpen,
    title: "Depth over breadth",
    body: "Every dispatch is researched, tested, and written with enough depth to be genuinely useful, not just readable.",
  },
  {
    icon: Users,
    title: "Written by builders",
    body: "Our writers use the tools they cover. That lived experience shapes how we explain capabilities, limitations, and tradeoffs.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-14 h-14 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-6 h-6 text-[#00d4ff]" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
            About The Neural Dispatch
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto">
            A premium tech publication at the intersection of AI and engineering.
            We cover the tools, the research, and the people building the AI-powered future.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card gradient-border p-8 mb-12">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Our mission
          </h2>
          <p className="text-foreground/65 leading-relaxed mb-4">
            The AI landscape moves fast — model releases, tool launches, research papers,
            funding rounds. Most coverage treats readers as passive observers.
            The Neural Dispatch treats you as a professional who needs actionable intelligence.
          </p>
          <p className="text-foreground/65 leading-relaxed">
            We write for engineers, technical leaders, and AI-adjacent professionals who
            want to understand not just <em>what</em> happened, but <em>why it matters</em>{" "}
            and <em>what to do about it.</em>
          </p>
        </div>

        {/* Values */}
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
          How we work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass-card gradient-border p-6">
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/25 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-foreground/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
            Get in touch
          </h2>
          <p className="text-foreground/55 mb-5">
            Pitches, corrections, partnerships, or just want to talk AI?
          </p>
          <a
            href="mailto:hello@neuraldispatch.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] font-medium hover:bg-[#00d4ff]/20 transition-all"
          >
            hello@neuraldispatch.com
          </a>
        </div>
      </div>
    </div>
  );
}
