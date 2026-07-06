import { test, expect } from "@playwright/test";
import { seedSearchNotes } from "./fixtures/seed";
import { searchNotes } from "./helpers/search";

test.describe("US-014 — Búsqueda sin resultados", () => {
  test.beforeEach(() => {
    seedSearchNotes();
  });

  test("Mensaje claro sin coincidencias", async ({ page }) => {
    await page.goto("/");

    await searchNotes(page, "xyzabc");

    await expect(page.getByText("Sin resultados para xyzabc")).toBeVisible();
    await expect(page.getByRole("alert")).not.toBeVisible();
  });

  test("Campo de búsqueda permanece editable", async ({ page }) => {
    await page.goto("/");

    const searchBox = page.getByRole("searchbox", { name: "Buscar notas" });

    await searchNotes(page, "xyzabc");
    await expect(page.getByText("Sin resultados para xyzabc")).toBeVisible();

    await expect(searchBox).toBeVisible();
    await searchBox.fill("recetas");
    await expect(searchBox).toHaveValue("recetas");
  });
});
