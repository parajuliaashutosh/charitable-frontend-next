// import "@/transport/setup-interceptors"; // must come before other imports

import Footer from "@/src/components/common/footer";
import Header from "@/src/components/common/header";
import Contact from "@/src/components/landing/contact";
import Organization from "@/src/components/landing/organization";
import Donate from "../components/landing/donate";
import Hero from "../components/landing/hero";

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
