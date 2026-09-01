import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const prodServerPath = path.join(
  root,
  "node_modules",
  "vinext",
  "dist",
  "server",
  "prod-server.js"
);

(async () => {
  const { startProdServer } = await import(
    pathToFileURL(prodServerPath).href
  );

  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "0.0.0.0";
  const outDir = path.join(root, "dist");

  console.log("Iniciando servidor Vinext:", {
    host,
    port,
    outDir,
  });

  await startProdServer({
    port,
    host,
    outDir,
  });
})().catch((error) => {
  console.error("Erro ao iniciar o servidor Vinext:", error);
  process.exit(1);
});