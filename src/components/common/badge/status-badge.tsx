import { Badge } from "@/components/ui/badge";
import { DonationStatus } from "@/transport/gateway/gRPC/stubs/exposed-common";

function StatusBadge({ status }: { status: string | number | DonationStatus }) {

    function getVariant(status: string | number | DonationStatus) {
    switch (status) {
      case DonationStatus.AVAILABLE:
        return "default";
      case DonationStatus.CLAIMED:
        return "secondary";
      case DonationStatus.DONATED:
        return "destructive";
      default:
        return "default";
    }
  }

  function getValue(status: string | number | DonationStatus) {
      switch (status) {
        case DonationStatus.AVAILABLE:
          return "AVAILABLE";
        case DonationStatus.CLAIMED:
          return "CLAIMED";
        case DonationStatus.DONATED:
          return "DONATED";
        default:
          return "UNKNOWN";
      }
  }

  const variant = getVariant(status);

  return <Badge variant={variant}>{getValue(status)}</Badge>;
}

export default StatusBadge;