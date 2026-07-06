import { Router } from "express";
import { createNota, deleteNota, getNota, listNotas, removeTagFromNota, updateNota } from "../controllers/nota.controller.js";
import { validateBody, validateParams, validateQuery } from "../middleware/validate.js";
import { IdParamSchema, NotaTagParamsSchema } from "../schemas/common.schema.js";
import {
  CreateNotaDtoSchema,
  ListNotasQuerySchema,
  UpdateNotaDtoSchema,
} from "../schemas/nota.schema.js";

export const notasRouter = Router();

notasRouter.get("/", validateQuery(ListNotasQuerySchema), listNotas);
notasRouter.post("/", validateBody(CreateNotaDtoSchema), createNota);
notasRouter.get("/:id", validateParams(IdParamSchema), getNota);
notasRouter.put("/:id", validateParams(IdParamSchema), validateBody(UpdateNotaDtoSchema), updateNota);
notasRouter.delete(
  "/:id/etiquetas/:etiquetaId",
  validateParams(NotaTagParamsSchema),
  removeTagFromNota,
);
notasRouter.delete("/:id", validateParams(IdParamSchema), deleteNota);
