import { test, expect, type Page } from "@playwright/test";
import {
  E2E_SORT_NOTA_BETA_ID,
  E2E_SORT_TITLES,
  seedSortNotes,
} from "./fixtures/seed";
import { clickNoteInList } from "./helpers/notes";

async function getVisibleListTitles(page: Page): Promise<string[]> {
  const list = page.getByRole("list", { name: "Listado de notas" });
  await expect(list).toBeVisible({ timeout: 10_000 });
  const titles = list.locator(".note-list-item__title");
  return titles.allTextContents();
}

test.describe("US-004 — Ordenación del listado", () => {
  test.beforeEach(() => {
    seedSortNotes();
  });

  test("Ordenar por título alfabético", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("note-sort-select").selectOption("title_asc");

    await expect.poll(() => getVisibleListTitles(page)).toEqual([...E2E_SORT_TITLES]);
  });

  test("El orden se mantiene en la sesión actual", async ({ page }) => {
    await page.goto("/");

    await expect.poll(() => getVisibleListTitles(page)).toEqual(["Beta", "Alpha", "Zebra"]);

    await clickNoteInList(page, "Beta");
    await expect(page).toHaveURL(`/notas/${E2E_SORT_NOTA_BETA_ID}`);

    await page.getByRole("link", { name: "← Volver al listado" }).click();
    await expect(page).toHaveURL("/");

    await expect.poll(() => getVisibleListTitles(page)).toEqual(["Beta", "Alpha", "Zebra"]);
  });
});
