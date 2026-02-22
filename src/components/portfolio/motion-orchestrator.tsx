"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    if (prefersReducedMotion) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("motion-ready");

    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    items.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 42, 280)}ms`);
      item.classList.remove("is-visible");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -9% 0px",
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      items.forEach((item) => {
        item.classList.remove("is-visible");
        item.style.removeProperty("--reveal-delay");
      });
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
