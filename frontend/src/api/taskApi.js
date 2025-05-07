import { axiosInstance as axios } from './axiosInstance'

export async function createTask(taskName, pomodoroGoal) {
  const token = localStorage.getItem('token') ?? ''
  const res = await axios.post('/api/task/create', {
    taskName,
    pomodoroGoal
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status !== 200) {
    console.error(res.statusText)
  }
}
