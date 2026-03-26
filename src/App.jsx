import React, {
  useState,
  useEffect,
  useRef,
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ForceFieldBackground } from "./ForceFieldBackground";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- GLOBAL ICONS (Used in Hero, Timeline, FAQ, etc.) ---
const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

// --- NAVBAR SPECIFIC ICONS ---
const NavSearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-gray-300"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-orange-400"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const NotificationIcon = () => (
  <div className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-yellow-500"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
      2
    </span>
  </div>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const NavChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// --- UTILITY COMPONENTS ---
const ScrollReveal = ({ children, delay = 0, triggerOnce = false }) => {
  const domRef = useRef();

  useEffect(() => {
    const el = domRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: triggerOnce
              ? "play none none none"
              : "play reverse play reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [delay, triggerOnce]);

  return (
    <div ref={domRef} className="w-full h-full will-change-transform">
      {children}
    </div>
  );
};

// --- PARALLAX FALLING STARS BACKGROUND ---
const generateBoxShadows = (n) => {
  let value = `${Math.floor(Math.random() * 4000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 4000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }
  return value;
};

const ParallaxStarsBackground = ({ speed = 1, className = "" }) => {
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

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-radial-space z-0 opacity-80" />

      {/* Stars Layer 1 */}
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

      {/* Stars Layer 2 */}
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

      {/* Stars Layer 3 */}
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

// --- Advanced Glowing Edge Card (Setup Section) ---
const GlowingEdgeCard = ({
  className,
  children,
  glowColorHsl = "190deg 100% 50%",
  ...props
}) => {
  const cardRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
  const clamp = (value, min = 0, max = 100) =>
    Math.min(Math.max(value, min), max);

  const centerOfElement = (rect) => [rect.width / 2, rect.height / 2];

  const getPointerPosition = (rect, e) => {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = clamp((100 / rect.width) * x);
    const py = clamp((100 / rect.height) * y);
    return { pixels: [x, y], percent: [px, py] };
  };

  const angleFromPointer = (dx, dy) => {
    let angleRadians = 0;
    let angleDegrees = 0;
    if (dx !== 0 || dy !== 0) {
      angleRadians = Math.atan2(dy, dx);
      angleDegrees = angleRadians * (180 / Math.PI) + 90;
      if (angleDegrees < 0) {
        angleDegrees += 360;
      }
    }
    return angleDegrees;
  };

  const closenessToEdge = (rect, x, y) => {
    const [cx, cy] = centerOfElement(rect);
    const dx = x - cx;
    const dy = y - cy;
    let k_x = Infinity;
    let k_y = Infinity;
    if (dx !== 0) k_x = cx / Math.abs(dx);
    if (dy !== 0) k_y = cy / Math.abs(dy);
    return clamp(1 / Math.min(k_x, k_y), 0, 1);
  };

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const position = getPointerPosition(rect, e);
    const [px, py] = position.pixels;
    const [perx, pery] = position.percent;

    const [cx, cy] = centerOfElement(rect);
    const dx = px - cx;
    const dy = py - cy;

    const edge = closenessToEdge(rect, px, py);
    const angle = angleFromPointer(dx, dy);

    cardRef.current.style.setProperty("--pointer-x", `${round(perx)}%`);
    cardRef.current.style.setProperty("--pointer-y", `${round(pery)}%`);
    cardRef.current.style.setProperty("--pointer-deg", `${round(angle)}deg`);
    cardRef.current.style.setProperty("--pointer-d", `${round(edge * 100)}`);

    if (isAnimating) {
      setIsAnimating(false);
      cardRef.current.classList.remove("animating");
    }
  };

  useEffect(() => {
    const playAnimation = () => {
      if (!cardRef.current) return;
      setIsAnimating(true);
      const angleStart = 110;
      const angleEnd = 465;
      cardRef.current.style.setProperty("--pointer-deg", `${angleStart}deg`);

      const startTime = performance.now();

      const animate = (now) => {
        if (
          !cardRef.current ||
          !cardRef.current.classList.contains("animating")
        )
          return;
        const elapsed = now - startTime;

        if (elapsed > 500 && elapsed < 1000) {
          const t = (elapsed - 500) / 500;
          const ease = 1 - Math.pow(1 - t, 3);
          cardRef.current.style.setProperty("--pointer-d", `${ease * 100}`);
        }
        if (elapsed > 500 && elapsed < 2000) {
          const t = (elapsed - 500) / 1500;
          const ease = t * t * t;
          const d = (angleEnd - angleStart) * (ease * 0.5) + angleStart;
          cardRef.current.style.setProperty("--pointer-deg", `${d}deg`);
        }
        if (elapsed >= 2000 && elapsed < 4250) {
          const t = (elapsed - 2000) / 2250;
          const ease = 1 - Math.pow(1 - t, 3);
          const d = (angleEnd - angleStart) * (0.5 + ease * 0.5) + angleStart;
          cardRef.current.style.setProperty("--pointer-deg", `${d}deg`);
        }
        if (elapsed > 3000 && elapsed < 4500) {
          const t = (elapsed - 3000) / 1500;
          const ease = t * t * t;
          cardRef.current.style.setProperty(
            "--pointer-d",
            `${(1 - ease) * 100}`,
          );
        }

        if (elapsed < 4500) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          cardRef.current?.classList.remove("animating");
        }
      };

      requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => playAnimation(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative w-full flex flex-col rounded-3xl group transition-colors duration-300 dark-mode ${isAnimating ? "animating" : ""} ${className}`}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      style={{
        "--glow-sens": "30",
        "--pointer-x": "50%",
        "--pointer-y": "50%",
        "--pointer-deg": "45deg",
        "--pointer-d": "0",
        "--color-sens": "calc(var(--glow-sens) + 20)",
        "--card-bg":
          "linear-gradient(8deg, #0a0a0f 75%, color-mix(in hsl, #0a0a0f, white 2.5%) 75.5%)",
        "--blend": "soft-light",
        "--glow-blend": "plus-lighter",
        "--glow-color": glowColorHsl,
        "--glow-boost": "0%",
        "--fg": "white",
        ...props.style,
      }}
      {...props}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .glowing-card-mesh-border {
                position: absolute;
                inset: 0;
                border-radius: inherit;
                z-index: -1;
                border: 1px solid transparent;
                background:
                    linear-gradient(var(--card-bg) 0 100%) padding-box,
                    linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
                    radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%) border-box,
                    radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%) border-box,
                    radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%) border-box,
                    radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%) border-box,
                    radial-gradient(at 86% 85%, hsla(186,100%,74%,1) 0px, transparent 50%) border-box,
                    radial-gradient(at 82% 18%, hsla(52,100%,65%,1) 0px, transparent 50%) border-box,
                    radial-gradient(at 51% 4%, hsla(12,100%,72%,1) 0px, transparent 50%) border-box,
                    linear-gradient(#c299ff 0 100%) border-box;
                opacity: calc((var(--pointer-d) - var(--color-sens)) / (100 - var(--color-sens)));
                mask-image: conic-gradient(from var(--pointer-deg) at center, black 25%, transparent 40%, transparent 60%, black 75%);
                transition: opacity 0.25s ease-out;
            }
            
            .glowing-card-mesh-bg {
                position: absolute;
                inset: 0;
                border-radius: inherit;
                z-index: -1;
                border: 1px solid transparent;
                background:
                    radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%) padding-box,
                    radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%) padding-box,
                    radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%) padding-box,
                    radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%) padding-box,
                    radial-gradient(at 86% 85%, hsla(186,100%,74%,1) 0px, transparent 50%) padding-box,
                    radial-gradient(at 82% 18%, hsla(52,100%,65%,1) 0px, transparent 50%) padding-box,
                    radial-gradient(at 51% 4%, hsla(12,100%,72%,1) 0px, transparent 50%) padding-box,
                    linear-gradient(#c299ff 0 100%) padding-box;
                mask-image:
                    linear-gradient(to bottom, black, black),
                    radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
                    radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
                    radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
                    radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
                    radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
                    conic-gradient(from var(--pointer-deg) at center, transparent 5%, black 15%, black 85%, transparent 95%);
                mask-composite: subtract, add, add, add, add, add, add;
                opacity: calc((var(--pointer-d) - var(--color-sens)) / (100 - var(--color-sens)));
                mix-blend-mode: var(--blend);
                transition: opacity 0.25s ease-out;
            }
            
            .glowing-card-glow {
                position: absolute;
                inset: -40px;
                pointer-events: none;
                z-index: 1;
                mask-image: conic-gradient(from var(--pointer-deg) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%);
                opacity: calc((var(--pointer-d) - var(--glow-sens)) / (100 - var(--glow-sens)));
                mix-blend-mode: var(--glow-blend);
                transition: opacity 0.25s ease-out;
                border-radius: inherit;
            }
            
            .glowing-card-glow::before {
                content: "";
                position: absolute;
                inset: 40px;
                border-radius: inherit;
                box-shadow: 
                    inset 0 0 0 1px hsl(var(--glow-color) / 100%),
                    inset 0 0 1px 0 hsl(var(--glow-color) / calc(var(--glow-boost) + 60%)),
                    inset 0 0 3px 0 hsl(var(--glow-color) / calc(var(--glow-boost) + 50%)),
                    inset 0 0 6px 0 hsl(var(--glow-color) / calc(var(--glow-boost) + 40%)),
                    inset 0 0 15px 0 hsl(var(--glow-color) / calc(var(--glow-boost) + 30%)),
                    inset 0 0 25px 2px hsl(var(--glow-color) / calc(var(--glow-boost) + 20%)),
                    inset 0 0 50px 2px hsl(var(--glow-color) / calc(var(--glow-boost) + 10%)),
                    0 0 1px 0 hsl(var(--glow-color) / calc(var(--glow-boost) + 60%)),
                    0 0 3px 0 hsl(var(--glow-color) / calc(var(--glow-boost) + 50%)),
                    0 0 6px 0 hsl(var(--glow-color) / calc(var(--glow-boost) + 40%)),
                    0 0 15px 0 hsl(var(--glow-color) / calc(var(--glow-boost) + 30%)),
                    0 0 25px 2px hsl(var(--glow-color) / calc(var(--glow-boost) + 20%)),
                    0 0 50px 2px hsl(var(--glow-color) / calc(var(--glow-boost) + 10%));
            }

            .group:not(:hover):not(.animating) .glowing-card-mesh-border,
            .group:not(:hover):not(.animating) .glowing-card-mesh-bg,
            .group:not(:hover):not(.animating) .glowing-card-glow {
                opacity: 0 !important;
                transition: opacity 0.75s ease-in-out;
            }

            /* --- MOBILE PULSE OVERRIDE --- */
            @media (max-width: 1024px) {
                .group:not(:hover):not(.animating) .glowing-card-mesh-border {
                    opacity: 0.8 !important;
                    mask-image: none !important;
                    animation: mobileEdgePulse 3s ease-in-out infinite alternate !important;
                }
                .group:not(:hover):not(.animating) .glowing-card-glow {
                    opacity: 0.5 !important;
                    mask-image: none !important;
                    animation: mobileGlowPulse 3s ease-in-out infinite alternate !important;
                }
                @keyframes mobileEdgePulse {
                    0% { opacity: 0.2; }
                    100% { opacity: 0.9; }
                }
                @keyframes mobileGlowPulse {
                    0% { opacity: 0.1; }
                    100% { opacity: 0.6; }
                }
            }
        `,
        }}
      />

      {/* Background Layers */}
      <div className="glowing-card-mesh-border" />
      <div className="glowing-card-mesh-bg" />
      <div className="glowing-card-glow" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full bg-[#050508] rounded-[inherit] border border-white/5">
        {children}
      </div>
    </div>
  );
};

// --- NEON CREEPY BUTTON ---
const NeonCreepyButton = ({
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
      className={`group relative inline-flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer font-bold ${textColor}`}
      onMouseMove={updateEyes}
      onTouchMove={updateEyes}
      onMouseLeave={resetEyes}
      onClick={onClick}
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

// --- GSAP HYPER-FAST CARD SWAP ENGINE ---
const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-2xl border backdrop-blur-xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 1400,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 0.85,
          durMove: 0.85,
          durReturn: 0.85,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.6,
          durMove: 0.6,
          durReturn: 0.6,
          promoteOverlap: 0.45,
          returnDelay: 0.1,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length],
  );
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef(0);
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current)
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount,
        );
    });

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });
      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.1}`,
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => gsap.set(elFront, { zIndex: backSlot.zIndex }),
        undefined,
        "return",
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    refs,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child,
  );

  return (
    <div
      ref={container}
      className="relative perspective-[1200px] transform-gpu"
      style={{ width, height }}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {rendered}
      </div>
    </div>
  );
};

