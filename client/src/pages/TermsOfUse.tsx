/**
 * Design: 정밀한 식탁 — 이용약관은 홈페이지 정보 열람과 상담 요청의 경계를 분명하게 정리한다.
 */
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { LazyInquiryDialog } from "@/components/LazyInquiryDialog";
import { PageMeta } from "@/components/PageMeta";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { barunfoodLocation } from "@/lib/location";

const effectiveDate = "2026.08.26";

const serviceScope = [
  ["정보 제공", "회사소개, 제조·R&D, 제품군, 파트너십 정보를 제공합니다."],
  ["상담 접수", "제품 납품, 맞춤 개발, OEM·ODM, 기타 제휴 문의를 접수합니다."],
  ["후속 안내", "접수된 내용을 바탕으로 담당자가 필요한 추가 확인 사항을 안내합니다."],
] as const;

const sections = [
  {
    title: "제1조 목적",
    paragraphs: [
      "본 약관은 바른푸드가 운영하는 홈페이지의 이용 조건, 상담 문의 접수, 회사와 이용자의 권리·의무 및 책임 사항을 정하는 것을 목적으로 합니다.",
    ],
  },
  {
    title: "제2조 정의",
    paragraphs: [
      "'홈페이지'란 바른푸드가 회사, 제품, 제조·R&D, 파트너십 정보를 제공하고 상담 문의를 접수하기 위해 운영하는 웹사이트를 말합니다.",
      "'이용자'란 홈페이지에 접속하여 정보를 열람하거나 상담 문의를 제출하는 개인 또는 법인·단체를 말합니다.",
      "'상담 문의'란 제품 납품, 맞춤 제품 개발, OEM·ODM, 기타 제휴와 관련하여 이용자가 홈페이지 양식 또는 연락처를 통해 제출하는 요청을 말합니다.",
    ],
  },
  {
    title: "제3조 약관의 게시와 변경",
    paragraphs: [
      "바른푸드는 이용자가 쉽게 확인할 수 있도록 본 약관을 홈페이지 하단에 연결된 페이지에 게시합니다.",
      "관계 법령, 서비스 범위, 운영 정책이 변경되는 경우 약관을 개정할 수 있으며, 중요한 변경 사항은 홈페이지를 통해 고지합니다.",
    ],
  },
  {
    title: "제4조 서비스의 제공 범위",
    paragraphs: [
      "홈페이지는 바른푸드의 회사 정보, 제품군 안내, 제조·품질·연구개발 관련 정보, 파트너십 상담 접수를 제공합니다.",
      "홈페이지에서 제공되는 제품 정보는 일반 안내이며, 실제 제품 규격, 원재료, 알레르기, 보관·조리 조건, 납품 조건은 최신 제품 규격서, 라벨, 견적서 또는 별도 계약 내용을 기준으로 합니다.",
    ],
  },
  {
    title: "제5조 상담 문의와 회신",
    paragraphs: [
      "이용자는 상담 문의를 제출할 때 정확하고 최신의 정보를 제공해야 합니다. 잘못된 정보로 인해 회신이 지연되거나 검토가 제한될 수 있습니다.",
      "상담 문의 접수는 계약 체결, 납품 가능성, 가격, 일정, 독점 권리, 개발 성공을 보장하지 않습니다. 구체 조건은 담당자 확인과 별도 합의를 통해 정합니다.",
    ],
  },
  {
    title: "제6조 이용자의 의무",
    paragraphs: [
      "이용자는 타인의 정보를 무단으로 사용하거나 허위 정보를 제출해서는 안 됩니다.",
      "홈페이지의 정상 운영을 방해하는 행위, 악성 코드 또는 자동화된 대량 제출, 타인의 권리 또는 영업비밀을 침해하는 행위는 금지됩니다.",
    ],
  },
  {
    title: "제7조 지식재산권",
    paragraphs: [
      "홈페이지의 문구, 이미지, 로고, 화면 구성, 제품 소개 자료 등은 바른푸드 또는 정당한 권리자의 권리에 속합니다.",
      "이용자는 사전 동의 없이 홈페이지 콘텐츠를 영리 목적으로 복제, 배포, 수정, 전송하거나 제3자에게 제공할 수 없습니다.",
    ],
  },
  {
    title: "제8조 서비스의 변경 또는 중단",
    paragraphs: [
      "바른푸드는 운영상 필요, 유지보수, 장애, 보안 대응, 외부 서비스 문제 등으로 홈페이지의 전부 또는 일부를 변경하거나 일시 중단할 수 있습니다.",
      "중대한 변경 또는 장기 중단이 예정된 경우 가능한 범위에서 홈페이지를 통해 사전 안내합니다.",
    ],
  },
  {
    title: "제9조 외부 링크와 책임 범위",
    paragraphs: [
      "홈페이지에는 지도, 이메일, 외부 서비스 등 제3자가 운영하는 링크가 포함될 수 있습니다. 외부 사이트의 운영과 정보 처리에는 해당 사이트의 정책이 적용됩니다.",
      "바른푸드는 고의 또는 중대한 과실이 없는 한 이용자의 통신 환경, 외부 서비스 장애, 이용자가 제출한 정보 오류로 인한 손해에 대해 책임을 지지 않습니다.",
    ],
  },
  {
    title: "제10조 개인정보 보호",
    paragraphs: [
      "상담 문의 처리 과정에서 수집되는 개인정보는 개인정보처리방침에 따라 처리합니다.",
      "이용자는 상담 문의 제출 전 개인정보 수집·이용 내용을 확인하고 동의 여부를 선택할 수 있습니다.",
    ],
  },
  {
    title: "제11조 준거법과 분쟁 해결",
    paragraphs: [
      "본 약관은 대한민국 법령에 따라 해석합니다.",
      "홈페이지 이용과 관련하여 분쟁이 발생한 경우 당사자는 성실히 협의하며, 협의로 해결되지 않는 분쟁은 관계 법령에서 정한 관할 법원 또는 절차에 따릅니다.",
    ],
  },
  {
    title: "제12조 연락처와 시행일",
    paragraphs: [
      `홈페이지 이용 관련 문의는 ${barunfoodLocation.phone} 또는 ${barunfoodLocation.email}로 접수할 수 있습니다.`,
      `본 약관은 ${effectiveDate}부터 시행합니다.`,
    ],
  },
] as const;

