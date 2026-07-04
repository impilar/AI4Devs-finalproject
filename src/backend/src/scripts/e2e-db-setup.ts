import { prisma } from "../lib/prisma.js";

const E2E_NOTAS = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01",
    title: "Ideas de proyecto",
    content: "Nota E2E — ideas",
    createdAt: new Date("2026-06-12T10:00:00.000Z"),
    updatedAt: new Date("2026-06-12T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa02",
    title: "Lista de la compra",
    content: "Nota E2E — compra",
    createdAt: new Date("2026-06-11T10:00:00.000Z"),
    updatedAt: new Date("2026-06-11T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa03",
    title: "Referencias técnicas",
    content: "Nota E2E — referencias",
    createdAt: new Date("2026-06-10T10:00:00.000Z"),
    updatedAt: new Date("2026-06-10T10:00:00.000Z"),
  },
] as const;

async function main(): Promise<void> {
  const mode = process.argv[2];

  if (mode === "clear") {
    await prisma.nota.deleteMany();
    return;
  }

  if (mode === "seed") {
    await prisma.nota.deleteMany();
    for (const nota of E2E_NOTAS) {
      await prisma.nota.create({ data: nota });
    }
    return;
  }

  throw new Error(`Unknown mode: ${mode}. Use "seed" or "clear".`);
}

main()
  .catch(async (error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
