import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { DataShowcase } from "@/components/landing/DataShowcase";
import { UseCases } from "@/components/landing/UseCases";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Trust } from "@/components/landing/Trust";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Nav />
      <Hero />
      <DataShowcase />
      <UseCases />
      <HowItWorks />
      <Trust />
      <CtaSection />
      <Footer />
    </>
  );
};

export default Index;
