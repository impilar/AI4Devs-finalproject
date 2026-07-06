import type { NextFunction, Request, Response } from "express";
import {
  CreateBacklinkResponseSchema,
  ListBacklinksResponseSchema,
} from "../schemas/backlink.schema.js";
import { backlinkService } from "../services/backlink.service.js";

function routeParam(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

export async function createBacklink(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const origenId = routeParam(req.params.id);
    const { destinoId } = req.body as { destinoId: string };
    const data = await backlinkService.create(origenId, destinoId);
    const body = CreateBacklinkResponseSchema.parse({ data });
    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
}

export async function listBacklinksSalientes(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = await backlinkService.listSalientes(routeParam(req.params.id));
    const body = ListBacklinksResponseSchema.parse({ data });
    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
}

export async function listBacklinksEntrantes(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = await backlinkService.listEntrantes(routeParam(req.params.id));
    const body = ListBacklinksResponseSchema.parse({ data });
    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
}
