import { redirect } from "next/navigation";
import { checkCredentials, setSession, isAdmin } from "@/lib/admin-auth";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    if (!checkCredentials(email, password)) redirect("/admin/login?error=1");
    await setSession();
    redirect("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-8 space-y-4"
      >
        <h1 className="font-heading text-2xl font-bold">Admin Login</h1>
        {error && <p className="text-sm text-red-500">Invalid email or password.</p>}
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          autoComplete="username"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-border/60 text-sm outline-none focus:border-[#00d4ff]/60"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          autoComplete="current-password"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-border/60 text-sm outline-none focus:border-[#00d4ff]/60"
        />
        <button
          type="submit"
          className="w-full px-4 py-3 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/20 transition-colors"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
