import { test, expect } from "@playwright/test";
import { clearAllNotes } from "./fixtures/seed";
import { createInteractionCounter } from "./helpers/interactionCounter";

const API_URL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:3000/api/v1";

test.describe("US-005 — Crear nota", () => {
  test.beforeEach(() => {
    clearAllNotes();
  });

  test("Crear nota en máximo 2 interacciones", async ({ page }) => {
    const interactions = createInteractionCounter();
    const noteTitle = "Nota E2E US-005";
    const noteContent = "Contenido creado por Playwright";

    await page.goto("/");

    await page.getByRole("link", { name: "Nueva nota" }).click();
    interactions.recordClick();

    await page.getByLabel("Título").fill(noteTitle);
    await page.getByLabel("Contenido").fill(noteContent);

    await page.getByRole("button", { name: "Guardar" }).click();
    interactions.recordClick();

    expect(interactions.getCount()).toBeLessThanOrEqual(2);

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("link", { name: noteTitle })).toBeVisible();

    const today = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    await expect(page.getByText(today)).toBeVisible();
  });

  test("Título vacío impide guardar", async ({ page }) => {
    await page.goto("/notas/nueva");

    await page.getByLabel("Contenido").fill("Contenido sin título");
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page.getByText("El título es obligatorio")).toBeVisible();
    await expect(page).toHaveURL("/notas/nueva");

    await page.goto("/");
    await expect(page.getByText("No hay notas todavía.")).toBeVisible();
  });

  test("Contenido vacío impide guardar", async ({ page }) => {
    await page.goto("/notas/nueva");

    await page.getByLabel("Título").fill("Título sin contenido");
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page.getByText("El contenido es obligatorio")).toBeVisible();
    await expect(page).toHaveURL("/notas/nueva");

    await page.goto("/");
    await expect(page.getByText("No hay notas todavía.")).toBeVisible();
  });

  test("POST con body inválido devuelve 400", async ({ request }) => {
    const response = await request.post(`${API_URL}/notas`, {
      data: {
        title: "   ",
        content: "Contenido válido",
      },
    });

    expect(response.status()).toBe(400);

    const body = (await response.json()) as {
      error: { code: string; message: string };
    };
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.message).toBe("Los datos enviados no son válidos");
  });
});
