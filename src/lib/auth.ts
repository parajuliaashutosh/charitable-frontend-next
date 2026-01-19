import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";

export async function auth() {
  return await getServerSession(options);
}

export async function getServerAuth() {
  const session = await getServerSession(options);
  if (!session) {
    return null;
  }
  return session;
}

export async function getUserSession() {
  if(typeof window === "undefined") {
    return await getServerSession(options);
  } else {
    return await getSession();
  }
}