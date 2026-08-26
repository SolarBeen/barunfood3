import { describe, expect, it } from "vitest";

describe("Resend environment configuration", () => {
  it("authenticates with the configured API key and has a usable sender address", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    expect(apiKey).toMatch(/^re_/);
    expect(fromEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    const response = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    expect(response.ok).toBe(true);

    const payload = await response.json() as {
      data?: Array<{ name?: string; status?: string; capabilities?: { sending?: string } }>;
    };
    const senderDomain = fromEmail!.split("@")[1];
    const senderDomainRecord = payload.data?.find(domain => domain.name === senderDomain);

    expect(senderDomainRecord?.status).toBe("verified");
    expect(senderDomainRecord?.capabilities?.sending).toBe("enabled");
  }, 15_000);
});
