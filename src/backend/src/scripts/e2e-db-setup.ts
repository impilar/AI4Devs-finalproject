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

const E2E_REMOVE_TAG_NOTA = {
  id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa21",
  title: "Reunión",
  content: "Contenido de reunión E2E",
  createdAt: new Date("2026-06-12T10:00:00.000Z"),
  updatedAt: new Date("2026-06-12T10:00:00.000Z"),
} as const;

const E2E_REMOVE_TAG_ETIQUETAS = [
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb11", name: "trabajo" },
  { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb12", name: "urgente" },
] as const;

const E2E_REMOVE_TAG_ASSOCIATIONS = [
  {
    notaId: E2E_REMOVE_TAG_NOTA.id,
    etiquetaId: E2E_REMOVE_TAG_ETIQUETAS[0].id,
  },
  {
    notaId: E2E_REMOVE_TAG_NOTA.id,
    etiquetaId: E2E_REMOVE_TAG_ETIQUETAS[1].id,
  },
] as const;

const E2E_SHARED_TAG_NOTAS = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa31",
    title: "A",
    content: "Nota A E2E",
    createdAt: new Date("2026-06-12T10:00:00.000Z"),
    updatedAt: new Date("2026-06-12T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa32",
    title: "B",
    content: "Nota B E2E",
    createdAt: new Date("2026-06-11T10:00:00.000Z"),
    updatedAt: new Date("2026-06-11T10:00:00.000Z"),
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

const E2E_SEARCH_NOTAS = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa21",
    title: "Recetas",
    content: "Colección de platos favoritos",
    createdAt: new Date("2026-06-12T10:00:00.000Z"),
    updatedAt: new Date("2026-06-12T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa22",
    title: "Lista semanal",
    content: "lista de la compra del supermercado",
    createdAt: new Date("2026-06-11T10:00:00.000Z"),
    updatedAt: new Date("2026-06-11T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa23",
    title: "Referencias varias",
    content: "Contenido sin palabra clave de búsqueda",
    createdAt: new Date("2026-06-10T10:00:00.000Z"),
    updatedAt: new Date("2026-06-10T10:00:00.000Z"),
  },
] as const;

const E2E_SEARCH_ORDER_NOTAS = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa31",
    title: "Proyecto alpha",
    content: "contenido alpha",
    createdAt: new Date("2026-06-01T10:00:00.000Z"),
    updatedAt: new Date("2026-06-01T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa32",
    title: "Ideas varias",
    content: "texto con proyecto en el contenido",
    createdAt: new Date("2026-06-02T10:00:00.000Z"),
    updatedAt: new Date("2026-06-02T10:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa33",
    title: "Nota antigua",
    content: "fragmento nota en el contenido",
    createdAt: new Date("2026-06-03T10:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa34",
    title: "Nota reciente",
    content: "otro fragmento nota aquí",
    createdAt: new Date("2026-06-04T10:00:00.000Z"),
    updatedAt: new Date("2026-06-15T10:00:00.000Z"),
  },
] as const;

async function seedSearchDatabase(): Promise<void> {
  await clearDatabase();

  for (const nota of E2E_SEARCH_NOTAS) {
    await prisma.nota.create({ data: nota });
  }
}

async function seedSearchOrderDatabase(): Promise<void> {
  await clearDatabase();

  for (const nota of E2E_SEARCH_ORDER_NOTAS) {
    await prisma.nota.create({ data: nota });
  }
}

async function seedBenchDatabase(): Promise<void> {
  await clearDatabase();

  await prisma.nota.createMany({
    data: Array.from({ length: 500 }, (_, index) => ({
      title: `Nota bench ${index}`,
      content: `contenido buscable ${index}`,
    })),
  });
}

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

async function seedRemoveTagDatabase(): Promise<void> {
  await clearDatabase();

  await prisma.nota.create({ data: E2E_REMOVE_TAG_NOTA });

  for (const etiqueta of E2E_REMOVE_TAG_ETIQUETAS) {
    await prisma.etiqueta.create({ data: etiqueta });
  }

  for (const association of E2E_REMOVE_TAG_ASSOCIATIONS) {
    await prisma.notaEtiqueta.create({ data: association });
  }

  for (const nota of E2E_SHARED_TAG_NOTAS) {
    await prisma.nota.create({ data: nota });
  }

  const sharedTrabajoTag = E2E_REMOVE_TAG_ETIQUETAS[0];

  for (const nota of E2E_SHARED_TAG_NOTAS) {
    await prisma.notaEtiqueta.create({
      data: {
        notaId: nota.id,
        etiquetaId: sharedTrabajoTag.id,
      },
    });
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

  if (mode === "search") {
    await seedSearchDatabase();
    return;
  }

  if (mode === "search-order") {
    await seedSearchOrderDatabase();
    return;
  }

  if (mode === "bench") {
    await seedBenchDatabase();
    return;
  }

  if (mode === "remove-tag") {
    await seedRemoveTagDatabase();
    return;
  }

  throw new Error(
    `Unknown mode: ${mode}. Use "seed", "filter", "search", "search-order", "bench", "remove-tag", or "clear".`,
  );
}

main()
  .catch(async (error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
