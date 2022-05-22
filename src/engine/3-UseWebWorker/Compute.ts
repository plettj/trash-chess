let i = 0;

export default function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout(timedCount, 2000);
}

timedCount();