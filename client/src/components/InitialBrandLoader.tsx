/**
 * Design: 정밀한 식탁 — 첫 진입은 제공 로고와 배치 마크가 정교하게 드러나는 짧은 제조 기록의 첫 장으로 연출한다.
 */
import { useEffect, useState } from "react";

function matchesRoute(pathname: string, route: string) {
  return pathname === route || pathname === `${route}.html` || pathname.startsWith(`${route}/`);
}

function getLoaderMarker(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/" || matchesRoute(normalizedPath, "/company") || matchesRoute(normalizedPath, "/location")) return "01";
  if (matchesRoute(normalizedPath, "/manufacturing") || normalizedPath === "/quality.html" || normalizedPath === "/research.html") return "02";
  if (matchesRoute(normalizedPath, "/products") || normalizedPath === "/pizza.html" || normalizedPath === "/dough.html") return "03";
  if (matchesRoute(normalizedPath, "/partnership")) return "04";

  return "00";
}

export function InitialBrandLoader() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  const marker = getLoaderMarker(typeof window === "undefined" ? "/" : window.location.pathname);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const hold = window.setTimeout(() => setLeaving(true), reducedMotion ? 60 : 980);
    const remove = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = originalOverflow;
    }, reducedMotion ? 100 : 1260);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(remove);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!visible) return null;
  return <div className={`brand-loader ${leaving ? "brand-loader--leaving" : ""}`} role="status" aria-live="polite" aria-label={`바른푸드 ${marker}번 브랜드 화면을 준비하고 있습니다`}><div className="brand-loader__rail" /><div className="brand-loader__content"><div className="brand-loader__mark">{marker}</div><p className="brand-loader__eyebrow">BATCH / BARUN FOOD</p><img src="/assets/barunfood-logo-full.png" alt="" className="brand-loader__logo" /><div className="brand-loader__rule"><span /></div><p className="brand-loader__note">DOUGH · STANDARD · PARTNERSHIP</p></div></div>;
}
