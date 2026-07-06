import { Router } from "express";
import { createNota, deleteNota, getNota, listNotas, updateNota } from "../controllers/nota.controller.js";
import { validateBody, validateParams, validateQuery } from "../middleware/validate.js";
import { IdParamSchema } from "../schemas/common.schema.js";
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
notasRouter.delete("/:id", validateParams(IdParamSchema), deleteNota);
