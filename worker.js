const { parentPort } = require("worker_threads");

let count = 0;

for (let i = 0; i < 10000000000; i++) {
  count += i;
}

//After resolving the task via seperate worker we need to transfer the resolved data to main thread to further proceed with postmessage.

parentPort.postMessage(count);
