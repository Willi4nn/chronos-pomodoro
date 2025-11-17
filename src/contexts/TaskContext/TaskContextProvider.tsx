import { useEffect, useReducer, useRef } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { loadBeep } from '../../utils/loadBeep';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes } from './taskActions';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storagedState = localStorage.getItem('state')

    if (storagedState === null) return initialTaskState;

    const parsedStoragedState = JSON.parse(storagedState) as TaskStateModel;

    return {
      ...parsedStoragedState,
      active: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    }
  });
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const workerStartedRef = useRef(false);

  const worker = TimerWorkerManager.getInstance();

  useEffect(() => {
    worker.onmessage(e => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }

        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });
        worker.terminate();
        workerStartedRef.current = false;
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
  }, [worker]);

  useEffect(() => {
    if (state.activeTask) {
      document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    }
  }, [state.activeTask, state.formattedSecondsRemaining]);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));

    if (state.activeTask && !workerStartedRef.current) {
      worker.postMessage(state);
      workerStartedRef.current = true;
    } else if (!state.activeTask) {
      worker.terminate();
      workerStartedRef.current = false;
    }
  }, [worker, state.activeTask, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}