import { redirect } from "next/navigation";
import { isAdmin, clearSession } from "@/lib/admin-auth";
import { listSubscribers } from "@/lib/subscribers";

export const dynamic = "force-dynamic";
export const metadata = { title: "Subscribers", robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const subscribers = await listSubscribers();

  async function logout() {
    "use server";
    await clearSession();
    redirect("/admin/login");
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold">
          Subscribers <span className="text-[#00d4ff]">({subscribers.length})</span>
        </h1>
        <form action={logout}>
          <button className="text-sm text-foreground/60 hover:text-foreground transition-colors">
            Log out
          </button>
        </form>
      </div>

      {subscribers.length === 0 ? (
        <p className="text-foreground/60">No subscribers yet.</p>
      ) : (
        <div className="rounded-2xl border border-border/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-foreground/60">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={`${s.email}-${i}`} className="border-t border-border/40">
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3 text-foreground/60">
                    {new Date(s.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
