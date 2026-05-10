import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { apiReference } from "@scalar/express-api-reference"
import { Router } from "express"

export const docsRoutes = Router()

docsRoutes.get("/openapi.json", async (_req, res) => {
  const openApiPath = resolve(process.cwd(), "openapi", "trainfuel.openapi.json")

  const file = await readFile(openApiPath, "utf-8")

  res.type("application/json")

  return res.send(file)
})

// Scalar reads the OpenAPI JSON from /openapi.json
// and renders it as a nice browser-based API reference.
//
// You will open this page in the browser:
// http://localhost:4000/reference
docsRoutes.use(
  "/reference",
  apiReference({
    url: "/openapi.json",
    theme: "purple"
  })
)
