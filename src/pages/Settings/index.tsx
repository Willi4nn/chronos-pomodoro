import { SaveIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { showMessage } from "../../adapters/showMessage";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainLayout } from "../../components/Layouts/MainLayout";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Configurações | Chronos Pomodoro";
  }, []);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    const formErrors = [] as string[];

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push("Por favor, insira valores numéricos válidos.");
    }

    if (workTime < 5 || workTime > 120) {
      formErrors.push("O tempo de foco deve ser entre 5 e 120 minutos.");
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push(
        "O tempo de descanso curto deve ser entre 1 e 30 minutos."
      );
    }
    if (longBreakTime < 5 || longBreakTime > 60) {
      formErrors.push(
        "O tempo de descanso longo deve ser entre 5 e 60 minutos."
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach((error) => showMessage.error(error));
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success("Configurações salvas com sucesso!");
  }

  return (
    <MainLayout>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as Configurações para tempo de foco, descanso curto e longo
          conforme sua preferência.
        </p>
      </Container>
      <Container>
        <form onSubmit={(e) => handleSaveSettings(e)} className="form">
          <div className="formRow">
            <DefaultInput
              id="workTime"
              labelText="Foco"
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="shortBreakTime"
              labelText="Descanso Curto"
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="longBreakTime"
              labelText="Descanso Longo"
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultButton
              icon={<SaveIcon />}
              aria-label="Salvar configurações"
              title="Salvar configurações"
              type="submit"
            />
          </div>
        </form>
      </Container>
    </MainLayout>
  );
}
