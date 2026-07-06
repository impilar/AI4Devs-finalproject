import { Router } from "express";
import { searchNotas } from "../controllers/search.controller.js";
import { validateQuery } from "../middleware/validate.js";
import { SearchQuerySchema } from "../schemas/search.schema.js";

export const buscarRouter = Router();

buscarRouter.get("/", validateQuery(SearchQuerySchema), searchNotas);
