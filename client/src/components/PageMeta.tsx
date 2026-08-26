/**
 * Design: 정밀한 식탁 — 페이지별 공유 정보도 제품 파일처럼 정확한 제목·설명·이미지로 관리한다.
 */
import { useEffect } from "react";

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
};

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function PageMeta({ title, description, path, image, imageAlt }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    const canonicalUrl = `https://www.barunfood.co.kr${path}`;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", imageAlt);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, path, image, imageAlt]);
  return null;
}
