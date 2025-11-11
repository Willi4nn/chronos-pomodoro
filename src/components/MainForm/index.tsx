import { PlayCircleIcon, StopCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { showMessage } from '../../adapters/showMessage'
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import type { TaskModel } from '../../models/TaskModel'
import { getNextCycleType } from '../../utils/getNextCycleType'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { DefaultInput } from '../DefaultInput'
import { Tips } from '../Tips'

export default function MainForm() {
  const { state, dispatch } = useTaskContext()
  const [task, setTask] = useState('')

  const nextCycleType = getNextCycleType(state.currentCycle)

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    showMessage.dismiss()

    if (task === null || task.trim() === '') {
      showMessage.warn('Por favor, digite uma tarefa válida.')
      return
    }

    const newTask: TaskModel = {
      id: String(new Date().getTime()),
      name: task,
      startedAt: Date.now(),
      completedAt: null,
      interruptedAt: null,
      duration: state.config[nextCycleType],
      type: nextCycleType
    }

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask })

    showMessage.success(`Tarefa "${task}" iniciada! Bom trabalho! 💪`
    )
  }

  function handleInterruptTask(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    showMessage.info('Tarefa interrompida')
    event.stopPropagation()
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK })
  }

  return (
    <div className="mainFormContainer">
      <form id="taskForm" onSubmit={handleCreateNewTask} className='form' action="">
        <div className="formRow">
          <DefaultInput
            label='task'
            type="text"
            id="myInput"
            placeholder="Digite algo..."
            value={task}
            onChange={e => setTask(e.target.value)}
            disabled={!!state.activeTask}
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
            aria-label='Iniciar tarefa'
            title='Iniciar tarefa'
            type='submit'
            form="taskForm"
            icon={<PlayCircleIcon />}
          />
        ) : (
          <DefaultButton
            aria-label='Parar tarefa'
            title='Parar tarefa'
            type='button'
            color='red'
            onClick={handleInterruptTask}
            icon={<StopCircleIcon />}
          />
        )}
      </div>
    </div>
  )
}
