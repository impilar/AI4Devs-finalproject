import { test, expect, type Page } from "@playwright/test";
import { clearAllNotes } from "./fixtures/seed";
import { API_URL } from "./helpers/api";
import { clickNoteInList } from "./helpers/notes";

async function addTagViaInput(page: Page, tagName: string): Promise<void> {
  const tagInput = page.locator("#note-tags-input");
  await tagInput.fill(tagName);
  await tagInput.press("Enter");
}

async function createNoteWithTags(
  page: Page,
  title: string,
  content: string,
  tags: string[],
): Promise<void> {
  await page.goto("/notas/nueva");
  await page.getByLabel("Título").fill(title);
  await page.getByLabel("Contenido").fill(content);

  for (const tag of tags) {
    await addTagViaInput(page, tag);
  }

  await page.getByRole("button", { name: "Guardar" }).click();
  await expect(page).toHaveURL("/");
}

test.describe("US-008 — Etiquetas en notas", () => {
  test.beforeEach(() => {
    clearAllNotes();
  });

  test("Crear etiquetas automáticamente al escribirlas", async ({ page }) => {
    const firstTitle = "Nota productividad E2E";
    const secondTitle = "Segunda nota productividad E2E";

    await createNoteWithTags(page, firstTitle, "Contenido con clasificación", ["productividad"]);

    await clickNoteInList(page, firstTitle);
    await expect(page.getByRole("region", { name: "Etiquetas" })).toContainText("productividad");

    await page.getByRole("link", { name: "← Volver al listado" }).click();
    await page.getByRole("link", { name: "Nueva nota" }).click();

    await page.getByLabel("Título").fill(secondTitle);
    await page.getByLabel("Contenido").fill("Reutilizar etiqueta existente");

    const tagInput = page.locator("#note-tags-input");
    await tagInput.focus();
    await tagInput.fill("prod");
    await expect(page.getByRole("button", { name: "productividad" })).toBeVisible();
    await page.getByRole("button", { name: "productividad" }).click();

    await page.getByRole("button", { name: "Guardar" }).click();
    await expect(page).toHaveURL("/");

    await clickNoteInList(page, secondTitle);
    await expect(page.getByRole("region", { name: "Etiquetas" })).toContainText("productividad");
  });

  test("Varias etiquetas por nota con nombre único", async ({ page }) => {
    const noteTitle = "Nota varias etiquetas E2E";

    await page.goto("/notas/nueva");
    await page.getByLabel("Título").fill(noteTitle);
    await page.getByLabel("Contenido").fill("Contenido con prioridad");

    await addTagViaInput(page, "ideas");
    await addTagViaInput(page, "urgente");
    await addTagViaInput(page, "ideas");

    await expect(page.locator(".tag-input__chip")).toHaveCount(2);

    await page.getByRole("button", { name: "Guardar" }).click();
    await expect(page).toHaveURL("/");

    await clickNoteInList(page, noteTitle);

    const tagsSection = page.getByRole("region", { name: "Etiquetas" });
    await expect(tagsSection).toContainText("ideas");
    await expect(tagsSection).toContainText("urgente");
  });

  test("Crear nota sin etiquetas sigue funcionando", async ({ page }) => {
    const noteTitle = "Nota sin etiquetas E2E";

    await page.goto("/notas/nueva");
    await page.getByLabel("Título").fill(noteTitle);
    await page.getByLabel("Contenido").fill("Contenido sin clasificación");
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page).toHaveURL("/");
    await clickNoteInList(page, noteTitle);

    await expect(page.getByRole("region", { name: "Etiquetas" })).not.toBeVisible();
  });

  test("POST deduplica tags repetidos en el body", async ({ request }) => {
    const response = await request.post(`${API_URL}/notas`, {
      data: {
        title: "Nota deduplicada",
        content: "Contenido",
        tags: ["a", "a"],
      },
    });

    expect(response.status()).toBe(201);

    const body = (await response.json()) as { data: { tags: string[] } };
    expect(body.data.tags.map((tag: { name: string }) => tag.name)).toEqual(["a"]);
  });
});
