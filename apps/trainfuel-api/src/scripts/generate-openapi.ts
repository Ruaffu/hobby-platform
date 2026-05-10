import { mkdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { OpenAPIGenerator } from "@orpc/openapi"
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4"
import { router } from "../orpc/router"

// This script generates an OpenAPI specification from the oRPC router.
//
// The output file will be written to:
// openapi/trainfuel.openapi.json

const generator = new OpenAPIGenerator({
  // oRPC needs a schema converter so it knows how to turn Zod schemas
  // into JSON Schema objects inside the OpenAPI document.
  schemaConverters: [new ZodToJsonSchemaConverter()]
})

const spec = await generator.generate(router, {
  info: {
    title: "TrainFuel API",
    version: "0.0.0",
    description: "API for TrainFuel, the meal planning and nutrition tracking app."
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local development server"
    }
  ]
})

const outPutDir = resolve(process.cwd(), "openapi")
const outPutPath = resolve(outPutDir, "trainfuel.openapi.json")

await mkdir(outPutDir, {
  recursive: true
})

await writeFile(outPutPath, JSON.stringify(spec, null, 2))

console.log(`OpenAPI specification written to ${outPutPath}`)
