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
        `
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

// --- PAGE COMPONENTS ---
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#050508]/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          UptoSkills
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
        <a
          href="#"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Learn & Earn <ChevronDown />
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Jobs <ChevronDown />
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Compete <ChevronDown />
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Discover <ChevronDown />
        </a>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-white">
          <SearchIcon />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
        <button className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity">
          For Enterprise
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-40 pb-32 px-6 flex flex-col items-center text-center min-h-screen justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen">
      <ForceFieldBackground />
    </div>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
    <div
      className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>

    <div className="relative z-10 flex flex-col items-center pointer-events-none w-full">
      {/* FIX: Centered the top badge by wrapping it in a flex container */}
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
        <p className="max-w-2xl text-lg text-gray-200 font-medium mb-10 bg-[#050508]/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 drop-shadow-xl mx-auto">
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
      <div className="h-[300px] flex justify-center w-full">
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
            <div className="grid grid-cols-2 gap-6 rotate-45">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl bg-[#0a0a0f]/90 border-2 ${f.border} glow-pulse-${f.colorName} group relative overflow-hidden cursor-default z-10 hover:z-20`}
                >
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 -rotate-45 flex items-center justify-center p-6 text-center">
                      <div
                        className={`flex flex-col items-center justify-center transition-all duration-500 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75 absolute px-4`}
                      >
                        <span className="text-3xl sm:text-4xl mb-3 drop-shadow-md">
                          {f.icon}
                        </span>
                        <h4
                          className={`text-lg sm:text-2xl font-black ${f.textColor}`}
                        >
                          {f.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-base font-medium text-white opacity-0 scale-125 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 absolute px-6">
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

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#020203] pt-16 pb-8 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
      <div className="col-span-2 md:col-span-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          UptoSkills
        </h3>
        <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
          Connecting Colleges, Candidates, and Corporates. EMPOWERING THE NEXT
          GENERATION.
        </p>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-sm font-bold">
            in
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-sm font-bold">
            ig
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-sm font-bold">
            tw
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white tracking-wide">
          Our Services
        </h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              For Companies
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              AI Interview
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              AI Assessment
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white tracking-wide">
          Jobs & Internships
        </h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li>
            <a href="#" className="hover:text-pink-400 transition-colors">
              Internships
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-pink-400 transition-colors">
              IT & CS Jobs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-pink-400 transition-colors">
              Technical Jobs
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white tracking-wide">
          Contact Info
        </h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <span>📍</span> Palam, New Delhi
          </li>
          <li className="flex items-center gap-2">
            <span>✉️</span> info@uptoskills.com
          </li>
          <li className="flex items-center gap-2">
            <span>📞</span> +91-9319772294
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
      <p>© 2026 UptoSkills. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen selection:bg-purple-500/30 font-sans bg-[#020203] relative">
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Stats />
        <SetupSection />
        <Timeline />
        <ProFeatures />
        <FeatureGrid />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;