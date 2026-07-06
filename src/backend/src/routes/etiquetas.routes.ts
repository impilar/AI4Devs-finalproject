import { Router } from "express";
import { listEtiquetas } from "../controllers/etiqueta.controller.js";

export const etiquetasRouter = Router();

etiquetasRouter.get("/", listEtiquetas);
