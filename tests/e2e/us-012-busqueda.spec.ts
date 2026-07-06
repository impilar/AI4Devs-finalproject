import { test, expect } from "@playwright/test";
import {
  E2E_SEARCH_CONTENT_MATCH_TITLE,
  E2E_SEARCH_TITLE_MATCH_TITLE,
  seedSearchNotes,
} from "./fixtures/seed";
import { expectNoteLinkVisible, searchNotes } from "./helpers/search";

test.describe("US-012 — Búsqueda de notas", () => {
  test.beforeEach(() => {
    seedSearchNotes();
  });

  test("Buscar en título y contenido", async ({ page }) => {
    await page.goto("/");

    await searchNotes(page, "compra");

    await expectNoteLinkVisible(page, E2E_SEARCH_CONTENT_MATCH_TITLE);
    await expect(page.getByRole("link").filter({ hasText: "Referencias varias" })).toHaveCount(0);
  });

  test("Encuentra coincidencia en el título", async ({ page }) => {
    await page.goto("/");

    await searchNotes(page, "recetas");

    await expectNoteLinkVisible(page, E2E_SEARCH_TITLE_MATCH_TITLE);
    await expect(page.getByRole("list", { name: "Listado de notas" }).getByRole("listitem")).toHaveCount(
      1,
    );
  });

  test("Borrar búsqueda restaura el listado completo", async ({ page }) => {
    await page.goto("/");

    const searchBox = page.getByRole("searchbox", { name: "Buscar notas" });
    const noteList = page.getByRole("list", { name: "Listado de notas" });

    await expect(noteList.getByRole("listitem")).toHaveCount(3);

    await searchNotes(page, "compra");
    await expect(noteList.getByRole("listitem")).toHaveCount(1);

    await searchBox.fill("");
    await expect(noteList.getByRole("listitem")).toHaveCount(3);
  });

  test("Término sin coincidencias muestra mensaje vacío sin error", async ({ page }) => {
    await page.goto("/");

    await searchNotes(page, "xyznonexistent");

    await expect(page.getByText("Sin resultados para xyznonexistent")).toBeVisible();
    await expect(page.getByRole("alert")).not.toBeVisible();
  });
});
