import { OpenAPIHandler } from "@orpc/openapi/node"
import { onError } from "@orpc/server"
import { CORSPlugin } from "@orpc/server/plugins"
import { router } from "./router"

export const orpcHandler = new OpenAPIHandler(router, {
  plugins: [new CORSPlugin()],

  interceptors: [
    onError((error) => {
      console.error("oRPC error:", error)
    })
  ]
})
