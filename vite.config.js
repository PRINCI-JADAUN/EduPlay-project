import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/testSetup.js",
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/@dimforge/rapier3d-compat/")) return "rapier-engine";
          if (id.includes("/node_modules/three/")) return "three";
          if (id.includes("/node_modules/@react-three/")) return "react-three";
        },
      },
    },
  },
});

