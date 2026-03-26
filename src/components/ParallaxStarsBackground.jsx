import React, { useMemo } from "react";

const generateBoxShadows = (n) => {
  let value = `${Math.floor(Math.random() * 4000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 4000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }
  return value;
};

export const ParallaxStarsBackground = ({ speed = 1, className = "" }) => {
  const shadowsSmall = useMemo(() => generateBoxShadows(700), []);
  const shadowsMedium = useMemo(() => generateBoxShadows(200), []);
  const shadowsBig = useMemo(() => generateBoxShadows(100), []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .bg-radial-space {
            background: radial-gradient(ellipse at top, #0b101e 0%, #020203 100%);
          }
          @keyframes animStarFall {
            from { transform: translateY(0px); }
            to { transform: translateY(2000px); }
          }
        `,
        }}
      />
      <div className="absolute inset-0 bg-radial-space z-0 opacity-80" />
      <div
        className="absolute left-0 top-0 w-[1px] h-[1px] bg-white rounded-full opacity-100"
        style={{
          boxShadow: shadowsSmall,
          animation: `animStarFall ${50 / speed}s linear infinite`,
        }}
      >
        <div
          className="absolute top-[-2000px] w-[1px] h-[1px] bg-white rounded-full"
          style={{ boxShadow: shadowsSmall }}
        />
      </div>
      <div
        className="absolute left-0 top-0 w-[2px] h-[2px] bg-white rounded-full opacity-90"
        style={{
          boxShadow: shadowsMedium,
          animation: `animStarFall ${100 / speed}s linear infinite`,
        }}
      >
        <div
          className="absolute top-[-2000px] w-[2px] h-[2px] bg-white rounded-full"
          style={{ boxShadow: shadowsMedium }}
        />
      </div>
      <div
        className="absolute left-0 top-0 w-[3px] h-[3px] bg-white rounded-full opacity-80"
        style={{
          boxShadow: shadowsBig,
          animation: `animStarFall ${150 / speed}s linear infinite`,
        }}
      >
        <div
          className="absolute top-[-2000px] w-[3px] h-[3px] bg-white rounded-full"
          style={{ boxShadow: shadowsBig }}
        />
      </div>
    </div>
  );
};
