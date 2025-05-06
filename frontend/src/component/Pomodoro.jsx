import React, { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { StopButtonWithDialog } from './StopButtonWithDialog'
import { Timer } from './Timer'

export function Pomodoro() {
  const [pomodoroState, setPomodoroState] = useState('stop')

  let startButtonText
  if (pomodoroState === 'stop') {
    startButtonText = '開始專注'
  } else if (pomodoroState === 'pause' ) {
    startButtonText = '繼續'
  } else {
    startButtonText = '暫停'
  }

  const onClick = () => {
    if (pomodoroState === 'stop' || pomodoroState === 'pause') {
      onStart()
    } else {
      onPause()
    }
  }
  const onStart = () => {
    setPomodoroState('start')
  }
  const onPause = () => {
    setPomodoroState('pause')
  }
  const onStop = () => {
    setPomodoroState('stop')
  }

  return (
    <Flex direction='column'>
      <Timer
        timerState={pomodoroState}
        countdownMinutes={25} // TODO: 工作(25), 休息(5)
      />
      <Flex gap='1'>
        <Button
          onClick={onClick}
        >
          {startButtonText}
        </Button>
        {pomodoroState === 'start' && (
          <StopButtonWithDialog
            onStopClick={onStop}
          />
        )}
      </Flex>
    </Flex>
  )
}
