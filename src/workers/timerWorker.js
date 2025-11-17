let intervalId = null;

self.onmessage = function (event) {
  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  if (!activeTask) {
    return;
  }

  const endDate = activeTask.startedAt + secondsRemaining * 1000;

  function tick() {
    const now = Date.now();
    const countDownSeconds = Math.floor((endDate - now) / 1000);

    self.postMessage(countDownSeconds);

    if (countDownSeconds <= 0) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  tick();

  intervalId = setInterval(tick, 1000);
};
