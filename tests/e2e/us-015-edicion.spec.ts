import { test, expect, type Page } from "@playwright/test";
import {
  E2E_EDIT_NOTA_ID,
  E2E_EDIT_NOTA_LINK,
  E2E_EDIT_NOTA_TITLE,
  seedEditableNote,
} from "./fixtures/seed";
import { API_URL } from "./helpers/api";

async function addTagViaInput(page: Page, tagName: string): Promise<void> {
  const tagInput = page.locator("#note-tags-input");
  await tagInput.fill(tagName);
  await tagInput.press("Enter");
}

test.describe("US-015 — Edición de nota", () => {
  test.beforeEach(() => {
    seedEditableNote();
  });

  test("Editar todos los campos y actualizar fecha de modificación", async ({
    page,
    request,
  }) => {
    const initialResponse = await request.get(`${API_URL}/notas/${E2E_EDIT_NOTA_ID}`);
    expect(initialResponse.ok()).toBeTruthy();
    const initialBody = (await initialResponse.json()) as {
      data: { updatedAt: string };
    };
    const initialUpdatedAt = initialBody.data.updatedAt;

    await page.goto(`/notas/${E2E_EDIT_NOTA_ID}`);
    await expect(page.getByRole("heading", { name: E2E_EDIT_NOTA_TITLE })).toBeVisible();

    await page.getByRole("button", { name: "Editar" }).click();

    const newTitle = "Ideas de proyecto actualizadas";
    const newContent = "Contenido revisado por E2E";
    const newLink = "https://example.com/actualizado";
    const newTag = "urgente";

    await page.getByLabel("Título").fill(newTitle);
    await page.getByLabel("Contenido").fill(newContent);
    await page.locator("#note-link-0").fill(newLink);

    await page.getByRole("button", { name: "Eliminar etiqueta ideas" }).click();
    await page.getByRole("button", { name: "Eliminar etiqueta trabajo" }).click();
    await addTagViaInput(page, newTag);

    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page.getByRole("heading", { name: newTitle })).toBeVisible();
    await expect(page.getByText(newContent)).toBeVisible();
    await expect(page.getByRole("link", { name: newLink })).toBeVisible();
    await expect(page.getByRole("region", { name: "Etiquetas" })).toContainText(newTag);
    await expect(page.getByText(/Última actualización:/)).toBeVisible();

    const finalResponse = await request.get(`${API_URL}/notas/${E2E_EDIT_NOTA_ID}`);
    const finalBody = (await finalResponse.json()) as {
      data: { updatedAt: string; title: string; content: string; links: string[]; tags: string[] };
    };

    expect(finalBody.data.title).toBe(newTitle);
    expect(finalBody.data.content).toBe(newContent);
    expect(finalBody.data.links).toEqual([newLink]);
    expect(finalBody.data.tags).toEqual([newTag]);
    expect(new Date(finalBody.data.updatedAt).getTime()).toBeGreaterThan(
      new Date(initialUpdatedAt).getTime(),
    );
  });

  test("Respuesta de guardado en menos de 2 segundos", async ({ page }) => {
    await page.goto(`/notas/${E2E_EDIT_NOTA_ID}`);
    await page.getByRole("button", { name: "Editar" }).click();

    const quickTitle = "Guardado rápido E2E";
    await page.getByLabel("Título").fill(quickTitle);

    const startedAt = Date.now();
    await page.getByRole("button", { name: "Guardar" }).click();
    await expect(page.getByRole("heading", { name: quickTitle })).toBeVisible();
    const elapsedMs = Date.now() - startedAt;

    expect(elapsedMs).toBeLessThan(2000);
  });

  test("Título vacío impide guardar en edición", async ({ page, request }) => {
    await page.goto(`/notas/${E2E_EDIT_NOTA_ID}`);
    await page.getByRole("button", { name: "Editar" }).click();

    await page.getByLabel("Título").fill("   ");
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page.getByText("El título es obligatorio")).toBeVisible();
    await expect(page.getByLabel("Título")).toBeVisible();

    const response = await request.get(`${API_URL}/notas/${E2E_EDIT_NOTA_ID}`);
    const body = (await response.json()) as { data: { title: string } };
    expect(body.data.title).toBe(E2E_EDIT_NOTA_TITLE);
  });
});
