import React from "react";
import { ScrollReveal } from "./ScrollReveal";
import { ForceFieldBackground } from "./ForceFieldBackground";
import { NeonCreepyButton } from "./NeonCreepyButton";
import { PlusIcon } from "./Icons";

export const Hero = () => (
  <section className="relative pt-40 pb-32 px-6 flex flex-col items-center text-center min-h-screen justify-center overflow-hidden bg-[#020203] z-20">
    <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen">
      <ForceFieldBackground />
    </div>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
    <div
      className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>

    <div className="relative z-10 flex flex-col items-center pointer-events-none w-full">
      <ScrollReveal triggerOnce={true}>
        <div className="flex w-full justify-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-semibold tracking-widest text-gray-300 uppercase">
            The World's Best Competition Platform
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={100} triggerOnce={true}>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent drop-shadow-2xl animate-float">
          THRILL
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={200} triggerOnce={true}>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Unleash Innovation with <br />
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
            Thrill Engine
          </span>
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={300} triggerOnce={true}>
        <p className="max-w-2xl text-lg text-gray-200 font-medium mb-10 mx-auto">
          The industry standard for hackathon hosting. Whether you're a global
          enterprise looking for high-impact results or a college faculty
          building student communities.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={400} triggerOnce={true}>
        <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto justify-center">
          <NeonCreepyButton colorTheme="cyan">
            For Companies <span>→</span>
          </NeonCreepyButton>
          <NeonCreepyButton colorTheme="pink">
            For Universities <PlusIcon />
          </NeonCreepyButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
