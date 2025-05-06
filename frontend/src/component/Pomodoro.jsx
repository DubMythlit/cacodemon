import React, { useEffect, useRef, useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { StopButtonWithDialog } from './StopButtonWithDialog'
import { Timer } from './Timer'
import { flashTitle } from '../util/util'

export function Pomodoro() {
  const [mode, setMode] = useState('task')
  const [timerState, setTimerState] = useState('stop')

  let startButtonText
  if (timerState === 'stop') {
    if (mode === 'task') {
      startButtonText = '開始專注'
    } else {
      startButtonText = '放鬆一下'
    }
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

  const alarmRef = useRef(null)
  useEffect(() => {
    alarmRef.current = new Audio('/sound/alarm.mp3')
  },[])

  const onTimeUp = () => {
    if (mode === 'task') {
      alarmRef.current?.play()
      flashTitle('⏰該休息一下囉')
      setMode('rest')
      setTimerState('stop')
    } else {
      setMode('task')
      setTimerState('stop')
    }
  }

  return (
    <Flex direction='column'>
      <Timer
        timerState={timerState}
        countdownMinutes={mode === 'task' ? 25 : 5}
        onTimeUp={onTimeUp}
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
