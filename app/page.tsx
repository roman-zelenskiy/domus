import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Services } from "@/components/sections/Services";
import { Calculator } from "@/components/sections/Calculator";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Stats } from "@/components/sections/Stats";
import { Reviews } from "@/components/sections/Reviews";
import { Team } from "@/components/sections/Team";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { MobileCta } from "@/components/sections/MobileCta";
import { buildJsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problems />
        <Services />
        <Calculator />
        <Process />
        <Portfolio />
        <Stats />
        <Reviews />
        <Team />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
    </>
  );
}
