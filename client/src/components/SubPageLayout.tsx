/**
 * Design: 정밀한 식탁 — 공통 서브 페이지 헤더는 넓은 아이보리 여백과 배치 마크로 브랜드 기록의 첫 장을 연다.
 */
import { useState, type ReactNode } from "react";
import { LazyInquiryDialog } from "@/components/LazyInquiryDialog";
import { FloatingInquiryButton } from "@/components/FloatingInquiryButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FadeInSection } from "@/components/FadeInSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { barunfoodLocation } from "@/lib/location";

type SubPageLayoutProps = {
  marker: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  heroVariant?: "company" | "location" | "manufacturing" | "products" | "partnership";
  heroImage?: string;
  heroImageAlt?: string;
  breadcrumbLabel?: string;
  children: ReactNode;
};

const heroBackgrounds = {
  company: "bg-[#eee6d9]",
  location: "bg-[#eee6d9]",
  manufacturing: "bg-[#f7f3eb]",
  products: "bg-[#e7decf]",
  partnership: "bg-[#e6dac5]",
};

const breadcrumbPages = {
  company: { marker: "01", label: "회사소개", href: "/company" },
  location: { marker: "01", label: "회사소개", href: "/company" },
  manufacturing: { marker: "02", label: "제조·R&D", href: "/manufacturing" },
  products: { marker: "03", label: "제품·브랜드", href: "/products" },
  partnership: { marker: "04", label: "파트너십", href: "/partnership" },
};

