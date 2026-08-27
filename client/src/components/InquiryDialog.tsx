/**
 * Design: 정밀한 식탁 — 상담 입력은 제조 기록처럼 명확하게 검증하고, 완료 상태는 접수 레코드로 품격 있게 안내한다.
 */
import { useEffect, useState } from "react";
import { Check, CheckCircle2, Loader2, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { InquiryProvider } from "./InquiryProvider";

type InquiryDialogProps = { open: boolean; onClose: () => void; defaultInquiryType?: InquiryType };
type FormValues = { name: string; phone: string; email: string; product: string; message: string; consent: boolean; website: string };
type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

export const inquiryTypes = ["제품 납품", "맞춤 제품 개발", "OEM / ODM", "기타 제휴"] as const;
export type InquiryType = (typeof inquiryTypes)[number];
const initialValues: FormValues = { name: "", phone: "", email: "", product: "", message: "", consent: false, website: "" };

export function InquiryDialog(props: InquiryDialogProps) {
  return <InquiryProvider><InquiryDialogContent {...props} /></InquiryProvider>;
}

function InquiryDialogContent({ open, onClose, defaultInquiryType }: InquiryDialogProps) {
  const [type, setType] = useState<(typeof inquiryTypes)[number]>(inquiryTypes[0]);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [receiptCode, setReceiptCode] = useState("");
  const [sendError, setSendError] = useState("");
  const sendInquiry = trpc.inquiry.submit.useMutation();

  useEffect(() => {
    if (open && defaultInquiryType) setType(defaultInquiryType);
  }, [defaultInquiryType, open]);

  if (!open) return null;

  const validate = (data: FormValues): FormErrors => {
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = "회사명 또는 성함을 입력해 주세요.";
    const phoneDigits = data.phone.replace(/[^0-9]/g, "");
    if (!phoneDigits) next.phone = "연락처를 입력해 주세요.";
    else if (phoneDigits.length < 9 || phoneDigits.length > 11) next.phone = "연락처 형식을 확인해 주세요.";
    if (!data.email.trim()) next.email = "이메일을 입력해 주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "이메일 형식을 확인해 주세요.";
    if (data.message.trim().length < 10) next.message = "문의 내용을 10자 이상 입력해 주세요.";
    if (!data.consent) next.consent = "개인정보 수집·이용 동의가 필요합니다.";
    return next;
  };

  const updateValue = <K extends FieldName>(key: K, value: FormValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key]) setErrors(validate(next));
  };

  const handleBlur = (key: FieldName) => setErrors(validate(values));

  const closeDialog = () => {
    setSubmitted(false);
    setErrors({});
    setSendError("");
    onClose();
  };

  const submitInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    setSendError("");
    const stamp = new Date();
    const nextReceiptCode = `BF-${String(stamp.getFullYear()).slice(-2)}${String(stamp.getMonth() + 1).padStart(2, "0")}-${String(stamp.getTime()).slice(-4)}`;
    try {
      await sendInquiry.mutateAsync({
        requestId: crypto.randomUUID(),
        inquiryType: type,
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        product: values.product.trim(),
        message: values.message.trim(),
        consentAt: stamp.toISOString(),
        pageUrl: window.location.href,
        website: values.website,
      });
      setReceiptCode(nextReceiptCode);
      setSubmitted(true);
    } catch {
      setSendError("전송에 실패했습니다. 잠시 후 다시 시도하거나 infobarun@st-group1.com으로 문의해 주세요.");
    }
  };

  const inputClass = (field: FieldName) => `inquiry-input ${errors[field] ? "border-[#9e3328]" : ""}`;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-[#20201d]/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-[#f7f3eb] shadow-[0_28px_80px_rgba(20,18,14,0.32)]">
        <button onClick={closeDialog} type="button" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/80 text-[#242321] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e3328]" aria-label="상담 창 닫기"><X className="h-4 w-4" /></button>
        {submitted ? (
          <div className="relative overflow-hidden px-7 py-16 sm:px-14 sm:py-20"><div className="absolute right-[-60px] top-[-60px] h-52 w-52 rounded-full border-[22px] border-[#9e3328]/10" /><div className="relative"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#9e3328] text-white shadow-[0_8px_22px_rgba(158,51,40,0.28)]"><Check className="h-7 w-7" /></span><p className="mt-9 text-[10px] font-bold tracking-[0.22em] text-[#9e3328]">CONSULTATION REQUEST RECORDED</p><h2 id="inquiry-title" className="mt-3 font-serif text-4xl font-semibold tracking-[-0.06em] text-[#242321]">문의가 접수되었습니다.</h2><p className="mt-5 max-w-md text-[15px] leading-7 text-[#655f56]">남겨주신 내용을 바탕으로 담당자가 상담 범위를 정리해 안내드리겠습니다. 제품과 생산 조건에 따라 추가 확인 절차가 달라질 수 있습니다.</p><div className="mt-9 grid max-w-md grid-cols-[110px_1fr] border-y border-[#d9d0c2] py-5 text-sm"><span className="text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">RECEIPT NO.</span><span className="font-bold text-[#242321]">{receiptCode}</span><span className="mt-4 text-[10px] font-bold tracking-[0.16em] text-[#9e3328]">REQUEST TYPE</span><span className="mt-3 font-bold text-[#242321]">{type}</span></div><div className="mt-7 flex items-center gap-3 text-xs leading-5 text-[#736b60]"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#9e3328]" />실제 운영 시에는 담당자 라우팅과 개인정보 처리 절차를 연결합니다.</div><button onClick={closeDialog} type="button" className="mt-10 bg-[#242321] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9e3328]">페이지로 돌아가기</button></div></div>
        ) : (
          <form onSubmit={submitInquiry} noValidate className="p-7 sm:p-10"><p className="text-xs font-bold tracking-[0.2em] text-[#9e3328]">PARTNERSHIP DESK</p><h2 id="inquiry-title" className="mt-3 pr-8 font-serif text-3xl font-semibold tracking-[-0.055em] text-[#242321] sm:text-4xl">필요한 제품 정보를<br />먼저 정리합니다.</h2><p className="mt-4 text-sm leading-6 text-[#655f56]">문의 유형을 선택하고, 납품·개발 상담에 필요한 기본 정보를 남겨주세요.</p>{Object.keys(errors).length > 0 && <div role="alert" className="mt-6 flex items-center gap-3 border-l-2 border-[#9e3328] bg-[#f0e2dc] px-4 py-3 text-sm text-[#6f2c24]"><X className="h-4 w-4 shrink-0" />입력 내용을 다시 확인해 주세요.</div>}{sendError && <div role="alert" className="mt-4 border-l-2 border-[#9e3328] bg-[#f0e2dc] px-4 py-3 text-sm leading-6 text-[#6f2c24]">{sendError}</div>}
            <fieldset className="mt-8"><legend className="text-xs font-bold tracking-[0.16em] text-[#4e4942]">문의 유형</legend><div className="mt-3 grid grid-cols-2 gap-2">{inquiryTypes.map((item) => <button key={item} onClick={() => setType(item)} type="button" aria-pressed={type === item} className={`border px-3 py-3 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e3328] ${type === item ? "border-[#9e3328] bg-[#9e3328] text-white" : "border-[#d8d1c5] bg-white text-[#4e4942] hover:border-[#9e3328]"}`}>{item}</button>)}</div></fieldset>
            <div className="mt-7 grid gap-x-5 gap-y-6 sm:grid-cols-2"><div className="min-w-0"><label className="block text-xs font-bold tracking-[0.12em] text-[#4e4942]">회사명 또는 성함<span className="ml-1 text-[#9e3328]">*</span><input value={values.name} onChange={(e) => updateValue("name", e.target.value)} onBlur={() => handleBlur("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={inputClass("name")} placeholder="바른푸드" /></label><Error id="name-error" message={errors.name} /></div><div className="min-w-0"><label className="block text-xs font-bold tracking-[0.12em] text-[#4e4942]">연락처<span className="ml-1 text-[#9e3328]">*</span><input value={values.phone} onChange={(e) => updateValue("phone", e.target.value)} onBlur={() => handleBlur("phone")} inputMode="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className={inputClass("phone")} placeholder="010-0000-0000" /></label><Error id="phone-error" message={errors.phone} /></div><div className="min-w-0"><label className="block text-xs font-bold tracking-[0.12em] text-[#4e4942]">이메일<span className="ml-1 text-[#9e3328]">*</span><input value={values.email} onChange={(e) => updateValue("email", e.target.value)} onBlur={() => handleBlur("email")} type="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass("email")} placeholder="name@company.com" /></label><Error id="email-error" message={errors.email} /></div><div className="min-w-0"><label className="block text-xs font-bold tracking-[0.12em] text-[#4e4942]">관심 제품군<input value={values.product} onChange={(e) => updateValue("product", e.target.value)} className={inputClass("product")} placeholder="도우, 피자 등" /></label></div></div>
            <div className="mt-5"><label className="block text-xs font-bold tracking-[0.12em] text-[#4e4942]">문의 내용<span className="ml-1 text-[#9e3328]">*</span><textarea value={values.message} onChange={(e) => updateValue("message", e.target.value)} onBlur={() => handleBlur("message")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={`${inputClass("message")} min-h-28 resize-none`} placeholder="제품, 수량, 납품 지역, 일정 등을 10자 이상 남겨주세요." /></label><Error id="message-error" message={errors.message} /></div>
            <div className="mt-5"><label className="flex items-start gap-2 text-xs leading-5 text-[#655f56]"><input checked={values.consent} onChange={(e) => updateValue("consent", e.target.checked)} onBlur={() => handleBlur("consent")} type="checkbox" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} className="mt-0.5 accent-[#9e3328]" /><span>문의 응대를 위한 개인정보 수집·이용에 동의합니다.<span className="ml-1 text-[#9e3328]">*</span></span></label><Error id="consent-error" message={errors.consent} /></div>
            <label className="sr-only" aria-hidden="true">웹사이트<input value={values.website} onChange={(e) => updateValue("website", e.target.value)} tabIndex={-1} autoComplete="off" /></label>
            <button type="submit" disabled={sendInquiry.isPending} className="mt-8 flex w-full items-center justify-center gap-2 bg-[#9e3328] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#7e2119] active:scale-[0.98] disabled:cursor-wait disabled:bg-[#8b8174]">{sendInquiry.isPending ? <><Loader2 className="h-4 w-4 animate-spin" />전송 중입니다</> : "상담 요청 보내기"}</button><p className="mt-4 text-center text-[11px] text-[#8b8174]">* 표시는 필수 입력 항목입니다.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function Error({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="mt-1.5 text-[11px] leading-4 text-[#9e3328]" role="alert">{message}</p>;
}
