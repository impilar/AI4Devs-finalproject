import { test, expect } from "@playwright/test";
import { seedCatalogNotes } from "./fixtures/seed";
import { expectNoteInList } from "./helpers/notes";

test.describe("US-011 — Catálogo de etiquetas", () => {
  test.beforeEach(() => {
    seedCatalogNotes();
  });

  test("Ver todas las etiquetas con número de notas", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("button", { name: "ideas (5)" })).toBeVisible();
    await expect(page.getByRole("button", { name: "archivo (0)" })).toBeVisible();
  });

  test("Navegar al filtro desde el catálogo", async ({ page }) => {
    await page.goto("/");

    const noteList = page.getByRole("list", { name: "Listado de notas" });
    await expect(noteList.getByRole("listitem")).toHaveCount(5);

    await page.getByRole("button", { name: "ideas (5)" }).click();

    await expect(noteList.getByRole("listitem")).toHaveCount(5);
    await expectNoteInList(page, "Idea 1");
    await expect(page.getByRole("heading", { level: 2, name: "Notas · ideas" })).toBeVisible();
  });
});
