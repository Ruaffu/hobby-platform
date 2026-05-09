import express from "express"
import { CreateFoodSchema } from "../../../packages/contracts/src"

const app = express()

app.use(express.json())

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    service: "trainfuel-api"
  })
})

app.post("/food", (req, res) => {
    const result = CreateFoodSchema.safeParse(req.body)

    if(!result.success) {
        return res.status(400).json({
            error: "Invalid food",
            details: result.error.issues
        })
    }

    return res.status(201).json({
        id: crypto.randomUUID(),
        ...result.data
    })
})

app.listen(4000, () => {
  console.log("TrainFuel API running on http://localhost:4000")
})