import React, { useState } from 'react'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { PomodoroGoalPicker } from './PomodoroGoalPicker'
import { createTask } from '../../api/taskApi'

export function TodoList() {
  const [taskName, setTaskName] = useState('')
  const [pomodomoGoal, setPomorodoGoal] = useState(0)

  const onCreateTask = async () => {
    await createTask(taskName, pomodomoGoal)
    setTaskName('')
    setPomorodoGoal(0)
  }

  return (
    <Flex
      className='w-[330px] m-2'
      direction='column'
      gap='1'
    >
      <Flex 
        className='bg-gray-200 rounded-lg p-4'
        direction='column'
        gap='1'
      >
        <Text>想新增什麼待辦事項嗎?</Text>
        <Flex justify='between' gap='2'>
          <TextField.Root
            placeholder='任務名稱'
            className='flex-grow'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Button
            variant='outline'
            onClick={onCreateTask}
          >
            新增
          </Button>
        </Flex>
        <PomodoroGoalPicker
          pomodomoGoal={pomodomoGoal}
          setPomorodoGoal={setPomorodoGoal}
        />
      </Flex>

      <Flex
        className='bg-gray-200 rounded-lg p-4'
        flexGrow='1'
      >
        // TODO: 任務列表
      </Flex>
    </Flex>
  )
}