// --- NEW: MAGIC BENTO PARTICLE LOGIC ---
const createParticleElement = (x, y, colorRGB) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${colorRGB}, 1);
    box-shadow: 0 0 6px rgba(${colorRGB}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard = ({
  children,
  className = "",
  particleCount = 12,
  glowColor = "132, 0, 255",
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const particle = createParticleElement(x, y, glowColor);
        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }, i * 100);
      timeoutsRef.current.push(timeoutId);
    }
  }, [particleCount, glowColor]);

  useEffect(() => {
    if (!cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(${glowColor}, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
      `;
      element.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

// --- NEW NAVBAR COMPONENTS ---
const navItems = [
  { name: "Learn & Earn", links: ["Sub Link 1", "Sub Link 2", "Sub Link 3"] },
  {
    name: "Jobs",
    links: ["All Jobs", "IT Jobs", "Non-IT Jobs", "Internships"],
  },
  { name: "Compete", links: ["Events", "Hackathons", "Leagues"] },
  { name: "Discover", links: ["Support", "Hall of Fame", "Hackathons"] },
];

const UserActions = () => (
  <div className="flex flex-row items-center gap-4">
    <button className="text-gray-300 transition hover:text-white">
      <NavSearchIcon />
    </button>
    <button className="text-gray-300 transition hover:text-white">
      <ChatIcon />
    </button>
    <button className="text-gray-300 transition hover:text-white">
      <NotificationIcon />
    </button>
    <button className="relative w-9 h-9 overflow-hidden border-2 border-orange-500 rounded-full ml-1">
      <img
        src="https://res.cloudinary.com/dv59954/image/upload/v1642194635/uptoskills-user-profile.webp"
        alt="User Profile"
        className="object-cover w-full h-full"
      />
    </button>
  </div>
);

const DropdownMenu = ({ links }) => (
  <ul className="absolute left-0 w-48 py-2 mt-2 bg-[#0e1525] border border-gray-700 rounded-lg shadow-xl top-full">
    {links.map((link, index) => (
      <li key={index}>
        <a
          href="#"
          className="block px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
        >
          {link}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-[#0e1525]">
      <div className="flex flex-row items-center justify-between px-6 h-20 mx-auto max-w-7xl">
        {/* Left Side: Logo & Menu Button */}
        <div className="flex flex-row items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-200 focus:outline-none md:hidden"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          {/* Logo */}
          <img
            src="https://res.cloudinary.com/dffm4zxpc/image/upload/v1774514098/uptoskillslogo-removebg-preview_vjal22.webp"
            alt="UptoSkills Logo"
            className="h-10 md:h-12 object-contain"
          />
        </div>

        {/* Center Side: Nav Links (Desktop) */}
        <ul className="flex-row items-center gap-8 hidden md:flex h-full">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative group h-full flex items-center"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex flex-row items-center gap-1.5 py-2.5 text-[15px] font-semibold text-gray-200 transition hover:text-white">
                {item.name}
                <NavChevronDown />
              </button>
              {activeDropdown === item.name && (
                <DropdownMenu links={item.links} />
              )}
            </li>
          ))}
        </ul>

        {/* Right Side: Icons, Profile, Button */}
        <div className="flex flex-row items-center gap-6">
          {/* User Icons (hidden on mobile, inside drawer) */}
          <div className="hidden md:block">
            <UserActions />
          </div>

          {/* Enterprise Button */}
          <button className="flex flex-row items-center gap-1.5 px-6 py-2.5 text-sm font-bold text-white transition rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:opacity-90 hidden md:flex">
            For Enterprise
          </button>
        </div>
      </div>

      {/* --- Mobile Drawer Menu --- */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-0 left-0 w-3/4 sm:w-1/2 h-full bg-[#0e1525] p-6 flex flex-col gap-6 shadow-2xl border-t border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Content */}
            <div className="flex flex-col flex-grow gap-6 overflow-y-auto pb-6">
              {/* Search */}
              <div className="flex flex-row items-center w-full gap-3 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg">
                <NavSearchIcon />
                <input
                  type="search"
                  placeholder="Search..."
                  className="flex-grow text-sm text-white placeholder-gray-400 bg-transparent outline-none"
                />
              </div>

              {/* User Actions Mobile */}
              <div className="flex justify-around items-center border-b border-gray-800 pb-6">
                <button className="text-gray-300 transition hover:text-white">
                  <ChatIcon />
                </button>
                <button className="text-gray-300 transition hover:text-white">
                  <NotificationIcon />
                </button>
                <button className="relative w-10 h-10 overflow-hidden border-2 border-orange-500 rounded-full">
                  <img
                    src="https://res.cloudinary.com/dv59954/image/upload/v1642194635/uptoskills-user-profile.webp"
                    alt="User Profile"
                    className="object-cover w-full h-full"
                  />
                </button>
              </div>

              {/* Nav Links */}
              <ul className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <li key={index} className="group">
                    <button className="flex flex-row items-center justify-between w-full py-2 text-base font-semibold text-gray-200 transition hover:text-white">
                      {item.name}
                      <NavChevronDown />
                    </button>
                    <ul className="hidden pl-4 mt-2 space-y-3 group-hover:block border-l border-gray-800 ml-2">
                      {item.links.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href="#"
                            className="text-sm font-medium text-gray-400 transition hover:text-white"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              {/* Enterprise Button */}
              <button className="flex flex-row items-center justify-center w-full gap-1.5 px-8 py-3.5 mt-auto font-bold text-white transition rounded-full shadow-[0_0_15px_rgba(249,115,22,0.3)] bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90">
                For Enterprise
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
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
        {/* UPDATED: Removed background, border, and padding classes */}
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

const Stats = () => {
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

const SetupSection = () => (
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

const Timeline = () => {
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
    <section className="py-20 px-6 max-w-4xl mx-auto text-center overflow-hidden">
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
            className={`w-full flex ${stage.align} mb-12 md:mb-20 relative z-10`}
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

const ProFeatures = () => {
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
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
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
        <div className="flex justify-center items-center py-10">
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

// --- NEW: Magic Bento Feature Grid ---
const FeatureGrid = () => {
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
    <section className="py-20 px-6 max-w-7xl mx-auto">
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

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      q: "Is Thrill suitable for global hackathons?",
      a: "Absolutely. Our infrastructure is built to scale for thousands of concurrent participants with global proctoring and real-time support.",
    },
    {
      q: "How customizable is the event portal?",
      a: "Total customization. From colors and logos to custom URLs and form logic, Thrill is built to be an extension of your brand.",
    },
    {
      q: "Do participants get automated updates?",
      a: "Yes, our automated communication system keeps participants informed at every stage of the timeline.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
          System FAQ
        </h2>
      </ScrollReveal>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-hidden hover:border-white/20 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <div
                  className={`transform transition-transform duration-300 ${openIndex === i ? "rotate-180 text-cyan-400" : "text-gray-500"}`}
                >
                  <ChevronDown />
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-6 pb-5 text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

// --- NEW FOOTER MATCHING THE IMAGE ---
const FooterLink = ({ icon, text }) => (
  <li className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer group">
    <span className="text-gray-400 group-hover:text-cyan-400">{icon}</span>
    <span>{text}</span>
  </li>
);

// Minimal inline SVGs to match the list items
const SvgIcon = ({ d, ...props }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {d}
  </svg>
);
const IconCap = () => (
  <SvgIcon
    d={
      <>
        <path d="M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
        <path d="M22 10v6" />
      </>
    }
  />
);
const IconBuilding = () => (
  <SvgIcon
    d={
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </>
    }
  />
);
const IconMonitor = () => (
  <SvgIcon
    d={
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    }
  />
);
const IconSearch = () => (
  <SvgIcon
    d={
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    }
  />
);
const IconUsers = () => (
  <SvgIcon
    d={
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    }
  />
);
const IconBriefcase = () => (
  <SvgIcon
    d={
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    }
  />
);
const IconInfinity = () => (
  <SvgIcon
    d={
      <>
        <path d="M18.178 7.822a4 4 0 0 0-5.656 0L12 8.343l-1.522-.521a4 4 0 1 0 0 5.656L12 13.999l.522-.521a4 4 0 1 0 5.656-5.656z" />
      </>
    }
  />
);
const IconCode = () => (
  <SvgIcon
    d={
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    }
  />
);
const IconTrophy = () => (
  <SvgIcon
    d={
      <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </>
    }
  />
);
const IconRibbon = () => (
  <SvgIcon
    d={
      <>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </>
    }
  />
);
const IconCalendar = () => (
  <SvgIcon
    d={
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    }
  />
);
const IconMessage = () => (
  <SvgIcon
    d={
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    }
  />
);
const IconHelp = () => (
  <SvgIcon
    d={
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    }
  />
);
const IconPhoneCall = () => (
  <SvgIcon
    d={
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    }
  />
);
const IconShield = () => (
  <SvgIcon
    d={
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    }
  />
);
const IconMapPin = () => (
  <SvgIcon
    d={
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    }
  />
);
const IconMail = () => (
  <SvgIcon
    d={
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    }
  />
);

const Footer = () => (
  <footer className="bg-[#0e1525] pt-16 pb-12 px-6 relative z-20">
    <div className="max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://res.cloudinary.com/dffm4zxpc/image/upload/v1774514098/uptoskillslogo-removebg-preview_vjal22.webp"
            alt="UptoSkills Logo"
            className="h-16 md:h-20 object-contain"
          />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mt-6 mb-2">
          Connecting Colleges, Candidates, and Corporates
        </h2>
        <p className="text-gray-400 text-sm">
          Empowering the next generation through AI-powered learning
        </p>
      </div>

      {/* Grid Columns */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
        {/* Col 1 */}
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Our Services
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconCap />} text="For Colleges" />
            <FooterLink icon={<IconBuilding />} text="For Companies" />
            <FooterLink icon={<IconMonitor />} text="AI Interview" />
            <FooterLink icon={<IconSearch />} text="AI Assessment" />
            <FooterLink icon={<IconBuilding />} text="Campus Collaboration" />
            <FooterLink icon={<IconUsers />} text="Hire Better with Us" />
            <FooterLink icon={<IconCap />} text="College Services" />
          </ul>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Jobs & Internships
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconBriefcase />} text="Jobs" />
            <FooterLink icon={<IconInfinity />} text="Internships" />
            <FooterLink icon={<IconCode />} text="IT & CS Jobs" />
            <FooterLink icon={<IconSearch />} text="Technical Jobs" />
            <FooterLink icon={<IconUsers />} text="Sales & Marketing Jobs" />
            <FooterLink icon={<IconBuilding />} text="Banking & E-Com Jobs" />
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            Leagues and Events
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconMonitor />} text="My Leagues" />
            <FooterLink icon={<IconTrophy />} text="Hall of Fame" />
            <FooterLink icon={<IconRibbon />} text="Subscription" />
            <FooterLink icon={<IconUsers />} text="Community" />
            <FooterLink icon={<IconCalendar />} text="Events" />
            <FooterLink icon={<IconCode />} text="Hackathons" />
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            Discover
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconMessage />} text="Blog Shorts" />
            <FooterLink icon={<IconHelp />} text="Support & FAQ" />
            <FooterLink icon={<IconPhoneCall />} text="Contact Us" />
            <FooterLink icon={<IconShield />} text="Privacy Policy" />
            <FooterLink icon={<IconShield />} text="Terms & Conditions" />
            <FooterLink icon={<IconShield />} text="Shipping Policy" />
            <FooterLink icon={<IconShield />} text="Cancellation Policy" />
          </ul>
        </div>

        {/* Col 5 */}
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Contact Info
          </h4>
          <ul className="space-y-4">
            <FooterLink icon={<IconMapPin />} text="Palam, New Delhi" />
            <FooterLink icon={<IconMail />} text="info@uptoskills.com" />
            <FooterLink icon={<IconPhoneCall />} text="+91-9319772294" />
          </ul>
        </div>
      </div>

      <hr className="border-white/10 mb-8" />

      {/* Bottom Social & App Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h4 className="font-bold text-white mb-4 text-center md:text-left">
            Connect with us
          </h4>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-md bg-[#0077b5] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-[#1da1f2] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-[#ff0000] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-[#5865F2] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-md bg-[#0088cc] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h4 className="font-bold text-white mb-4">Download Our App</h4>
          <div className="flex items-center gap-3 bg-[#11231f] border border-green-800/60 hover:bg-[#16332c] transition-colors rounded-lg px-4 py-2 cursor-pointer w-fit shadow-lg shadow-green-900/20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 3L18 12L4 21V3Z" fill="#32c36c" />
              <path d="M4 3L11.5 16.5L18 12L4 3Z" fill="#1f9b52" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gray-300 uppercase leading-none mb-1">
                Get it on
              </span>
              <span className="text-sm text-white font-semibold leading-none mb-1">
                Google Play
              </span>
              <span className="text-[10px] text-green-400 font-medium leading-none">
                Live Now!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen selection:bg-purple-500/30 font-sans bg-[#020203] relative">
      <Navbar />

      <ParallaxStarsBackground speed={1.5} />

      <main className="relative w-full flex flex-col mt-20">
        {/* Solid background on Hero covers the fixed stars */}
        <Hero />

        {/* Transparent wrapper explicitly for middle sections, allowing stars to shine through */}
        <div className="relative w-full z-10 overflow-hidden">
          <Stats />
          <SetupSection />
          <Timeline />
          <ProFeatures />
          <FeatureGrid />
          <FAQ />
        </div>
      </main>

      {/* Solid background on Footer covers the fixed stars */}
      <Footer />
    </div>
  );
}

export default App;
