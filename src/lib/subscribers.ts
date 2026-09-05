import fs from "node:fs/promises";
import path from "node:path";

export type Subscriber = { email: string; date: string };

// Upstash/Vercel KV REST when configured (serverless has no writable disk),
// otherwise a local JSON file so dev works with zero setup.
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const FILE = path.join(process.cwd(), "data", "subscribers.json");

async function kv(command: unknown[]) {
  const res = await fetch(KV_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV ${res.status}: ${await res.text()}`);
  return (await res.json()).result;
}

export async function addSubscriber(email: string) {
  const entry: Subscriber = { email, date: new Date().toISOString() };
  if (KV_URL && KV_TOKEN) {
    await kv(["LPUSH", "subscribers", JSON.stringify(entry)]);
    return;
  }
  const all = await listSubscribers();
  if (all.some((s) => s.email === email)) return;
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify([entry, ...all], null, 2));
}

export async function listSubscribers(): Promise<Subscriber[]> {
  if (KV_URL && KV_TOKEN) {
    const rows: string[] = (await kv(["LRANGE", "subscribers", 0, -1])) ?? [];
    return rows.map((r) => JSON.parse(r));
  }
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}
