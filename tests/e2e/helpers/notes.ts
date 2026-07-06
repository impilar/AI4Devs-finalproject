import { expect, type Locator, type Page } from "@playwright/test";

export function noteList(page: Page): Locator {
  return page.getByRole("list", { name: "Listado de notas" });
}

export function noteListLink(page: Page, title: string): Locator {
  return noteList(page).getByRole("link").filter({ hasText: title });
}

export async function clickNoteInList(page: Page, title: string): Promise<void> {
  await noteListLink(page, title).click();
}

export async function expectNoteInList(
  page: Page,
  title: string,
  options?: { visible?: boolean },
): Promise<void> {
  const locator = noteListLink(page, title);

  if (options?.visible === false) {
    await expect(locator).not.toBeVisible();
    return;
  }

  await expect(locator).toBeVisible();
}
