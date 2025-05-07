import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Trash } from '@phosphor-icons/react'

export function TaskCard({
  id,
  taskName,
  pomodoroGoal,
}) {
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
