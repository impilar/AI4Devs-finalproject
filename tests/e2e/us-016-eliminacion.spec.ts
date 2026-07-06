import { test, expect } from "@playwright/test";
import {
  E2E_DELETE_NOTA_ID,
  E2E_DELETE_NOTA_TITLE,
  seedDeletableNote,
} from "./fixtures/seed";
import { API_URL } from "./helpers/api";
import { expectNoteInList } from "./helpers/notes";

test.describe("US-016 — Eliminación de nota", () => {
  test.beforeEach(() => {
    seedDeletableNote();
  });

  test("Eliminar con confirmación previa", async ({ page, request }) => {
    await page.goto(`/notas/${E2E_DELETE_NOTA_ID}`);
    await expect(page.getByRole("heading", { name: E2E_DELETE_NOTA_TITLE })).toBeVisible();

    await page.locator(".note-detail__delete").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("dialog").getByRole("button", { name: "Eliminar" }).click();

    await expect(page).toHaveURL("/");
    await expectNoteInList(page, E2E_DELETE_NOTA_TITLE, { visible: false });

    const detailResponse = await request.get(`${API_URL}/notas/${E2E_DELETE_NOTA_ID}`);
    expect(detailResponse.status()).toBe(404);

    await page.goto(`/notas/${E2E_DELETE_NOTA_ID}`);
    await expect(page.getByText("La nota no existe o fue eliminada")).toBeVisible();
  });

  test("Cancelar eliminación mantiene la nota", async ({ page, request }) => {
    await page.goto(`/notas/${E2E_DELETE_NOTA_ID}`);
    await expect(page.getByRole("heading", { name: E2E_DELETE_NOTA_TITLE })).toBeVisible();

    await page.locator(".note-detail__delete").click();
    await page.getByRole("dialog").getByRole("button", { name: "Cancelar" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByRole("heading", { name: E2E_DELETE_NOTA_TITLE })).toBeVisible();

    const detailResponse = await request.get(`${API_URL}/notas/${E2E_DELETE_NOTA_ID}`);
    expect(detailResponse.ok()).toBeTruthy();

    await page.goto("/");
    await expectNoteInList(page, E2E_DELETE_NOTA_TITLE);
  });
});
