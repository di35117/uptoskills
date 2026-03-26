import React from "react";
import { CardSwap, Card } from "./CardSwap";

export const Stats = () => {
  const stats = [
    {
      value: "500+",
      label: "EVENTS HOSTED",
      color: "text-cyan-400",
      border: "border-cyan-500/40",
      bg: "from-cyan-900/20 to-[#050508]",
    },
    {
      value: "100K+",
      label: "PARTICIPANTS",
      color: "text-pink-400",
      border: "border-pink-500/40",
      bg: "from-pink-900/20 to-[#050508]",
    },
    {
      value: "20K+",
      label: "COLLEGE PARTNERS",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "from-purple-900/20 to-[#050508]",
    },
    {
      value: "∞",
      label: "INNOVATION",
      color: "text-orange-400",
      border: "border-orange-500/40",
      bg: "from-orange-900/20 to-[#050508]",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <div className="h-[250px] md:h-[300px] flex justify-center w-full scale-[0.55] sm:scale-75 md:scale-100 origin-top md:origin-center mt-10 md:mt-0">
        <CardSwap
          width={460}
          height={220}
          delay={1400}
          cardDistance={50}
          verticalDistance={25}
          skewAmount={2}
          pauseOnHover={true}
        >
          {stats.map((stat, i) => (
            <Card
              key={i}
              className={`p-8 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(0,0,0,0.8)] ${stat.border} bg-gradient-to-br ${stat.bg}`}
            >
              <h3 className={`text-6xl font-black mb-4 ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="text-sm font-bold tracking-widest text-gray-300">
                {stat.label}
              </p>
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
};
