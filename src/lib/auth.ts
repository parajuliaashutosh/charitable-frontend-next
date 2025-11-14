import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function auth() {
  return await getServerSession(options);
}

// Optional: Helper to get session or redirect
export async function requireAuth() {
  const session = await getServerSession(options);
  if (!session) {
    return null;
  }
  return session;
}