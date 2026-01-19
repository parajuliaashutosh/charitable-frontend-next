"use client"

import { useSession } from "next-auth/react";

export default function DashboardPage() {
   const { data: session } = useSession();

  console.log("User from sesstion:", session);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
    </div>
  )
}