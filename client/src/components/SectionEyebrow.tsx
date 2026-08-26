/**
 * Design: 정밀한 식탁 — 배치 번호와 미세한 라인을 반복해 제조 기록의 시그니처를 만든다.
 */
type SectionEyebrowProps = {
  number: string;
  children: React.ReactNode;
  light?: boolean;
  label?: string;
};

export function SectionEyebrow({ number, children, light = false, label = "BATCH" }: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] ${light ? "text-white/70" : "text-[#776f65]"}`}>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#9e3328] text-[9px] tracking-normal text-white shadow-[0_2px_0_rgba(70,17,12,0.25)]">{number}</span>
      <span className="text-[#9e3328]">{label}</span>
      <span className={`h-px w-7 ${light ? "bg-white/40" : "bg-[#bdb5a8]"}`} />
      <span>{children}</span>
    </div>
  );
}
