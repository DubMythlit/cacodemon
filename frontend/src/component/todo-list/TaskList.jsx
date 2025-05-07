import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hook/useAuth'
import { getAllTasks } from '../../api/taskApi'

export function TaskList({ createTaskTimestamp }) {
  const { token, logout } = useAuth()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getAllTasks(token, logout)
      .then(setTasks)
      .catch(console.error)
  }, [createTaskTimestamp])

  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li>
            <p>{task.taskName}</p>
            <p>{task.pomodoroGoal}</p>
          </li>
        )
      })}
    </ul>
  )
}
