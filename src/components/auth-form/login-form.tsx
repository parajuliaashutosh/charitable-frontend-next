"use client";

import { Button } from "@/components/ui/button";
import { AuthRole } from "@/constants/role.enum";
import { logger } from "@/lib/logger";
import { loginSchema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Lock, Mail } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface ILoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginFormData) => {
    try {
      const response = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      logger.log("🚀 ~ onSubmit ~ response:", response);

      if (response?.ok) {
        // Fetch user session to get the role
        const session = await getSession();

        const role = session?.user?.role;
        switch (role) {
          case AuthRole.SUDO_ADMIN:
          case AuthRole.ADMIN:
            return router.push("/dashboard");
          case AuthRole.ORGANIZATION_SUPER_ADMIN:
          case AuthRole.ORGANIZATION_ADMIN:
            return router.push("/donations");
          case AuthRole.USER:
            return router.push("/donate");
          default:
            return router.push("/login");
        }
      } else {
        toast.error(response?.error || "Invalid username or password.");
      }
    } catch (err) {
      logger.error("Login error:", err);
      toast.error(
        err?.error || err?.message || "Invalid username or password."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

      {/* Email/Username Field */}
      <Input
        label="Username"
        icon={<Mail size={16} />}
        id="username"
        type="text"
        placeholder="Enter your email or phone"
        {...register("username")}
        error={errors?.username}
        className="w-full"
      />

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <FormLabel required>Password</FormLabel>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          icon={<Lock size={16} />}
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="w-full"
          error={errors?.password}
        />
      </div>

      {/* Remember Me */}
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 rounded border-border" />
        <span className="text-sm text-muted-foreground">Remember me</span>
      </label>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 text-base font-semibold"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Don&apos;t have an account?
          </span>
        </div>
      </div>

      {/* Register Links */}
      <div className="space-y-3">
        <Link
          href="/register/user"
          className="block w-full text-center px-4 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
        >
          Register as Donor
        </Link>
        <Link
          href="/register/organization"
          className="block w-full text-center px-4 py-3 border-2 border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
        >
          Register Organization
        </Link>
      </div>
    </form>
  );
}
