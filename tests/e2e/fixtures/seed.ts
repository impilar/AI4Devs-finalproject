import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fixturesDir = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(fixturesDir, "../../../src/backend");
const dbSetupScript = path.resolve(backendRoot, "src/scripts/e2e-db-setup.ts");

const defaultDatabaseUrl = "postgresql://okc:okc@localhost:5432/okc";

export const E2E_NOTA_TITLES = [
  "Ideas de proyecto",
  "Lista de la compra",
  "Referencias técnicas",
] as const;

export const E2E_NOTA_DATES = ["12 jun 2026", "11 jun 2026", "10 jun 2026"] as const;

export const E2E_NOTA_ISO_DATES = [
  "2026-06-12T10:00:00.000Z",
  "2026-06-11T10:00:00.000Z",
  "2026-06-10T10:00:00.000Z",
] as const;

export const E2E_DETAIL_NOTA_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01";
export const E2E_DETAIL_NOTA_TITLE = "Ideas de proyecto";
export const E2E_DETAIL_NOTA_CONTENT = "Texto de la nota";
export const E2E_DETAIL_LINK = "https://docs.example.com/mvp";
export const E2E_DETAIL_TAGS = ["ideas", "trabajo"] as const;
export const E2E_MISSING_NOTA_ID = "550e8400-e29b-41d4-a716-446655440000";

/** US-015 editable note — same as detail seed (title, content, 1 link, 2 tags). */
export const E2E_EDIT_NOTA_ID = E2E_DETAIL_NOTA_ID;
export const E2E_EDIT_NOTA_TITLE = E2E_DETAIL_NOTA_TITLE;
export const E2E_EDIT_NOTA_CONTENT = E2E_DETAIL_NOTA_CONTENT;
export const E2E_EDIT_NOTA_LINK = E2E_DETAIL_LINK;
export const E2E_EDIT_NOTA_TAGS = E2E_DETAIL_TAGS;

/** US-016 deletable note — detail seed (title, content, 1 link, 2 tags). */
export const E2E_DELETE_NOTA_ID = E2E_DETAIL_NOTA_ID;
export const E2E_DELETE_NOTA_TITLE = E2E_DETAIL_NOTA_TITLE;

export const E2E_SEARCH_CONTENT_MATCH_TITLE = "Lista semanal";
export const E2E_SEARCH_TITLE_MATCH_TITLE = "Recetas";

function runDbSetup(mode: "seed" | "clear"): void {
  const databaseUrl = process.env.DATABASE_URL ?? defaultDatabaseUrl;

  const result = spawnSync("npx", ["tsx", dbSetupScript, mode], {
    cwd: backendRoot,
    env: { ...process.env, DATABASE_URL: databaseUrl },
    encoding: "utf-8",
  });

  if (result.status !== 0) {
    throw new Error(
      `E2E database ${mode} failed:\n${result.stderr || result.stdout || "unknown error"}`,
    );
  }
}

export function seedThreeNotes(): void {
  runDbSetup("seed");
}

export function seedEditableNote(): void {
  seedThreeNotes();
}

export function seedDeletableNote(): void {
  seedThreeNotes();
}

export function seedFilterNotes(): void {
  runDbSetup("filter");
}

export function seedSearchNotes(): void {
  runDbSetup("search");
}

export function seedSearchOrderNotes(): void {
  runDbSetup("search-order");
}

export const E2E_SORT_TITLES = ["Alpha", "Beta", "Zebra"] as const;
export const E2E_SORT_NOTA_BETA_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa43";

export function seedSortNotes(): void {
  runDbSetup("sort");
}

export function seedCatalogNotes(): void {
  runDbSetup("catalog");
}

export function seedBenchNotes(): void {
  runDbSetup("bench");
}

export function clearAllNotes(): void {
  runDbSetup("clear");
}

export const E2E_REMOVE_TAG_NOTA_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa21";
export const E2E_REMOVE_TAG_NOTA_TITLE = "Reunión";
export const E2E_SHARED_NOTA_A_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa31";
export const E2E_SHARED_NOTA_B_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa32";

export function seedRemoveTagNotes(): void {
  runDbSetup("remove-tag");
}
