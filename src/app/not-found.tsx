import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-4">
        <div className="text-8xl font-heading font-bold text-gradient mb-4">404</div>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
          Dispatch not found
        </h1>
        <p className="text-foreground/50 mb-8 max-w-sm mx-auto">
          This story may have been retracted, moved, or never existed. The rest of the dispatch is still live.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] font-medium hover:bg-[#00d4ff]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to the dispatch
        </Link>
      </div>
    </div>
  );
}
