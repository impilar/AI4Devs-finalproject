-- CreateTable
CREATE TABLE "etiquetas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "etiquetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nota_etiqueta" (
    "nota_id" UUID NOT NULL,
    "etiqueta_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nota_etiqueta_pkey" PRIMARY KEY ("nota_id", "etiqueta_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "etiquetas_name_key" ON "etiquetas"("name");

-- CreateIndex
CREATE INDEX "idx_etiquetas_name" ON "etiquetas"("name");

-- CreateIndex
CREATE INDEX "idx_nota_etiqueta_etiqueta" ON "nota_etiqueta"("etiqueta_id", "nota_id");

-- CreateIndex
CREATE INDEX "idx_nota_etiqueta_nota" ON "nota_etiqueta"("nota_id");

-- AddForeignKey
ALTER TABLE "nota_etiqueta" ADD CONSTRAINT "nota_etiqueta_nota_id_fkey" FOREIGN KEY ("nota_id") REFERENCES "notas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nota_etiqueta" ADD CONSTRAINT "nota_etiqueta_etiqueta_id_fkey" FOREIGN KEY ("etiqueta_id") REFERENCES "etiquetas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
