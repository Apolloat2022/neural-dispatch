import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "revanaglobal@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin";

// Cookie holds a hash of the credentials, so it can't be forged without them.
const TOKEN = createHash("sha256").update(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}`).digest("hex");
export const COOKIE = "nd_admin";

export function checkCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
}

export async function setSession() {
  (await cookies()).set(COOKIE, TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  return (await cookies()).get(COOKIE)?.value === TOKEN;
}
