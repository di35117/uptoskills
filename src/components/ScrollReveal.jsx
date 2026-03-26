import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
