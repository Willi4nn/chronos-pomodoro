import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

export function CountDown() {
  const { state } = useTaskContext();

  return (
    <div
      className={styles.container}
      aria-live="polite"
      aria-atomic="true"
      role="timer"
    >
      {state.formattedSecondsRemaining}
    </div>
  );
}
