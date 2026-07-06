import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(message = "Nota no encontrada") {
    super("NOT_FOUND", message, 404);
  }
}
