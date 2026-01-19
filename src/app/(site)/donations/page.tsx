import { DonationCard } from "@/components/common/donations/donation-card";
import { DonationFilters } from "@/components/common/donations/donation-filters";
import { Empty } from "@/components/ui/empty";
import { donationServiceClient } from "@/transport/gateway/gRPC/requests/donation/donation-requests";

export default async function DonationsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string; status?: string }>;
}) {
  const params = await searchParams;

  let donations;
  try {
    const resp = await donationServiceClient.getDonations(
      {
        page: 1,
        limit: 20,
        search: params.search,
        type: params.type as any,
        status: params.status as any,
      },
      3
    );
    donations = resp?.data?.data;
  } catch (error) {
    console.error("Error fetching donations:", JSON.stringify(error, null, 2));
    donations = [];
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Donations</h1>
        <p className="text-muted-foreground">
          Donations available for claiming
        </p>
      </div>

      <div className="flex gap-6">
        <aside className="w-80">
          <DonationFilters />
        </aside>

        <div className="flex-1">
          {donations.length === 0 ? (
            <Empty />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
