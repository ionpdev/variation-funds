import { test, expect } from "@playwright/test";

test.describe("Tab Example Fund Explorer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays default category and strategy on load", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Explore Funds" })
    ).toBeVisible();
    const tabTrigger = page.getByRole("tab", { name: /cautious/i });
    await expect(tabTrigger).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ratings/i })).toBeVisible({
      timeout: 5000,
    });
  });

  test("switches strategies via tabs and loads data", async ({ page }) => {
    const balancedTab = page.getByRole("tab", { name: /balanced/i });
    await balancedTab.click();
    await expect(
      page.getByRole("heading", { name: /Fund Objective/ })
    ).toBeVisible();
  });

  test("preserves tab selection in localStorage", async ({ page }) => {
    await page.getByRole("tab", { name: /balanced/i }).click();
    await page.reload();
    await expect(page.getByRole("tab", { name: /balanced/i })).toHaveAttribute(
      "data-state",
      "active"
    );
  });
});
