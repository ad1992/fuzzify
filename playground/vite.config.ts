import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5001,
    // open the browser
    open: true,
  },
  build: {
    outDir: "../public",
    emptyOutDir: true,
    assetsDir: "./",
  },
});
