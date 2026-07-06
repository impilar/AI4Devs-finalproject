import { test, expect } from "@playwright/test";
import {
  E2E_SEARCH_ORDER_DATE_FIRST,
  E2E_SEARCH_ORDER_DATE_SECOND,
  E2E_SEARCH_ORDER_RELEVANCE_FIRST,
  E2E_SEARCH_ORDER_RELEVANCE_SECOND,
  seedSearchOrderNotes,
} from "./fixtures/search-order-seed";
import { expectNoteLinkVisible, searchNotes } from "./helpers/search";

test.describe("US-013 — Ordenación de resultados de búsqueda", () => {
  test.beforeEach(() => {
    seedSearchOrderNotes();
  });

  test("Ordenar por relevancia", async ({ page }) => {
    await page.goto("/");

    await searchNotes(page, "proyecto");

    const noteList = page.getByRole("list", { name: "Listado de notas" });
    await expect(noteList.getByRole("listitem")).toHaveCount(2);

    const titles = await noteList.getByRole("link").allTextContents();
    expect(titles[0]).toContain(E2E_SEARCH_ORDER_RELEVANCE_FIRST);
    expect(titles[1]).toContain(E2E_SEARCH_ORDER_RELEVANCE_SECOND);
  });

  test("Ordenar por fecha", async ({ page }) => {
    await page.goto("/");

    await searchNotes(page, "nota");

    const orderSelect = page.getByRole("combobox", { name: "Ordenar resultados" });
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/buscar?q=nota") &&
        response.url().includes("order=date") &&
        response.status() === 200,
    );
    await orderSelect.selectOption("date");
    await responsePromise;

    const noteList = page.getByRole("list", { name: "Listado de notas" });
    await expect(noteList.getByRole("listitem")).toHaveCount(2);

    const titles = await noteList.getByRole("link").allTextContents();
    expect(titles[0]).toContain(E2E_SEARCH_ORDER_DATE_FIRST);
    expect(titles[1]).toContain(E2E_SEARCH_ORDER_DATE_SECOND);
  });

  test("Cambiar orden conserva el término de búsqueda", async ({ page }) => {
    await page.goto("/");

    const searchBox = page.getByRole("searchbox", { name: "Buscar notas" });
    await searchNotes(page, "proyecto");

    const orderSelect = page.getByRole("combobox", { name: "Ordenar resultados" });
    await expect(orderSelect).toBeVisible();

    const dateResponse = page.waitForResponse(
      (response) => response.url().includes("order=date") && response.status() === 200,
    );
    await orderSelect.selectOption("date");
    await dateResponse;

    const relevanceResponse = page.waitForResponse(
      (response) => response.url().includes("order=relevance") && response.status() === 200,
    );
    await orderSelect.selectOption("relevance");
    await relevanceResponse;

    await expect(searchBox).toHaveValue("proyecto");
    await expectNoteLinkVisible(page, E2E_SEARCH_ORDER_RELEVANCE_FIRST);
  });
});
