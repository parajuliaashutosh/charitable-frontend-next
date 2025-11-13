"use client";

import { organizationRegistrationSchema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPicker } from "../common/map-picker/map-picker";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

interface IOrganizationRegistrationData {
  organizationName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  contactNumber?: string;
  address: string;
  govtId: string;
  organizationHeadFirstName: string;
  organizationHeadMiddleName?: string;
  organizationHeadLastName: string;
  organizationHeadPhoneNumber?: string;
  latitude: number;
  longitude: number;
}

export default function OrganizationRegisterForm() {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(organizationRegistrationSchema),
    defaultValues: {
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
    },
  });

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const handleLocationSelect = (lat: number, lng: number) => {
    setValue("latitude", lat);
    setValue("longitude", lng);
    setShowMap(false);
  };

  const onSubmit = async (data: IOrganizationRegistrationData) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/register-organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          phone_number: data.phoneNumber,
          organization_name: data.organizationName,
          organizationHeadFirstName: data.organizationHeadFirstName,
          organizationHeadMiddleName: data.organizationHeadMiddleName,
          organizationHeadLastName: data.organizationHeadLastName,
          organizationHeadPhoneNumber: data.organizationHeadPhoneNumber,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          govt_id: data.govtId,
          contact_number: data.contactNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Registration failed");
        return;
      }

      router.push("/login?registered=true");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="bg-background py-4 px-4 max-h-[90vh] overflow-y-auto hide-scrollbar">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Register Organization</CardTitle>
            <CardDescription>
              Register your organization to manage funding and contribute to the
              community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Organization Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Organization Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="Organization Name"
                      id="organizationName"
                      name="organizationName"
                      {...register("organizationName")}
                      placeholder="Your Organization"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="Government ID"
                      id="govtId"
                      name="govtId"
                      {...register("govtId")}
                      placeholder="Registration Number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    label="Address"
                    id="address"
                    name="address"
                    {...register("address")}
                    placeholder="Organization Address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="Phone Number"
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      {...register("phoneNumber")}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="Contact Number"
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      {...register("contactNumber")}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Head Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Organization Head Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="First Name"
                      id="organizationHeadFirstName"
                      name="organizationHeadFirstName"
                      {...register("organizationHeadFirstName")}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="Middle Name"
                      id="organizationHeadMiddleName"
                      name="organizationHeadMiddleName"
                      {...register("organizationHeadMiddleName")}
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
                      {...register("organizationHeadLastName")  }
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
                      {...register("organizationHeadPhoneNumber")}
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
                    {...register("email")}
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
                      {...register("password")    }
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
                      {...register("confirmPassword")}
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
                    {latitude === 0 && longitude === 0 ? (
                      <p className="text-sm text-muted-foreground mb-3">No location selected yet</p>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-3">
                        Selected: Lat {latitude.toFixed(4)}, Lng {longitude.toFixed(4)}
                      </p>
                    )}
                    <Button type="button" variant="outline" onClick={() => setShowMap(true)} className="w-full">
                      {latitude === 0 ? "Select Location on Map" : "Change Location"}
                    </Button>
                  </div>
                ) : (
                  <MapPicker
                    onLocationSelect={handleLocationSelect}
                    initialLat={latitude || 20.5937}
                    initialLng={longitude || 78.9629}
                  />
                )}
                {errors.latitude && <p className="text-sm text-destructive">{errors.latitude.message}</p>}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating Organization Account..."
                  : "Register Organization"}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
