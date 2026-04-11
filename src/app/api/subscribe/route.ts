import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Always log the subscriber server-side (visible in Vercel function logs)
  console.log(`[subscribe] New subscriber: ${email}`);

  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  // If Resend isn't configured, still succeed — subscription is captured in logs
  if (!apiKey || !notifyEmail) {
    console.log(`[subscribe] Resend not configured — subscriber logged only`);
    return NextResponse.json({ success: true });
  }

  // Attempt to send notification email — but never fail the subscriber if it errors
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
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #0a0f1e; margin-bottom: 8px;">New newsletter subscriber</h2>
            <p style="color: #444; font-size: 16px; margin: 0;">
              <strong>${email}</strong> just subscribed to The Neural Dispatch.
            </p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #999; font-size: 12px;">
              Sent by Apollo Technologies US · The Neural Dispatch
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[subscribe] Resend error (subscriber still accepted): ${err}`);
    } else {
      console.log(`[subscribe] Notification sent to ${notifyEmail}`);
    }
  } catch (err) {
    // Log but don't surface the error to the subscriber
    console.error(`[subscribe] Resend fetch failed (subscriber still accepted):`, err);
  }

  // Always return success — the email capture is what matters
  return NextResponse.json({ success: true });
}