export function SubPageLayout({ marker, eyebrow, title, description, heroVariant = "company", heroImage, heroImageAlt, breadcrumbLabel, children }: SubPageLayoutProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const hasImageRail = Boolean(heroImage);
  const breadcrumb = breadcrumbPages[heroVariant];
  const eyebrowLabel = heroVariant === "products" ? "PRODUCT" : "BATCH";
  const heroGridAlignment = hasImageRail && heroVariant === "products" ? "lg:items-start" : "lg:items-end";
  const productDesk = <aside className="border-y border-[#cfc3b2] py-5 text-[10px] leading-5 text-[#615a51] lg:mb-1"><div className="flex items-center justify-between border-b border-[#cfc3b2] pb-3"><span className="font-bold tracking-[0.16em] text-[#9e3328]">PRODUCT DESK</span><span>LIVE / 05 FILES</span></div><dl className="divide-y divide-[#d7cdbc]"><div className="flex justify-between py-3"><dt>SEARCH MODE</dt><dd className="font-bold text-[#242321]">KEYWORD</dd></div><div className="flex justify-between py-3"><dt>RECORD TYPE</dt><dd className="font-bold text-[#242321]">PRODUCT FILE</dd></div><div className="flex justify-between py-3"><dt>DETAIL VIEW</dt><dd className="font-bold text-[#242321]">SPEC · NUTRITION</dd></div></dl></aside>;
  const imageRail = hasImageRail ? <div className={`ingredient-window h-[250px] min-h-full overflow-hidden lg:h-[340px] ${heroVariant === "partnership" ? "rounded-tr-[88px]" : heroVariant === "products" ? "rounded-bl-[88px]" : "rounded-tl-[88px]"}`}><img src={heroImage} alt={heroImageAlt || "바른푸드 현장 이미지"} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-14 text-[10px] font-bold tracking-[0.16em] text-white/80">INGREDIENT WINDOW / {marker}</div></div> : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f3eb] text-[#242321]">
      <SiteHeader onInquiry={() => setInquiryOpen(true)} />
      <main>
        <FadeInSection className={`relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-44 lg:px-12 lg:pb-32 ${heroBackgrounds[heroVariant]}`}>
          <div className="absolute left-[4.5%] top-[33%] hidden h-[42%] w-px bg-[#9e3328]/35 lg:block" />
          <div className="relative mx-auto max-w-[1440px]"><Breadcrumb className="mb-10"><BreadcrumbList className="gap-2 text-[10px] font-bold tracking-[0.16em] text-[#7d7468]"><BreadcrumbItem><BreadcrumbLink href="/" className="hover:text-[#9e3328]">HOME</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator className="text-[#9e3328]/70" /><BreadcrumbItem><BreadcrumbLink href={breadcrumb.href} className="hover:text-[#9e3328]">{breadcrumb.marker}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator className="text-[#9e3328]/70" /><BreadcrumbItem><BreadcrumbPage className="font-bold text-[#4a453d]">{breadcrumbLabel || breadcrumb.label}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb><div className={`grid gap-10 ${heroGridAlignment} ${hasImageRail ? "lg:grid-cols-[0.42fr_1.08fr_0.5fr]" : heroVariant === "products" ? "lg:grid-cols-[0.36fr_1.1fr_0.54fr]" : heroVariant === "company" || heroVariant === "location" ? "lg:grid-cols-[0.35fr_1.02fr_0.63fr]" : "lg:grid-cols-[0.76fr_1.24fr]"}`}>
              <div className="lg:pb-2"><SectionEyebrow number={marker} label={eyebrowLabel}>{eyebrow}</SectionEyebrow><p className="mt-8 hidden max-w-[170px] text-[11px] leading-5 text-[#83796b] lg:block">RECORD / {heroVariant.toUpperCase()}<br />BARUN FOOD STANDARD</p></div>
              <div className="relative">
                <h1 className="max-w-4xl font-serif text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.97] tracking-[-0.085em] text-[#292724]">{title}</h1>
                <p className="mt-7 max-w-2xl text-[15px] leading-7 text-[#6d665c] sm:text-[17px]">{description}</p>
                {heroVariant === "manufacturing" && <div className="mt-8 flex flex-wrap gap-2"><span className="record-pill">BATCH / DOUGH</span><span className="record-pill">CHECK / TEXTURE</span><span className="record-pill">REVIEW / PROCESS</span></div>}
              </div>
              {heroVariant === "products" && (hasImageRail ? <div className="grid gap-5 lg:mb-1">{productDesk}{imageRail}</div> : productDesk)}
              {heroVariant === "company" && <aside className="border-l border-[#cfc3b2] pl-6 lg:mb-1"><p className="text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">COMPANY ARCHIVE</p><p className="mt-4 font-serif text-5xl font-semibold tracking-[-0.09em] text-[#242321]">2008—</p><p className="mt-1 font-serif text-5xl font-semibold tracking-[-0.09em] text-[#9e3328]">2021</p><p className="mt-5 max-w-[190px] text-xs leading-5 text-[#6f675d]">공개 연혁에 기록된 도우 연구·제조 기반·인증과 제품 개발의 주요 이력입니다.</p><div className="mt-6 border-t border-[#cfc3b2] pt-3 text-[10px] font-bold tracking-[0.14em] text-[#665e53]">ARCHIVE / HISTORY FILE</div></aside>}
              {heroVariant === "location" && <aside className="border-l border-[#cfc3b2] pl-6 lg:mb-1"><p className="text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">VISIT DESK</p><p className="mt-4 text-[10px] font-bold tracking-[0.14em] text-[#6f675d]">CONTACT</p><a href={barunfoodLocation.phoneHref} className="mt-1 block font-serif text-2xl font-semibold tracking-[-0.06em] transition hover:text-[#9e3328]">{barunfoodLocation.phone}</a><p className="mt-5 text-[10px] font-bold tracking-[0.14em] text-[#6f675d]">ADDRESS</p><p className="mt-1 max-w-[210px] text-sm leading-6 text-[#3c3832]">{barunfoodLocation.address}</p><a href={barunfoodLocation.directionsHref} target="_blank" rel="noreferrer" className="mt-6 inline-flex border-b border-[#242321] pb-1 text-[10px] font-bold tracking-[0.12em] transition hover:border-[#9e3328] hover:text-[#9e3328]">MAP DIRECTIONS ↗</a></aside>}
              {hasImageRail && heroVariant !== "products" && imageRail}
            </div>
          </div>
        </FadeInSection>
        {children}
      </main>
      <SiteFooter />
      <FloatingInquiryButton onOpen={() => setInquiryOpen(true)} />
      <LazyInquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
