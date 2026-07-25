import { expect, test } from "@playwright/test";

test.describe("portfolio route", () => {
  test("loads the portfolio and exposes primary sections", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Muhammad Zarrar/i);
    await expect(page.getByRole("navigation").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Muhammad/i }).first()).toBeVisible();
    await expect(page.locator("#work")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("has a real email contact fallback", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const mailto = page.locator('a[href^="mailto:"]').first();
    await expect(mailto).toBeVisible();
    await expect(mailto).toHaveAttribute("href", /mailto:muhummadzarrar09@gmail\.com/i);
  });
});

test.describe("business route", () => {
  test("loads business page sections and CTAs", async ({ page }) => {
    await page.goto("/business");

    await expect(page.getByText("Zarrar.Solutions").first()).toBeVisible();
    await expect(page.locator("#services")).toBeAttached();
    await expect(page.locator("#pricing")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();

    const whatsapp = page.locator('a[href^="https://wa.me/"]').first();
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveAttribute("href", /https:\/\/wa\.me\/923335666050/);
  });

  test("business form exposes required fields", async ({ page }) => {
    await page.goto("/business");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    await expect(page.getByPlaceholder("e.g. Ahmed")).toBeVisible();
    await expect(page.getByPlaceholder("e.g. Al-Madina Garments")).toBeVisible();
    await expect(page.getByPlaceholder("03xx-xxxxxxx")).toBeVisible();
    await expect(page.getByPlaceholder(/business and goals/i)).toBeVisible();
    await expect(page.getByRole("combobox").filter({ hasText: "Clothing store" }).or(page.getByDisplayValue("Clothing store"))).toBeVisible();
    await expect(page.getByRole("combobox").filter({ hasText: "Website" }).or(page.getByDisplayValue("Website"))).toBeVisible();
    await expect(page.getByRole("button", { name: /Send on WhatsApp/i })).toBeVisible();
  });
});

test.describe("client-side routing", () => {
  test("navigates between portfolio and business pages", async ({ page }) => {
    await page.goto("/business");
    await page.getByRole("button", { name: /Portfolio/i }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: /Muhammad/i }).first()).toBeVisible();
  });
});

test.describe("reduced motion", () => {
  test("renders essential content with reduced motion enabled", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Muhammad/i }).first()).toBeVisible();
    await expect(page.locator("#work")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });
});
