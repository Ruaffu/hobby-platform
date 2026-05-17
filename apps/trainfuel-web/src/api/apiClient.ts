import { env } from "../config/env"

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
}

// Small wrapper around fetch.
//
// Why?
// - Keeps API base URL in one place.
// - Avoids repeating response.ok checks everywhere.
// - Automatically JSON-stringifies request bodies.
// - Automatically parses JSON responses.
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
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}
