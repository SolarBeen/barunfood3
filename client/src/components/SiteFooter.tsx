/**
 * Design: 정밀한 식탁 — 다크 차콜 하단은 제조 기록의 마지막 장처럼 정리하며, 연락처를 가장 분명한 정보로 남긴다.
 */
import { BarunLogo } from "@/components/BarunLogo";
import { barunfoodLocation } from "@/lib/location";

export function SiteFooter() {
  return (
    <footer className="bg-[#242321] px-5 pb-9 pt-14 text-white sm:px-8 lg:px-12 lg:pt-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <BarunLogo light />
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">도우부터 피자까지, 정직한 기준으로 식품의 다음 장면을 만듭니다.</p>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#f4bd75]">CONTACT</p>
            <a href={barunfoodLocation.phoneHref} className="mt-4 block text-xl font-semibold tracking-[-0.04em] transition hover:text-[#f4bd75]">{barunfoodLocation.phone}</a>
            <a href={barunfoodLocation.emailHref} className="mt-2 block text-sm text-white/60 transition hover:text-white">{barunfoodLocation.email}</a>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#f4bd75]">LOCATION</p>
            <a href={barunfoodLocation.path} className="mt-4 block text-sm leading-6 text-white/60 transition hover:text-[#f4bd75]">{barunfoodLocation.addressLines[0]}<br />{barunfoodLocation.addressLines[1]}</a>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-[11px] text-white/45 sm:flex-row">
          <p>© BARUN FOOD CO., LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4"><a href="/privacy" className="hover:text-white">개인정보처리방침</a><a href="/terms" className="hover:text-white">이용약관</a></div>
        </div>
      </div>
    </footer>
  );
}
