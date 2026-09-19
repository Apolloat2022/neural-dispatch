"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench,
  FlaskConical,
  Lightbulb,
  Factory,
  Cpu,
  Building2,
  Briefcase,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

/**
 * Presentation only, keyed by category slug. Labels, descriptions and hrefs
 * come from CATEGORIES; counts are passed in from the server. To add a card,
 * add the category to src/lib/categories.ts and give it a style entry here.
 */
interface TopicStyle {
  icon: LucideIcon;
  blurb: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
}

const topicStyles: Record<string, TopicStyle> = {
  tools: {
    icon: Wrench,
    blurb: "Hands-on reviews and deep-dives into the latest AI tools, SDKs, and developer platforms.",
    gradient: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-300",
    borderColor: "border-violet-500/20 hover:border-violet-500/40",
  },
  research: {
    icon: FlaskConical,
    blurb: "Breakthroughs in LLMs, agents, and AI research from top labs and their real-world implications.",
    gradient: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-300",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
  },
  "use-cases": {
    icon: Lightbulb,
    blurb: "Real-world AI deployments across industries — law, healthcare, engineering, commerce, and beyond.",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-300",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
  },
  industry: {
    icon: Factory,
    blurb: "Enterprise adoption, funding rounds, market shifts, and the business of AI at scale.",
    gradient: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-300",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
  },
  technology: {
    icon: Cpu,
    blurb: "Chips, datacenters, energy, and the security and policy shaping the stack underneath AI.",
    gradient: "from-sky-500/20 to-sky-500/5",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-300",
    borderColor: "border-sky-500/20 hover:border-sky-500/40",
  },
  "enterprise-ai": {
    icon: Building2,
    blurb: "How large organizations actually deploy AI — rollouts, adoption data, and what breaks.",
    gradient: "from-rose-500/20 to-rose-500/5",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-300",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
  },
  "future-of-work": {
    icon: Briefcase,
    blurb: "Jobs, skills, and org change as AI moves from pilot to payroll.",
    gradient: "from-fuchsia-500/20 to-fuchsia-500/5",
    iconBg: "bg-fuchsia-500/15",
    iconColor: "text-fuchsia-300",
    borderColor: "border-fuchsia-500/20 hover:border-fuchsia-500/40",
  },
  education: {
    icon: GraduationCap,
    blurb: "Teaching, learning, and training in a world where the tools keep moving.",
    gradient: "from-teal-500/20 to-teal-500/5",
    iconBg: "bg-teal-500/15",
    iconColor: "text-teal-300",
    borderColor: "border-teal-500/20 hover:border-teal-500/40",
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface TopicsShowcaseProps {
  /** Live counts by category slug, from getCategoryCounts(). */
  counts: Record<string, number>;
}

export function TopicsShowcase({ counts }: TopicsShowcaseProps) {
  const topics = CATEGORIES.filter((c) => topicStyles[c.slug]);

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 mesh-gradient opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <p className="text-[#00d4ff] text-xs font-semibold uppercase tracking-widest mb-2">Explore</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Coverage areas</h2>
          <p className="text-foreground/50 max-w-lg">
            We track the AI landscape across {topics.length} verticals — from tool reviews to
            enterprise deployments, chips, policy, and the future of work.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {topics.map((topic) => {
            const style = topicStyles[topic.slug];
            const Icon = style.icon;
            const count = counts[topic.slug] ?? 0;
            return (
              <motion.div key={topic.slug} variants={cardVariants}>
                <Link
                  href={`/category/${topic.slug}`}
                  className={`group flex h-full flex-col p-6 rounded-2xl bg-gradient-to-b ${style.gradient} border ${style.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20`}
                >
                  <div className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${style.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-[#00d4ff] transition-colors duration-200">
                    {topic.label}
                  </h3>
                  <p className="text-sm text-foreground/45 leading-relaxed mb-4">{style.blurb}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-foreground/30">
                      {count} {count === 1 ? "article" : "articles"}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowRight className={`w-4 h-4 ${style.iconColor}`} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
