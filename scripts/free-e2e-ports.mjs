#!/usr/bin/env node
/**
 * Frees E2E-only ports (3100, 5174) left over from a crashed Playwright run.
 * Does not touch dev ports 3000/5173 or PostgreSQL 5432.
 */
import { execSync } from "node:child_process";

const e2ePorts = [
  Number(process.env.E2E_BACKEND_PORT ?? 3100),
  Number(process.env.E2E_FRONTEND_PORT ?? 5174),
];

for (const port of e2ePorts) {
  try {
    const output = execSync(`lsof -ti:${port}`, { encoding: "utf-8" }).trim();

    if (!output) {
      continue;
    }

    for (const pid of output.split("\n").filter(Boolean)) {
      try {
        process.kill(Number(pid), "SIGTERM");
        console.log(`Freed E2E port ${port} (pid ${pid})`);
      } catch {
        // Process may have already exited.
      }
    }
  } catch {
    // Port is free.
  }
}
