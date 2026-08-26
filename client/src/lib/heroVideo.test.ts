import { describe, expect, it } from "vitest";
import { shouldShowHeroVideo } from "./heroVideo";

describe("히어로 영상 재생 조건", () => {
  it("일반 환경에서는 제조 영상을 표시한다", () => {
    expect(shouldShowHeroVideo(false, false)).toBe(true);
  });

  it("모션 감소 설정에서는 대체 이미지를 표시한다", () => {
    expect(shouldShowHeroVideo(true, false)).toBe(false);
  });

  it("데이터 절약 설정에서는 대체 이미지를 표시한다", () => {
    expect(shouldShowHeroVideo(false, true)).toBe(false);
  });
});
