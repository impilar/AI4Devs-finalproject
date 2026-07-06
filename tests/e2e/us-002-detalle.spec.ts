import { test, expect } from "@playwright/test";
import { clickNoteInList } from "./helpers/notes";
import {
  E2E_DETAIL_LINK,
  E2E_DETAIL_NOTA_CONTENT,
  E2E_DETAIL_NOTA_ID,
  E2E_DETAIL_NOTA_TITLE,
  E2E_DETAIL_TAGS,
  E2E_MISSING_NOTA_ID,
  seedThreeNotes,
} from "./fixtures/seed";

test.describe("US-002 — Detalle de nota", () => {
  test.beforeEach(() => {
    seedThreeNotes();
  });

  test("Abrir detalle desde el listado", async ({ page }) => {
    await page.goto("/");

    await clickNoteInList(page, E2E_DETAIL_NOTA_TITLE);

    await expect(page).toHaveURL(`/notas/${E2E_DETAIL_NOTA_ID}`);
    await expect(page.getByRole("heading", { level: 1, name: E2E_DETAIL_NOTA_TITLE })).toBeVisible();
    await expect(page.getByText(E2E_DETAIL_NOTA_CONTENT)).toBeVisible();

    const externalLink = page.getByRole("link", { name: E2E_DETAIL_LINK });
    await expect(externalLink).toBeVisible();
    await expect(externalLink).toHaveAttribute("href", E2E_DETAIL_LINK);

    const tagsSection = page.getByRole("region", { name: "Etiquetas" });
    for (const tag of E2E_DETAIL_TAGS) {
      await expect(tagsSection).toContainText(tag);
      await expect(page.getByRole("button", { name: `Quitar etiqueta ${tag}` })).toBeVisible();
    }
  });

  test("Nota no encontrada muestra mensaje y permite volver al listado", async ({ page }) => {
    await page.goto(`/notas/${E2E_MISSING_NOTA_ID}`);

    await expect(page.getByText("La nota no existe o fue eliminada")).toBeVisible();

    await page.getByRole("link", { name: "Volver al listado", exact: true }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("list", { name: "Listado de notas" })).toBeVisible();
  });
});
