/**
 * Design: 정밀한 식탁 — 고정 행동 버튼은 라운드 아이콘이 아니라 제조 기록의 배치 마크처럼 절제된 상담 진입점으로 다룬다.
 */
import React from "react";
import { Headphones, MessageCircleMore, PhoneCall } from "lucide-react";

type FloatingInquiryButtonProps = { onOpen: () => void };

export function FloatingInquiryButton({ onOpen }: FloatingInquiryButtonProps) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 sm:bottom-7 sm:right-7">
      <span className="pointer-events-none hidden bg-[#242321] px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-white shadow-lg lg:block">CUSTOMER DESK</span>
      <a href="tel:0325671062" aria-label="032-567-1062로 전화 상담하기" className="inline-flex items-center gap-2 border border-[#d9d0c2] bg-[#fffdf8] px-3 py-2 text-[11px] font-bold tracking-[0.04em] text-[#242321] shadow-[0_8px_20px_rgba(36,35,33,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-[#9e3328] hover:text-[#9e3328] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e3328]">
        <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
        <span>032-567-1062</span>
      </a>
      <button type="button" onClick={onOpen} aria-label="고객센터 및 B2B 상담 열기" className="group flex h-14 items-center gap-3 rounded-full border border-[#9e3328] bg-[#9e3328] pl-4 pr-5 text-white shadow-[0_12px_28px_rgba(124,37,27,0.28)] transition duration-200 hover:-translate-y-1 hover:bg-[#7e2119] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e3328] sm:h-15"><span className="relative grid h-7 w-7 place-items-center rounded-full border border-white/40"><Headphones className="h-4 w-4" /><MessageCircleMore className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#f4bd75] p-[2px] text-[#6f271d]" /></span><span className="text-xs font-bold tracking-[-0.02em]">상담 요청</span></button>
    </div>
  );
}
