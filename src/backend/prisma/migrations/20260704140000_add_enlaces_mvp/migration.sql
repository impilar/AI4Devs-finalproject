-- CreateTable
CREATE TABLE "enlaces" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nota_id" UUID NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enlaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_enlaces_nota_id" ON "enlaces"("nota_id");

-- AddForeignKey
ALTER TABLE "enlaces" ADD CONSTRAINT "enlaces_nota_id_fkey" FOREIGN KEY ("nota_id") REFERENCES "notas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
