import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { FloatingInquiryButton } from "./FloatingInquiryButton";

describe("FloatingInquiryButton", () => {
  it("대표 번호를 즉시 전화 연결 링크로 상담 요청 버튼 위에 제공한다", () => {
    const markup = renderToStaticMarkup(createElement(FloatingInquiryButton, { onOpen: () => undefined }));

    expect(markup).toContain('href="tel:0325671062"');
    expect(markup).toContain("032-567-1062");
    expect(markup).toContain("고객센터 및 B2B 상담 열기");
  });
});
