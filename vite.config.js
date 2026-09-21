import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Served from https://ahmedsameh96589-sudo.github.io/quill-ai/
  base: "/quill-ai/",
  plugins: [react(), tailwindcss()],
});
