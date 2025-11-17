import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { Tips } from "../Tips";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";
  const nextCycleType = getNextCycleType(state.currentCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) {
      showMessage.error("Erro ao acessar o campo de tarefa.");
      return;
    }
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn("Digite o nome da tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startedAt: Date.now(),
      completedAt: null,
      interruptedAt: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    showMessage.success(`Tarefa "${taskName}" iniciada! Bom trabalho!`);
  }

  function handleInterruptTask(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    showMessage.dismiss();
    showMessage.info("Tarefa interrompida");
    event.stopPropagation();
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <div className="mainFormContainer">
      <form
        id="taskForm"
        onSubmit={handleCreateNewTask}
        className="form"
        action=""
      >
        <div className="formRow">
          <DefaultInput
            labelText="task"
            type="text"
            id="myInput"
            placeholder="Digite algo..."
            disabled={!!state.activeTask}
            ref={taskNameInput}
            defaultValue={lastTaskName}
          />
        </div>

        <div className="formRow">
          <Tips />
        </div>

        {state.currentCycle > 0 && (
          <div className="formRow">
            <Cycles />
          </div>
        )}
      </form>
      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            aria-label="Iniciar tarefa"
            title="Iniciar tarefa"
            type="submit"
            form="taskForm"
            icon={<PlayCircleIcon />}
          />
        ) : (
          <DefaultButton
            aria-label="Parar tarefa"
            title="Parar tarefa"
            type="button"
            color="red"
            onClick={handleInterruptTask}
            icon={<StopCircleIcon />}
          />
        )}
      </div>
    </div>
  );
}
