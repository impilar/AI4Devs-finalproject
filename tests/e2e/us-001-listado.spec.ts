import { test, expect } from "@playwright/test";
import {
  clearAllNotes,
  E2E_NOTA_DATES,
  E2E_NOTA_TITLES,
  seedThreeNotes,
} from "./fixtures/seed";

test.describe("US-001 — Listado de notas", () => {
  test.beforeEach(() => {
    seedThreeNotes();
  });

  test("Usuario con notas existentes ve el listado al abrir la app", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Cargando notas…")).not.toBeVisible();

    const list = page.getByRole("list", { name: "Listado de notas" });
    await expect(list).toBeVisible();

    const items = list.getByRole("listitem");
    await expect(items).toHaveCount(3);

    for (const title of E2E_NOTA_TITLES) {
      await expect(page.getByText(title)).toBeVisible();
    }

    for (const dateText of E2E_NOTA_DATES) {
      await expect(page.getByText(dateText)).toBeVisible();
    }
  });

  test("El listado es la pantalla principal al iniciar", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Organizador de Conocimiento" })).toBeVisible();
    await expect(page.getByRole("list", { name: "Listado de notas" })).toBeVisible();
    await expect(page.getByText("Cargando notas…")).not.toBeVisible();
  });
});

test.describe("US-001 — Listado vacío", () => {
  test.beforeEach(() => {
    clearAllNotes();
  });

  test("BD vacía muestra mensaje sin error de servidor", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("No hay notas todavía.")).toBeVisible();
    await expect(page.getByRole("alert")).not.toBeVisible();
  });
});
