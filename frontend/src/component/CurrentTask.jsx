import React from 'react'
import { useCurrentTask } from '../hook/useCurrentTask'

export function CurrentTask() {
  const { currentTask } = useCurrentTask()

  return (
    <div className='w-[400px] h-[80px] rounded-xl bg-gray-300'>
      Current Task
      {`${currentTask}`}
    </div>
  )
}
