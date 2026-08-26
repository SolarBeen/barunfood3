/**
 * Design: 정밀한 식탁 — 파트너십은 영업 소개가 아니라 협업 가능성을 판단하기 위한 Brief와 Eligibility Matrix로 구성한다.
 */
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { LazyInquiryDialog } from "@/components/LazyInquiryDialog";
import { PageMeta } from "@/components/PageMeta";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SubPageLayout } from "@/components/SubPageLayout";

const steps = [
  ["필요 조건 정리", "제품 또는 메뉴 유형, 사용 환경, 예상 수량과 희망 일정을 먼저 확인합니다."],
  ["가능 범위 검토", "제품·개발·납품 조건을 바탕으로 검토할 수 있는 범위를 정리합니다."],
  ["다음 질문 안내", "검토에 필요한 자료와 담당 부서, 다음 절차를 안내합니다."],
  ["협업 방식 설계", "필요한 경우 제품 개발과 생산 조건을 구체화합니다."],
];

const eligibility = [
  ["제품 납품", "운영에 맞는 납품 조건을 확인합니다.", "제품군, 수량, 보관 조건, 납품 지역을 바탕으로 검토합니다.", "BRIEF / SUPPLY"],
  ["맞춤 제품 개발", "메뉴의 목적부터 함께 살핍니다.", "맛의 방향, 사용 장비, 테스트 조건, 예상 일정을 확인합니다.", "BRIEF / DEVELOPMENT"],
  ["OEM · ODM", "생산 범위와 필요한 기준을 정리합니다.", "제품 범위, 생산 조건, 필요 문서를 기준으로 다음 단계를 검토합니다.", "BRIEF / PRODUCTION"],
];

const collaborationCases: Array<[string, string, string[]]> = [
  ["외식 프랜차이즈 메뉴 운영", "도우 규격·조리 동선·납품 주기를 함께 검토하는 협업 유형입니다.", ["BRIEF / 메뉴 운영", "REVIEW / 조건 확인", "NEXT / 납품 범위"]],
  ["식자재 유통 채널 확대", "보관 조건과 출고 단위, 판매 채널별 제품 구성을 검토하는 협업 유형입니다.", ["BRIEF / 유통 채널", "REVIEW / 물류 확인", "NEXT / 공급 범위"]],
  ["신규 메뉴·OEM 기획", "메뉴 목적과 테스트 조건, 생산 가능 범위를 바탕으로 논의하는 개발 협업 유형입니다.", ["BRIEF / 신규 기획", "REVIEW / 생산 확인", "NEXT / 개발 범위"]],
];

const checklist = ["제품 또는 메뉴 유형", "실제 사용 환경과 장비", "예상 수량 또는 납품 단위", "희망 일정", "검토가 필요한 조건"];

