import { prisma } from "../lib/prisma.js";

const E2E_NOTAS = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01",
    title: "Ideas de proyecto",
    content: "Texto de la nota",
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

const E2E_ETIQUETAS = [
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", name: "ideas" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02", name: "trabajo" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb03", name: "personal" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb04", name: "archivo" },
] as const;

const E2E_ENLACES = [
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccc01",
    notaId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01",
    url: "https://docs.example.com/mvp",
  },
] as const;

const E2E_NOTA_ETIQUETA = [
  {
    notaId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01",
    etiquetaId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01",
  },
  {
    notaId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01",
    etiquetaId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02",
  },
] as const;

async function clearDatabase(): Promise<void> {
  await prisma.enlace.deleteMany();
  await prisma.notaEtiqueta.deleteMany();
  await prisma.etiqueta.deleteMany();
  await prisma.nota.deleteMany();
}

const E2E_FILTER_NOTAS = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa11",
    title: "Reunión equipo",
    content: "Nota E2E — trabajo 1",
    createdAt: new Date("2026-06-12T10:00:00.000Z"),
    updatedAt: new Date("2026-06-12T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa12",
    title: "Informe mensual",
    content: "Nota E2E — trabajo 2",
    createdAt: new Date("2026-06-11T10:00:00.000Z"),
    updatedAt: new Date("2026-06-11T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa13",
    title: "Plan fin de semana",
    content: "Nota E2E — personal",
    createdAt: new Date("2026-06-10T10:00:00.000Z"),
    updatedAt: new Date("2026-06-10T10:00:00.000Z"),
  },
] as const;

const E2E_FILTER_NOTA_ETIQUETA = [
  {
    notaId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa11",
    etiquetaId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02",
  },
  {
    notaId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa12",
    etiquetaId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02",
  },
  {
    notaId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa13",
    etiquetaId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb03",
  },
] as const;

async function seedFilterDatabase(): Promise<void> {
  await clearDatabase();

  for (const nota of E2E_FILTER_NOTAS) {
    await prisma.nota.create({ data: nota });
  }

  for (const etiqueta of E2E_ETIQUETAS) {
    await prisma.etiqueta.create({ data: etiqueta });
  }

  for (const association of E2E_FILTER_NOTA_ETIQUETA) {
    await prisma.notaEtiqueta.create({ data: association });
  }
}

async function seedDatabase(): Promise<void> {
  await clearDatabase();

  for (const nota of E2E_NOTAS) {
    await prisma.nota.create({ data: nota });
  }

  for (const etiqueta of E2E_ETIQUETAS) {
    await prisma.etiqueta.create({ data: etiqueta });
  }

  for (const enlace of E2E_ENLACES) {
    await prisma.enlace.create({ data: enlace });
  }

  for (const association of E2E_NOTA_ETIQUETA) {
    await prisma.notaEtiqueta.create({ data: association });
  }
}

async function main(): Promise<void> {
  const mode = process.argv[2];

  if (mode === "clear") {
    await clearDatabase();
    return;
  }

  if (mode === "seed") {
    await seedDatabase();
    return;
  }

  if (mode === "filter") {
    await seedFilterDatabase();
    return;
  }

  throw new Error(`Unknown mode: ${mode}. Use "seed", "filter", or "clear".`);
}

main()
  .catch(async (error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
