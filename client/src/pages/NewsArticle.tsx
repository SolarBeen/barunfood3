/**
 * Design: 정밀한 식탁 — 뉴스 상세는 검증된 변화의 문서로 읽혀야 하며, 화려한 스토리보다 발행 근거·변경 범위·다음 경로를 명확히 남긴다.
 */
import { ArrowUpRight, CheckCircle2, FileText, Route, SearchCheck } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { PageMeta } from "@/components/PageMeta";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SubPageLayout } from "@/components/SubPageLayout";

const changeRecords = [
  ["01", "ROUTE DESK", "필요한 정보로 바로 이동", "메인 페이지를 기업 기록·제조 기준·제품 파일·협업 검토의 진입 허브로 정리했습니다.", Route],
  ["02", "PRODUCT FILE", "제품 탐색과 상세 정보의 분리", "제품명·카테고리·사용 조건으로 제품을 찾고, 상세 모달에서 영양·규격 정보를 확인할 수 있게 했습니다.", SearchCheck],
  ["03", "REVIEW FLOW", "조건 중심의 협업 문의", "파트너십에서는 협업 유형보다 먼저 사용 환경과 검토 조건을 정리하도록 흐름을 개선했습니다.", CheckCircle2],
];

export default function NewsArticle() {
  return (
    <SubPageLayout marker="05" eyebrow="NEWSROOM / SITE UPDATE" heroVariant="newsroom" heroImage="/manus-storage/barunfood-manufacturing-lab_4fcf5245.jpg" heroImageAlt="도우 제품을 검토하는 제조 현장" title={<>바른푸드 웹사이트의<br /><span className="text-[#9e3328]">정보 구조를 정비했습니다.</span></>} description="제품·제조·협업 정보를 필요한 질문에 맞춰 다시 구성하고, 확인 가능한 기록을 중심으로 읽기 흐름을 개선했습니다.">
      <PageMeta title="웹사이트 정보 구조 정비 안내 | 바른푸드 뉴스룸" description="제품·제조·협업 정보를 필요한 질문에 맞춰 다시 구성한 바른푸드 공식 웹사이트 업데이트 안내입니다." path="/newsroom/site-record-2026" image="/manus-storage/barunfood-company-og-image_2bf6582a.jpg" imageAlt="바른푸드 웹사이트 정보 구조 정비 안내" />
      <FadeInSection className="bg-[#f7f3eb] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <article className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 border-b border-[#d9d0c2] pb-10 lg:grid-cols-[0.42fr_1fr] lg:items-end"><div><SectionEyebrow number="06">RECORD / 001</SectionEyebrow><p className="mt-6 text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">PUBLISHED / 2026.08.26</p></div><div><p className="text-[10px] font-bold tracking-[0.18em] text-[#9e3328]">SITE UPDATE / VERIFIED</p><h2 className="mt-4 font-serif text-[clamp(2.2rem,4.4vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.08em]">찾기 쉬운 정보는,<br /><span className="text-[#9e3328]">더 정확한 검토에서 시작됩니다.</span></h2></div></div>
          <div className="grid gap-10 py-12 lg:grid-cols-[0.42fr_1fr]"><aside className="space-y-5 border-t border-[#d9d0c2] pt-5 text-[10px] font-bold tracking-[0.13em] text-[#70685d]"><div className="flex justify-between border-b border-[#d9d0c2] pb-3"><span>DOCUMENT NO.</span><span className="text-[#242321]">BF-N-2026-001</span></div><div className="flex justify-between border-b border-[#d9d0c2] pb-3"><span>SOURCE</span><span className="text-[#242321]">WEBSITE UPDATE</span></div><div className="flex justify-between border-b border-[#d9d0c2] pb-3"><span>STATUS</span><span className="text-[#9e3328]">PUBLISHED</span></div></aside><div className="max-w-2xl"><p className="text-lg leading-9 text-[#4d473e]">바른푸드는 웹사이트의 역할을 제품·제조·기업·협업 정보가 한 화면에서 경쟁하는 방식에서, 필요한 질문에 따라 다음 기록으로 이동하는 방식으로 정비했습니다.</p><p className="mt-7 text-[15px] leading-8 text-[#70685d]">이번 업데이트는 실제 웹사이트의 정보 구조와 카피, 제품 탐색 흐름을 개선한 기록입니다. 공개된 제품·연혁·제조 관련 내용은 기존에 확인 가능한 자료를 기준으로 유지하고, 확인 전인 수치나 고객 사례는 추가하지 않았습니다.</p></div></div>
        </article>
      </FadeInSection>
      <FadeInSection className="bg-[#242321] px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1120px]"><div className="grid gap-9 lg:grid-cols-[0.42fr_1fr]"><div><SectionEyebrow number="07" light>CHANGE LOG</SectionEyebrow><p className="mt-7 text-sm leading-6 text-white/60">이번 업데이트에서 사용자의 탐색 흐름에 직접 영향을 주는 세 가지 변경 사항을 기록합니다.</p></div><div className="border-t border-white/20">{changeRecords.map(([number, label, title, text, Icon]) => { const CurrentIcon = Icon as typeof Route; return <section key={label as string} className="grid gap-5 border-b border-white/15 py-7 sm:grid-cols-[62px_1fr_auto] sm:items-start"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">{number as string}</span><div><p className="text-[10px] font-bold tracking-[0.15em] text-[#f4bd75]">{label as string}</p><h3 className="mt-3 text-xl font-bold tracking-[-0.05em]">{title as string}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{text as string}</p></div><CurrentIcon className="h-5 w-5 text-white/65" /></section>; })}</div></div></div></FadeInSection>
      <FadeInSection className="bg-[#ece5d9] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"><div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.42fr_1fr]"><div><SectionEyebrow number="08">PUBLISHING PRINCIPLE</SectionEyebrow></div><div><h2 className="font-serif text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[1.08] tracking-[-0.07em]">뉴스룸은 앞으로도<br />확인한 변화만 기록합니다.</h2><p className="mt-7 max-w-2xl text-[15px] leading-7 text-[#70685d]">제품, 제조, 파트너십에 관한 업데이트는 공개 가능한 사실과 자료를 확인한 뒤 발행합니다. 자료의 범위가 달라지거나 추가 확인이 필요하면, 상태와 시점을 함께 안내하겠습니다.</p><div className="mt-10 flex flex-wrap gap-3"><a href="/products" className="inline-flex items-center gap-2 bg-[#9e3328] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#242321]">제품 파일 찾기 <ArrowUpRight className="h-4 w-4" /></a><a href="/partnership" className="inline-flex items-center gap-2 border border-[#242321] px-5 py-3.5 text-sm font-bold text-[#242321] transition hover:border-[#9e3328] hover:text-[#9e3328]">협업 조건 검토 <ArrowUpRight className="h-4 w-4" /></a></div></div></div></FadeInSection>
      <FadeInSection className="bg-[#f7f3eb] px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1120px] justify-between border-t border-[#d9d0c2] pt-6"><a href="/newsroom" className="inline-flex items-center gap-2 text-sm font-bold text-[#242321] transition hover:text-[#9e3328]">뉴스룸 목록으로</a><span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-[#70685d]"><FileText className="h-4 w-4 text-[#9e3328]" /> OFFICIAL WEBSITE UPDATE</span></div></FadeInSection>
    </SubPageLayout>
  );
}
