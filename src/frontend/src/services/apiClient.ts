const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

export type ValidationDetail = {
  field: string;
  message: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationApiError extends ApiError {
  constructor(
    message: string,
    status: number,
    readonly fieldErrors: Record<string, string>,
  ) {
    super(message, status);
    this.name = "ValidationApiError";
  }
}

function parseValidationDetails(details: ValidationDetail[]): Record<string, string> {
  return Object.fromEntries(details.map((detail) => [detail.field, detail.message]));
}

async function parseErrorResponse(response: Response): Promise<never> {
  try {
    const body = (await response.json()) as {
      error?: {
        message?: string;
        code?: string;
        details?: ValidationDetail[];
      };
    };

    if (body.error?.code === "VALIDATION_ERROR" && body.error.details?.length) {
      throw new ValidationApiError(
        body.error.message ?? "Los datos enviados no son válidos",
        response.status,
        parseValidationDetails(body.error.details),
      );
    }

    throw new ApiError(
      body.error?.message ?? `Request failed with status ${response.status}`,
      response.status,
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    await parseErrorResponse(response);
  }

  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    await parseErrorResponse(response);
  }

  return response.json() as Promise<T>;
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    await parseErrorResponse(response);
  }

  return response.json() as Promise<T>;
}

export async function apiDelete(path: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await parseErrorResponse(response);
  }
}
