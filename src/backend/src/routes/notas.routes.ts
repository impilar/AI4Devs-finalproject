import { Router } from "express";
import { getNota, listNotas } from "../controllers/nota.controller.js";
import { validateParams, validateQuery } from "../middleware/validate.js";
import { IdParamSchema } from "../schemas/common.schema.js";
import { ListNotasQuerySchema } from "../schemas/nota.schema.js";

export const notasRouter = Router();

notasRouter.get("/", validateQuery(ListNotasQuerySchema), listNotas);
notasRouter.get("/:id", validateParams(IdParamSchema), getNota);
