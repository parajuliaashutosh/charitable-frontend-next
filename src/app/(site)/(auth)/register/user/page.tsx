// src/app/(auth)/register/user/page.tsx
import UserRegisterForm from "@/components/auth-form/user-register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register as Donor",
  description: "Create your GiveHope donor account and start making a difference today",
  openGraph: {
    title: "Register as Donor - GiveHope",
    description: "Join our community of donors and help those in need",
  },
};

export default function UserRegisterPage() {
  return <UserRegisterForm />;
}