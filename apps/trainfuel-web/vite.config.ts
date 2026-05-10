import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Vite plugins run during development/build.
// react() enables React support.
// tailwindcss() lets Vite understand @import "tailwindcss" in CSS.
export default defineConfig({
  plugins: [react(), tailwindcss()]
})
