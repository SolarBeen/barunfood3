import { describe, expect, it } from "vitest";
import { barunfoodLocation } from "./location";

describe("barunfoodLocation", () => {
  it("독립 오시는 길 경로와 즉시 연락·길찾기 주소를 제공한다", () => {
    expect(barunfoodLocation.path).toBe("/location");
    expect(barunfoodLocation.htmlPath).toBe("/location.html");
    expect(barunfoodLocation.phoneHref).toBe("tel:0325671062");
    expect(barunfoodLocation.directionsHref).toContain("google.com/maps/search/");
    expect(barunfoodLocation.address).toContain("검단로93번길 11");
  });
});
