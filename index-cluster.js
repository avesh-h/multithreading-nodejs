import express from "express";
import { Worker } from "worker_threads";
import os from "os";

const app = express();

app.get("/heavy-task", (req, res, next) => {
  let count = 0;

  for (let i = 0; i < 50_000_000; i++) {
    count += i;
  }
  return res.status(200).send("Non blocking task");
});

app.listen(3000, () => {
  console.log("server is live " + process.pid);
});
