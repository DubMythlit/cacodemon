import { useContext } from 'react'
import { CurrentTaskContext } from '../context/CurrentTaskContext'

export const useCurrentTask = () => {
  const context = useContext(CurrentTaskContext)
  if (!context) {
    throw new Error("useCurrentTask 必須在 CurrentTaskContext 裡使用")
  }
  return context
}
