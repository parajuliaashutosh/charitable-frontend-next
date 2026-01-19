import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-card py-16 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Location</h3>
            <p className="text-muted-foreground">
              123 Hope Street
              <br />
              Kathmandu, Nepal
            </p>
          </div>
          <div>
            <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Phone</h3>
            <p className="text-muted-foreground">+977 1234567890</p>
          </div>
          <div>
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground">info@givehope.org</p>
          </div>
        </div>
      </div>
    </section>
  );
}
