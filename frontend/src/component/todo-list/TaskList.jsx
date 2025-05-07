import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hook/useAuth'
import { getAllTasks, getAllFinishedTasks } from '../../api/taskApi'
import { TaskCard } from './TaskCard'
import { Flex, Text } from '@radix-ui/themes'

export function TaskList({ mutateTimestamp }) {
  const { token, logout } = useAuth()
  const [todoTasks, setTodoTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])

  const fetchData = () => {
    return Promise.all([
      getAllTasks(token, logout),
      getAllFinishedTasks(token, logout)
    ]).then(([todoTasks, finishedTasks]) => {
      setTodoTasks(todoTasks)
      setFinishedTasks(finishedTasks)
    }).catch(console.error)
  }

  useEffect(() => {
    fetchData()
  }, [mutateTimestamp])

  return (
    <Flex
      className='bg-gray-200 rounded-lg p-4'
      flexGrow='1'
      direction='column'
      gap='2'
    >
      <Text size='2'>未完成</Text>
      <ul className='flex gap-3 flex-col w-full'>
        {todoTasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard
                id={task.id}
                taskName={task.taskName}
                pomodoroGoal={task.pomodoroGoal}
                completedAt={task.completedAt}
                onMutate={() => fetchData()}
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
                id={task.id}
                taskName={task.taskName}
                pomodoroGoal={task.pomodoroGoal}
                completedAt={task.completedAt}
                onMutate={() => fetchData()}
              />
            </li>
          )
        })}
      </ul>
    </Flex>
  )
}
