import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(__dirname, ".env.local") });
loadEnv({ path: path.resolve(__dirname, ".env") });

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && askSimonDevApi(),
  ].filter(Boolean) as Plugin[],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

function askSimonDevApi(): Plugin {
  return {
    name: "ask-simon-dev-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/ask", async (req, res) => {
        try {
          const mod = await server.ssrLoadModule(
            path.resolve(__dirname, "api/ask.ts")
          );
          await mod.default(req, res);
        } catch (err) {
          console.error("[ask-simon-dev-api]", err);
          if (!res.headersSent) res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}
