import { env } from "../config/env"

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
}

type ApiErrorBody = {
  error?: string
  message?: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

const readErrorMessage = async (response: Response) => {
  try {
    const body = (await response.json()) as ApiErrorBody
    return body.message ?? body.error ?? `Api request failed: ${response.status}`
  } catch {
    return `API request failed: ${response.status}`
  }
}

export const apiRequest = async <TResponse>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<TResponse> => {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  })

  if (!response.ok) {
    const message = await readErrorMessage(response)
    throw new ApiError(message, response.status)
  }

  return response.json() as Promise<TResponse>
}
