import type { TaskModel } from "../models/TaskModel";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completedAt) return "Concluída";
  if (task.interruptedAt) return "Interrompida";
  if (activeTask && task.id === activeTask?.id) return "Em andamento";
  return "Abandonada";
}
