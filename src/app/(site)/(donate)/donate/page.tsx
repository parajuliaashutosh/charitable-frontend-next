import { DonationCard } from "@/components/common/donations/donation-card";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { donationServiceClient } from "@/transport/gateway/gRPC/requests/donation/donation-requests";
import { Gift } from "lucide-react";
import Link from 'next/link';

export default async function DonationsPage() {

  let donations;
  try {
    const resp = await donationServiceClient.getMyDonations({
      page: 1,
      limit: 20,
    }, 3);
    donations = resp?.data?.data;
  } catch (error) {
    console.error("Error fetching donations:", JSON.stringify(error, null, 2));
    donations = [];
  }

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
