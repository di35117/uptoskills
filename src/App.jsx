import React from "react";
import { Navbar } from "./components/Navbar";
import { ParallaxStarsBackground } from "./components/ParallaxStarsBackground";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { SetupSection } from "./components/SetupSection";
import { Timeline } from "./components/Timeline";
import { ProFeatures } from "./components/ProFeatures";
import { FeatureGrid } from "./components/FeatureGrid";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen selection:bg-purple-500/30 font-sans bg-[#020203] relative">
      <Navbar />

      <ParallaxStarsBackground speed={1.5} />

      <main className="relative w-full flex flex-col mt-20">
        <Hero />

        <div className="relative w-full z-10 overflow-hidden">
          <Stats />
          <SetupSection />
          <Timeline />
          <ProFeatures />
          <FeatureGrid />
          <FAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
