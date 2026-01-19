"use client";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { userRegistrationSchema } from "@/schema/auth.schema";
import authServiceRequests from "@/transport/gateway/gRPC/requests/auth/auth-requests";
import { RegisterUserRequest } from "@/transport/gateway/gRPC/stubs/exposed-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

interface IUserRegistrationData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  latitude: number;
  longitude: number;
}

export default function UserRegisterForm() {
  const router = useRouter();
  const { coords, error: geoError } = useGeolocation();

  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(userRegistrationSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
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

  const onSubmit = async (data: IUserRegistrationData) => {
    setError(null);
    try {
      const payload: RegisterUserRequest = {
        firstName: data.firstName,
        middleName: data.middleName || "",
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        latitude: data.latitude,
        longitude: data.longitude,
      };
      const response = await authServiceRequests.registerUser(payload, 2);

      if (!response.success) {
        setError(response.message || "Registration failed");
        toast.error("Action Failed", {
          description: response?.message || "Registration failed",
        });
        return;
      }

      toast.success("Action Successful", {
        description: response?.message || "Registration completed successfully",
      });
      router.push("/login?registered=true");
    } catch (err: any) {
      setError("An error occurred. Please try again.");
      toast.error("Action Failed", {
        description: err?.message || "Registration failed",
      });
      console.error(err);
    }
  };

  useEffect(() => {
    if (coords) {
      setValue("latitude", coords?.lat);
      setValue("longitude", coords?.lng);
    }
  }, [coords, setValue]);

  return (
    <div className="bg-background py-4 px-0 md:px-4 max-h-[90vh] overflow-y-auto w-full hide-scrollbar">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Register as Donor</CardTitle>
            <CardDescription>
              Create your account to start contributing to meaningful causes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    icon={<User size={16} />}
                    label="First Name"
                    id="firstName"
                    required
                    placeholder="John"
                    {...register("firstName")}
                    error={errors.firstName}
                    className="w-full"
                  />
                  <Input
                    icon={<User size={16} />}
                    label="Middle Name"
                    id="middleName"
                    placeholder="Michael"
                    {...register("middleName")}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Last Name"
                    icon={<User size={16} />}
                    id="lastName"
                    required
                    placeholder="Doe"
                    {...register("lastName")}
                    error={errors.lastName}
                    className="w-full"
                  />

                  <Input
                    label="Phone Number"
                    icon={<Phone size={16} />}
                    id="phoneNumber"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    {...register("phoneNumber")}
                    error={errors.phoneNumber}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Account Information</h3>

                <div className="space-y-2">
                  <Input
                    label="Email Address"
                    icon={<Mail size={16} />}
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    {...register("email")}
                    error={errors.email}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="Password"
                      icon={<Lock size={16} />}
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      {...register("password")}
                      error={errors.password}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      icon={<Lock size={16} />}
                      label="Confirm Password"
                      id="confirmPassword"
                      type="password"
                      required
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      error={errors.confirmPassword}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Location</h3>

                {!showMap ? (
                  <div className="border border-border rounded-lg p-4 bg-muted">
                    {latitude === 0 && longitude === 0 ? (
                      <p className="text-sm text-muted-foreground mb-3">
                        No location selected yet
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-3">
                        Selected: Lat {latitude.toFixed(4)}, Lng{" "}
                        {longitude.toFixed(4)}
                      </p>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowMap(true)}
                      className="w-full"
                    >
                      {latitude === 0
                        ? "Select Location on Map"
                        : "Change Location"}
                    </Button>
                  </div>
                ) : (
                  <MapPicker
                    onLocationSelect={handleLocationSelect}
                    initialLat={latitude || 20.5937}
                    initialLng={longitude || 78.9629}
                  />
                )}
                {errors.latitude && (
                  <p className="text-sm text-destructive">
                    {errors.latitude.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Register"}
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
