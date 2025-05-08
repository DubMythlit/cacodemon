import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

export function PomodoroGoalPicker({ pomodomoGoal, setPomorodoGoal }) {
  const pomodoroCount = [1, 2, 3, 4]
  return (
    <Flex direction='column'>
      <Text size='2'>選擇預計用時</Text>
      <ul className='flex'>
      {pomodoroCount.map((count) => {
        return (
          <PomodoroButton
            key={count}
            fade={count > pomodomoGoal}
            onClick={() => {
              if (pomodomoGoal === count) {
                setPomorodoGoal(count - 1)
              } else {
                setPomorodoGoal(count)
              }
            }}
          />
        )
      })}
      </ul>
    </Flex>
  )
}

function PomodoroButton({ fade, onClick }) {
  const className = fade ? 'opacity-20' : ''
  return (
    <li>
      <button
        className={className}
        onClick={onClick}
      >
        🍅
      </button>
    </li>
  )
}
