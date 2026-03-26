import React, { useRef, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { ParticleCard } from "./ParticleCard";

export const FeatureGrid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".bento-card");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        card.style.setProperty("--spotlight-radius", `300px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      title: "EVENT BANNER",
      desc: "HIGH-RES VISUALS",
      color: "text-cyan-400",
      rgb: "34, 211, 238",
    },
    {
      title: "CUSTOM LOGO",
      desc: "BRAND IDENTITY",
      color: "text-purple-400",
      rgb: "192, 132, 252",
    },
    {
      title: "SPONSOR DECK",
      desc: "PARTNER INTEGRATION",
      color: "text-pink-400",
      rgb: "244, 114, 182",
    },
    {
      title: "SOCIAL LINKS",
      desc: "COMMUNITY SYNC",
      color: "text-blue-400",
      rgb: "96, 165, 250",
    },
    {
      title: "GALLERY THEME",
      desc: "IMMERSIVE UI",
      color: "text-orange-400",
      rgb: "251, 146, 60",
    },
    {
      title: "PRICE OPTIONS",
      desc: "PAID & FREE",
      color: "text-green-400",
      rgb: "74, 222, 128",
    },
    {
      title: "EMAIL TEMPLATES",
      desc: "AUTO-COMMUNICATION",
      color: "text-yellow-400",
      rgb: "250, 204, 21",
    },
    {
      title: "DIGITAL CARDS",
      desc: "PARTICIPANT ID",
      color: "text-red-400",
      rgb: "248, 113, 113",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto pointer-events-none">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .bento-card {
          background: #0a0a0f;
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
          border-radius: 1rem;
        }
        .bento-card:hover { border-color: rgba(var(--card-glow-rgb), 0.3); }
        .spotlight-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(var(--spotlight-radius) circle at var(--mouse-x) var(--mouse-y), rgba(var(--card-glow-rgb), 0.15), transparent 80%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .bento-card:hover .spotlight-overlay { opacity: 1; }
        .border-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(var(--spotlight-radius) circle at var(--mouse-x) var(--mouse-y), rgba(var(--card-glow-rgb), 0.8), transparent 40%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .bento-card:hover .border-glow { opacity: 1; }
      `,
        }}
      />

      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Showcase Your Brand
          </h2>
        </div>
      </ScrollReveal>

      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto"
      >
        {features.map((f, i) => (
          <ScrollReveal key={i} delay={i * 50}>
            <ParticleCard
              className="bento-card h-full w-full p-6 flex flex-col items-center text-center group cursor-pointer"
              glowColor={f.rgb}
            >
              <div style={{ "--card-glow-rgb": f.rgb }}>
                <div className="spotlight-overlay" />
                <div className="border-glow" />
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                  <h4 className="text-lg font-bold text-white mb-2">
                    {f.title}
                  </h4>
                  <p className={`text-xs font-bold tracking-widest ${f.color}`}>
                    {f.desc}
                  </p>
                </div>
              </div>
            </ParticleCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
