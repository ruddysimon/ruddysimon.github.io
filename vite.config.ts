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
          const handler = mod.default as (req: Request) => Promise<Response>;

          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const rawBody = chunks.length
            ? Buffer.concat(chunks).toString("utf8")
            : undefined;

          const url = `http://localhost${req.url ?? "/api/ask"}`;
          const request = new Request(url, {
            method: req.method,
            headers: rawBody ? { "content-type": "application/json" } : {},
            body: rawBody,
          });

          const response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));

          if (response.body) {
            const reader = response.body.getReader();
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              if (value) res.write(Buffer.from(value));
            }
          }
          res.end();
        } catch (err) {
          console.error("[ask-simon-dev-api]", err);
          if (!res.headersSent) res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}
