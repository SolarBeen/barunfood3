/**
 * Design: 정밀한 식탁 — 푸터 직전의 상담 허브는 방문자에게 다음 행동을 강요하지 않고, 필요한 상담 맥락을 먼저 선택하게 한다.
 */
import { ArrowRight, ArrowUpRight, Box, Factory, MapPin, Phone, Truck } from "lucide-react";
import { barunfoodLocation } from "@/lib/location";
import type { InquiryType } from "./InquiryDialog";

type FooterInquiryHubProps = { onInquiry: (type: InquiryType) => void };

const inquiryRoutes: Array<{
  title: string;
  description: string;
  type?: InquiryType;
  Icon: typeof Box;
  href?: string;
}> = [
  { title: "제품·규격 검토", description: "운영 환경과 희망 제품 규격을 알려주세요.", type: "제품 납품", Icon: Box },
  { title: "맞춤 개발 · OEM/ODM", description: "브랜드별 생산 조건을 함께 검토합니다.", type: "맞춤 제품 개발", Icon: Factory },
  { title: "납품·공급 조건", description: "수량·일정·납품 지역을 바탕으로 상담합니다.", type: "제품 납품", Icon: Truck },
  { title: "방문·위치 안내", description: "방문 전 담당자와 일정·길찾기 정보를 확인해 주세요.", Icon: MapPin, href: barunfoodLocation.path },
];

export function FooterInquiryHub({ onInquiry }: FooterInquiryHubProps) {
  return (
    <section aria-labelledby="footer-inquiry-heading" className="relative isolate overflow-hidden bg-[#211a16] text-white">
      <img src="/assets/barun-hand-dough-support.webp" alt="도우 상태를 손으로 확인하는 바른푸드 작업 장면" className="absolute inset-0 -z-30 h-full w-full object-cover object-[58%_50%]" />
      <div className="absolute inset-0 -z-20 bg-[#1b1410]/54" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(96,28,21,0.82)_0%,rgba(61,28,22,0.58)_42%,rgba(25,20,16,0.74)_100%)]" />
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.93fr_1.07fr] lg:gap-20 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-center lg:pl-[8.5%]">
          <p className="text-[10px] font-bold tracking-[0.21em] text-[#f4bd75]">CUSTOMER SUPPORT</p>
          <h2 id="footer-inquiry-heading" className="mt-5 max-w-xl font-serif text-[clamp(2.6rem,4.5vw,5rem)] font-semibold leading-[1.03] tracking-[-0.08em]">제품과 조건을 알려주시면,<br /><span className="text-[#f3d5b7]">상담을 시작하겠습니다.</span></h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/78 sm:text-[15px]">제품 개발, OEM·ODM, 납품 조건까지. 검토에 필요한 정보를 남겨주시면 담당자가 확인 후 다음 절차를 안내드립니다.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5"><button onClick={() => onInquiry("제품 납품")} type="button" className="inline-flex items-center gap-2 bg-[#c23a2c] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#9e3328] active:scale-[0.98]">상담 요청하기 <ArrowUpRight className="h-4 w-4" /></button><a href={barunfoodLocation.phoneHref} className="inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#f4bd75]"><Phone className="h-4 w-4" />전화 상담</a></div>
        </div>
        <aside className="border border-white/15 bg-[#201914]/85 p-5 shadow-[0_22px_64px_rgba(8,6,4,0.25)] backdrop-blur-sm sm:p-7">
          <div className="divide-y divide-white/15 border-y border-white/15">
            {inquiryRoutes.map(({ title, description, type, Icon, href }) => {
              const isExternal = href?.startsWith("http");
              const contents = <><Icon className="mt-1 h-5 w-5 shrink-0 text-[#f4bd75]" /><span className="min-w-0 flex-1"><span className="block text-[15px] font-bold tracking-[-0.03em] text-white">{title}</span><span className="mt-1.5 block text-[13px] leading-5 text-white/66">{description}</span></span><ArrowRight className="mt-3 h-4 w-4 shrink-0 text-white/70 transition group-hover:translate-x-1 group-hover:text-[#f4bd75]" /></>;
              return href ? <a key={title} href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="group flex gap-4 py-5 transition hover:bg-white/[0.05] sm:px-2">{contents}</a> : <button key={title} onClick={() => onInquiry(type!)} type="button" className="group flex w-full gap-4 py-5 text-left transition hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f4bd75] sm:px-2">{contents}</button>;
            })}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2"><a href={barunfoodLocation.phoneHref} className="inline-flex items-center justify-center gap-2 border border-white/35 px-4 py-3.5 text-sm font-bold text-white transition hover:border-[#f4bd75] hover:text-[#f4bd75]"><Phone className="h-4 w-4" />Tel. {barunfoodLocation.phone}</a><a href={barunfoodLocation.path} className="inline-flex items-center justify-center gap-2 border border-white/35 px-4 py-3.5 text-sm font-bold text-white transition hover:border-[#f4bd75] hover:text-[#f4bd75]"><MapPin className="h-4 w-4" />오시는 길</a></div>
        </aside>
      </div>
    </section>
  );
}
