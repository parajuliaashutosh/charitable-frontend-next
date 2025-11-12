"use client"

import { Button } from "@/components/ui/button"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { Input } from "../ui/input"

interface ILoginFormData {
  username: string
  password: string
}

// Simple validation schema
const loginSchema = yup.object().shape({
  username: yup.string().required("Email or phone is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
})

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

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
  })

  const onSubmit = async (data: ILoginFormData) => {
    setError(null)
    try {
      // Replace this with your actual API call
      console.log("Login attempt:", data)

      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For now, just redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("Login error:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Email/Username Field */}
      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-foreground">
          Email or Phone
        </label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your email or phone"
          {...register("username")}
          className="w-full"
        />
        {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="w-full"
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      {/* Remember Me */}
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 rounded border-border" />
        <span className="text-sm text-muted-foreground">Remember me</span>
      </label>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full py-3 text-base font-semibold">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Don't have an account?</span>
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
  )
}
