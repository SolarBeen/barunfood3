/**
 * Design: 정밀한 식탁 — 개인정보 문서는 문의 접수 흐름을 투명한 처리 기록으로 정리한다.
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

const summaryItems = [
  ["처리 목적", "상담 문의 접수, 담당자 검토, 회신 및 후속 안내"],
  ["수집 항목", "회사명 또는 성함, 연락처, 이메일, 문의 유형, 문의 내용, 동의 시각, 제출 페이지"],
  ["보유 기준", "문의 응대와 후속 검토에 필요한 기간 동안 보관 후 목적 달성 시 파기"],
  ["문의 연락처", `${barunfoodLocation.phone} · ${barunfoodLocation.email}`],
] as const;

const collectedItems = [
  ["필수 항목", "회사명 또는 성함, 연락처, 이메일, 문의 유형, 문의 내용, 개인정보 수집·이용 동의 시각, 제출 페이지"],
  ["선택 항목", "관심 제품군"],
  ["기술 정보", "서비스 보안, 장애 대응, 부정 제출 방지를 위해 접속 기록 등 기술 정보가 서버 환경에서 생성될 수 있습니다."],
] as const;

const sections = [
  {
    title: "1. 개인정보의 처리 목적",
    paragraphs: [
      "바른푸드는 홈페이지를 통해 접수된 제품 납품, 맞춤 제품 개발, OEM·ODM, 기타 제휴 문의를 확인하고 회신하기 위해 개인정보를 처리합니다.",
      "수집된 정보는 문의 내용 검토, 담당자 배정, 추가 자료 요청, 상담 이력 확인, 서비스 장애 또는 오남용 대응 목적에 한하여 이용합니다.",
    ],
  },
  {
    title: "2. 개인정보의 처리 및 보유 기간",
    paragraphs: [
      "개인정보는 문의 응대와 후속 검토에 필요한 기간 동안 보관하며, 처리 목적이 달성되면 지체 없이 파기합니다.",
      "다만 관계 법령에 따른 보존 의무가 있거나 분쟁 대응을 위해 필요한 경우에는 해당 사유가 종료될 때까지 필요한 범위에서 보관할 수 있습니다.",
    ],
  },
  {
    title: "3. 개인정보의 제3자 제공",
    paragraphs: [
      "바른푸드는 정보주체의 별도 동의가 있거나 법령에 근거가 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.",
      "제품 개발, 견적, 납품 검토 과정에서 외부 협력사의 확인이 필요한 경우에는 제공 항목, 제공받는 자, 목적, 보유 기간을 별도로 안내하고 동의를 받습니다.",
    ],
  },
  {
    title: "4. 개인정보 처리의 위탁",
    paragraphs: [
      "홈페이지 상담 요청을 이메일로 전달하기 위해 이메일 발송 서비스가 이용될 수 있습니다. 현재 소스 기준 상담 메일 발송에는 Resend 이메일 발송 인프라가 사용됩니다.",
      "위탁 처리되는 정보는 상담 요청 이메일 발송과 전송 오류 확인에 필요한 범위로 제한하며, 수탁자 또는 발송 환경이 변경되는 경우 본 방침에 반영합니다.",
    ],
  },
  {
    title: "5. 정보주체의 권리와 행사 방법",
    paragraphs: [
      "정보주체는 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다. 요청은 전화 또는 이메일로 접수할 수 있으며, 바른푸드는 본인 확인 후 관련 법령에 따라 처리합니다.",
      "법정대리인이 권리를 행사하는 경우에는 위임 관계를 확인할 수 있는 자료를 요청할 수 있습니다.",
    ],
  },
  {
    title: "6. 개인정보의 파기 절차와 방법",
    paragraphs: [
      "처리 목적이 달성된 개인정보는 복구 또는 재생되지 않도록 안전한 방법으로 파기합니다.",
      "전자 파일은 재생이 어려운 방식으로 삭제하고, 출력물 등 종이 문서는 분쇄 또는 이에 준하는 방식으로 파기합니다.",
    ],
  },
  {
    title: "7. 자동 수집 장치의 설치·운영",
    paragraphs: [
      "현재 홈페이지는 회원 로그인, 결제, 맞춤형 광고를 위한 별도 쿠키를 운영하지 않습니다.",
      "향후 분석 도구 또는 광고 식별자를 사용하는 경우 수집 항목, 목적, 보유 기간, 거부 방법을 별도로 고지합니다.",
    ],
  },
  {
    title: "8. 개인정보의 안전성 확보 조치",
    paragraphs: [
      "바른푸드는 개인정보 접근 권한을 필요한 담당자에게 제한하고, 전송 구간 보호와 접근 기록 관리 등 합리적인 보호 조치를 적용합니다.",
      "문의 정보는 상담 목적에 맞게 최소한으로 이용하며, 불필요한 복제와 외부 공유를 제한합니다.",
    ],
  },
  {
    title: "9. 개인정보 보호 업무 연락처",
    paragraphs: [
      `개인정보 관련 문의, 열람·정정·삭제 요청, 고충 처리는 바른푸드 고객지원 채널(${barunfoodLocation.phone}, ${barunfoodLocation.email})로 접수할 수 있습니다.`,
      `주소: ${barunfoodLocation.address}`,
    ],
  },
  {
    title: "10. 처리방침의 변경",
    paragraphs: [
      "본 개인정보처리방침은 시행일로부터 적용됩니다. 처리 목적, 수집 항목, 위탁 처리, 보유 기간 등 중요한 내용이 변경되는 경우 홈페이지를 통해 고지합니다.",
    ],
  },
] as const;

export default function PrivacyPolicy() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f3eb] text-[#242321]">
      <SiteHeader onInquiry={() => setInquiryOpen(true)} />
      <main>
        <PageMeta title="개인정보처리방침 | 바른푸드" description="바른푸드 홈페이지의 상담 문의 접수 및 회신을 위한 개인정보 처리 목적, 수집 항목, 보유 기간, 권리 행사 방법을 안내합니다." path="/privacy" image="/manus-storage/barunfood-og-image_3b8ec2a6.jpg" imageAlt="바른푸드 개인정보처리방침" />
        <FadeInSection className="bg-[#eee6d9] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1440px]">
            <SectionEyebrow number="05" label="LEGAL">PRIVACY POLICY</SectionEyebrow>
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
              <div>
                <h1 className="font-serif text-[clamp(3rem,6vw,6.3rem)] font-semibold leading-[0.98] tracking-[-0.085em]">개인정보는<br /><span className="text-[#9e3328]">필요한 만큼만 다룹니다.</span></h1>
              </div>
              <div className="border-y border-[#cfc3b2] py-6">
                <p className="max-w-2xl text-[15px] leading-7 text-[#6d665c] sm:text-[17px]">바른푸드는 홈페이지 상담 문의에 필요한 최소한의 개인정보를 수집하고, 문의 검토와 회신 목적에 맞게 처리합니다.</p>
                <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">EFFECTIVE / {effectiveDate}</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-[#f7f3eb] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid border-y border-[#d9d0c2] md:grid-cols-4">
              {summaryItems.map(([label, value], index) => <div key={label} className="border-b border-[#d9d0c2] py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"><span className="text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">0{index + 1}</span><h2 className="mt-5 text-sm font-bold tracking-[-0.02em]">{label}</h2><p className="mt-3 text-sm leading-6 text-[#70685d]">{value}</p></div>)}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-[#ece5d9] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            <aside>
              <SectionEyebrow number="06" label="LEGAL">COLLECTED ITEMS</SectionEyebrow>
              <h2 className="mt-8 font-serif text-[clamp(2.25rem,4vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.08em]">상담에 필요한<br />항목만 확인합니다.</h2>
            </aside>
            <div className="border-t border-[#cfc5b5]">
              {collectedItems.map(([label, value], index) => <article key={label} className="grid gap-4 border-b border-[#cfc5b5] py-6 sm:grid-cols-[120px_1fr]"><span className="text-[10px] font-bold tracking-[0.14em] text-[#9e3328]">ITEM / 0{index + 1}</span><div><h3 className="font-bold tracking-[-0.03em]">{label}</h3><p className="mt-2 text-sm leading-7 text-[#70685d]">{value}</p></div></article>)}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-[#f7f3eb] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            <aside>
              <SectionEyebrow number="07" label="LEGAL">POLICY DETAILS</SectionEyebrow>
              <p className="mt-8 max-w-sm text-sm leading-7 text-[#70685d]">본 방침은 홈페이지 상담 문의 처리 기준입니다. 제품 계약, 거래, 채용 등 별도 절차가 있는 경우 해당 절차의 안내가 함께 적용될 수 있습니다.</p>
            </aside>
            <div className="divide-y divide-[#d9d0c2] border-y border-[#d9d0c2]">
              {sections.map((section) => <article key={section.title} className="py-8"><h2 className="text-xl font-bold tracking-[-0.05em] text-[#242321]">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-[#70685d]">{paragraph}</p>)}</article>)}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="bg-[#242321] px-5 py-14 text-white sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div><p className="text-[10px] font-bold tracking-[0.18em] text-[#f4bd75]">LEGAL CONTACT</p><p className="mt-3 text-sm leading-6 text-white/60">개인정보 관련 문의는 고객지원 채널로 접수해 주세요.</p></div>
            <a href={barunfoodLocation.emailHref} className="inline-flex items-center gap-2 border border-white/35 px-5 py-3 text-sm font-bold transition hover:border-[#f4bd75] hover:text-[#f4bd75]">{barunfoodLocation.email}<ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </FadeInSection>
      </main>
      <SiteFooter />
      <LazyInquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
