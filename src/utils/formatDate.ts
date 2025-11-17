import { format } from "date-fns";

export function formatDate(timeStamp: number) {
  const date = new Date(timeStamp);
  return format(date, "dd/MM/yyyy 'às' HH:mm");
}
