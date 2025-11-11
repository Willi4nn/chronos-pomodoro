// timerWorker.js - VERSÃO CORRIGIDA
let intervalId = null;

self.onmessage = function (event) {
  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  // Limpa interval anterior se existir
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Se não há tarefa ativa, apenas limpa e retorna
  if (!activeTask) {
    return;
  }

  const endDate = activeTask.startedAt + secondsRemaining * 1000; // CORRIGIDO: startedAt
  
  function tick() {
    const now = Date.now();
    const countDownSeconds = Math.floor((endDate - now) / 1000);
    
    self.postMessage(countDownSeconds);
    
    if (countDownSeconds <= 0) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Executa imediatamente
  tick();
  
  // Continua executando a cada segundo
  intervalId = setInterval(tick, 1000);
};