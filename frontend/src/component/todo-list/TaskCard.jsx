import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Trash } from '@phosphor-icons/react'
import { deleteTask } from '../../api/taskApi'
import { useAuth } from '../../hook/useAuth'

export function TaskCard({
  id,
  taskName,
  pomodoroGoal,
  onDelete
}) {
  const { token, logout } = useAuth()
  const onDeleteButtonClick = async () => {
    await deleteTask(id, token, logout)
    await onDelete()
  }
  return (
    <Flex
      className='rounded-xl bg-slate-50 shadow-md hover:shadow-lg transition-shadow p-4'
      align='center'
      justify='between'
    >
      <div>
        <Text>
          {taskName}
        </Text>
        <Pomodoros pomodoroGoal={pomodoroGoal} />
      </div>
      <button
        className='p-1 border border-solid border-red-400 rounded text-red-500 hover:bg-red-200'
        onClick={onDeleteButtonClick}
      >
        <Trash size={20} />
      </button>
    </Flex>
  )
}

function Pomodoros({ pomodoroGoal }) {
  const podomoros = new Array(pomodoroGoal)
  podomoros.fill('🍅')
  return (
    <div>{podomoros.join('')}</div>
  )
}
