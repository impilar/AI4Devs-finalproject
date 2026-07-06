-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "notas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(500) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notas_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "chk_notas_title_not_empty" CHECK (length(trim("title")) > 0),
    CONSTRAINT "chk_notas_content_not_empty" CHECK (length(trim("content")) > 0)
);

-- CreateIndex
CREATE INDEX "idx_notas_created_at" ON "notas"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_notas_updated_at" ON "notas"("updated_at" DESC);

-- CreateIndex
CREATE INDEX "idx_notas_title" ON "notas"("title");

-- Trigger: keep updated_at in sync on row updates
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notas_updated_at
    BEFORE UPDATE ON "notas"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
