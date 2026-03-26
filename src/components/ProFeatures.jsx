import React from "react";
import { ScrollReveal } from "./ScrollReveal";

export const ProFeatures = () => {
  const features = [
    {
      title: "CUSTOM FORM BUILDER",
      desc: "Design perfect registration forms with any field type, validation, and logic.",
      icon: "📝",
      border: "border-pink-500/50",
      colorName: "pink",
      textColor: "text-pink-400",
    },
    {
      title: "MONETIZATION",
      desc: "Support for both paid and free events.",
      icon: "💰",
      border: "border-green-500/50",
      colorName: "green",
      textColor: "text-green-400",
    },
    {
      title: "SMART AWARDS",
      desc: "Auto-generate certificates and manage prizes.",
      icon: "🏆",
      border: "border-yellow-500/50",
      colorName: "yellow",
      textColor: "text-yellow-400",
    },
    {
      title: "AUTO-COMMS",
      desc: "Automated emails.",
      icon: "✉️",
      border: "border-cyan-500/50",
      colorName: "cyan",
      textColor: "text-cyan-400",
    },
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden pointer-events-none">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes reverse-spin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-reverse-spin { animation: reverse-spin 40s linear infinite; }
        .animate-spin-slow { animation: spin 40s linear infinite; }
        .glow-pulse-pink { animation: pulse-pink 3s infinite alternate; }
        @keyframes pulse-pink { 0% { box-shadow: 0 0 10px rgba(236,72,153,0.3); border-color: rgba(236,72,153,0.5); } 100% { box-shadow: 0 0 30px rgba(236,72,153,0.8); border-color: rgba(236,72,153,1); } }
        .glow-pulse-green { animation: pulse-green 3s infinite alternate; }
        @keyframes pulse-green { 0% { box-shadow: 0 0 10px rgba(34,197,94,0.3); border-color: rgba(34,197,94,0.5); } 100% { box-shadow: 0 0 30px rgba(34,197,94,0.8); border-color: rgba(34,197,94,1); } }
        .glow-pulse-yellow { animation: pulse-yellow 3s infinite alternate; }
        @keyframes pulse-yellow { 0% { box-shadow: 0 0 10px rgba(234,179,8,0.3); border-color: rgba(234,179,8,0.5); } 100% { box-shadow: 0 0 30px rgba(234,179,8,0.8); border-color: rgba(234,179,8,1); } }
        .glow-pulse-cyan { animation: pulse-cyan 3s infinite alternate; }
        @keyframes pulse-cyan { 0% { box-shadow: 0 0 10px rgba(6,182,212,0.3); border-color: rgba(6,182,212,0.5); } 100% { box-shadow: 0 0 30px rgba(6,182,212,0.8); border-color: rgba(6,182,212,1); } }
      `,
        }}
      />

      <ScrollReveal>
        <div className="flex flex-col items-center justify-center gap-4 mb-24">
          <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wider">
            PRO FEATURE
          </span>
          <p className="text-gray-300 text-lg text-center">
            Entirely modifiable system.{" "}
            <span className="text-white font-semibold">
              Milestone-based email alerts.
            </span>
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="flex justify-center items-center py-10 pointer-events-auto">
          <div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 rotate-45">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`w-[110px] h-[110px] sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-xl bg-[#0a0a0f]/90 border-2 ${f.border} glow-pulse-${f.colorName} group relative overflow-hidden cursor-default z-10 hover:z-20`}
                >
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 -rotate-45 flex items-center justify-center p-2 sm:p-4 md:p-6 text-center">
                      <div
                        className={`flex flex-col items-center justify-center transition-all duration-500 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75 absolute px-2 sm:px-4`}
                      >
                        <span className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-3 drop-shadow-md">
                          {f.icon}
                        </span>
                        <h4
                          className={`text-[10px] leading-tight sm:text-lg md:text-2xl font-black ${f.textColor}`}
                        >
                          {f.title}
                        </h4>
                      </div>
                      <p className="text-[8px] leading-tight sm:text-xs md:text-base font-medium text-white opacity-0 scale-125 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 absolute px-3 sm:px-6">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
