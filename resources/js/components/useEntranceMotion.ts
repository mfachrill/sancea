import { useEffect, useRef } from "react";

export function useEntranceMotion() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        if (preference.matches) return;
        const section = entry.target;
        const items = Array.from(section.querySelectorAll<HTMLElement>("h1, h2, h3, .eyebrow, article, figure"));
        const targets = items.filter(item => !item.parentElement?.closest("article, figure"));
        if (!targets.length && section.firstElementChild instanceof HTMLElement) targets.push(section.firstElementChild);
        targets.forEach((target, index) => {
          const animation = target.animate([
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], { duration: 650, delay: Math.min(index * 70, 280), easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
          animations.add(animation);
          animation.onfinish = () => { animations.delete(animation); animation.cancel(); };
        });
      });
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    element.querySelectorAll(":scope > section").forEach(section => observer.observe(section));
    const cancel = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const onPreference = () => { if (preference.matches) cancel(); };
    preference.addEventListener("change", onPreference);
    return () => { observer.disconnect(); cancel(); preference.removeEventListener("change", onPreference); };
  }, []);
  return root;
}