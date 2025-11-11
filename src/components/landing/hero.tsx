import Stats from "./stats";

export default function Hero() {
  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Make a Difference Today
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Donate books and clothes to help those in need. Together, we can
          create positive change.
        </p>
        <a
          href="#donate"
          className="inline-block bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary transition-colors shadow-lg"
        >
          Start Donating
        </a>
      </div>
      <Stats />
    </header>
  );
}
