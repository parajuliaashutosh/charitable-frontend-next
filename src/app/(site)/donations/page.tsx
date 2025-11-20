import { DonationCard } from "@/components/common/donations/donation-card";
import { Empty } from "@/components/ui/empty";
import { donationServiceClient } from "@/transport/gateway/gRPC/requests/donation/donation-requests";

export default async function DonationsPage() {

  let donations;
  try {
    const resp = await donationServiceClient.getDonations(
      {
        page: 1,
        limit: 20,
      },
      3
    );
    donations = resp?.data?.data;
  } catch (error) {
    console.error("Error fetching donations:", JSON.stringify(error, null, 2));
    donations = [];
  }

  return (
    <div className="flex flex-col container mx-auto px-4 py-8 gap-8">
      <div className="">
        <h1 className="text-3xl font-bold text-foreground">Donations</h1>
        <p className="text-muted-foreground mt-2">
          Donations available for claiming
        </p>
      </div>

      {donations.length === 0 ? (
        <Empty>
          <h3 className="text-lg font-semibold">No donations yet</h3>
          <p className="text-muted-foreground">
            There are currently no donations available. Please check back later.
          </p>
        </Empty>
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
