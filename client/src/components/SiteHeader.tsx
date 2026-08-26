/**
 * Design: 정밀한 식탁 — Baker’s Mark와 얇은 레일을 공유하는 이중 레벨 내비게이션으로 제품·제조·상담의 깊이를 정리한다.
 */
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { BarunLogo } from "@/components/BarunLogo";

type SiteHeaderProps = {
  onInquiry: () => void;
  darkOnTop?: boolean;
};

const navGroups = [
  {
    label: "회사소개",
    href: "/company",
    description: "바른푸드가 지키는 기준",
    items: [
      ["브랜드 스토리", "/company"],
      ["우리가 일하는 방식", "/company#approach"],
      ["오시는 길", "/location"],
    ],
  },
  {
    label: "제조·R&D",
    href: "/manufacturing",
    description: "맛을 생산으로 완성하는 과정",
    items: [
      ["제조 역량", "/manufacturing"],
      ["품질·안전", "/manufacturing/quality"],
      ["연구개발", "/manufacturing/research"],
    ],
  },
  {
    label: "제품·브랜드",
    href: "/products",
    description: "메뉴의 시작이 되는 맛",
    items: [
      ["제품 카탈로그", "/products"],
      ["요리 담은 피자", "/products/pizza"],
      ["바른 도우", "/products/dough"],
    ],
  },
  {
    label: "파트너십",
    href: "/partnership",
    description: "필요한 조건부터 함께 검토",
    items: [
      ["파트너십 소개", "/partnership"],
      ["상담 절차", "/partnership#process"],
      ["B2B 상담", "/partnership#inquiry"],
    ],
  },
];

export function SiteHeader({ onInquiry, darkOnTop = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const isDark = darkOnTop && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeNavigation = () => {
    setMobileOpen(false);
    setOpenGroup(null);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none ${
        isDark ? "bg-transparent" : "border-b border-black/5 bg-[#f7f3eb]/95 shadow-[0_8px_30px_rgba(38,31,22,0.06)] backdrop-blur-xl"
      }`}
      onMouseLeave={() => setOpenGroup(null)}
    >
      <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[height] duration-300 motion-reduce:transition-none sm:px-8 lg:px-12 ${scrolled ? "h-[64px] lg:h-[68px]" : "h-[76px] lg:h-[86px]"}`}>
        <a href="/" className="relative z-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9e3328]" aria-label="바른푸드 홈">
          <BarunLogo light={isDark} compact={scrolled} />
        </a>
        <nav className={`hidden h-full items-center gap-1 lg:flex ${isDark ? "text-white/90" : "text-[#423e37]"}`} aria-label="주요 메뉴">
          {navGroups.map((group) => (
            <div key={group.label} className="relative h-full" onMouseEnter={() => setOpenGroup(group.label)}>
              <button
                type="button"
                onFocus={() => setOpenGroup(group.label)}
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                aria-expanded={openGroup === group.label}
                className="flex h-full items-center gap-1 px-3 text-sm font-semibold transition hover:text-[#9e3328] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#9e3328]"
              >
                {group.label} <ChevronDown className={`h-3.5 w-3.5 transition ${openGroup === group.label ? "rotate-180" : ""}`} />
              </button>
              {openGroup === group.label && (
                <div className="absolute left-0 top-full w-[440px] overflow-hidden border border-[#d9d0c2] bg-[#f7f3eb] shadow-[0_22px_45px_rgba(38,31,22,0.16)]">
                  <div className="grid grid-cols-[0.78fr_1.22fr]">
                    <a href={group.href} onClick={closeNavigation} className="bg-[#242321] p-6 text-white transition hover:bg-[#9e3328]">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#9e3328] text-[9px] font-bold">{String(navGroups.indexOf(group) + 1).padStart(2, "0")}</span>
                      <p className="mt-8 text-[10px] font-bold tracking-[0.18em] text-[#f4bd75]">BATCH MENU</p>
                      <p className="mt-2 font-serif text-xl font-semibold tracking-[-0.06em]">{group.description}</p>
                    </a>
                    <div className="p-3">
                      {group.items.map(([item, href], index) => (
                        <a key={href} href={href} onClick={closeNavigation} className="group flex items-center justify-between border-b border-[#e2dbcf] px-3 py-4 text-sm font-semibold text-[#3c3832] last:border-b-0 hover:text-[#9e3328]">
                          <span><span className="mr-3 text-[10px] font-bold text-[#9e3328]">0{index + 1}</span>{item}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <button onClick={onInquiry} type="button" className={`hidden items-center gap-2 px-4 py-2.5 text-sm font-bold transition hover:bg-[#9e3328] hover:text-white lg:flex ${isDark ? "border border-white/50 bg-white/10 text-white backdrop-blur-sm" : "bg-[#242321] text-white"}`}>
          B2B 상담 <ArrowUpRight className="h-4 w-4" />
        </button>
        <button onClick={() => setMobileOpen(!mobileOpen)} type="button" className={`grid h-10 w-10 place-items-center lg:hidden ${isDark ? "text-white" : "text-[#242321]"}`} aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-black/5 bg-[#f7f3eb] px-5 pb-6 pt-1 shadow-xl lg:hidden">
          <nav aria-label="모바일 주요 메뉴">
            {navGroups.map((group) => (
              <details key={group.label} className="border-b border-[#d9d0c2]" onToggle={(event) => event.currentTarget.open && setOpenGroup(group.label)}>
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-semibold tracking-[-0.04em] text-[#242321]">
                  {group.label}<ChevronDown className="h-4 w-4" />
                </summary>
                <div className="-mt-1 pb-4">
                  {group.items.map(([item, href], index) => <a key={href} href={href} onClick={closeNavigation} className="flex items-center gap-3 py-2 text-sm text-[#6d665c]"><span className="text-[10px] font-bold text-[#9e3328]">0{index + 1}</span>{item}</a>)}
                </div>
              </details>
            ))}
          </nav>
          <button onClick={() => { closeNavigation(); onInquiry(); }} type="button" className="mt-5 w-full bg-[#9e3328] py-3.5 text-sm font-bold text-white">B2B 상담하기</button>
        </div>
      )}
    </header>
  );
}
