import { test, expect } from "@playwright/test";

test.describe("Fund Details Page", () => {
  const category = "growth";
  const strategy = "cautious";
  const path = `/funds/${category}/${strategy}`;

  test("loads fund data for a valid fund url", async ({ page }) => {
    await page.goto(path);

    await expect(
      page.locator('h1:has-text("VT AJ Bell Cautious I Acc")')
    ).toBeVisible();

    await expect(
      page.getByText(`Category: ${category} | Strategy: ${strategy}`, {
        exact: false,
      })
    ).toBeVisible();

    await expect(page.getByRole("heading", { name: "Ratings" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Fund Objective" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Documents" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Asset Allocation" })
    ).toBeVisible();
  });

  test("shows error for invalid route", async ({ page }) => {
    await page.goto("/funds/growth/invalid-strategy");
    await expect(page.getByText("404 - Page Not Found")).toBeVisible();
  });
});
