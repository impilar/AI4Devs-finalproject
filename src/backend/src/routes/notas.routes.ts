import { Router } from "express";
import { createNota, getNota, listNotas } from "../controllers/nota.controller.js";
import { validateBody, validateParams, validateQuery } from "../middleware/validate.js";
import { IdParamSchema } from "../schemas/common.schema.js";
import { CreateNotaDtoSchema, ListNotasQuerySchema } from "../schemas/nota.schema.js";

export const notasRouter = Router();

notasRouter.get("/", validateQuery(ListNotasQuerySchema), listNotas);
notasRouter.post("/", validateBody(CreateNotaDtoSchema), createNota);
notasRouter.get("/:id", validateParams(IdParamSchema), getNota);
