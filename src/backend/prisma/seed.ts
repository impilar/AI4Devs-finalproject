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

async function main(): Promise<void> {
  for (const nota of SEED_NOTAS) {
    await prisma.nota.upsert({
      where: { id: nota.id },
      update: { title: nota.title, content: nota.content },
      create: nota,
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
