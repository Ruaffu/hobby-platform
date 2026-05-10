import express from "express"
import { AppDataSource } from "./db/data-source"
import { docsRoutes } from "./modules/docs/routes/docs.routes"
import { orpcHandler } from "./orpc/handler"

const app = express()

app.use(express.json())

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    service: "trainfuel-api"
  })
})

// Documentation routes.
//
// GET /openapi.json returns the generated OpenAPI document.
// GET /reference shows the browser API docs.
app.use(docsRoutes)

app.use(async (req, res, next) => {
  const result = await orpcHandler.handle(req, res, {
    context: {
      headers: req.headers
    }
  })

  if (result.matched) {
    return
  }

  next()
})

app.use((_req, res) => {
  res.status(404).json({
    error: "Not found"
  })
})

const start = async () => {
  await AppDataSource.initialize()

  app.listen(4000, () => {
    console.log("TrainFuel API running on http://localhost:4000")
    console.log("OpenAPI JSON available at http://localhost:4000/openapi.json")
    console.log("API reference available at http://localhost:4000/reference")
  })
}

start().catch((error) => {
  console.error("Failed to start API", error)
  process.exit(1)
})
