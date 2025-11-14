import { DonationCard } from "@/components/common/donations/donation-card";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { auth } from "@/lib/auth";
import { Gift } from "lucide-react";
import Link from 'next/link';

export default async function DonationsPage() {
  const session = await auth();

  // Fetch donations from your gRPC service
  // const response = await donationServiceRequests.listDonations({
  //   userId: session.user.id,
  // }, 3, {
  //   meta: {
  //     Authorization: `Bearer ${session.accessToken}`,
  //   },
  // });

  // Mock data for demonstration
  const donations = [
    {
      id: "1",
      title: "Mathematics Textbooks",
      description:
        "Complete set of high school mathematics textbooks in excellent condition",
      type: "EDUCATIONAL" as const,
      status: "PENDING" as const,
      imageUrl: null,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Winter Clothing Bundle",
      description:
        "Warm jackets, sweaters, and winter accessories for children",
      type: "CLOTHING" as const,
      status: "APPROVED" as const,
      imageUrl: "/images/clothing-bundle.jpg",
      createdAt: new Date("2024-01-10"),
    },
  ];

  return (
    <div className="flex flex-col container mx-auto px-4 py-8 gap-8">
      <div className="">
        <h1 className="text-3xl font-bold text-foreground">My Donations</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track your donation items
        </p>
      </div>

      <div className="flex justify-end md:justify-between items-center">
        <h2 className="text-xl font-semibold hidden md:block">Items You&apos;re Donating</h2>

        <Link href="/donate-item">
          <Button className="bg-primary hover:bg-primary-dark">
            <Gift className="w-4 h-4 mr-2" />
            Add New Donation
          </Button>
        </Link>
      </div>

      {donations.length === 0 ? (
        <Empty
          title="No donations yet"
          description="Start making a difference by creating your first donation"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
}
