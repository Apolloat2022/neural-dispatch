import { NewsletterSection } from "@/components/newsletter-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to The Neural Dispatch and get weekly AI intelligence delivered to your inbox.",
};

export default function NewsletterPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Weekly Dispatch
          </h1>
          <p className="text-foreground/55 max-w-lg mx-auto">
            Every Thursday, the week&apos;s most important AI developments in your inbox.
          </p>
        </div>
      </div>
      <NewsletterSection />
    </div>
  );
}
