import React, { useRef, useState } from "react";

export const NeonCreepyButton = ({
  children,
  colorTheme = "cyan",
  onClick,
  ...props
}) => {
  const eyesRef = useRef(null);
  const [eyeCoords, setEyeCoords] = useState({ x: 0, y: 0 });

  const updateEyes = (e) => {
    const userEvent = "touches" in e ? e.touches[0] : e;
    if (!eyesRef.current) return;

    const eyesRect = eyesRef.current.getBoundingClientRect();
    const eyesCenter = {
      x: eyesRect.left + eyesRect.width / 2,
      y: eyesRect.top + eyesRect.height / 2,
    };
    const cursor = { x: userEvent.clientX, y: userEvent.clientY };

    const dx = cursor.x - eyesCenter.x;
    const dy = cursor.y - eyesCenter.y;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;

    const distance = Math.min(Math.hypot(dx, dy), 200);
    const x = (Math.sin(angle) * distance) / 150;
    const y = (Math.cos(angle) * distance) / 100;

    setEyeCoords({ x, y });
  };

  const resetEyes = () => setEyeCoords({ x: 0, y: 0 });

  const isCyan = colorTheme === "cyan";
  const textColor = isCyan ? "text-cyan-400" : "text-pink-400";
  const borderColor = isCyan ? "border-cyan-500/50" : "border-pink-500/50";
  const shadowHover = isCyan
    ? "hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
    : "hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]";

  return (
    <button
      className={`group relative inline-flex items-center justify-center p-0 border-0 bg-transparent font-bold ${textColor} z-50 cursor-pointer pointer-events-auto`}
      onMouseMove={updateEyes}
      onTouchMove={updateEyes}
      onMouseLeave={resetEyes}
      onClick={onClick}
      style={{ touchAction: "pan-y", ...props.style }}
      {...props}
    >
      <span className="absolute inset-0 bg-[#050508] rounded-full border border-white/5 z-0 shadow-lg"></span>
      <span
        className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-1.5 z-0 pointer-events-none"
        ref={eyesRef}
      >
        <span className="w-2.5 h-2.5 bg-gray-200 rounded-full relative overflow-hidden animate-blink">
          <span
            className="absolute w-1.5 h-1.5 bg-black rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translate(${eyeCoords.x * 50}%, ${eyeCoords.y * 50}%)`,
            }}
          ></span>
        </span>
        <span className="w-2.5 h-2.5 bg-gray-200 rounded-full relative overflow-hidden animate-blink">
          <span
            className="absolute w-1.5 h-1.5 bg-black rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translate(${eyeCoords.x * 50}%, ${eyeCoords.y * 50}%)`,
            }}
          ></span>
        </span>
      </span>
      <span
        className={`relative z-10 flex items-center justify-center gap-2 px-8 py-4 w-full h-full rounded-full bg-[#0a0a0f] border ${borderColor} transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] origin-[20px_50%] group-hover:-rotate-[12deg] group-focus-visible:-rotate-[12deg] ${shadowHover}`}
      >
        {children}
      </span>
    </button>
  );
};
