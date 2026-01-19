import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Contact from "@/components/landing/contact";
import Donate from "@/components/landing/donate";
import Hero from "@/components/landing/hero";
import Organization from "@/components/landing/organization";

export default function Page() {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* <Hero /> */}
      <Hero />
      <Donate />
      <Organization />
      <Contact />
      <Footer />  
    </div>
  )
}
