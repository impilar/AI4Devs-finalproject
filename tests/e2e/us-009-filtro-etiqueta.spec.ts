import { test, expect } from "@playwright/test";
import { seedFilterNotes } from "./fixtures/seed";
import { expectNoteInList } from "./helpers/notes";

test.describe("US-009 — Filtro por etiqueta", () => {
  test.beforeEach(() => {
    seedFilterNotes();
  });

  test("Filtrar listado por etiqueta seleccionada", async ({ page }) => {
    await page.goto("/");

    const noteList = page.getByRole("list", { name: "Listado de notas" });
    await expect(noteList).toBeVisible();
    await expect(noteList.getByRole("listitem")).toHaveCount(3);

    await page.getByRole("button", { name: "trabajo" }).click();

    await expect(noteList.getByRole("listitem")).toHaveCount(2);
    await expectNoteInList(page, "Reunión equipo");
    await expectNoteInList(page, "Informe mensual");
    await expectNoteInList(page, "Plan fin de semana", { visible: false });
  });

  test("Etiqueta sin notas asociadas muestra mensaje vacío", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "archivo" }).click();

    await expect(
      page.getByText("No hay notas con la etiqueta «archivo»."),
    ).toBeVisible();
    await expect(page.getByRole("list", { name: "Listado de notas" })).toHaveCount(0);
  });

  test("Limpiar filtro restaura el listado completo", async ({ page }) => {
    await page.goto("/");

    const noteList = page.getByRole("list", { name: "Listado de notas" });

    await page.getByRole("button", { name: "personal" }).click();
    await expect(noteList.getByRole("listitem")).toHaveCount(1);

    await page.getByRole("button", { name: "Ver todas" }).click();
    await expect(noteList.getByRole("listitem")).toHaveCount(3);
  });
});
