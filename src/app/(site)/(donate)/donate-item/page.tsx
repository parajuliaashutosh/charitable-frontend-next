"use client";

import { MapPicker } from "@/components/common/map-picker/map-picker";
import MediaUpload from "@/components/common/media-upload/media-upload";
import GenericSelect from "@/components/common/select/generic-select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormError, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MediaType } from "@/constants/media.enum";
import { useGeolocation } from "@/hooks/useGeoLocation";
import useMedia from "@/hooks/useMedia";
import { logger } from "@/lib/logger";
import { mediaUploadFn } from "@/lib/uploadMedia";
import { donationServiceClient } from "@/transport/gateway/gRPC/requests/donation/donation-requests";
import { DonationType } from "@/transport/gateway/gRPC/stubs/exposed-common";
import { UserDonationRequest } from "@/transport/gateway/gRPC/stubs/exposed-donation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DONATION_TYPES = {
  [DonationType.BOOKS]: "Educational",
  [DonationType.CLOTHES]: "Clothing",
};

interface DonationFormData {
  title: string;
  description: string;
  type: string;
  lat: number;
  lng: number;
}

export default function DonateItemPage() {
  const router = useRouter();
  const [media, setMedia] = useMedia();
  const { coords, error: geoError } = useGeolocation();

  const [error, setError] = useState("");
  const [showMapPicker, setShowMapPicker] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<DonationFormData>({
    defaultValues: {
      title: "",
      description: "",
      type: "",
      lat: 0,
      lng: 0,
    },
  });

  const selectedType = watch("type");
  const selectedLat = watch("lat");
  const selectedLng = watch("lng");

  const handleLocationSelect = (latitude: number, longitude: number) => {
    setValue("lat", latitude);
    setValue("lng", longitude);
    setShowMapPicker(false);
  };

  const onSubmit = async (data: DonationFormData) => {
    try {
      setError("");

      // Validate location
      if (!data.lat || !data.lng) {
        setError("Please select a location on the map");
        return;
      }

      const mediaResponse = await mediaUploadFn(
        media?.selectedFiles,
        MediaType?.donations
      );

      logger.log("Media response check", mediaResponse);
      const payload: UserDonationRequest = {
        title: data.title,
        description: data.description,
        type: data?.type == "BOOKS" ? DonationType.BOOKS : DonationType.CLOTHES,
        productUrl: mediaResponse,
        lat: data.lat,
        long: data.lng,
      };

      const resp = await donationServiceClient.donate(payload, 2);
      console.log("🚀 ~ onSubmit ~ resp:", resp);

      console.log("Creating donation:", data);

      router.push("/donate");
      toast.success("Action Successful", {
        description:
          resp?.message || "Your donation has been created successfully.",
      });
    } catch (err: any) {
      setError("Failed to create donation. Please try again.");
      toast.error("Action Failed", {
        description:
          err?.message || "An error occurred while creating your donation.",
      });
      return;
    }
  };

  useEffect(() => {
    if (coords) {
      setValue("lat", coords?.lat);
      setValue("lng", coords?.lng);
    }
  }, [coords, setValue]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 hide-scrollbar max-h-[90vh] overflow-y-auto">
      {/* Back Button */}
      <Link
        href="/donate"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Donations
      </Link>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Donate an Item</CardTitle>
          <CardDescription>
            Share an item you&apos;d like to donate to someone in need
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 md:space-y-4s">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Donation Type */}
              <GenericSelect
                label="What are you donating?"
                placeholder="Select donation type"
                value={selectedType}
                handleChange={(val) => setValue("type", val as string)}
                options={DONATION_TYPES}
                error={errors?.type}
              />

              {/* Title */}
              <div className="space-y-2">
                <Input
                  label="Title"
                  id="title"
                  placeholder={
                    selectedType === "Educational"
                      ? "e.g., Mathematics Textbook"
                      : "e.g., Winter Jacket"
                  }
                  {...register("title", {
                    required: "Please enter a title for your donation",
                  })}
                  required
                  error={errors?.title}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <FormLabel required>Description</FormLabel>
              <Textarea
                id="description"
                placeholder="Describe the item condition, features, and other helpful details..."
                rows={5}
                {...register("description", {
                  required: "Please describe your donation",
                })}
              />
              <FormError error={errors?.description?.message} />
            </div>

            {/* Product URL (Optional) */}
            {/* <div className="space-y-2">
              <FormLabel>Product Link (Optional)</FormLabel>
              <Input
                id="productUrl"
                type="url"
                placeholder="Link to product details or image"
                {...register("productUrl")}
              />
            </div> */}

            {/* Location Picker */}
            <div className="space-y-2">
              <FormLabel>Location *</FormLabel>
              {!showMapPicker && (
                <div className="space-y-2">
                  {selectedLat && selectedLng ? (
                    <div className="p-4 border rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground mb-2">
                        Selected Location:
                      </p>
                      <p className="text-sm">
                        Latitude:{" "}
                        <span className="font-semibold">
                          {selectedLat.toFixed(4)}
                        </span>
                      </p>
                      <p className="text-sm">
                        Longitude:{" "}
                        <span className="font-semibold">
                          {selectedLng.toFixed(4)}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No location selected yet
                    </p>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowMapPicker(true)}
                    className="w-full"
                  >
                    {selectedLat && selectedLng
                      ? "Change Location"
                      : "Select Location"}
                  </Button>
                </div>
              )}
              {showMapPicker && (
                <MapPicker
                  onLocationSelect={handleLocationSelect}
                  initialLat={selectedLat || 20.5937}
                  initialLng={selectedLng || 78.9629}
                />
              )}
            </div>
            <FormError error={""} />

            <MediaUpload
              setAppState={setMedia}
              appState={media}
              title="Upload Images of the Item"
              accept={["images"]}
              isRequired={false}
              hideUpload={false}
            />

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary-dark"
              >
                {isSubmitting ? "Creating..." : "Create Donation"}
              </Button>
              <Link href="/donate" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
