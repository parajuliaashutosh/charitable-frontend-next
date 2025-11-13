"use client"

import { useSession } from "next-auth/react";

export default function DashboardPage() {
   const { data: session } = useSession();

  console.log("User from sesstion:", session);
  console.log("Access Token from session:", session?.accessToken);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>

      <p>User: {JSON.stringify(session)}</p>
      <p>Access Token: {session?.accessToken}</p>
      <p>Refresh Token: {session?.refreshToken}</p>
    </div>
  )
}