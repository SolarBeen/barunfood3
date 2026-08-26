import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { z } from "zod";

const inquiryTypes = ["제품 납품", "맞춤 제품 개발", "OEM / ODM", "기타 제휴"] as const;

export const inquiryInputSchema = z.object({
  requestId: z.string().uuid(),
  inquiryType: z.enum(inquiryTypes),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(9).max(24),
  email: z.string().trim().email().max(320),
  product: z.string().trim().max(160),
  message: z.string().trim().min(10).max(5_000),
  consentAt: z.string().datetime(),
  pageUrl: z.string().url().max(2_000),
  website: z.string().max(0),
});

export type InquiryInput = z.infer<typeof inquiryInputSchema>;

const recipient = "infobarun@st-group1.com";

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
})[character] ?? character);

export function buildInquiryEmail(input: InquiryInput) {
  const rows = [
    ["문의 유형", input.inquiryType],
    ["회사명 또는 성함", input.name],
    ["연락처", input.phone],
    ["회신 이메일", input.email],
    ["관심 제품군", input.product || "미입력"],
    ["개인정보 동의 시각", input.consentAt],
    ["제출 페이지", input.pageUrl],
  ];

  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <th style="width:150px;padding:12px 14px;border:1px solid #ddd6cb;background:#f7f3eb;text-align:left;color:#6f675e;font-size:12px;">${escapeHtml(label)}</th>
      <td style="padding:12px 14px;border:1px solid #ddd6cb;color:#242321;font-size:14px;line-height:1.6;word-break:break-word;">${escapeHtml(value)}</td>
    </tr>`).join("");

  const text = [
    "바른푸드 웹사이트 상담 요청",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "문의 내용:",
    input.message,
  ].join("\n");

  return {
    subject: `[바른푸드 상담] ${input.inquiryType} · ${input.name}`,
    text,
    html: `<main style="max-width:680px;margin:0 auto;padding:32px 20px;font-family:Arial,sans-serif;background:#fffdf9;color:#242321;">
      <p style="margin:0 0 8px;color:#9e3328;font-size:11px;font-weight:700;letter-spacing:.14em;">BARUN FOOD / PARTNERSHIP DESK</p>
      <h1 style="margin:0 0 24px;font-size:25px;line-height:1.3;">새 상담 요청이 접수되었습니다.</h1>
      <table style="width:100%;border-collapse:collapse;border:1px solid #ddd6cb;">${htmlRows}</table>
      <section style="margin-top:24px;padding:18px 20px;background:#242321;color:#fff;">
        <p style="margin:0 0 8px;color:#f4bd75;font-size:11px;font-weight:700;letter-spacing:.12em;">INQUIRY MESSAGE</p>
        <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.7;">${escapeHtml(input.message)}</p>
      </section>
    </main>`,
  };
}

export async function sendInquiryEmail(input: InquiryInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "상담 전송 설정을 확인하고 있습니다. 잠시 후 다시 시도해 주세요." });
  }

  const content = buildInquiryEmail(input);
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [recipient],
    replyTo: input.email,
    subject: content.subject,
    html: content.html,
    text: content.text,
  });

  if (error || !data?.id) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." });
  }

  return { deliveryId: data.id };
}
