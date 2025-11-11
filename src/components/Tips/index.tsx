import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext()

  const nextCycleType = getNextCycleType(state.currentCycle)

  const tipsForWhenCreatingNewTasks = {
    workTime: <span>{state.config.workTime} minutos de foco total. Evite distrações!</span>,
    shortBreakTime: <span>Uma pausa rápida de {state.config.shortBreakTime} minutos para recarregar.</span>,
    longBreakTime: <span>Hora de relaxar! Aproveite seus {state.config.longBreakTime} minutos.</span>
  }

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>Próximo descanso é de {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Próximo descanso será de {state.config.longBreakTime}min</span>,
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenCreatingNewTasks[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}

    </>
  )
}