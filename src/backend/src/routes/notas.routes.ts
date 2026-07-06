import { Router } from "express";
import {
  createBacklink,
  listBacklinksEntrantes,
  listBacklinksSalientes,
} from "../controllers/backlink.controller.js";
import { createNota, deleteNota, getNota, listNotas, removeTagFromNota, updateNota } from "../controllers/nota.controller.js";
import { validateBody, validateParams, validateQuery } from "../middleware/validate.js";
import { CreateBacklinkDtoSchema } from "../schemas/backlink.schema.js";
import { IdParamSchema, NotaTagParamsSchema } from "../schemas/common.schema.js";
import {
  CreateNotaDtoSchema,
  ListNotasQuerySchema,
  UpdateNotaDtoSchema,
} from "../schemas/nota.schema.js";

export const notasRouter = Router();

notasRouter.get("/", validateQuery(ListNotasQuerySchema), listNotas);
notasRouter.post("/", validateBody(CreateNotaDtoSchema), createNota);
notasRouter.post(
  "/:id/backlinks",
  validateParams(IdParamSchema),
  validateBody(CreateBacklinkDtoSchema),
  createBacklink,
);
notasRouter.get(
  "/:id/backlinks/salientes",
  validateParams(IdParamSchema),
  listBacklinksSalientes,
);
notasRouter.get(
  "/:id/backlinks/entrantes",
  validateParams(IdParamSchema),
  listBacklinksEntrantes,
);
notasRouter.get("/:id", validateParams(IdParamSchema), getNota);
notasRouter.put("/:id", validateParams(IdParamSchema), validateBody(UpdateNotaDtoSchema), updateNota);
notasRouter.delete(
  "/:id/etiquetas/:etiquetaId",
  validateParams(NotaTagParamsSchema),
  removeTagFromNota,
);
notasRouter.delete("/:id", validateParams(IdParamSchema), deleteNota);
