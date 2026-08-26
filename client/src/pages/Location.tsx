/**
 * Design: 정밀한 식탁 — 위치 안내는 지도 위에 정보를 얹기보다 방문 전에 확인할 연락·주소·길찾기 행동을 순서 있게 제시한다.
 */
import { ArrowUpRight, Building2, MapPin, Navigation, Phone } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { PageMeta } from "@/components/PageMeta";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SubPageLayout } from "@/components/SubPageLayout";
import { barunfoodLocation } from "@/lib/location";

const visitSteps = [
  ["02", "담당자와 일정을 확인합니다.", "방문 전 담당자와 가능한 시간과 필요한 준비 사항을 확인해 주세요.", Phone],
  ["03", "길찾기로 이동을 준비하세요.", "출발 전 지도 길찾기에서 현재 위치를 기준으로 경로와 소요 시간을 확인할 수 있습니다.", Navigation],
] as const;

export default function Location() {
  return (
    <SubPageLayout marker="03" eyebrow="VISIT & LOCATION" heroVariant="location" breadcrumbLabel="오시는 길" title={<>방문의 첫걸음은,<br /><span className="text-[#9e3328]">정확한 안내에서 시작합니다.</span></>} description="바른푸드 방문 전 주소와 연락처를 확인하고, 담당자와 일정을 먼저 조율해 주세요.">
      <PageMeta title="오시는 길 | 바른푸드 방문 안내" description="인천광역시 서구 검단로93번길 11에 위치한 바른푸드의 주소, 전화 상담, 지도 길찾기와 방문 전 안내를 확인하세요." path={barunfoodLocation.path} image="/manus-storage/barunfood-company-og-image_2bf6582a.jpg" imageAlt="바른푸드 오시는 길 — 방문 안내와 위치 정보" />

      <FadeInSection className="bg-[#f7f3eb] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionEyebrow number="04">LOCATION DESK</SectionEyebrow>
            <h2 className="mt-8 font-serif text-[clamp(2.45rem,4.5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.08em]">방문 전에,<br /><span className="text-[#9e3328]">필요한 정보를 확인하세요.</span></h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-[#70685d]">방문 일정은 현장 상황에 따라 조율이 필요할 수 있습니다. 먼저 전화 또는 상담 요청으로 목적과 희망 일정을 알려주시면 다음 절차를 안내드립니다.</p>
          </div>
          <div className="border-t border-[#cfc5b5]">
            <div className="grid gap-4 border-b border-[#cfc5b5] py-7 sm:grid-cols-[150px_1fr]"><span className="text-[10px] font-bold tracking-[0.18em] text-[#9e3328]">ADDRESS</span><p className="text-[17px] font-semibold leading-7 tracking-[-0.03em]">{barunfoodLocation.address}</p></div>
            <div className="grid gap-4 border-b border-[#cfc5b5] py-7 sm:grid-cols-[150px_1fr]"><span className="text-[10px] font-bold tracking-[0.18em] text-[#9e3328]">CONTACT</span><div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] leading-7"><a href={barunfoodLocation.phoneHref} className="font-bold transition hover:text-[#9e3328]">T. {barunfoodLocation.phone}</a><a href={barunfoodLocation.emailHref} className="text-[#70685d] transition hover:text-[#9e3328]">E. {barunfoodLocation.email}</a></div></div>
            <div className="grid gap-4 border-b border-[#cfc5b5] py-7 sm:grid-cols-[150px_1fr]"><span className="text-[10px] font-bold tracking-[0.18em] text-[#9e3328]">VISIT NOTE</span><p className="text-sm leading-7 text-[#70685d]">원활한 방문을 위해 사전 연락 후 담당자와 일정·목적을 확인해 주세요.</p></div>
            <div className="mt-8 flex flex-wrap gap-3"><a href={barunfoodLocation.directionsHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#9e3328] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#7e2119] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e3328]">지도에서 길찾기 <Navigation className="h-4 w-4" /></a><a href={barunfoodLocation.phoneHref} className="inline-flex items-center gap-2 border border-[#242321] px-5 py-3.5 text-sm font-bold transition hover:border-[#9e3328] hover:text-[#9e3328] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e3328]">전화 상담 <Phone className="h-4 w-4" /></a></div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="bg-[#242321] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-end"><div><SectionEyebrow number="05" light>VISIT SEQUENCE</SectionEyebrow><p className="mt-8 max-w-sm text-sm leading-7 text-white/60">방문 준비에 필요한 순서를 간결하게 정리했습니다. 위치·연락·길찾기를 한 곳에서 확인할 수 있습니다.</p></div><h2 className="font-serif text-[clamp(2.4rem,4.5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.08em]">길을 찾기 전에,<br /><span className="text-[#f4bd75]">방문 조건부터 맞춥니다.</span></h2></div>
          <div className="mt-14 grid gap-px overflow-hidden bg-white/15 md:grid-cols-3"><div className="bg-[#242321] p-7 sm:p-8"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold">01</span><p className="mt-7 text-[10px] font-bold tracking-[0.18em] text-[#f4bd75]">ADDRESS CONFIRM</p><h3 className="mt-4 text-2xl font-bold tracking-[-0.05em]">주소를 확인하세요.</h3><p className="mt-3 text-sm leading-6 text-white/60">출발 전 표시된 주소와 지도 길찾기 목적지를 확인해 주세요.</p></div>{visitSteps.map(([number, title, text, Icon]) => <article key={number} className="bg-[#242321] p-7 sm:p-8"><span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-[10px] font-bold text-[#f4bd75]">{number}</span><Icon className="mt-7 h-5 w-5 text-[#f4bd75]" /><h3 className="mt-4 text-2xl font-bold tracking-[-0.05em]">{title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{text}</p></article>)}</div>
        </div>
      </FadeInSection>

      <FadeInSection className="bg-[#ece5d9] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:gap-16">
          <a href={barunfoodLocation.directionsHref} target="_blank" rel="noreferrer" aria-label="외부 지도에서 바른푸드 길찾기 열기" className="group relative min-h-[420px] overflow-hidden border border-[#cfc5b5] bg-[#f7f3eb] p-7 shadow-[0_20px_42px_rgba(60,48,34,0.1)] transition hover:-translate-y-1 hover:border-[#9e3328] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e3328] sm:p-10"><div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#cfc5b5_1px,transparent_1px),linear-gradient(90deg,#cfc5b5_1px,transparent_1px)] [background-size:54px_54px]" /><div className="absolute inset-x-0 top-[47%] h-px bg-[#9e3328]/55" /><div className="absolute left-[52%] top-0 h-full w-px bg-[#9e3328]/55" /><div className="relative flex h-full flex-col justify-between"><div><span className="inline-flex items-center gap-2 border border-[#9e3328]/35 bg-[#f7f3eb] px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-[#9e3328]"><MapPin className="h-4 w-4" />LOCATION POINT</span><div className="mt-20 flex h-16 w-16 items-center justify-center rounded-full bg-[#9e3328] text-white shadow-[0_12px_24px_rgba(158,51,40,0.28)]"><MapPin className="h-7 w-7" /></div></div><div className="max-w-sm border-l-2 border-[#9e3328] bg-[#f7f3eb]/95 p-5"><p className="text-[10px] font-bold tracking-[0.18em] text-[#9e3328]">BARUN FOOD · VISIT POINT</p><p className="mt-3 text-xl font-bold tracking-[-0.05em] text-[#242321]">{barunfoodLocation.address}</p><p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#9e3328]">외부 지도에서 길찾기 <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></p></div></div></a>
          <div className="flex flex-col justify-between border-y border-[#cfc5b5] py-8"><div><SectionEyebrow number="06">MAP & DIRECTIONS</SectionEyebrow><h2 className="mt-8 font-serif text-[clamp(2.3rem,4vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.08em]">현재 위치에서,<br /><span className="text-[#9e3328]">바로 길을 찾아보세요.</span></h2><p className="mt-6 text-sm leading-7 text-[#70685d]">지도는 위치 확인을 위한 보조 수단입니다. 실제 방문 전에는 연락처로 일정과 안내 사항을 확인해 주세요.</p></div><div className="mt-10"><a href={barunfoodLocation.directionsHref} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 border-b border-[#242321] pb-2 text-sm font-bold transition hover:border-[#9e3328] hover:text-[#9e3328]">외부 지도에서 길찾기 <MapPin className="h-4 w-4 text-[#9e3328]" /><ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a><p className="mt-5 inline-flex items-center gap-2 text-sm text-[#70685d]"><Building2 className="h-4 w-4 text-[#9e3328]" />{barunfoodLocation.address}</p></div></div>
        </div>
      </FadeInSection>
    </SubPageLayout>
  );
}
