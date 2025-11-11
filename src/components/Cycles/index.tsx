import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { getNextCycle } from '../../utils/getNextCycle'
import { getNextCycleType } from '../../utils/getNextCycleType'
import styles from './styles.module.css'

const translateCycleType = (type: string): string => {
  const translations = {
    workTime: 'Trabalho',
    shortBreakTime: 'Pausa Curta',
    longBreakTime: 'Pausa Longa'
  }
  return translations[type as keyof typeof translations] || type
}

export function Cycles() {
  const { state } = useTaskContext()
  const cycleStep = Array.from({ length: state.currentCycle })

  return (
    <div className={styles.cyclesContainer}>
      <span>Cicles:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index)
          const nextCycleType = getNextCycleType(nextCycle)
          return (
            <div
              key={`cycle-${index}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]} ${index + 1 === state.currentCycle ? styles.currentCycle : ''}`}
              aria-label={`Ciclo ${index + 1} - ${translateCycleType(nextCycleType)}`}
              title={`Ciclo ${index + 1} - ${translateCycleType(nextCycleType)}`}
            />
          )
        })}
      </div>
    </div>
  )
}