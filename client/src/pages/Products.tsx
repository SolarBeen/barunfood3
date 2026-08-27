/**
 * Design: 정밀한 식탁 — 제품 탐색은 카탈로그가 아니라 제품 파일을 고르는 경험으로 설계하며, 필터·검색 결과에도 제조 기록의 위계를 유지한다.
 */
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";
import { LazyInquiryDialog } from "@/components/LazyInquiryDialog";
import { PageMeta } from "@/components/PageMeta";
import { ProductDetailDialog, type ProductDetail } from "@/components/ProductDetailDialog";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SubPageLayout } from "@/components/SubPageLayout";

type Product = ProductDetail & { category: "피자" | "도우" | "기타" };

const products: Product[] = [
  { id: "detroit", name: "리얼 디트로이트 피자", category: "피자", file: "PIZZA / PRODUCT FILE 01", description: "두툼한 도우와 치즈 식감을 강조한 외식 메뉴용 네모 피자 라인입니다.", tags: ["디트로이트", "페퍼로니", "치즈", "네모피자"], image: "/assets/real-detroit-pizza-background.jpg", serving: "매장 메뉴, 납품 수량, 보관 방식에 맞춰 제품 규격을 상담 시 제안합니다.", nutrition: [["1회 제공량", "제품 규격서 기준"], ["열량", "포장 라벨 기준"], ["탄수화물", "포장 라벨 기준"], ["단백질", "포장 라벨 기준"], ["지방", "포장 라벨 기준"], ["나트륨", "포장 라벨 기준"]], specifications: [["제품 구분", "피자 제품군"], ["제안 메뉴", "디트로이트 스타일 피자"], ["납품 조건", "수량·보관 조건 상담"], ["알레르기 정보", "실제 제품 라벨 기준 확인"]], storage: "보관·해동 기준은 출고 제품의 포장 라벨과 최신 제품 규격서를 기준으로 안내합니다.", preparation: "매장 조리 설비와 메뉴 구성에 맞춰 권장 조리 조건을 안내합니다." },
  { id: "thin", name: "씬 피자", category: "피자", file: "PIZZA / PRODUCT FILE 02", description: "얇고 바삭한 식감을 살린 매장 메뉴용 씬 피자 라인입니다.", tags: ["씬피자", "고구마", "페퍼로니", "치즈"], image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1500&q=88", serving: "매장 오븐, 조리 시간, 납품 수량에 맞춰 제품 규격과 공급 조건을 안내합니다.", nutrition: [["1회 제공량", "제품 규격서 기준"], ["열량", "포장 라벨 기준"], ["탄수화물", "포장 라벨 기준"], ["단백질", "포장 라벨 기준"], ["지방", "포장 라벨 기준"], ["나트륨", "포장 라벨 기준"]], specifications: [["제품 구분", "피자 제품군"], ["제안 메뉴", "씬 피자"], ["조리 환경", "매장 오븐 조건 상담"], ["알레르기 정보", "실제 제품 라벨 기준 확인"]], storage: "보관·해동 기준은 출고 제품의 포장 라벨과 최신 제품 규격서를 기준으로 안내합니다.", preparation: "바삭한 식감을 위한 온도·시간 조건은 제품 규격서를 기준으로 안내합니다." },
  { id: "dough", name: "바른 도우", category: "도우", file: "DOUGH / PRODUCT FILE 03", description: "매장 메뉴의 베이스로 쓰기 좋은 피자 도우 솔루션입니다.", tags: ["도우", "피자도우", "반죽", "외식"], image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1500&q=88", serving: "도우 규격, 발효·해동 방식, 조리 설비는 메뉴 목적과 매장 운영 환경에 맞춰 안내합니다.", nutrition: [["1회 제공량", "제품 규격서 기준"], ["열량", "포장 라벨 기준"], ["탄수화물", "포장 라벨 기준"], ["단백질", "포장 라벨 기준"], ["지방", "포장 라벨 기준"], ["나트륨", "포장 라벨 기준"]], specifications: [["제품 구분", "도우 제품군"], ["제안 메뉴", "피자·외식 메뉴"], ["사용 조건", "발효·조리 환경 상담"], ["알레르기 정보", "실제 제품 라벨 기준 확인"]], storage: "보관·해동 기준은 출고 제품의 포장 라벨과 최신 제품 규격서를 기준으로 안내합니다.", preparation: "발효·해동 시간과 조리 조건은 도우 규격과 현장 환경에 맞춰 안내합니다." },
  { id: "foodservice", name: "푸드서비스 도우", category: "도우", file: "DOUGH / PRODUCT FILE 04", description: "납품 단위와 보관 방식을 맞춰 공급하는 푸드서비스용 도우 제품군입니다.", tags: ["도우", "식자재", "납품", "푸드서비스"], image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?auto=format&fit=crop&w=1500&q=88", serving: "푸드서비스 채널의 보관 방식, 납품 단위, 사용 목적에 맞춰 규격을 안내합니다.", nutrition: [["1회 제공량", "제품 규격서 기준"], ["열량", "포장 라벨 기준"], ["탄수화물", "포장 라벨 기준"], ["단백질", "포장 라벨 기준"], ["지방", "포장 라벨 기준"], ["나트륨", "포장 라벨 기준"]], specifications: [["제품 구분", "도우 제품군"], ["활용 범위", "푸드서비스·식자재"], ["납품 단위", "상담을 통한 확인"], ["알레르기 정보", "실제 제품 라벨 기준 확인"]], storage: "보관·해동 기준은 출고 제품의 포장 라벨과 최신 제품 규격서를 기준으로 안내합니다.", preparation: "제품의 실제 사용 목적에 따라 권장 조리·해동 조건을 안내합니다." },
  { id: "croffle", name: "크로플", category: "기타", file: "OTHER / PRODUCT FILE 05", description: "디저트와 간편 메뉴에 활용하기 좋은 바삭한 크로플 제품군입니다.", tags: ["크로플", "디저트", "간편식"], image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1500&q=88", serving: "메뉴 구성, 조리 장비, 판매 형태에 맞는 제품 규격을 상담 시 안내합니다.", nutrition: [["1회 제공량", "제품 규격서 기준"], ["열량", "포장 라벨 기준"], ["탄수화물", "포장 라벨 기준"], ["단백질", "포장 라벨 기준"], ["지방", "포장 라벨 기준"], ["나트륨", "포장 라벨 기준"]], specifications: [["제품 구분", "기타 제품군"], ["활용 메뉴", "디저트·간편식"], ["조리 장비", "현장 조건 상담"], ["알레르기 정보", "실제 제품 라벨 기준 확인"]], storage: "보관·해동 기준은 출고 제품의 포장 라벨과 최신 제품 규격서를 기준으로 안내합니다.", preparation: "제품 라벨과 실제 조리 환경에 맞춰 권장 조건을 안내합니다." },
];

const categories: Array<"전체" | Product["category"]> = ["전체", "피자", "도우", "기타"];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("전체");
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = useMemo(() => products.filter((product) => {
    const categoryMatches = activeCategory === "전체" || product.category === activeCategory;
    const searchMatches = !normalizedQuery || [product.name, product.category, product.description, ...product.tags].join(" ").toLowerCase().includes(normalizedQuery);
    return categoryMatches && searchMatches;
  }), [activeCategory, normalizedQuery]);

  const clearFilters = () => { setActiveCategory("전체"); setQuery(""); };
  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
    const url = new URL(window.location.href);
    url.searchParams.set("product", product.id);
    window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
  };
  const closeProduct = () => {
    setSelectedProduct(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("product");
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  };

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("product");
    const sharedProduct = products.find((product) => product.id === productId);
    if (sharedProduct) setSelectedProduct(sharedProduct);
  }, []);

  const activeMeta = selectedProduct ? {
    title: `${selectedProduct.name} | 바른푸드 제품 상세`,
    description: `${selectedProduct.description} 영양 성분, 상세 스펙, 보관·조리 안내를 확인하고 납품 조건을 상담해 보세요.`,
    path: `/products?product=${selectedProduct.id}`,
    image: "/manus-storage/barunfood-product-og-image_272ba6cb.jpg",
    imageAlt: `${selectedProduct.name} — 바른푸드 제품 상세 파일`,
  } : {
    title: "제품·브랜드 | 바른푸드 제품 파일",
    description: "피자, 도우, 푸드서비스 제품군을 용도별로 찾고 납품·조리 조건을 상담할 수 있는 바른푸드 제품 파일입니다.",
    path: "/products",
    image: "/manus-storage/barunfood-product-og-image_272ba6cb.jpg",
    imageAlt: "바른푸드 제품 파일 — 필요한 맛을 찾으세요",
  };

  return (
    <SubPageLayout marker="03" eyebrow="PRODUCT FINDER" heroVariant="products" title={<>메뉴에 맞는 제품은,<br /><span className="text-[#9e3328]">파일에서 먼저 찾습니다.</span></>} description="피자, 도우, 푸드서비스 제품군을 용도별로 찾고 납품·조리 조건을 상담해 보세요.">
      <PageMeta {...activeMeta} />
      <FadeInSection className="bg-[#f7f3eb] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="grid gap-8 border-b border-[#d9d0c2] pb-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><SectionEyebrow number="04">PRODUCT FINDER</SectionEyebrow><h2 className="mt-7 font-serif text-[clamp(2.3rem,4vw,4.6rem)] font-semibold tracking-[-0.08em]">필요한 도우와 피자를<br />파일에서 바로 찾으세요.</h2></div><div className="grid gap-5"><label className="relative block"><span className="sr-only">제품 검색</span><Search className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9e3328]" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full border-b border-[#8d8274] bg-transparent py-3 pl-8 pr-10 text-[15px] outline-none placeholder:text-[#9a9084] focus:border-[#9e3328]" placeholder="제품명, 메뉴 유형 또는 납품 조건을 입력하세요" />{query && <button type="button" onClick={() => setQuery("")} className="absolute right-0 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[#776f65] hover:bg-[#e8dfcf]" aria-label="검색어 지우기"><X className="h-4 w-4" /></button>}</label><div className="flex flex-wrap items-center gap-2"><span className="mr-2 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-[#776f65]"><SlidersHorizontal className="h-3.5 w-3.5 text-[#9e3328]" />제품군으로 좁혀보기</span>{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`border px-3 py-2 text-xs font-bold transition ${activeCategory === category ? "border-[#9e3328] bg-[#9e3328] text-white" : "border-[#d9d0c2] text-[#5e574d] hover:border-[#9e3328]"}`}>{category}</button>)}</div></div></div>
        <div className="mt-7 flex items-center justify-between"><p className="text-sm text-[#70685d]">현재 선택한 용도에 맞는 제품 파일 <span className="font-bold text-[#9e3328]">{filteredProducts.length}</span>개</p>{(query || activeCategory !== "전체") && <button type="button" onClick={clearFilters} className="border-b border-[#242321] pb-1 text-xs font-bold text-[#242321] hover:text-[#9e3328]">필터 초기화</button>}</div>
        <div className="mt-5 grid border-y border-[#d9d0c2] py-3 text-[9px] font-bold tracking-[0.14em] text-[#776f65] sm:grid-cols-4"><span>DOCUMENT INDEX / {String(filteredProducts.length).padStart(2, "0")}</span><span className="mt-2 sm:mt-0">RECORD TYPE / PRODUCT FILE</span><span className="mt-2 sm:mt-0">REVIEW FIELD / USAGE · SPEC</span><span className="mt-2 text-[#9e3328] sm:mt-0 sm:text-right">STATUS / CONSULT TO VERIFY</span></div>
        {filteredProducts.length ? <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((product, index) => <article key={product.id} className="group relative min-h-[460px] overflow-hidden bg-[#242321]"><img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" /><div className="absolute inset-x-0 top-0 border-b border-white/20 px-5 py-3 text-[9px] font-bold tracking-[0.14em] text-white/80"><div className="flex items-center justify-between"><span>FILE / {String(index + 1).padStart(2, "0")}</span><span className="border border-white/30 px-2 py-1">REVIEW STATUS</span></div><div className="mt-2 flex justify-between border-t border-white/15 pt-2 text-[8px] text-white/60"><span>USAGE FIELD / {product.category}</span><span>SPEC / VERIFY</span></div></div><div className="absolute inset-x-0 bottom-0 p-7 text-white"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold">{String(index + 1).padStart(2, "0")}</span><span className="text-[10px] font-bold tracking-[0.16em] text-white/80">{product.file}</span></div><h3 className="mt-5 text-2xl font-bold tracking-[-0.06em]">{product.name}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-white/75">{product.description}</p><div className="mt-4 grid grid-cols-2 border-y border-white/20 py-2 text-[9px] font-bold tracking-[0.12em] text-white/70"><span>USAGE / {product.category}</span><span className="text-right">SPEC / 상담 안내</span></div><div className="mt-4 flex flex-wrap gap-1.5">{product.tags.slice(0, 3).map((tag) => <span key={tag} className="border border-white/25 px-2 py-1 text-[10px] text-white/75">#{tag}</span>)}</div><div className="mt-6 flex flex-wrap items-center gap-4"><button type="button" onClick={() => selectProduct(product)} className="inline-flex items-center gap-2 text-sm font-bold underline decoration-[#9e3328] underline-offset-4 transition hover:text-[#f4bd75]">제품 파일 열기 <ArrowUpRight className="h-4 w-4" /></button><button type="button" onClick={() => setInquiryOpen(true)} className="text-xs font-semibold text-white/75 transition hover:text-white">규격·납품 조건 문의</button></div></div></article>)}</div> : <div className="mt-10 grid min-h-[330px] place-items-center border-y border-[#d9d0c2] bg-[#ece5d9] px-6 text-center"><div><span className="grid h-10 w-10 place-items-center rounded-full bg-[#9e3328] text-xs font-bold text-white">00</span><p className="mt-6 text-[10px] font-bold tracking-[0.18em] text-[#9e3328]">NO PRODUCT FILE FOUND</p><h3 className="mt-3 text-2xl font-bold tracking-[-0.05em]">다른 용도로 다시 찾아보세요.</h3><p className="mt-3 max-w-md text-sm leading-6 text-[#70685d]">제품명, 카테고리, 납품 수량 또는 사용 환경을 바꾸어 검색해 보세요. 필요한 제품이 분명하다면 상담으로 바로 알려주셔도 됩니다.</p><button type="button" onClick={clearFilters} className="mt-7 bg-[#242321] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9e3328]">제품 전체 보기</button></div></div>}</div></FadeInSection>
      <FadeInSection className="bg-[#ece5d9] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr]"><SectionEyebrow number="05">PRODUCT INFORMATION</SectionEyebrow><div><h2 className="font-serif text-[clamp(2.25rem,4vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.08em]">제품 규격, 보관·해동,<br />납품 단위까지 안내합니다.</h2><div className="mt-10 grid border-t border-[#cfc5b5] sm:grid-cols-3">{[["제품 규격", "제품별 중량·포장·용도 안내"], ["보관·조리", "해동·조리 설비에 맞춘 안내"], ["구매·납품", "수량·지역·일정 상담"]].map(([title, text], index) => <div key={title} className="border-b border-[#cfc5b5] py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"><span className="text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">0{index + 1}</span><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#70685d]">{text}</p></div>)}</div></div></div></FadeInSection>
      <ProductDetailDialog product={selectedProduct} onClose={closeProduct} onInquiry={() => setInquiryOpen(true)} recommendations={products.filter((product) => product.id !== selectedProduct?.id)} onSelectProduct={selectProduct} />
      <LazyInquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </SubPageLayout>
  );
}
