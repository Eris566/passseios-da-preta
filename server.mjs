import { spawn } from "node:child_process";

const child = spawn("npm", ["start"], {
  stdio: "inherit",
  env: {
    ...process.env,
    HOST: process.env.HOST || "0.0.0.0",
  },
});

child.on("error", (error) => {
  console.error("Erro ao iniciar o Vinext:", error);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});