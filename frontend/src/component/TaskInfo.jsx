import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { getTaskInfo } from '../api/taskApi'
import { useAuth } from '../hook/useAuth'
import { useMutate } from '../hook/useMutate'

export function TaskInfo() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return null
  }

  return (
    <TaskInfoInner />
  )
} 

const emptyInfo = {
  pomodoroSpentTotal: 0,
  pomodoroSpent7days: 0,
  pomodoroSpentToday: 0,
  taskCompletedTotal: 0,
  taskCompleted7days: 0,
  taskCompletedToday: 0
}

function TaskInfoInner() {
  const [info, setInfo] = useState(emptyInfo)
  const { token, logout } = useAuth()
  const { mutateTimestamp } = useMutate()

  useEffect(() => {
    getTaskInfo(token, logout).then((data) => {
      if (data) {
        setInfo(data)
      } else {
        setInfo(emptyInfo)
      }
    })
  }, [mutateTimestamp])

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
