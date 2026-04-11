import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "The Neural Dispatch privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-foreground/40 text-sm mb-10">Last updated: January 2025</p>

        <div className="prose-neural space-y-8">
          <section>
            <h2>What we collect</h2>
            <p>
              When you subscribe to our newsletter, we collect your email address. That&apos;s it.
              We don&apos;t use tracking cookies, sell your data, or share your information with third parties.
            </p>
          </section>

          <section>
            <h2>How we use it</h2>
            <p>
              Your email is used solely to send you The Neural Dispatch newsletter.
              You can unsubscribe at any time via the link in any email we send.
            </p>
          </section>

          <section>
            <h2>Analytics</h2>
            <p>
              We use privacy-respecting analytics that do not track individuals across sites or sessions.
              Aggregate page view counts help us understand what content is useful.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about your data? Reach us at{" "}
              <a href="mailto:privacy@neuraldispatch.com">privacy@neuraldispatch.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
