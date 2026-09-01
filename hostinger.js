import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const vinextPath = fileURLToPath(
  new URL("./node_modules/vinext/dist/cli.js", import.meta.url)
);

console.log("Iniciando Vinext:", vinextPath);

const child = spawn(process.execPath, [vinextPath, "start"], {
  stdio: "inherit",
  env: {
    ...process.env,
    HOST: "0.0.0.0",
    PORT: process.env.PORT || "3000",
  },
});

child.on("error", (error) => {
  console.error("Erro ao iniciar o Vinext:", error);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});