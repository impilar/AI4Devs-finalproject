import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_NOTAS = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    title: "Ideas de proyecto",
    content: "Investigar mercado y definir alcance MVP",
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    title: "Lista de la compra",
    content: "Leche, pan, café",
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    title: "Referencias técnicas",
    content: "Stack: React, Express, PostgreSQL, Prisma",
  },
] as const;

const SEED_ETIQUETAS = [
  { id: "22222222-2222-2222-2222-222222222201", name: "ideas" },
  { id: "22222222-2222-2222-2222-222222222202", name: "personal" },
  { id: "22222222-2222-2222-2222-222222222203", name: "trabajo" },
  { id: "22222222-2222-2222-2222-222222222204", name: "tecnología" },
] as const;

const SEED_ENLACES = [
  {
    id: "33333333-3333-3333-3333-333333333301",
    notaId: "11111111-1111-1111-1111-111111111101",
    url: "https://docs.example.com/mvp",
  },
  {
    id: "33333333-3333-3333-3333-333333333302",
    notaId: "11111111-1111-1111-1111-111111111103",
    url: "https://www.prisma.io/docs",
  },
] as const;

const SEED_NOTA_ETIQUETA = [
  {
    notaId: "11111111-1111-1111-1111-111111111101",
    etiquetaName: "ideas",
  },
  {
    notaId: "11111111-1111-1111-1111-111111111101",
    etiquetaName: "trabajo",
  },
  {
    notaId: "11111111-1111-1111-1111-111111111102",
    etiquetaName: "personal",
  },
  {
    notaId: "11111111-1111-1111-1111-111111111103",
    etiquetaName: "tecnología",
  },
  {
    notaId: "11111111-1111-1111-1111-111111111103",
    etiquetaName: "trabajo",
  },
] as const;

async function main(): Promise<void> {
  for (const nota of SEED_NOTAS) {
    await prisma.nota.upsert({
      where: { id: nota.id },
      update: { title: nota.title, content: nota.content },
      create: nota,
    });
  }

  const etiquetaIdByName = new Map<string, string>();
  for (const etiqueta of SEED_ETIQUETAS) {
    const row = await prisma.etiqueta.upsert({
      where: { name: etiqueta.name },
      update: {},
      create: etiqueta,
    });
    etiquetaIdByName.set(etiqueta.name, row.id);
  }

  for (const enlace of SEED_ENLACES) {
    await prisma.enlace.upsert({
      where: { id: enlace.id },
      update: { notaId: enlace.notaId, url: enlace.url },
      create: enlace,
    });
  }

  for (const association of SEED_NOTA_ETIQUETA) {
    const etiquetaId = etiquetaIdByName.get(association.etiquetaName);
    if (!etiquetaId) {
      throw new Error(`Missing seed etiqueta: ${association.etiquetaName}`);
    }

    await prisma.notaEtiqueta.upsert({
      where: {
        notaId_etiquetaId: {
          notaId: association.notaId,
          etiquetaId,
        },
      },
      update: {},
      create: { notaId: association.notaId, etiquetaId },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
