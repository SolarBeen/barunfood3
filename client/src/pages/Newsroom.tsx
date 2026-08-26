/**
 * Design: 정밀한 식탁 — 뉴스룸은 브랜드 스토리를 반복하지 않고, 확인된 변화만 축적하는 검증 기록 아카이브로 작동한다.
 */
import { ArrowUpRight, FileText, Image, Mail, Megaphone } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { PageMeta } from "@/components/PageMeta";
import { SubPageLayout } from "@/components/SubPageLayout";
import { barunfoodLocation } from "@/lib/location";

const recordTypes = [
  ["공지", "운영 정책, 제품 안내, 주요 공지사항을 명확하게 전달합니다.", "NOTICE / VERIFIED", Megaphone],
  ["제품", "공개 가능한 제품 관련 업데이트와 자료를 기록합니다.", "PRODUCT / DOCUMENTED", FileText],
  ["제조·R&D", "제조와 연구개발의 변화를 근거와 함께 정리합니다.", "PROCESS / REVIEWED", Image],
  ["파트너십", "협업 관련 공개 자료와 안내 사항을 축적합니다.", "PARTNERSHIP / APPROVED", Mail],
];

const materialRequestHref = `${barunfoodLocation.emailHref}?subject=%EB%B0%94%EB%A5%B8%ED%91%B8%EB%93%9C%20%EC%9E%90%EB%A3%8C%20%EC%9A%94%EC%B2%AD`;

export default function Newsroom() {
  return (
    <SubPageLayout marker="05" eyebrow="VERIFIED RECORDS" heroVariant="newsroom" heroImage="/manus-storage/barunfood-manufacturing-lab_4fcf5245.jpg" heroImageAlt="도우 제품을 검토하는 식품 제조 현장" title={<>변화가 생기면,<br /><span className="text-[#9e3328]">확인한 뒤 기록합니다.</span></>} description="바른푸드의 제품, 제조, 파트너십과 관련된 업데이트를 확인 가능한 정보 중심으로 공개합니다.">
      <PageMeta title="뉴스룸 | 바른푸드 검증 기록" description="제품, 제조, 파트너십의 실제 변화를 확인 가능한 정보로 기록하는 바른푸드 뉴스룸입니다." path="/newsroom" image="/manus-storage/barunfood-company-og-image_2bf6582a.jpg" imageAlt="바른푸드 뉴스룸 — 확인한 뒤 기록합니다" />
      <FadeInSection id="notice" className="bg-[#f7f3eb] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.78fr_1.22fr]"><div><SectionEyebrow number="06">LATEST RECORD</SectionEyebrow><h2 className="mt-8 font-serif text-[clamp(2.45rem,4.4vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.08em]">확인한 변화부터<br />차례로 공개합니다.</h2><p className="mt-7 max-w-sm text-sm leading-6 text-[#70685d]">발행일, 자료 유형, 공개 상태를 함께 남겨 정보의 맥락을 확인할 수 있게 합니다.</p></div><div className="border-t border-[#d9d0c2]"><a href="/newsroom/site-record-2026" className="group grid min-h-[280px] gap-7 border-b border-[#d9d0c2] py-10 transition hover:bg-[#ece5d9] sm:grid-cols-[80px_1fr_auto] sm:items-center sm:px-5"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">01</span><div><p className="text-[10px] font-bold tracking-[0.18em] text-[#9e3328]">SITE UPDATE / VERIFIED · 2026.08.26</p><h3 className="mt-3 text-2xl font-bold tracking-[-0.055em]">바른푸드 웹사이트의 정보 구조를 정비했습니다.</h3><p className="mt-3 max-w-lg text-sm leading-6 text-[#70685d]">제품·제조·협업 정보를 필요한 질문에 맞춰 다시 구성하고, 확인 가능한 기록 중심으로 읽기 흐름을 개선했습니다.</p></div><span className="inline-flex items-center gap-2 self-start text-sm font-bold text-[#242321] transition group-hover:text-[#9e3328] sm:self-auto">기록 읽기 <ArrowUpRight className="h-4 w-4" /></span></a></div></div></FadeInSection>
      <FadeInSection className="bg-[#ece5d9] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-5 border-b border-[#cfc5b5] pb-9 sm:flex-row sm:items-end"><div><SectionEyebrow number="07">RECORD INDEX</SectionEyebrow><h2 className="mt-7 font-serif text-[clamp(2.25rem,4vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.08em]">기록 유형으로<br />변화를 살펴보세요.</h2></div><p className="max-w-sm text-sm leading-6 text-[#70685d]">실제 발행 자료가 등록되면 발행일, 유형, 자료 상태를 기준으로 목록을 제공합니다.</p></div><div className="grid border-b border-[#cfc5b5] md:grid-cols-2">{recordTypes.map(([title, text, record, Icon], index) => { const CurrentIcon = Icon as typeof Megaphone; return <article key={title as string} className="border-b border-[#cfc5b5] py-8 last:border-b-0 md:border-b-0 md:border-r md:p-8 md:odd:pl-0 md:nth-[2n]:border-r-0 md:nth-last-[n+2]:border-b"><div className="flex items-center justify-between"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#9e3328] text-[9px] font-bold text-white">0{index + 1}</span><CurrentIcon className="h-4 w-4 text-[#9e3328]" /></div><p className="mt-9 text-[10px] font-bold tracking-[0.14em] text-[#9e3328]">{record as string}</p><h3 className="mt-3 text-xl font-bold tracking-[-0.05em]">{title as string}</h3><p className="mt-3 max-w-md text-sm leading-6 text-[#70685d]">{text as string}</p><span className="mt-7 block border-t border-[#cfc5b5] pt-3 text-[10px] font-bold tracking-[0.14em] text-[#83796b]">PUBLIC STATUS / REVIEW BEFORE RELEASE</span></article>; })}</div></div></FadeInSection>
      <FadeInSection className="bg-[#242321] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><SectionEyebrow number="08" light>MEDIA & CONTACT</SectionEyebrow><h2 className="mt-7 font-serif text-[clamp(2.25rem,4vw,4.3rem)] font-semibold leading-[1.04] tracking-[-0.08em]">확인할 자료가 있다면,<br /><span className="text-[#c95043]">먼저 요청해 주세요.</span></h2></div><a href={materialRequestHref} className="inline-flex items-center justify-center gap-3 border border-white/35 px-6 py-4 text-sm font-bold transition hover:border-[#9e3328] hover:bg-[#9e3328]">자료 요청하기 <ArrowUpRight className="h-4 w-4" /></a></div></FadeInSection>
    </SubPageLayout>
  );
}
