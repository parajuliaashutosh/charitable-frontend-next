// src/app/(auth)/login/login-form.tsx
"use client";

import { loginSchema } from "@/src/schema/auth.schema";
import authServiceRequests from "@/src/transport/gateway/gRPC/requests/auth/auth-requests";
import { LoginResponse } from "@/src/transport/gateway/gRPC/stubs/exposed-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ILoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultValues: ILoginFormData = {
    username: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = async (data: ILoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = (await authServiceRequests.login(
        {
          username: data.username,
          password: data.password,
        },
        0
      )) as LoginResponse;

      if (response?.success) {
        // Store tokens in memory or cookies instead of localStorage
        // Note: localStorage is not ideal for tokens, consider using httpOnly cookies
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            "accessToken",
            response?.data?.accessToken ?? ""
          );
          sessionStorage.setItem(
            "refreshToken",
            response?.data?.refreshToken ?? ""
          );
        }
        router.push("/dashboard");
      } else {
        setError(response?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.log("Login error:", err);
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-0 md:px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Heart
                className="w-10 h-10 text-blue-600"
                fill="rgb(37 99 235)"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-blue-100">Sign in to continue to GiveHope</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email or Phone Number
              </label>
              <Input
                id="username"
                type="text"
                {...register("username")}
                error={errors?.username}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                placeholder="Enter your email or phone"
              />
            </div>

            {/* Password Field */}
            <div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                error={errors?.password}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            {/* <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button> */}

            <Button type="submit" variant="default" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Don&apos;t have an account?
              </span>
            </div>
          </div>

          {/* Register Links */}
          <div className="space-y-3">
            <Link
              href="/register/user"
              className="block w-full text-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              Register as Donor
            </Link>
            <Link
              href="/register/organization"
              className="block w-full text-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Register Organization
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-white hover:text-blue-100 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
