import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

export function TaskInfo() {
  const info = {
    pomodoroSpentTotal: 12,
    pomodoroSpent7days: 6,
    pomodoroSpentToday: 1,
    taskCompletedTotal: 5,
    taskCompleted7days: 3,
    taskCompletedToday: 1
  }

  return (
    <Flex
      className='w-[400px] rounded-xl bg-gray-200 p-2'
      direction='column'
      gap='2'
    >  
        <Flex className='rounded-xl bg-slate-50 shadow-md hover:shadow-lg transition-shadow p-4'>
          <Text>
            本日：
          </Text>
          <Text>
            已專注 {spentPomodoroToTime(info.pomodoroSpentToday)}  已完成 {info.taskCompletedToday}任務
          </Text>
        </Flex>
        <Flex className='rounded-xl bg-slate-50 shadow-md hover:shadow-lg transition-shadow p-4'>
          <Text>
            過去七天：
          </Text>
          <Text>
            已專注 {spentPomodoroToTime(info.pomodoroSpent7days)}  已完成 {info.taskCompleted7days}任務
          </Text>
        </Flex>
        <Flex className='rounded-xl bg-slate-50 shadow-md hover:shadow-lg transition-shadow p-4'>
          <Text>
            總結：
          </Text>
          <Text>
            已專注 {spentPomodoroToTime(info.pomodoroSpentTotal)}  已完成 {info.taskCompletedTotal}任務
          </Text>
      </Flex>
    </Flex>
  )
}

function spentPomodoroToTime (spent) {
  const totalMinutes = spent * 25
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours > 0) {
    return `${hours} 小時 ${minutes} 分`
  } else {
    return `${minutes} 分`
  }
}
