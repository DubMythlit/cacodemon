import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hook/useAuth'
import { useMutate } from '../../hook/useMutate'
import { getAllTasks, getAllFinishedTasks } from '../../api/taskApi'
import { TaskCard } from './TaskCard'
import { Flex, Text } from '@radix-ui/themes'

export function TaskList() {
  const { token, logout } = useAuth()
  const { mutateTimestamp } = useMutate()
  const [todoTasks, setTodoTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])

  useEffect(() => {
    Promise.all([
      getAllTasks(token, logout),
      getAllFinishedTasks(token, logout)
    ]).then(([todoTasks, finishedTasks]) => {
      setTodoTasks(todoTasks)
      setFinishedTasks(finishedTasks)
    }).catch(console.error)
  }, [mutateTimestamp])

  return (
    <Flex
      className='bg-gray-200 rounded-lg p-4 max-h-[75vh] overflow-y-scroll'
      direction='column'
      gap='2'
    >
      <Text size='2'>未完成</Text>
      <ul className='flex gap-3 flex-col w-full'>
        {todoTasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard
                task={task}
              />
            </li>
          )
        })}
      </ul>
      <Text size='2'>已完成</Text>
      <ul className='flex gap-3 flex-col w-full'>
        {finishedTasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard
                task={task}
              />
            </li>
          )
        })}
      </ul>
    </Flex>
  )
}
