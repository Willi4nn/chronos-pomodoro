import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainLayout } from "../../components/Layouts/MainLayout";

import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import styles from "./styles.module.css";

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startedAt",
        direction: "desc",
      };
    }
  );

  useEffect(() => {
    setSortTaskOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        field: prevState.field,
        direction: prevState.direction,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    document.title = "Histórico | Chronos Pomodoro";
  }, []);

  useEffect(() => {
    if (!confirmClearHistory) return;
    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTaskOptions.direction === "desc" ? "asc" : "desc";

    setSortTaskOptions({
      tasks: sortTasks({
        tasks: sortTaskOptions.tasks,
        field,
        direction: newDirection,
      }),
      field,
      direction: newDirection,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm("Tem certeza", (confirmation) => {
      setConfirmClearHistory(confirmation);
    });
  }

  return (
    <MainLayout>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color="red"
                aria-label="Apagar todo histórico"
                title="Apagar todo histórico"
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: "name" })}
                  >
                    Tarefa
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: "duration" })}
                  >
                    Duração
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: "startedAt" })}
                  >
                    Data
                  </th>
                  <th className={styles.thSort}>Status</th>
                  <th className={styles.thSort}>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTaskOptions.tasks.map((task) => {
                  const taskTypeDicionary = {
                    workTime: "Foco",
                    shortBreakTime: "Pausa curta",
                    longBreakTime: "Pausa longa",
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration} min</td>
                      <td>{formatDate(task.startedAt)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDicionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p style={{ textAlign: "center" }}>
            Ainda não existem tarefas criadas
          </p>
        )}
      </Container>
    </MainLayout>
  );
}
