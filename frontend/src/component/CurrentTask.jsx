import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useCurrentTask } from '../hook/useCurrentTask'
import { PomodoroGauge } from './PomodoroGauge'
import { useAuth } from '../hook/useAuth'

export function CurrentTask() {
  const { currentTask, setCurrentTask } = useCurrentTask()
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return null
  }

  return (
    <Flex
      className='w-[400px] rounded-xl bg-gray-200 p-2'
      direction='column'
    >
      <CardDiscription active={currentTask !== null} />
      {currentTask && (
        <CurrentTaskCard
          task={currentTask}
          onCancel={() => setCurrentTask(null)}
        />
      )}
    </Flex>
  )
}

function CardDiscription({ active }) {
  if (active) {
    return (
      <Text>目前專注的任務</Text>
    )
  } else {
    return (
      <Text align='center'>
        目前沒有設定任務
      </Text>
    )
  }
}

function CurrentTaskCard({ task, onCancel }) {
  return (
    <Flex
      className='rounded-xl bg-slate-50 p-4'
      justify='between'
      align='center'
    >
      <div>
        <Text>{task.taskName}</Text>
        <PomodoroGauge
          pomodoroGoal={task.pomodoroGoal}
          pomodoroSpent={task.pomodoroSpent}
        />
      </div>
      <Button
        variant='outline'
        onClick={onCancel}
      >
        取消
      </Button>
    </Flex>
  )
}
