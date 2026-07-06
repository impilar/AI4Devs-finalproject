import { test, expect } from "@playwright/test";
import { clearAllNotes } from "./fixtures/seed";

test.describe("US-003 — Estado vacío del listado", () => {
  test.beforeEach(() => {
    clearAllNotes();
  });

  test("Usuario sin notas ve mensaje orientativo y CTA Crear nota", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Aún no hay notas.")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole("link", { name: "Crear nota" })).toBeVisible();
    await expect(page.getByRole("alert")).not.toBeVisible();
  });

  test("CTA Crear nota navega al formulario de creación", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Crear nota" }).click();

    await expect(page).toHaveURL("/notas/nueva");
    await expect(page.getByLabel("Título")).toBeVisible();
    await expect(page.getByLabel("Contenido")).toBeVisible();
  });

  test("El estado vacío no muestra pantalla en blanco", async ({ page }) => {
    await page.goto("/");

    const emptyMessage = page.getByText("Aún no hay notas.");
    await expect(emptyMessage).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole("link", { name: "Crear nota" })).toBeVisible();

    const box = await emptyMessage.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
  });
});
