import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  duration: number; // duration in minutes
  startedAt: number;
  completedAt?: number | null;
  interruptedAt?: number | null; // timestamp when the task was interrupted
  type: keyof TaskStateModel["config"]; // 'workTime' | 'shortBreakTime' | 'longBreakTime'
};
