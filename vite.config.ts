import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
  // raw: {
   //   extensions: ["html", "txt"],
    //  glob: ["**.html"],
   // },

   

    sourcemap: true
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
