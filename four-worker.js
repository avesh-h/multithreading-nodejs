const { workerData, parentPort } = require("worker_threads");

//if we want to send the extra data from main file to let worker know then use workerData object of worker_threads

let count = 0;

for (let i = 0; i < 10000000000 / workerData.numberOfThreads; i++) {
  count += i;
}

parentPort.postMessage(count);
