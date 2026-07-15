"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, FlaskConical, Lightbulb, Factory, ArrowRight } from "lucide-react";

const topics = [
  {
    title: "AI Tools",
    description: "Hands-on reviews and deep-dives into the latest AI tools, SDKs, and developer platforms.",
    href: "/category/tools",
    icon: Wrench,
    gradient: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-300",
    borderColor: "border-violet-500/20 hover:border-violet-500/40",
    count: 5,
  },
  {
    title: "Research",
    description: "Breakthroughs in LLMs, agents, and AI research from top labs and their real-world implications.",
    href: "/category/research",
    icon: FlaskConical,
    gradient: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-300",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    count: 3,
  },
  {
    title: "Use Cases",
    description: "Real-world AI deployments across industries — law, healthcare, engineering, commerce, and beyond.",
    href: "/category/use-cases",
    icon: Lightbulb,
    gradient: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-300",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    count: 4,
  },
  {
    title: "Industry",
    description: "Enterprise adoption, funding rounds, market shifts, and the business of AI at scale.",
    href: "/category/industry",
    icon: Factory,
    gradient: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-300",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
    count: 8,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function TopicsShowcase() {
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
          <p className="text-foreground/50 max-w-lg">We track the AI landscape across four key verticals — from tool reviews to enterprise deployments.</p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <motion.div key={topic.title} variants={cardVariants}>
                <Link href={topic.href} className={`group block p-6 rounded-2xl bg-gradient-to-b ${topic.gradient} border ${topic.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20`}>
                  <div className={`w-10 h-10 rounded-xl ${topic.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${topic.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-[#00d4ff] transition-colors duration-200">{topic.title}</h3>
                  <p className="text-sm text-foreground/45 leading-relaxed mb-4">{topic.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground/30">{topic.count} articles</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowRight className={`w-4 h-4 ${topic.iconColor}`} />
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
