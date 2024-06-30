import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
  },
  // Server config for both dev and preview
  server: {
    host: true, // This listens on all available network interfaces
    port: process.env.PORT || 3000,
  },
})
