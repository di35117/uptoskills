import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "./ScrollReveal";
import { PlusIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
  const stages = [
    {
      num: "01",
      title: "REGISTRATION",
      align: "justify-start",
      color: "border-cyan-500/50",
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      num: "02",
      title: "TEAM FORMATION",
      align: "justify-end",
      color: "border-purple-500/50",
      text: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      num: "03",
      title: "IDEA SUBMISSION",
      align: "justify-start",
      color: "border-pink-500/50",
      text: "text-pink-400",
      bg: "bg-pink-500/10",
    },
    {
      num: "04",
      title: "MENTORSHIP",
      align: "justify-end",
      color: "border-orange-500/50",
      text: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      num: "05",
      title: "JUDGEMENT",
      align: "justify-start",
      color: "border-green-500/50",
      text: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  const stageRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stageRefs.current.forEach((el, index) => {
        if (!el) return;
        const isLeft = stages[index].align === "justify-start";
        gsap.fromTo(
          el,
          { opacity: 0, x: isLeft ? -100 : 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center overflow-hidden pointer-events-none">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Progressive Timeline
        </h2>
        <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
          Our industry-leading timeline system adapts to your event flow in full
          3D space.
        </p>
      </ScrollReveal>

      <div className="relative flex flex-col items-center mt-10">
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-pink-500/50 to-green-500/50"></div>
        {stages.map((stage, i) => (
          <div
            key={i}
            ref={(el) => (stageRefs.current[i] = el)}
            className={`w-full flex ${stage.align} mb-12 md:mb-20 relative z-10 pointer-events-auto`}
          >
            <div
              className={`min-w-[280px] sm:min-w-[320px] p-6 md:p-8 rounded-3xl bg-[#0a0a0f] border ${stage.color} hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.6)]`}
            >
              <div
                className={`w-14 h-14 shrink-0 rounded-2xl ${stage.bg} flex items-center justify-center`}
              >
                <PlusIcon />
              </div>
              <div className="text-left overflow-hidden">
                <p className={`text-xs font-bold tracking-wider ${stage.text}`}>
                  STAGE {stage.num}
                </p>
                <h4 className="text-xl md:text-2xl font-black text-white mt-1 whitespace-nowrap">
                  {stage.title}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
