"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DonationType } from '@/transport/gateway/gRPC/stubs/exposed-common';
import { DonationItems } from '@/transport/gateway/gRPC/stubs/exposed-donation';
import { BookOpen, Package, Shirt } from 'lucide-react';
import Image from 'next/image';
import StatusBadge from '../badge/status-badge';


interface DonationCardProps {
  donation: DonationItems
}

function DonationTypeIcon({ type }: { type:  DonationType}) {
  const iconClass = "w-5 h-5";
  
  switch (type) {
    case DonationType.BOOKS:
      return <BookOpen className={`${iconClass} text-primary`} />;
    case DonationType.CLOTHES:
      return <Shirt className={`${iconClass} text-accent`} />;
    default:
      return <Package className={`${iconClass} text-muted-foreground`} />;
  }
}

function DonationImage({ imageUrl, title, type }: { imageUrl?: string | null; title: string; type: DonationType }) {
  if (imageUrl) {
    return (
      <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={true}
        />
      </div>
    );
  }

  // Fallback illustration
  const IconComponent = type === DonationType.BOOKS ? BookOpen : Shirt;
  
  return (
    <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-linear-to-br from-muted to-muted/50 flex items-center justify-center">
      <IconComponent className="w-20 h-20 text-muted-foreground/30" />
    </div>
  );
}

export function DonationCard({ donation }: DonationCardProps) {
  const formattedDate = new Date(donation.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const donationTypeLabel = donation.type === DonationType.BOOKS ? 'Educational' : 'Clothing';
  
  const claimDonation = (id: string) => {
    // Implement claim logic here
    console.log(`Claiming donation with ID: ${donation.id}`);
  }
  return (
    <Card className="hover:shadow-lg transition-all duration-200 overflow-hidden pt-0">
      <DonationImage imageUrl={donation.url} title={donation.title} type={donation.type} />
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <DonationTypeIcon type={donation.type} />
              <CardTitle className="text-lg">{donation.title}</CardTitle>
            </div>
            <CardDescription className="text-xs mt-2">{donationTypeLabel}</CardDescription>
          </div>
          <StatusBadge status={donation.status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground line-clamp-3">{donation.description}</p>
        
        <div className="text-xs text-muted-foreground">
          Posted: {formattedDate}
        </div>

          {/* <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit?.(donation.id)}
          >
            Edit
          </Button> */}
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 text-destructive hover:text-destructive"
            onClick={() => claimDonation(donation.id)}
          >
            Claim
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}