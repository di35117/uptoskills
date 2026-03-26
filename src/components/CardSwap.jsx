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
export const ScrollReveal = ({ children, delay = 0, triggerOnce = false }) => {
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

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
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

export const CardSwap = ({
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
  const childArr = useMemo(() => Children.toArray(children), [children]);

  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr],
  );
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef(0);
  const container = useRef(null);

  // Re-sync order ref if children length changes dynamically
  useEffect(() => {
    order.current = Array.from({ length: childArr.length }, (_, i) => i);
  }, [childArr.length]);

  useEffect(() => {
    // FIX: Moved config inside the useEffect so it doesn't trigger dependency warnings
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
