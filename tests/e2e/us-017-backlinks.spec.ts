import { test, expect } from "@playwright/test";
import {
  E2E_BACKLINK_IDEAS_ID,
  E2E_BACKLINK_OBJETIVOS_ID,
  seedBacklinksNotes,
} from "./fixtures/seed";

test.describe("US-017 — Backlinks entre notas", () => {
  test.beforeEach(() => {
    seedBacklinksNotes();
  });

  test("Crear referencia a otra nota desde edición", async ({ page }) => {
    await page.goto(`/notas/${E2E_BACKLINK_IDEAS_ID}`);

    await page.getByRole("button", { name: "Editar" }).click();
    await page.getByLabel("Enlazar con otra nota (opcional)").selectOption({
      label: "Investigación de mercado",
    });
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(
      page.getByRole("region", { name: "Notas enlazadas" }).getByRole("link", {
        name: "Investigación de mercado",
      }),
    ).toBeVisible();
  });

  test("Ver notas que enlazan a la actual", async ({ page }) => {
    await page.goto(`/notas/${E2E_BACKLINK_OBJETIVOS_ID}`);

    await expect(page.getByRole("region", { name: "Notas que enlazan aquí" })).toBeVisible();
    await expect(
      page.getByRole("region", { name: "Notas que enlazan aquí" }).getByRole("link", {
        name: "Plan Q3",
      }),
    ).toBeVisible();
  });
});
