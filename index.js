const express = require("express");
const { Worker } = require("worker_threads");

const app = express();

app.get("/non-block", (req, res, next) => {
  return res.status(200).send("Non blocking task");
});

//Here we declare the worker and deliver the task to the worker thread to resolve it and don't block the main thread.
app.get("/block", (req, res) => {
  const worker = new Worker("./worker.js");

  //After resolving the other thread is send message to the main thread and send the resolved the data to main thread via message event.
  worker.on("message", (data) => {
    return res.status(200).send("Block task count is" + data);
  });

  worker.on("error", (error) => {
    return res.status(400).send("An error occured in worker" + error);
  });
});

app.listen(3000, () => {
  console.log("server is live");
});
