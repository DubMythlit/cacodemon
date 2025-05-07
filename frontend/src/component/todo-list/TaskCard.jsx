import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Circle, CheckCircle, Trash } from '@phosphor-icons/react'
import { completeTask, deleteTask } from '../../api/taskApi'
import { useAuth } from '../../hook/useAuth'

export function TaskCard({
  id,
  taskName,
  pomodoroGoal,
  completedAt,
  onMutate
}) {
  const { token, logout } = useAuth()
  const onCompleteButtonClick = async () => {
    // TODO: 實際的 pomodoroSpent 要在 Timer 跑完一次 25 分鐘才 +1
    const pomodoroSpent = 0
    await completeTask(id, pomodoroSpent, token, logout)
    await onMutate()
  }
  const onDeleteButtonClick = async () => {
    await deleteTask(id, token, logout)
    await onMutate()
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
        <div>
          <Text>
            {taskName}
          </Text>
          <Pomodoros pomodoroGoal={pomodoroGoal} />
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

function Pomodoros({ pomodoroGoal }) {
  const podomoros = new Array(pomodoroGoal)
  podomoros.fill('🍅')
  return (
    <div>{podomoros.join('')}</div>
  )
}
