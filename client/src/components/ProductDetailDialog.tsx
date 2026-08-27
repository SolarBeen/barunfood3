/**
 * Design: 정밀한 식탁 — 제품 정보는 판매 문구가 아닌 검토 가능한 제품 파일로 제시하며, 영양·규격은 아코디언 안에서 차분히 열람하게 한다.
 */
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, FileText, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type ProductDetail = {
  id: string;
  name: string;
  category: "피자" | "도우" | "기타";
  file: string;
  description: string;
  tags: string[];
  image: string;
  serving: string;
  nutrition: Array<[string, string]>;
  specifications: Array<[string, string]>;
  storage: string;
  preparation: string;
};

type ProductDetailDialogProps = {
  product: ProductDetail | null;
  onClose: () => void;
  onInquiry: () => void;
  recommendations: ProductDetail[];
  onSelectProduct: (product: ProductDetail) => void;
};

export function ProductDetailDialog({ product, onClose, onInquiry, recommendations, onSelectProduct }: ProductDetailDialogProps) {
  const recommendationRail = useRef<HTMLDivElement>(null);
  useEffect(() => recommendationRail.current?.scrollTo({ left: 0 }), [product?.id]);
  const shiftRecommendations = (direction: -1 | 1) => recommendationRail.current?.scrollBy({ left: recommendationRail.current.clientWidth * 0.8 * direction, behavior: "smooth" });
  const openInquiry = () => {
    onClose();
    onInquiry();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="max-h-[92vh] max-w-[calc(100%-1.5rem)] gap-0 overflow-y-auto border-0 bg-[#f7f3eb] p-0 shadow-[0_26px_80px_rgba(23,20,16,0.4)] sm:max-w-5xl">
        {product && <>
          <DialogClose className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-[#f7f3eb]/90 text-[#242321] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e3328]" aria-label="제품 상세 닫기"><X className="h-4 w-4" /></DialogClose>
          <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
            <div className="relative min-h-[290px] overflow-hidden bg-[#242321] lg:min-h-[620px]"><img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><p className="text-[10px] font-bold tracking-[0.18em] text-[#f4bd75]">{product.file}</p><p className="mt-3 text-xs leading-5 text-white/75">제품에 표시되는 세부 영양·규격 정보는 최신 포장 라벨과 제품 규격서를 기준으로 운영합니다.</p></div></div>
            <div className="p-6 sm:p-9 lg:p-11"><DialogHeader className="text-left"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#9e3328] text-[10px] font-bold text-white">{product.id.slice(-2).toUpperCase()}</span><span className="text-[10px] font-bold tracking-[0.17em] text-[#9e3328]">PRODUCT DETAIL FILE</span></div><DialogTitle className="mt-7 font-serif text-4xl font-semibold leading-[1.03] tracking-[-0.075em] text-[#242321] sm:text-5xl">{product.name}</DialogTitle><DialogDescription className="mt-4 max-w-xl text-[15px] leading-7 text-[#6d665c]">{product.description}</DialogDescription></DialogHeader>
              <div className="mt-7 flex flex-wrap gap-1.5">{product.tags.map((tag) => <span key={tag} className="border border-[#d3c9b9] bg-[#eee6d9] px-2 py-1 text-[10px] font-semibold text-[#675f55]">#{tag}</span>)}</div>
              <div className="mt-8 border-y border-[#d4cabb] py-4"><div className="grid gap-3 text-xs sm:grid-cols-[130px_1fr]"><span className="font-bold tracking-[0.15em] text-[#9e3328]">SERVING NOTE</span><span className="leading-5 text-[#514b43]">{product.serving}</span></div></div>
              <Accordion type="single" collapsible defaultValue="nutrition" className="mt-2">
                <AccordionItem value="nutrition" className="border-[#d4cabb]"><AccordionTrigger className="py-5 text-[15px] font-bold tracking-[-0.02em] text-[#242321] hover:no-underline"><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#9e3328]" />영양 성분</span></AccordionTrigger><AccordionContent className="pb-5"><div className="grid overflow-hidden border border-[#d9d0c2] sm:grid-cols-2">{product.nutrition.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 border-b border-[#d9d0c2] px-4 py-3 text-xs odd:sm:border-r even:sm:border-r-0 [&:nth-last-child(-n+2)]:sm:border-b-0 last:border-b-0"><span className="font-semibold text-[#5b544a]">{label}</span><span className="text-right text-[#81786c]">{value}</span></div>)}</div><p className="mt-3 text-[11px] leading-5 text-[#857c70]">정확한 영양성분 수치와 알레르기 유발 물질은 실제 출고 제품의 포장 라벨 및 최신 규격서를 확인해 주세요.</p></AccordionContent></AccordionItem>
                <AccordionItem value="specification" className="border-[#d4cabb]"><AccordionTrigger className="py-5 text-[15px] font-bold tracking-[-0.02em] text-[#242321] hover:no-underline"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#9e3328]" />상세 스펙</span></AccordionTrigger><AccordionContent className="pb-5"><div className="divide-y divide-[#d9d0c2] border-y border-[#d9d0c2]">{product.specifications.map(([label, value]) => <div key={label} className="grid gap-2 py-3 text-xs sm:grid-cols-[130px_1fr]"><span className="font-bold tracking-[0.12em] text-[#9e3328]">{label}</span><span className="leading-5 text-[#5c554c]">{value}</span></div>)}</div></AccordionContent></AccordionItem>
                <AccordionItem value="handling" className="border-[#d4cabb]"><AccordionTrigger className="py-5 text-[15px] font-bold tracking-[-0.02em] text-[#242321] hover:no-underline"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#9e3328]" />보관·조리 안내</span></AccordionTrigger><AccordionContent className="pb-5"><div className="grid gap-5 text-xs leading-6 sm:grid-cols-2"><div><p className="font-bold tracking-[0.12em] text-[#9e3328]">STORAGE</p><p className="mt-2 text-[#5c554c]">{product.storage}</p></div><div><p className="font-bold tracking-[0.12em] text-[#9e3328]">PREPARATION</p><p className="mt-2 text-[#5c554c]">{product.preparation}</p></div></div></AccordionContent></AccordionItem>
              </Accordion>
              <div className="mt-8 flex flex-col gap-3 border-t border-[#d4cabb] pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-[11px] leading-5 text-[#80776b]">구매 조건, 제품 규격서, 납품 가능 여부는 상담 시 안내합니다.</p><button type="button" onClick={openInquiry} className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#9e3328] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7e2119] active:scale-[0.98]">납품 상담 요청 <ArrowUpRight className="h-4 w-4" /></button></div>
              {recommendations.length > 0 && <section className="mt-10 border-t border-[#d4cabb] pt-7" aria-labelledby="related-products-title"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">RELATED PRODUCT FILES</p><h3 id="related-products-title" className="mt-2 text-lg font-bold tracking-[-0.04em] text-[#242321]">함께 살펴보면 좋은 제품</h3></div><div className="flex gap-2"><button type="button" onClick={() => shiftRecommendations(-1)} aria-label="이전 추천 제품" className="grid h-8 w-8 place-items-center border border-[#cfc5b5] text-[#4b463e] transition hover:border-[#9e3328] hover:bg-[#9e3328] hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /></button><button type="button" onClick={() => shiftRecommendations(1)} aria-label="다음 추천 제품" className="grid h-8 w-8 place-items-center border border-[#cfc5b5] text-[#4b463e] transition hover:border-[#9e3328] hover:bg-[#9e3328] hover:text-white"><ArrowRight className="h-3.5 w-3.5" /></button></div></div><div ref={recommendationRail} className="mt-5 flex snap-x gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{recommendations.map((related, index) => <button type="button" key={related.id} onClick={() => onSelectProduct(related)} className="group min-w-[78%] snap-start overflow-hidden border border-[#d4cabb] bg-[#eee6d9] text-left sm:min-w-[calc(50%-0.4rem)]"><div className="relative h-28 overflow-hidden"><img src={related.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" /><span className="absolute left-3 top-3 bg-[#9e3328] px-2 py-1 text-[9px] font-bold text-white">0{index + 1}</span><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 pb-3 pt-8 text-[9px] font-bold tracking-[0.12em] text-white">{related.file}</span></div><div className="p-4"><p className="text-sm font-bold tracking-[-0.04em] text-[#242321]">{related.name}</p><p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#71695d]">{related.description}</p><span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#9e3328]">제품 파일 열기 <ArrowUpRight className="h-3 w-3" /></span></div></button>)}</div></section>}
            </div>
          </div>
        </>}
      </DialogContent>
    </Dialog>
  );
}
