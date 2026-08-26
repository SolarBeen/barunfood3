/**
 * Design: 정밀한 식탁 — 제조·R&D는 선언을 반복하지 않고, INPUT·PROCESS·OUTPUT의 확인 기준을 보여 주는 Control Desk로 작동한다.
 */
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, FlaskConical, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { LazyInquiryDialog } from "@/components/LazyInquiryDialog";
import { PageMeta } from "@/components/PageMeta";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SubPageLayout } from "@/components/SubPageLayout";

const controlDesk = [
  ["INPUT", "무엇을 만들지 먼저 확인합니다.", "메뉴 목적, 원재료 조건, 사용 환경을 검토합니다.", "CHECKPOINT / BRIEF", SlidersHorizontal],
  ["PROCESS", "어떤 조건으로 만들지 설계합니다.", "반죽, 성형, 조리와 보관 조건을 제품별로 살핍니다.", "CHECKPOINT / PROCESS", FlaskConical],
  ["OUTPUT", "어떻게 출고할지 마지막까지 확인합니다.", "제품 규격과 품질 확인 항목을 기준으로 다음 단계를 정리합니다.", "CHECKPOINT / RELEASE", CheckCircle2],
];

const qualityRecords = [
  ["공정 기준", "제조 단계별로 확인이 필요한 조건을 관리합니다.", "RECORD / PROCESS"],
  ["품질 확인", "제품 상태와 기준을 다음 단계에서 다시 검토합니다.", "REVIEW / QUALITY"],
  ["개선 연구", "맛·식감·조리성을 실제 쓰임과 함께 살핍니다.", "NEXT / RESEARCH"],
];

export default function Manufacturing() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <SubPageLayout marker="02" eyebrow="MANUFACTURING CONTROL" heroVariant="manufacturing" title={<>한 번의 맛을,<br /><span className="text-[#9e3328]">반복 가능한 공정으로.</span></>} description="제품의 의도와 사용 환경을 확인하고, 공정 조건과 품질 기준을 연결해 안정적인 생산으로 이어갑니다.">
      <PageMeta title="제조·R&D | 바른푸드 제조 관리" description="제품의 의도와 사용 조건을 공정·품질 기준으로 연결해 반복 가능한 생산을 설계하는 바른푸드 제조·R&D입니다." path="/manufacturing" image="/manus-storage/barunfood-company-og-image_2bf6582a.jpg" imageAlt="바른푸드 제조·R&D — 반복 가능한 공정으로" />
      <FadeInSection className="bg-[#242321] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_0.48fr_0.8fr] lg:items-end"><div><SectionEyebrow number="03" light>CONTROL DESK</SectionEyebrow><p className="mt-8 max-w-md text-[15px] leading-7 text-white/65">품질은 마지막 단계가 아니라, 공정 전체의 확인 방식입니다. 바른푸드는 각 단계에서 필요한 조건을 기록하고 다음 단계에서 다시 확인합니다.</p></div><div className="ingredient-window relative h-[210px] overflow-hidden rounded-br-[70px] border border-white/15"><img src="/manus-storage/barunfood-manufacturing-lab_4fcf5245.jpg" alt="도우 샘플의 상태를 확인하는 제조 현장" className="h-full w-full object-cover" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 text-[9px] font-bold tracking-[0.15em] text-white/85">INGREDIENT WINDOW / QA REVIEW</span></div><h2 className="font-serif text-[clamp(2.5rem,4.8vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.08em]">공정의 각 단계에서,<br /><span className="text-[#c95043]">확인 가능한 기준을 남깁니다.</span></h2></div>
          <div className="mt-14 grid border-y border-white/20 lg:mt-20 lg:grid-cols-3">
            {controlDesk.map(([label, title, text, record, Icon], index) => { const CurrentIcon = Icon as typeof SlidersHorizontal; return <article key={label as string} className="border-b border-white/15 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-9 lg:first:pl-0 lg:last:border-r-0"><div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">0{index + 1}</span><CurrentIcon className="h-5 w-5 text-[#f4bd75]" /></div><p className="mt-12 text-[10px] font-bold tracking-[0.17em] text-[#f4bd75]">{label as string}</p><h3 className="mt-3 text-xl font-bold tracking-[-0.05em]">{title as string}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/60">{text as string}</p><p className="mt-8 border-t border-white/15 pt-3 text-[10px] font-bold tracking-[0.14em] text-white/45">{record as string}</p></article>; })}
          </div>
        </div>
      </FadeInSection>
      <FadeInSection id="quality" className="bg-[#f7f3eb] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><SectionEyebrow number="04">QUALITY CHECKPOINTS</SectionEyebrow><h2 className="mt-8 font-serif text-[clamp(2.4rem,4.6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.08em]">무엇을 확인하는지,<br />먼저 보여 드립니다.</h2><p className="mt-7 max-w-sm text-sm leading-6 text-[#70685d]">인증 범위와 적용 제품은 실제 보유 자료를 기준으로 안내합니다. 이 페이지에서는 공정 안에서 확인하는 기준의 흐름을 설명합니다.</p></div><div className="grid border-y border-[#d9d0c2] md:grid-cols-3">{qualityRecords.map(([title, text, record], index) => <article key={title} className="border-b border-[#d9d0c2] py-7 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">0{index + 1}</span><p className="mt-10 text-[10px] font-bold tracking-[0.15em] text-[#9e3328]">{record}</p><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#70685d]">{text}</p><span className="mt-7 block border-t border-[#d9d0c2] pt-3 text-[10px] font-bold tracking-[0.14em] text-[#83796b]">CHECKPOINT FILE / 0{index + 1}</span></article>)}</div></div>
      </FadeInSection>
      <FadeInSection id="research" className="bg-[#ece5d9] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.78fr_1.22fr]"><div><SectionEyebrow number="05">RESEARCH NOTE</SectionEyebrow><p className="mt-8 max-w-sm text-sm leading-6 text-[#70685d]">실제 연구 성과가 승인되기 전에는 수치나 사례를 과장하지 않습니다.</p></div><div className="border-l-0 border-[#cfc5b5] lg:border-l lg:pl-12"><h2 className="font-serif text-[clamp(2.1rem,3.8vw,4rem)] font-semibold leading-[1.08] tracking-[-0.07em]">현장의 사용 조건까지 고려해,<br />다음 테스트를 설계합니다.</h2><p className="mt-7 max-w-xl text-sm leading-7 text-[#70685d]">도우의 식감, 조리 환경, 메뉴 적용 가능성을 함께 검토합니다. 새로운 제품을 찾는 일과 이미 있는 제품을 더 나아지게 하는 일을 함께 수행합니다.</p></div></div></FadeInSection>
      <FadeInSection className="bg-[#9e3328] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><SectionEyebrow number="06" light>MANUFACTURING INQUIRY</SectionEyebrow><h2 className="mt-7 font-serif text-[clamp(2.35rem,4.4vw,4.7rem)] font-semibold leading-[1.03] tracking-[-0.08em]">제조·품질 기준이 궁금하신가요?</h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/75">제품군, 사용 환경, 확인이 필요한 기준을 알려주시면 다음 검토 항목을 안내합니다.</p></div><button onClick={() => setInquiryOpen(true)} type="button" className="consultation-cta inline-flex items-center justify-center gap-3 bg-white px-6 py-4 text-sm font-bold text-[#9e3328] hover:bg-[#242321] hover:text-white">제조·품질 기준 문의 <ArrowUpRight className="cta-arrow h-4 w-4" /></button></div></FadeInSection>
      <LazyInquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </SubPageLayout>
  );
}
