export default function Stats() {
  return (
    <section className="bg-card py-12 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Books Donated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-muted-foreground">Clothing Items</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Partner Organizations</div>
          </div>
        </div>
      </div>
    </section>
  );
}
