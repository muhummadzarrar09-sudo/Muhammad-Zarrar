import { expect, test } from "@playwright/test";

test.describe("portfolio — personal single route", () => {
  test("loads personal portfolio and exposes primary sections", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Muhammad Zarrar/i);
    await expect(page.getByRole("navigation").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /I turn complex work/i }).first()).toBeVisible();
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#work")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("has real email CTA and copy", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const mailto = page.locator('a[href^="mailto:muhummadzarrar09@gmail.com"]').first();
    await expect(mailto).toBeVisible();
    await expect(page.getByText(/Open to 1–2 projects|Available for select/i).first()).toBeVisible();
  });

  test("work section shows featured projects", async ({ page }) => {
    await page.goto("/");
    await page.locator("#work").scrollIntoViewIfNeeded();
    await expect(page.getByText("LOCK-IN").first()).toBeVisible();
    await expect(page.getByText(/Selected work|featured builds/i).first()).toBeVisible();
  });

  test("contact form opens from the envelope", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    // The form lives inside a closed envelope now — click to open it first
    await page.getByRole("button", { name: /open the envelope/i }).click();

    await expect(page.getByLabel(/YOUR NAME/i)).toBeVisible();
    await expect(page.getByLabel(/EMAIL/i)).toBeVisible();
    await expect(page.getByLabel(/TELL ME ABOUT IT/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Open email draft/i })).toBeVisible();
  });
});

test.describe("nav", () => {
  test("navigates via nav links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").getByRole("button", { name: "Work" }).click();
    await expect(page.locator("#work")).toBeInViewport();

    await page.getByRole("navigation").getByRole("button", { name: "About" }).click();
    await expect(page.locator("#about")).toBeInViewport();
  });
});

test.describe("reduced motion", () => {
  test("renders essential content with reduced motion enabled", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /I turn complex work/i }).first()).toBeVisible();
    await expect(page.locator("#work")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });
});
