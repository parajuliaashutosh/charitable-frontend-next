"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MapPicker } from "../common/map-picker/map-picker"
import { Button } from "../ui/button"

export default function OrganizationRegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    contactNumber: "",
    address: "",
    govtId: "",
    organizationHeadFirstName: "",
    organizationHeadMiddleName: "",
    organizationHeadLastName: "",
    organizationHeadPhoneNumber: "",
    latitude: 0,
    longitude: 0,
  })
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }))
    setShowMap(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (
      !formData.organizationName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.address ||
      !formData.govtId ||
      !formData.organizationHeadFirstName ||
      !formData.organizationHeadLastName
    ) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.latitude === 0 && formData.longitude === 0) {
      setError("Please select an organization location on the map")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/auth/register-organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          phone_number: formData.phoneNumber,
          organization_name: formData.organizationName,
          organizationHeadFirstName: formData.organizationHeadFirstName,
          organizationHeadMiddleName: formData.organizationHeadMiddleName,
          organizationHeadLastName: formData.organizationHeadLastName,
          organizationHeadPhoneNumber: formData.organizationHeadPhoneNumber,
          address: formData.address,
          latitude: formData.latitude,
          longitude: formData.longitude,
          govt_id: formData.govtId,
          contact_number: formData.contactNumber,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Registration failed")
        return
      }

      // Success - redirect to login
      router.push("/login?registered=true")
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Register Organization</CardTitle>
            <CardDescription>
              Register your organization to manage funding and contribute to the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organization Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Organization Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="Organization Name"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      placeholder="Your Organization"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="Government ID"
                      id="govtId"
                      name="govtId"
                      value={formData.govtId}
                      onChange={handleInputChange}
                      placeholder="Registration Number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Input

                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Organization Address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="Phone Number"
                      id="phoneNumber"
                      required
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="Contact Number"  
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Head Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Organization Head Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="First Name"
                      id="organizationHeadFirstName"
                      name="organizationHeadFirstName"
                      value={formData.organizationHeadFirstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="Middle Name"
                      id="organizationHeadMiddleName"
                      name="organizationHeadMiddleName"
                      value={formData.organizationHeadMiddleName}
                      onChange={handleInputChange}
                      placeholder="Michael"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="Last Name"
                      id="organizationHeadLastName"
                      name="organizationHeadLastName"
                      value={formData.organizationHeadLastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="Phone Number"
                      id="organizationHeadPhoneNumber"
                      name="organizationHeadPhoneNumber"
                      type="tel"
                      value={formData.organizationHeadPhoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Account Information</h3>

                <div className="space-y-2">
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="org@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="Password"
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Organization Location</h3>

                {!showMap ? (
                  <div className="border border-border rounded-lg p-4 bg-muted">
                    {formData.latitude === 0 && formData.longitude === 0 ? (
                      <p className="text-sm text-muted-foreground mb-3">No location selected yet</p>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-3">
                        Selected: Lat {formData.latitude.toFixed(4)}, Lng {formData.longitude.toFixed(4)}
                      </p>
                    )}
                    <Button type="button" variant="outline" onClick={() => setShowMap(true)} className="w-full">
                      {formData.latitude === 0 ? "Select Location on Map" : "Change Location"}
                    </Button>
                  </div>
                ) : (
                  <MapPicker
                    onLocationSelect={handleLocationSelect}
                    initialLat={formData.latitude || 20.5937}
                    initialLng={formData.longitude || 78.9629}
                  />
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Creating Organization Account..." : "Register Organization"}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  Sign In
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
