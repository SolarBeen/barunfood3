/**
 * Design: 정밀한 식탁 — 메인은 제조 라인을 길게 설명하지 않고, 방문자가 필요한 기록·기준·제품 파일·협업 검토로 진입하는 Route Desk로 작동한다.
 */
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronRight, FileText, Landmark, PackageSearch, ShieldCheck } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { FooterInquiryHub } from "@/components/FooterInquiryHub";
import { FloatingInquiryButton } from "@/components/FloatingInquiryButton";
import { LazyInquiryDialog } from "@/components/LazyInquiryDialog";
import type { InquiryType } from "@/components/InquiryDialog";
import { PageMeta } from "@/components/PageMeta";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { shouldShowHeroVideo } from "@/lib/heroVideo";

const routeDesk = [
  {
    number: "01",
    label: "COMPANY ARCHIVE",
    title: "피자 도우 제조기업 바른푸드",
    description: "도우 연구, 생산 기반, 인증 이력, 위치 정보를 한 번에 확인하세요.",
    focus: "연혁 · 인증 · 생산 기반",
    action: "기업 기록 보기",
    href: "/company",
    Icon: Landmark,
  },
  {
    number: "02",
    label: "MANUFACTURING CONTROL",
    title: "도우 품질을 만드는 공정",
    description: "반죽·성형·품질 확인·출고 흐름을 생산 관점에서 살펴보세요.",
    focus: "반죽 · 성형 · 출고",
    action: "제조 기준 보기",
    href: "/manufacturing",
    Icon: ShieldCheck,
  },
  {
    number: "03",
    label: "PRODUCT FINDER",
    title: "도우·피자 제품 찾기",
    description: "피자, 도우, 푸드서비스 제품군을 용도별로 확인하세요.",
    focus: "피자 · 도우 · 푸드서비스",
    action: "제품 파일 열기",
    href: "/products",
    Icon: PackageSearch,
  },
  {
    number: "04",
    label: "PARTNERSHIP BRIEF",
    title: "납품·개발 상담 준비",
    description: "수량, 납품 지역, OEM·ODM 범위를 정리해 상담을 시작합니다.",
    focus: "납품 · OEM · 샘플",
    action: "협업 범위 보기",
    href: "/partnership",
    Icon: FileText,
  },
];

const proofRecords = [
  { number: "2008", label: "DOUGH RESEARCH", text: "도우 연구소 개설", href: "/company" },
  { number: "2016", label: "QUALITY RECORD", text: "HACCP 인증 공개 이력", href: "/manufacturing/quality" },
  { number: "05", label: "PRODUCT FILES", text: "도우·피자 제품 파일", href: "/products" },
];

const heroMedia = {
  poster: "/assets/barun-hero-production-poster.jpg",
  video: "/assets/barun-hero-production-loop.mp4",
};

