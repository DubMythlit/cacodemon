import React, { useState } from 'react'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { PomodoroGoalPicker } from './PomodoroGoalPicker'

export function TodoList() {
  const [pomodomoGoal, setPomorodoGoal] = useState(0)
  return (
    <div className='w-[330px] m-2'>
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
          />
          <Button variant='outline'>
            新增
          </Button>
        </Flex>
        <PomodoroGoalPicker
          pomodomoGoal={pomodomoGoal}
          setPomorodoGoal={setPomorodoGoal}
        />
      </Flex>
      <Flex>
        // TODO: 任務列表
      </Flex>
    </div>
  )
}
