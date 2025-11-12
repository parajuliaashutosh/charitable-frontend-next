import LoginForm from "@/src/components/auth-form/LoginForm";
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
  return <LoginForm />;
}