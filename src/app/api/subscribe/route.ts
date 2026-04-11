import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Parse body — return 400 on any parse error, never 500
  let email: string;
  try {
    const body = await request.json();
    email = body?.email ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Always log — visible in Vercel function logs even without Resend
  console.log(`[subscribe] New subscriber: ${email}`);

  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (apiKey && notifyEmail) {
    // Fire-and-forget — never let Resend errors affect the subscriber
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Neural Dispatch <onboarding@resend.dev>",
          to: [notifyEmail],
          subject: `New subscriber: ${email}`,
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
              <h2 style="color:#0a0f1e;margin-bottom:8px">New newsletter subscriber</h2>
              <p style="color:#444;font-size:16px;margin:0">
                <strong>${email}</strong> just subscribed to The Neural Dispatch.
              </p>
              <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
              <p style="color:#999;font-size:12px">
                Apollo Technologies US · The Neural Dispatch
              </p>
            </div>
          `,
        }),
      });
      if (!res.ok) {
        console.error(`[subscribe] Resend error ${res.status}:`, await res.text());
      }
    } catch (err) {
      console.error("[subscribe] Resend fetch failed:", err);
    }
  }

  // Always succeed from the subscriber's perspective
  return NextResponse.json({ success: true });
}
