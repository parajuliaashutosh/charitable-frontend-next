import { Badge } from "@/components/ui/badge";

function StatusBadge({ status }: { status: string }) {

    function getVariant(status: string) {
    switch (status.toLowerCase()) {
      case "available":
        return "secondary";
      case "pending":
        return "secondary";
      case "inactive":
        return "destructive";
      default:
        return "default";
    }
  }

  const variant = getVariant(status);

  return <Badge variant={variant}>{status}</Badge>;
}

export default StatusBadge;