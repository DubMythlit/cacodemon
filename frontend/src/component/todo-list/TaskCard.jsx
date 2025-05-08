import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Circle, CheckCircle, PlayCircle, Trash } from '@phosphor-icons/react'
import { completeTask, reopenTask, deleteTask } from '../../api/taskApi'
import { useAuth } from '../../hook/useAuth'
import { useMutate } from '../../hook/useMutate'
import { useCurrentTask } from '../../hook/useCurrentTask'
import { PomodoroGauge } from '../PomodoroGauge'

export function TaskCard({ task }) {
  const { id, taskName, pomodoroGoal, pomodoroSpent, completedAt } = task
  const { token, logout } = useAuth()
  const { mutate } = useMutate()
  const { setCurrentTask } = useCurrentTask()

  const completed = completedAt !== null
  const onCompleteButtonClick = async () => {
    // TODO: 實際的 pomodoroSpent 要在 Timer 跑完一次 25 分鐘才 +1
    const pomodoroSpent = 0
    if (completed) {
      await reopenTask(id, token, logout)
    } else {
      await completeTask(id, pomodoroSpent, token, logout)
    }
    setCurrentTask(null)
    mutate()
  }
  const onDeleteButtonClick = async () => {
    await deleteTask(id, token, logout)
    mutate()
  }
  return (
    <Flex
      className='rounded-xl bg-slate-50 shadow-md hover:shadow-lg transition-shadow p-4'
      align='center'
      justify='between'
    >
      <Flex align='center'>
        <CompleteButton
          onClick={onCompleteButtonClick}
          completed={completedAt !== null}
        />
        {!completedAt && (
          <PlayButton
            onClick={() => setCurrentTask(task)}
          />
        )}
        <div>
          <Text>
            {taskName}
          </Text>
          <PomodoroGauge
            pomodoroGoal={pomodoroGoal}
            pomodoroSpent={pomodoroSpent}
          />
        </div>
      </Flex>
      <button
        className='p-1 border border-solid border-red-400 rounded text-red-500 hover:bg-red-200'
        onClick={onDeleteButtonClick}
      >
        <Trash size={20} />
      </button>
    </Flex>
  )
}

function CompleteButton({ onClick, completed }) {
  if (completed) {
    return (
      <button
        className='text-green-400 hover:text-green-600'
        onClick={onClick}
      >
        <CheckCircle size={32} />
      </button>
    )
  }
  
  return (
    <button
      className='text-slate-200 hover:text-slate-400'
      onClick={onClick}
    >
      <Circle size={32} />
    </button>
  )
}

function PlayButton({ onClick }) {
  return (
    <button
      className='text-slate-200 hover:text-green-400'
      onClick={onClick}
    >
      <PlayCircle size={32} />
    </button>
  )
}
