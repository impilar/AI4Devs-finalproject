import { test, expect } from "@playwright/test";
import {
  E2E_EDIT_NOTA_ID,
  E2E_EDIT_NOTA_TITLE,
  seedEditableNote,
} from "./fixtures/seed";
import { API_URL } from "./helpers/api";

test.describe("US-007 — Validación de formulario", () => {
  test("Crear: título vacío muestra error y conserva el contenido", async ({ page }) => {
    await page.goto("/notas/nueva");

    const content = "Contenido escrito sin título";
    await page.getByLabel("Contenido").fill(content);
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page.getByText("El título es obligatorio")).toBeVisible();
    await expect(page.getByLabel("Contenido")).toHaveValue(content);
    await expect(page).toHaveURL("/notas/nueva");
  });

  test.describe("Editar", () => {
    test.beforeEach(() => {
      seedEditableNote();
    });

    test("título vacío muestra error y conserva el contenido", async ({ page, request }) => {
      await page.goto(`/notas/${E2E_EDIT_NOTA_ID}`);
      await page.getByRole("button", { name: "Editar" }).click();

      const revisedContent = "Contenido revisado que debe conservarse";
      await page.getByLabel("Título").fill("   ");
      await page.getByLabel("Contenido").fill(revisedContent);
      await page.getByRole("button", { name: "Guardar" }).click();

      await expect(page.getByText("El título es obligatorio")).toBeVisible();
      await expect(page.getByLabel("Contenido")).toHaveValue(revisedContent);
      await expect(page.getByLabel("Título")).toBeVisible();

      const response = await request.get(`${API_URL}/notas/${E2E_EDIT_NOTA_ID}`);
      const body = (await response.json()) as { data: { title: string; content: string } };
      expect(body.data.title).toBe(E2E_EDIT_NOTA_TITLE);
      expect(body.data.content).not.toBe(revisedContent);
    });
  });
});
