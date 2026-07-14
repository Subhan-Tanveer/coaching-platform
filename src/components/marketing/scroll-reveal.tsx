"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { opacity: 0, y: 40 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }),
      });

      const fallback = window.setTimeout(() => {
        if (!trigger.isActive && gsap.getProperty(el, "opacity") === 0) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        }
      }, 15000);

      return () => {
        trigger.kill();
        window.clearTimeout(fallback);
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
