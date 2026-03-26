import React from "react";
import { ScrollReveal } from "./ScrollReveal";
import { GlowingEdgeCard } from "./GlowingEdgeCard";

export const SetupSection = () => (
  <section className="py-20 px-6 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-8">
      <ScrollReveal delay={0}>
        <GlowingEdgeCard
          glowColorHsl="190deg 100% 50%"
          className="h-full shadow-2xl"
        >
          <div className="p-8 md:p-12 relative z-10 h-full flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-500"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="text-3xl font-bold text-white">
                For Corporations
              </h3>
              <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
                SYS_CORP // ACTIVE
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-sm relative z-10 flex-grow">
              Bespoke hackathons & recruitment drives managed through an
              advanced, highly-secure dashboard.
            </p>
            <div className="space-y-4 mb-10 relative z-10">
              {[
                "Custom Branding & Portals",
                "Dedicated Event Consultant",
                "Direct Support Lead",
                "Recruitment-Focused Data",
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors cursor-pointer group/item backdrop-blur-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover/item:shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                  <span className="font-medium text-gray-300 group-hover/item:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 font-bold hover:bg-cyan-500 hover:text-white transition-all duration-300 relative z-10 mt-auto">
              INITIALIZE SETUP →
            </button>
          </div>
        </GlowingEdgeCard>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <GlowingEdgeCard
          glowColorHsl="330deg 100% 60%"
          className="h-full shadow-2xl"
        >
          <div className="p-8 md:p-12 relative z-10 h-full flex flex-col">
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full group-hover:bg-pink-500/20 transition-colors duration-500"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="text-3xl font-bold text-white">
                For Universities
              </h3>
              <div className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold border border-pink-500/20">
                SYS_UNIV // ACTIVE
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-sm relative z-10 flex-grow">
              Empower students with self-serve tools to launch hackathons and
              workshops in minutes.
            </p>
            <div className="space-y-4 mb-10 relative z-10">
              {[
                "Self-Serve Event Creation",
                "Customizable Student Forms",
                "Automated Participant Grading",
                "Instant Event Distribution",
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-pink-500/10 hover:border-pink-500/50 transition-colors cursor-pointer group/item backdrop-blur-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-pink-400 group-hover/item:shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
                  <span className="font-medium text-gray-300 group-hover/item:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/50 font-bold hover:bg-pink-500 hover:text-white transition-all duration-300 relative z-10 mt-auto">
              LAUNCH EVENT →
            </button>
          </div>
        </GlowingEdgeCard>
      </ScrollReveal>
    </div>
  </section>
);
