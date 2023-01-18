import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import i18nextLoader from "vite-plugin-i18next-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    i18nextLoader({
      paths: [
        "./locales",
      ],
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
});
