# Design: PHASE-004 — Tags on notes (US-008)

## Context

Tables `etiquetas` and `nota_etiqueta` exist (TASK-031). `CreateNotaDtoSchema` already accepts `tags` default `[]` but `NotaService.create` ignores them. Mapper `toDetail` already maps tags alphabetically.

## Goals

- `EtiquetaService.upsertByNames`: trim, dedupe case-sensitive, upsert by UNIQUE `name`
- `createWithRelations` / `updateWithRelations`: transaction with `nota_etiqueta.createMany`
- `PUT /notas/:id` with `UpdateNotaDtoSchema.partial()` for tag replacement
- `TagInput` in frontend (TASK-030)

## Decisions

### D1: Upsert before transaction

Service calls `upsertByNames` then passes `etiquetaIds[]` to repository transaction. Orphan etiquetas without notes are acceptable and reusable.

### D2: Tag replacement on update

When `tags` present in PUT body: `deleteMany` on `nota_etiqueta` for note, then `createMany` new pairs.

### D3: Task order

1. TASK-029 — BE tags on POST/PUT
2. TASK-030 — TagInput FE
3. TASK-032 — QA E2E
