import { beforeEach, describe, expect, it, vi } from "vitest";

const { resendSend } = vi.hoisted(() => ({
  resendSend: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: vi.fn(() => ({ emails: { send: resendSend } })),
}));

import { buildInquiryEmail, inquiryInputSchema, sendInquiryEmail } from "./inquiry";

const safeInput = {
  requestId: "9a587071-08fa-4704-8971-cbd7cbaa1a3c",
  inquiryType: "제품 납품" as const,
  name: "테스트 주식회사",
  phone: "010-1234-5678",
  email: "contact@example.com",
  product: "도우",
  message: "제품 사양과 최소 주문 조건을 검토하고 싶습니다.",
  consentAt: "2026-08-26T01:00:00.000Z",
  pageUrl: "https://www.example.com/products",
  website: "",
};

describe("상담 이메일 콘텐츠", () => {
  beforeEach(() => {
    resendSend.mockReset();
  });

  it("필수 입력을 검증하고 담당자용 이메일 본문을 생성한다", () => {
    const input = inquiryInputSchema.parse(safeInput);
    const email = buildInquiryEmail(input);

    expect(email.subject).toContain("제품 납품");
    expect(email.text).toContain("제품 사양과 최소 주문 조건");
    expect(email.html).toContain("PARTNERSHIP DESK");
  });

  it("HTML에 포함되는 사용자 입력을 이스케이프한다", () => {
    const input = inquiryInputSchema.parse({ ...safeInput, name: "<img src=x onerror=alert(1)>" });
    const email = buildInquiryEmail(input);

    expect(email.html).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(email.html).not.toContain("<img src=x onerror=alert(1)>");
  });

  it("성공 시 지정된 담당자 수신처와 문의자 회신 주소로 발송한다", async () => {
    resendSend.mockResolvedValue({ data: { id: "email_123" }, error: null });

    const result = await sendInquiryEmail(inquiryInputSchema.parse(safeInput));

    expect(result).toEqual({ deliveryId: "email_123" });
    expect(resendSend).toHaveBeenCalledWith(expect.objectContaining({
      to: ["infobarun@st-group1.com"],
      replyTo: "contact@example.com",
      subject: expect.stringContaining("제품 납품"),
    }));
  });

  it("발송 서비스 오류가 발생하면 접수 성공을 반환하지 않는다", async () => {
    resendSend.mockResolvedValue({ data: null, error: { message: "Service unavailable" } });

    await expect(sendInquiryEmail(inquiryInputSchema.parse(safeInput))).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
    });
  });
});
