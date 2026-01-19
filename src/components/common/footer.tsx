import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-6 h-6" fill="white" />
          <span className="text-xl font-bold">GiveHope</span>
        </div>
        <p className="text-blue-100">
          Making the world a better place, one donation at a time.
        </p>
        <p className="text-sm text-blue-200 mt-4">
          © 2025 GiveHope. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