export default function TermsOfUse() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f3eb] text-[#242321]">
      <SiteHeader onInquiry={() => setInquiryOpen(true)} />
      <main>
        <PageMeta title="이용약관 | 바른푸드" description="바른푸드 홈페이지의 정보 열람, 상담 문의 접수, 이용자의 의무와 책임 범위를 안내합니다." path="/terms" image="/manus-storage/barunfood-og-image_3b8ec2a6.jpg" imageAlt="바른푸드 이용약관" />
        <FadeInSection className="bg-[#eee6d9] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1440px]">
            <SectionEyebrow number="05" label="LEGAL">TERMS OF USE</SectionEyebrow>
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
              <div>
                <h1 className="font-serif text-[clamp(3rem,6vw,6.3rem)] font-semibold leading-[0.98] tracking-[-0.085em]">홈페이지 이용의<br /><span className="text-[#9e3328]">기준을 안내합니다.</span></h1>
              </div>
              <div className="border-y border-[#cfc3b2] py-6">
                <p className="max-w-2xl text-[15px] leading-7 text-[#6d665c] sm:text-[17px]">본 약관은 바른푸드 홈페이지에서 제공하는 정보 열람과 상담 문의 접수에 관한 기본 조건을 정리합니다.</p>
                <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">EFFECTIVE / {effectiveDate}</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-[#ece5d9] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            <aside>
              <SectionEyebrow number="06" label="LEGAL">SERVICE SCOPE</SectionEyebrow>
              <h2 className="mt-8 font-serif text-[clamp(2.25rem,4vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.08em]">이 사이트는<br />상담의 출발점입니다.</h2>
            </aside>
            <div className="grid border-y border-[#cfc5b5] md:grid-cols-3">
              {serviceScope.map(([title, text], index) => <article key={title} className="border-b border-[#cfc5b5] py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">0{index + 1}</span><h3 className="mt-8 font-bold tracking-[-0.03em]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#70685d]">{text}</p></article>)}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-[#f7f3eb] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            <aside>
              <SectionEyebrow number="07" label="LEGAL">TERMS DETAILS</SectionEyebrow>
              <p className="mt-8 max-w-sm text-sm leading-7 text-[#70685d]">제품 판매, 결제, 회원가입 기능이 추가되는 경우 해당 거래 조건과 소비자 안내 사항을 별도로 반영합니다.</p>
            </aside>
            <div className="divide-y divide-[#d9d0c2] border-y border-[#d9d0c2]">
              {sections.map((section) => <article key={section.title} className="py-8"><h2 className="text-xl font-bold tracking-[-0.05em] text-[#242321]">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-[#70685d]">{paragraph}</p>)}</article>)}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-[#242321] px-5 py-14 text-white sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div><p className="text-[10px] font-bold tracking-[0.18em] text-[#f4bd75]">LEGAL CONTACT</p><p className="mt-3 text-sm leading-6 text-white/60">약관 또는 홈페이지 이용 관련 문의는 고객지원 채널로 접수해 주세요.</p></div>
            <a href={barunfoodLocation.emailHref} className="inline-flex items-center gap-2 border border-white/35 px-5 py-3 text-sm font-bold transition hover:border-[#f4bd75] hover:text-[#f4bd75]">{barunfoodLocation.email}<ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </FadeInSection>
      </main>
      <SiteFooter />
      <LazyInquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
