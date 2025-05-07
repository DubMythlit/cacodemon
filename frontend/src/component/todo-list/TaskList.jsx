import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hook/useAuth'
import { getAllTasks } from '../../api/taskApi'
import { TaskCard } from './TaskCard'

export function TaskList({ createTaskTimestamp }) {
  const { token, logout } = useAuth()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getAllTasks(token, logout)
      .then(setTasks)
      .catch(console.error)
  }, [createTaskTimestamp])

  return (
    <ul className='flex gap-3 flex-col w-full'>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <TaskCard
              id={task.id}
              taskName={task.taskName}
              pomodoroGoal={task.pomodoroGoal}
            />
          </li>
        )
      })}
    </ul>
  )
}