export default function Home() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>("제품 납품");
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const openInquiry = (type: InquiryType = "제품 납품") => {
    setInquiryType(type);
    setInquiryOpen(true);
  };

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
    const syncVideoPreference = () => setShowHeroVideo(shouldShowHeroVideo(motionPreference.matches, connection.connection?.saveData));

    syncVideoPreference();
    motionPreference.addEventListener("change", syncVideoPreference);
    return () => motionPreference.removeEventListener("change", syncVideoPreference);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f3eb] text-[#242321]">
      <PageMeta
        title="바른푸드 | 정직한 재료, 완벽한 도우"
        description="피자 도우 제조를 중심으로 도우·피자 제품 납품과 맞춤 개발 상담을 함께하는 바른푸드입니다."
        path="/"
        image={heroMedia.poster}
        imageAlt="바른푸드 생산 현장 — 정직한 재료, 완벽한 도우"
      />
      <SiteHeader darkOnTop onInquiry={() => openInquiry()} />
      <main id="top">
        <section className="relative isolate min-h-[760px] overflow-hidden bg-[#252522] pt-[76px] text-white lg:min-h-[820px] lg:pt-[86px]">
          <img src={heroMedia.poster} alt="바른푸드 생산 현장의 영상 대체 이미지" className="absolute inset-0 -z-30 h-full w-full object-cover object-[60%_center]" />
          {showHeroVideo && <video autoPlay muted loop playsInline preload="metadata" poster={heroMedia.poster} aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_center]"><source src={heroMedia.video} type="video/mp4" /></video>}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,19,17,0.9)_0%,rgba(20,19,17,0.72)_44%,rgba(20,19,17,0.18)_76%,rgba(20,19,17,0.3)_100%)]" />
          <div className="absolute bottom-0 left-[6%] top-[18%] hidden w-px bg-white/20 lg:block" />
          <div className="mx-auto flex min-h-[684px] max-w-[1440px] flex-col justify-between px-5 pb-7 pt-24 sm:px-8 lg:min-h-[734px] lg:px-12 lg:pb-10 lg:pt-32">
            <div className="hero-intro max-w-3xl lg:pl-[8.5%]">
              <SectionEyebrow number="01" light>THE STANDARD OF DOUGH</SectionEyebrow>
              <h1 className="mt-8 font-serif text-[clamp(3.2rem,6.2vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.085em] text-white">정직한 재료,<span className="mt-3 block text-[#c95043]">완벽한 도우</span></h1>
              <p className="mt-8 max-w-xl text-[15px] leading-7 text-white/75 sm:text-[17px]">피자 도우 제조를 중심으로, 도우·피자 제품을 납품하고 메뉴 목적에 맞춘 개발 상담까지 함께합니다.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/products" className="inline-flex items-center gap-3 bg-[#9e3328] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#bd4a3e] active:scale-[0.98]">제품 파일 찾기 <ArrowDownRight className="h-4 w-4" /></a>
                <a href="/manufacturing" className="inline-flex items-center gap-3 border border-white/45 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#242321] active:scale-[0.98]">제조 기준 확인 <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="grid border-t border-white/25 pt-5 sm:grid-cols-3 lg:ml-[8.5%] lg:max-w-4xl">
              {[["A", "피자 도우 제조"], ["B", "반죽·성형·출고 관리"], ["C", "납품·OEM 상담"]].map(([key, value]) => (
                <div key={key} className="flex items-center gap-3 border-b border-white/15 py-4 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0"><span className="grid h-6 w-6 place-items-center rounded-full border border-white/35 text-[10px] font-bold">{key}</span><span className="text-sm text-white/85">{value}</span></div>
              ))}
            </div>
          </div>
        </section>

        <FadeInSection className="bg-[#f7f3eb] py-20 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-10 border-b border-[#d9d0c2] pb-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
              <div><SectionEyebrow number="02">ROUTE DESK</SectionEyebrow><p className="mt-8 max-w-sm text-[15px] leading-7 text-[#70685d]">회사 정보, 제조 공정, 제품군, 납품 상담 중 지금 필요한 정보로 바로 이동하세요.</p></div>
              <div><h2 className="font-serif text-[clamp(2.6rem,5vw,5.4rem)] font-semibold leading-[1.02] tracking-[-0.08em] text-[#292724]">필요한 다음 장면으로,<span className="block text-[#9e3328]">바로 이동하세요.</span></h2><p className="mt-6 max-w-xl text-[15px] leading-7 text-[#70685d]">기업 기록, 제조 공정, 제품 파일, 납품 상담. 각 페이지는 구매 전 필요한 질문에 맞춰 구성했습니다.</p></div>
            </div>
            <div className="mt-0 grid border-b border-[#d9d0c2] md:grid-cols-2">
              {routeDesk.map(({ number, label, title, description, focus, action, href, Icon }) => (
                <a href={href} key={number} className="group relative border-b border-[#d9d0c2] p-7 transition hover:bg-[#ece5d9] md:border-r md:p-10 md:nth-[2n]:border-r-0 md:nth-last-[n+1]:border-b-0">
                  <div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">{number}</span><Icon className="h-5 w-5 text-[#9e3328]" /></div>
                  <p className="mt-12 text-[10px] font-bold tracking-[0.17em] text-[#9e3328]">{label}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-0.06em] text-[#292724]">{title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#70685d]">{description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-y border-[#d9d0c2] py-3 text-[10px] font-bold tracking-[0.12em] text-[#776f65]"><span>FOCUS</span><span className="text-[#9e3328]">{focus}</span></div>
                  <span className="mt-9 inline-flex items-center gap-2 border-b border-[#242321] pb-1 text-sm font-bold text-[#242321] transition group-hover:border-[#9e3328] group-hover:text-[#9e3328]">{action}<ChevronRight className="h-4 w-4" /></span>
                </a>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-[#242321] py-20 text-white sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><SectionEyebrow number="03" light>PUBLIC RECORD</SectionEyebrow><p className="mt-8 max-w-sm text-[15px] leading-7 text-white/60">바른푸드는 확인 가능한 이력과 제조 기반을 중심으로 이야기합니다. 주요 기록은 회사소개에서 더 자세히 볼 수 있습니다.</p></div><h2 className="font-serif text-[clamp(2.4rem,4.5vw,4.9rem)] font-semibold leading-[1.03] tracking-[-0.08em]">기준은 말보다,<span className="block text-[#c95043]">남겨진 기록으로 보입니다.</span></h2></div>
            <div className="mt-14 grid border-y border-white/20 md:grid-cols-3">
              {proofRecords.map(({ number, label, text, href }) => <a href={href} key={label} className="group border-b border-white/15 px-0 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><p className="font-serif text-4xl font-semibold tracking-[-0.07em] text-[#c95043]">{number}</p><p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-[#f4bd75]">{label}</p><p className="mt-3 text-[15px] text-white/85">{text}</p><ArrowUpRight className="mt-7 h-4 w-4 text-white/70 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></a>)}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection><FooterInquiryHub onInquiry={openInquiry} /></FadeInSection>
      </main>
      <SiteFooter />
      <FloatingInquiryButton onOpen={() => openInquiry()} />
      <LazyInquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} defaultInquiryType={inquiryType} />
    </div>
  );
}
