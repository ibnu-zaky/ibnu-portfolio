"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children, className = "", delay = 0, as: Component = "div" }: { children: React.ReactNode, className?: string, delay?: number, as?: any }) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          e.target
            .querySelectorAll<HTMLElement>(".sk-fill")
            .forEach((f) => (f.style.width = (f.dataset.w || "0") + "%"));
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.1 },
    );

    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const delayClass = delay > 0 ? ` d${delay}` : "";

  return (
    <Component ref={ref} className={`r ${delayClass} ${className}`}>
      {children}
    </Component>
  );
}
