import { test, expect } from "@playwright/test";
import { clearAllNotes } from "./fixtures/seed";

test.describe("US-006 — Enlaces en notas", () => {
  test.beforeEach(() => {
    clearAllNotes();
  });

  test("Añadir uno o más enlaces al crear", async ({ page }) => {
    const noteTitle = "Nota con enlaces E2E";
    const firstLink = "https://ejemplo.com";
    const secondLink = "https://docs.org/guia";

    await page.goto("/notas/nueva");

    await page.getByLabel("Título").fill(noteTitle);
    await page.getByLabel("Contenido").fill("Contenido con referencias externas");

    await page.getByRole("button", { name: "Añadir enlace" }).click();
    await page.locator("#note-link-0").fill(firstLink);

    await page.getByRole("button", { name: "Añadir enlace" }).click();
    await page.locator("#note-link-1").fill(secondLink);

    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page).toHaveURL("/");
    await page.getByRole("link", { name: noteTitle }).click();

    const firstExternalLink = page.getByRole("link", { name: firstLink });
    const secondExternalLink = page.getByRole("link", { name: secondLink });

    await expect(firstExternalLink).toBeVisible();
    await expect(firstExternalLink).toHaveAttribute("href", firstLink);
    await expect(firstExternalLink).toHaveAttribute("target", "_blank");

    await expect(secondExternalLink).toBeVisible();
    await expect(secondExternalLink).toHaveAttribute("href", secondLink);
    await expect(secondExternalLink).toHaveAttribute("target", "_blank");
  });

  test("URL con formato inválido es rechazada", async ({ page }) => {
    await page.goto("/notas/nueva");

    await page.getByLabel("Título").fill("Nota enlace inválido");
    await page.getByLabel("Contenido").fill("Contenido de prueba");

    await page.getByRole("button", { name: "Añadir enlace" }).click();
    await page.locator("#note-link-0").fill("no-es-url");

    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page.getByText("La URL no es válida")).toBeVisible();
    await expect(page).toHaveURL("/notas/nueva");

    await page.locator("#note-link-0").fill("https://ejemplo.com");
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("link", { name: "Nota enlace inválido" })).toBeVisible();
  });

  test("Crear nota sin enlaces sigue funcionando", async ({ page }) => {
    const noteTitle = "Nota sin enlaces E2E";

    await page.goto("/notas/nueva");

    await page.getByLabel("Título").fill(noteTitle);
    await page.getByLabel("Contenido").fill("Contenido sin referencias");
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("link", { name: noteTitle })).toBeVisible();
  });
});