export default function Partnership() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <SubPageLayout marker="04" eyebrow="PARTNERSHIP BRIEF" heroVariant="partnership" heroImage="/manus-storage/barunfood-partnership-table_1f4b1b0d.jpg" heroImageAlt="제품 샘플을 검토하는 협업 장면" title={<>답을 정하기 전에,<br /><span className="text-[#9e3328]">조건부터 읽습니다.</span></>} description="제품 납품, 맞춤 개발, OEM·ODM. 협업의 방식보다 먼저 필요한 조건과 가능한 범위를 함께 정리합니다.">
      <PageMeta title="파트너십 | 바른푸드 협업 조건 검토" description="제품 납품, 맞춤 개발, OEM·ODM의 협업 조건을 정리하고 가능한 범위를 함께 검토하는 바른푸드 파트너십입니다." path="/partnership" image="/manus-storage/barunfood-og-image_3b8ec2a6.jpg" imageAlt="바른푸드 파트너십 — 조건부터 읽습니다" />
      <FadeInSection className="bg-[#242321] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionEyebrow number="05" light>PARTNERSHIP BRIEF</SectionEyebrow><h2 className="mt-8 font-serif text-[clamp(2.4rem,4.7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.08em]">빠른 답보다,<br /><span className="text-[#c95043]">맞는 질문부터 시작합니다.</span></h2><p className="mt-7 max-w-md text-[15px] leading-7 text-white/65">상담은 가능한 답을 먼저 약속하는 과정이 아닙니다. 조건을 읽고 필요한 정보를 정리해 적합한 다음 단계를 찾는 첫 단계입니다.</p></div><div className="border-t border-white/20">{steps.map(([title, text], index) => <article key={title} className="grid grid-cols-[52px_1fr] gap-5 border-b border-white/15 py-6 sm:grid-cols-[84px_1fr] sm:py-8"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">0{index + 1}</span><div><p className="text-[10px] font-bold tracking-[0.15em] text-[#f4bd75]">STEP / 0{index + 1}</p><h3 className="mt-2 text-xl font-bold tracking-[-0.04em]">{title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{text}</p></div></article>)}</div></div></FadeInSection>
      <FadeInSection className="bg-[#ece5d9] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.78fr_1.22fr]"><div><SectionEyebrow number="06">ELIGIBILITY MATRIX</SectionEyebrow><h2 className="mt-8 font-serif text-[clamp(2.25rem,4vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.08em]">무엇을 함께<br />검토할 수 있나요?</h2><p className="mt-7 max-w-sm text-sm leading-6 text-[#70685d]">협업 유형을 먼저 고르기보다, 실제 운영 조건과 필요한 범위를 확인하는 것이 중요합니다.</p></div><div className="grid border-y border-[#cfc5b5] sm:grid-cols-3">{eligibility.map(([title, headline, text, record], index) => <article key={title} className="border-b border-[#cfc5b5] py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#9e3328] text-[9px] font-bold text-white">0{index + 1}</span><p className="mt-8 text-[10px] font-bold tracking-[0.14em] text-[#9e3328]">{record}</p><h3 className="mt-4 font-bold">{title}</h3><p className="mt-3 text-sm font-semibold leading-6 text-[#4a453d]">{headline}</p><p className="mt-3 text-sm leading-6 text-[#70685d]">{text}</p></article>)}</div></div></FadeInSection>
      <FadeInSection className="bg-[#f7f3eb] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]"><div><SectionEyebrow number="07">COLLABORATION CASES</SectionEyebrow><h2 className="mt-8 font-serif text-[clamp(2.35rem,4.2vw,4.7rem)] font-semibold leading-[1.04] tracking-[-0.08em]">조건이 다르면,<br /><span className="text-[#9e3328]">검토의 순서도 달라집니다.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#70685d]">공개 고객사·후기를 임의로 만들지 않습니다. 아래는 실제 상담에서 확인하는 조건과 검토 범위를 정리한 사례 프레임입니다.</p></div><div className="border-t border-[#cfc5b5]">{collaborationCases.map(([title, text, records], index) => <article key={title} className="group grid gap-5 border-b border-[#cfc5b5] py-7 sm:grid-cols-[62px_1fr_auto] sm:items-start sm:py-9"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">0{index + 1}</span><div><p className="text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">CASE FRAME / {String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 text-xl font-bold tracking-[-0.05em] text-[#292724]">{title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#70685d]">{text}</p></div><div className="flex flex-wrap gap-1.5 sm:max-w-[190px] sm:justify-end">{records.map((record) => <span key={record} className="border border-[#cfc5b5] px-2 py-1 text-[9px] font-bold tracking-[0.08em] text-[#70685d]">{record}</span>)}</div></article>)}</div></div></div></FadeInSection>
      <FadeInSection id="inquiry" className="bg-[#f7f3eb] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-10 bg-[#9e3328] p-7 text-white sm:p-10 lg:grid-cols-[0.78fr_1.22fr] lg:p-14"><div><SectionEyebrow number="08" light>INQUIRY CHECKLIST</SectionEyebrow><h2 className="mt-8 font-serif text-[clamp(2.3rem,4.3vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.08em]">협업 조건을<br />검토해 보세요.</h2></div><div><p className="max-w-xl text-sm leading-6 text-white/75">아래 정보를 알려주시면, 검토에 필요한 다음 질문을 안내하겠습니다.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{checklist.map((item, index) => <div key={item} className="flex items-center gap-3 border-t border-white/20 pt-3 text-sm"><span className="grid h-5 w-5 place-items-center rounded-full border border-white/45 text-[9px] font-bold">0{index + 1}</span>{item}</div>)}</div><button onClick={() => setInquiryOpen(true)} type="button" className="consultation-cta mt-9 inline-flex items-center justify-center gap-3 bg-white px-6 py-4 text-sm font-bold text-[#9e3328] hover:bg-[#242321] hover:text-white">협업 조건 검토 요청 <ArrowUpRight className="cta-arrow h-4 w-4" /></button></div></div></FadeInSection>
      <LazyInquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </SubPageLayout>
  );
}
