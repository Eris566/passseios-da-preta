import { startProdServer } from "vinext/server/prod-server";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

await startProdServer({
  port,
  host,
  outDir: "./dist",
});