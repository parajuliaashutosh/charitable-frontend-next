import { Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary text-white">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8" fill="white" />
          <span className="text-2xl font-bold">GiveHope</span>
        </div>
        <div className="hidden md:flex gap-6">
          <a href="#about" className="hover:text-secondary transition-colors">
            About
          </a>
          <a href="#donate" className="hover:text-secondary transition-colors">
            Donate
          </a>
          <a
            href="#organizations"
            className="hover:text-secondary transition-colors"
          >
            Organizations
          </a>
          <a href="#contact" className="hover:text-secondary transition-colors">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
