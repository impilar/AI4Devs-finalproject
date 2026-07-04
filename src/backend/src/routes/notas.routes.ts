import { Router } from "express";
import { listNotas } from "../controllers/nota.controller.js";
import { validateQuery } from "../middleware/validate.js";
import { ListNotasQuerySchema } from "../schemas/nota.schema.js";

export const notasRouter = Router();

notasRouter.get("/", validateQuery(ListNotasQuerySchema), listNotas);
