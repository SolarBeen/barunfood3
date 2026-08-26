/**
 * Design: 정밀한 식탁 — 섹션은 공정이 다음 단계로 넘어가듯 짧고 절제된 페이드·상승 모션으로 등장한다.
 */
import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

type FadeInSectionProps = ComponentPropsWithoutRef<"section"> & {
  delay?: number;
};

export function FadeInSection({ children, className = "", delay = 0, ...props }: FadeInSectionProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={elementRef}
      className={`reveal-section ${isVisible ? "is-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </section>
  );
}
