// src/app/(auth)/register/organization/page.tsx
import OrganizationRegisterForm from "@/components/auth-form/organization-register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Organization",
  description: "Register your organization on GiveHope and connect with donors",
  openGraph: {
    title: "Register Your Organization - GiveHope",
    description: "Join our platform and start receiving support for your cause",
  },
};

export default function OrganizationRegisterPage() {
  return <OrganizationRegisterForm />;
}