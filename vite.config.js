import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";

// Create __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteCompression()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@styles": resolve(__dirname, "./src/styles"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        robots: resolve(__dirname, "robots.txt"),
        sitemap: resolve(__dirname, "public/sitemap.xml"),
      },
    },
  },
});
