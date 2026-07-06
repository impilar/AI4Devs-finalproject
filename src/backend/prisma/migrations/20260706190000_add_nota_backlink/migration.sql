-- CreateTable
CREATE TABLE "nota_backlink" (
    "origen_id" UUID NOT NULL,
    "destino_id" UUID NOT NULL,

    CONSTRAINT "nota_backlink_pkey" PRIMARY KEY ("origen_id","destino_id")
);

-- CreateIndex
CREATE INDEX "idx_nota_backlink_origen" ON "nota_backlink"("origen_id");

-- CreateIndex
CREATE INDEX "idx_nota_backlink_destino" ON "nota_backlink"("destino_id");

-- AddForeignKey
ALTER TABLE "nota_backlink" ADD CONSTRAINT "nota_backlink_origen_id_fkey" FOREIGN KEY ("origen_id") REFERENCES "notas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nota_backlink" ADD CONSTRAINT "nota_backlink_destino_id_fkey" FOREIGN KEY ("destino_id") REFERENCES "notas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
