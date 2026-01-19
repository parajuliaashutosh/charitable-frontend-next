import LoginForm from "@/components/auth-form/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your GiveHope account to continue making a difference",
  openGraph: {
    title: "Sign In to GiveHope",
    description: "Access your account to manage donations and view your impact",
  },
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      {/* Logo Section */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
            Give Hope
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground text-center mb-2">Sign In</h2>
        <p className="text-center text-muted-foreground text-sm">We are happy to see you again!</p>
      </div>

      {/* Form Component */}
      <LoginForm />
    </div>
  )
}
