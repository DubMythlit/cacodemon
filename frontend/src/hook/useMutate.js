import { useContext } from 'react'
import { MutateContext } from '../context/MutateContext'

export const useMutate = () => {
  const context = useContext(MutateContext)
  if (!context) {
    throw new Error("useMutate 必須在 MutateProvider 裡使用")
  }
  return context
}
