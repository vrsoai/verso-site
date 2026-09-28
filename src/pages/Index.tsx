import { Ticker } from "@/components/landing/Ticker";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { CoverageBar } from "@/components/landing/CoverageBar";
import { BuildMode } from "@/components/landing/BuildMode";
import { AgentIndex } from "@/components/landing/AgentIndex";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Reports } from "@/components/landing/Reports";
import { MethodologyStrip } from "@/components/landing/MethodologyStrip";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Ticker />
      <Nav />
      <Hero />
      <CoverageBar />
      <BuildMode />
      <AgentIndex />
      <HowItWorks />
      <Reports />
      <MethodologyStrip />
      <CtaSection />
      <Footer />
    </>
  );
};

export default Index;
