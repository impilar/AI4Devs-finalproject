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

export const E2E_DETAIL_NOTA_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01";
export const E2E_DETAIL_NOTA_TITLE = "Ideas de proyecto";
export const E2E_DETAIL_NOTA_CONTENT = "Texto de la nota";
export const E2E_DETAIL_LINK = "https://docs.example.com/mvp";
export const E2E_DETAIL_TAGS = ["ideas", "trabajo"] as const;
export const E2E_MISSING_NOTA_ID = "550e8400-e29b-41d4-a716-446655440000";

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

export function clearAllNotes(): void {
  runDbSetup("clear");
}
