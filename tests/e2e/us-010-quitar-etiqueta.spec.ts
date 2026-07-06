import { test, expect } from "@playwright/test";
import {
  E2E_REMOVE_TAG_NOTA_ID,
  E2E_REMOVE_TAG_NOTA_TITLE,
  E2E_SHARED_NOTA_A_ID,
  E2E_SHARED_NOTA_B_ID,
  seedRemoveTagNotes,
} from "./fixtures/seed";

test.describe("US-010 — Quitar etiqueta de nota", () => {
  test.beforeEach(() => {
    seedRemoveTagNotes();
  });

  test("Desasociar etiqueta desde detalle sin borrar la nota", async ({ page }) => {
    await page.goto(`/notas/${E2E_REMOVE_TAG_NOTA_ID}`);

    await expect(page.getByRole("heading", { name: E2E_REMOVE_TAG_NOTA_TITLE })).toBeVisible();
    await expect(page.getByRole("region", { name: "Etiquetas" })).toContainText("urgente");
    await expect(page.getByRole("region", { name: "Etiquetas" })).toContainText("trabajo");

    await page.getByRole("button", { name: "Quitar etiqueta urgente" }).click();

    await expect(page.getByRole("region", { name: "Etiquetas" })).not.toContainText("urgente");
    await expect(page.getByRole("region", { name: "Etiquetas" })).toContainText("trabajo");
    await expect(page.getByRole("heading", { name: E2E_REMOVE_TAG_NOTA_TITLE })).toBeVisible();
    await expect(page.getByText("Contenido de reunión E2E")).toBeVisible();
  });

  test("La etiqueta compartida permanece en otra nota", async ({ page }) => {
    await page.goto(`/notas/${E2E_SHARED_NOTA_A_ID}`);

    await expect(page.getByRole("region", { name: "Etiquetas" })).toContainText("trabajo");
    await page.getByRole("button", { name: "Quitar etiqueta trabajo" }).click();
    await expect(page.getByRole("region", { name: "Etiquetas" })).toHaveCount(0);

    await page.goto(`/notas/${E2E_SHARED_NOTA_B_ID}`);
    await expect(page.getByRole("region", { name: "Etiquetas" })).toContainText("trabajo");
  });
});
