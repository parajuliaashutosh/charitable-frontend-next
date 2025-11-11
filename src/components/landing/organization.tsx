import { Heart, Users } from "lucide-react";

export default function Header() {
  return (
    <section id="organizations" className="py-16 bg-muted">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Partner with Us
          </h2>

          <div className="mb-12">
            <p className="text-lg text-foreground mb-6">
              Are you a registered charity, NGO, or community organization?
              Partner with GiveHope to receive donations that will benefit your
              community.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    Direct Impact
                  </h3>
                  <p className="text-muted-foreground">
                    Receive donations directly to support your beneficiaries
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    No Cost
                  </h3>
                  <p className="text-muted-foreground">
                    Our platform is completely free for organizations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-primary mb-4">
              Requirements
            </h3>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Registered non-profit or charitable organization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Valid tax-exempt documentation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Clear mission aligned with community service</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Ability to pick up or receive donations</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="/partner"
              className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg"
            >
              Apply to Partner
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
