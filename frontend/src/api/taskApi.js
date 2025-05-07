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

export async function getAllTasks(token, logout) {
  const res = await axios.get('/api/task/all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 403) {
    logout()
    return []
  }
  if (res.status !== 200) {
    console.error(res.statusText)
    return []
  }

  return res.data
}

export async function getAllFinishedTasks(token, logout) {
  const res = await axios.get('/api/task/finished', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 403) {
    logout()
    return []
  }
  if (res.status !== 200) {
    console.error(res.statusText)
    return []
  }

  return res.data
}

export async function completeTask(id, pomodoroSpent, token, logout) {
  const res = await axios.patch(`/api/task/${id}`, {
    completedAt: new Date(),
    pomodoroSpent
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 403) {
    logout()
    return false
  }
  if (res.status !== 200) {
    console.error(res.statusText)
    return false
  }

  return true
}

export async function reopenTask(id, token, logout) {
  const res = await axios.patch(`/api/task/${id}`, {
    completedAt: null
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 403) {
    logout()
    return false
  }
  if (res.status !== 200) {
    console.error(res.statusText)
    return false
  }

  return true
}

export async function deleteTask(id, token, logout) {
  const res = await axios.delete(`/api/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 403) {
    logout()
    return false
  }
  if (res.status !== 200) {
    console.error(res.statusText)
    return false
  }

  return true
}
