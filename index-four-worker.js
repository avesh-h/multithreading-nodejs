const express = require("express");
const { Worker } = require("worker_threads");

const app = express();

//In this tutorial we dividing the same index task to the 4 threads now same task will be resolved in the 4 different threads parallely for reducing the time complexity.

const THREAD_COUNT = 4;

app.get("/non-block", (req, res, next) => {
  return res.status(200).send("Non blocking task");
});

const workerTask = () => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./four-worker.js", {
      workerData: { numberOfThreads: THREAD_COUNT },
    });
    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (error) => {
      reject(error);
    });
  });
};

app.get("/block", async (req, res) => {
  const workerPromises = [];

  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(workerTask());
  }
  const resolvedTaskData = await Promise.all(workerPromises);
  console.log("resolvedDataaaaaaaaaaaaaa", resolvedTaskData);
  const taskData =
    resolvedTaskData[0] +
    resolvedTaskData[1] +
    resolvedTaskData[2] +
    resolvedTaskData[3];
  res.status(200).send("Total count " + taskData);
});

app.listen(3000, () => {
  console.log("server is live");
});
