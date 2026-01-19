// components/donations/donation-filters.tsx
'use client';

import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

export function DonationFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/donations?${params.toString()}`);
  };

  return (
    <div className="sticky top-6 space-y-4 rounded-lg border p-4">
      <h2 className="font-semibold">Filters</h2>
      
      <Input
        placeholder="Search..."
        defaultValue={searchParams.get('search') || ''}
        onChange={(e) => updateFilters('search', e.target.value)}
      />

      {/* Add your type and status selects here */}
    </div>
  );
}