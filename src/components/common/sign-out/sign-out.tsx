'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-destructive outline-none transition-colors hover:bg-destructive/10 focus:bg-destructive/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <LogOut className="w-4 h-4 mr-2" />
      <span>Sign Out</span>
    </button>
  );
}