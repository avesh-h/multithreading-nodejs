import cluster from "node:cluster";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

//This file is gonna works like load balance and request go through it

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cpuCounts = os.cpus().length;

cluster.setupPrimary({
  exec: __dirname + "/index-cluster.js",
});

for (let i = 0; i < cpuCounts; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  cluster.fork();
});
