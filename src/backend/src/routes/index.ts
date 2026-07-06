import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";
import { buscarRouter } from "./buscar.routes.js";
import { etiquetasRouter } from "./etiquetas.routes.js";
import { notasRouter } from "./notas.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", healthCheck);
apiRouter.use("/buscar", buscarRouter);
apiRouter.use("/etiquetas", etiquetasRouter);
apiRouter.use("/notas", notasRouter);
