"use client";

import GridBackground from "./components/GridBackground";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import AgentRoles from "./components/AgentRoles";
import RealResults from "./components/RealResults";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <GridBackground />
      <main className="relative z-10">
        <Hero />
        <Problem />
        <HowItWorks />
        <AgentRoles />
        <RealResults />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
