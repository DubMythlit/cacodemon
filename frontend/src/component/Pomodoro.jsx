import React, { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { StopButtonWithDialog } from './StopButtonWithDialog'
import { Timer } from './Timer'

export function Pomodoro() {
  const [timerState, setTimerState] = useState('stop')

  let startButtonText
  if (timerState === 'stop') {
    startButtonText = '開始專注'
  } else if (timerState === 'pause' ) {
    startButtonText = '繼續'
  } else {
    startButtonText = '暫停'
  }

  const onClick = () => {
    if (timerState === 'stop' || timerState === 'pause') {
      onStart()
    } else {
      onPause()
    }
  }
  const onStart = () => {
    setTimerState('start')
  }
  const onPause = () => {
    setTimerState('pause')
  }
  const onStop = () => {
    setTimerState('stop')
  }

  return (
    <Flex direction='column'>
      <Timer
        timerState={timerState}
        countdownMinutes={25} // TODO: 工作(25), 休息(5)
      />
      <Flex gap='1'>
        <Button
          onClick={onClick}
        >
          {startButtonText}
        </Button>
        {timerState === 'start' && (
          <StopButtonWithDialog
            onStopClick={onStop}
          />
        )}
      </Flex>
    </Flex>
  )
}
