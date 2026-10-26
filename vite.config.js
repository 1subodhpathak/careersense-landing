import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { pages, renderPage } from "./src/data/seoPagesData.js";

function seoDevPlugin() {
  return {
    name: "seo-dev-prerender",
    transformIndexHtml(html, ctx) {
      const cleanPath = (ctx?.originalUrl || ctx?.path || "/").split("?")[0].replace(/\/$/, "") || "/";
      const matchedPage = pages.find((p) => p.path === cleanPath);
      if (matchedPage) {
        return renderPage(html, matchedPage);
      }
      return html;
    },
  };
}

export default defineConfig({
  plugins: [react(), seoDevPlugin()],
});
