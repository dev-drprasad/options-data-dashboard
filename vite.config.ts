import { URL, fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const bodyBackground = "#f0f2f5";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "shared", replacement: fileURLToPath(new URL("./src/shared", import.meta.url)) },
      { find: "components", replacement: fileURLToPath(new URL("./src/components", import.meta.url)) },
      { find: "business", replacement: fileURLToPath(new URL("./src/business", import.meta.url)) },
    ],
  },
});
