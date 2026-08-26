/**
 * Design: 정밀한 식탁 — 제공된 바른푸드 캐릭터 로고를 기업용 워드마크와 결합해 친근함과 제조 신뢰를 함께 전달한다.
 */
type BarunLogoProps = {
  light?: boolean;
  compact?: boolean;
};

export function BarunLogo({ light = false, compact = false }: BarunLogoProps) {
  const textClass = light ? "text-white" : "text-[#242321]";

  return (
    <div className={`flex items-center transition-all duration-300 motion-reduce:transition-none ${compact ? "gap-1.5" : "gap-2.5"}`} aria-label="바른푸드 공식 브랜드 로고">
      <img
        src="/assets/barunfood-logo-mark.png"
        alt="바른푸드 캐릭터 마크"
        className={`object-contain transition-all duration-300 motion-reduce:transition-none ${compact ? "h-8 w-8 sm:h-9 sm:w-9" : "h-11 w-11 sm:h-12 sm:w-12"}`}
      />
      {!compact && (
        <div className={`flex items-center gap-2.5 ${textClass}`}>
          <span aria-hidden="true" className="h-7 w-px bg-[#9e3328]" />
          <div className="leading-none">
            <span className="block font-serif text-[19px] font-semibold tracking-[-0.08em] transition-all duration-300 motion-reduce:transition-none sm:text-[21px]">바른푸드</span>
            <span className="mt-1 block text-[7px] font-semibold tracking-[0.18em] opacity-70 sm:text-[8px]">BARUN FOOD · MANUFACTURING</span>
          </div>
        </div>
      )}
    </div>
  );
}
