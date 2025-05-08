import React from 'react'
import { Flex } from '@radix-ui/themes'
import { X } from '@phosphor-icons/react'

export function PomodoroGauge({ pomodoroGoal, pomodoroSpent }) {
  if (pomodoroGoal >= pomodoroSpent) {
    const podomoros = new Array(pomodoroGoal)
    podomoros.fill('🍅')
    return (
      <div>
        {podomoros.map((tomato, idx) => {
          const className = idx < pomodoroSpent ? '' : 'opacity-20'
          return (
            <span className={className}>
              {tomato}
            </span>
          )
        })}
      </div>
    )
  }
  
  const spent = (
    <>
      🍅<X size={12} />{pomodoroSpent}
    </>
  )
  const goal = (
    <>
      <span className='opacity-20'>🍅</span>
      <X size={12} />
      {pomodoroGoal}
    </>
  )
  return (
    <Flex align='center'>
      {spent} / {goal}
    </Flex>
  )
}

