import React from 'react'

export function PomodoroGauge({ pomodoroGoal, pomodoroSpent }) {
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

