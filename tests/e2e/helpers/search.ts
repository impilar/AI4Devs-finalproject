import { expect, type Page } from "@playwright/test";
import { expectNoteInList } from "./notes";

export async function searchNotes(page: Page, term: string): Promise<void> {
  const encodedTerm = encodeURIComponent(term);
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes(`/buscar?q=${encodedTerm}`) && response.status() === 200,
  );

  await page.getByRole("searchbox", { name: "Buscar notas" }).fill(term);
  await responsePromise;
}

export async function expectNoteLinkVisible(page: Page, title: string): Promise<void> {
  await expectNoteInList(page, title);
}
