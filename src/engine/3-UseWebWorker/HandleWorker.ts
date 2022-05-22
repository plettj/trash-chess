let w: Worker | undefined;

export default function StartWorker() {
  if(typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      w = new Worker("Compute.ts");
    }
    w.onmessage = function(event) {
      w?.postMessage(event.data);
      stopWorker();
    };
  } else {
    console.log("Trash Chess won't work while you use a Trash Browser.");
  }
}

function stopWorker() { 
  w?.terminate();
  w = undefined;
}