import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Flex, Text } from '@radix-ui/themes'
import { StopButtonWithDialog } from './StopButtonWithDialog'

export function Pomodoro() {
  const [pomodoroState, setPomodoroState] = useState('stop')
  const [endTime, setEndTime] = useState(null)

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
    const endTime = dayjs().add(25, 'minutes')
    setEndTime(endTime)
  }
  const onPause = () => {
    setPomodoroState('pause')
  }
  const onStop = () => {
    setPomodoroState('pause')
    setEndTime(null)
    setMinutes(25)
    setSeconds(0)
    setIntervalId(null)
    setTimeleftOnPuase(null)
  }

  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [intervalId, setIntervalId] = useState(null)
  const [timeleftOnPause, setTimeleftOnPuase] = useState(null)
  useEffect(() => {
    if (pomodoroState === 'stop') {
      return
    }
    if (pomodoroState === 'pause') {
      clearInterval(intervalId)
      if (!endTime) {
        return
      }
      setTimeleftOnPuase(endTime.diff(new Date(), 's'))
      return
    }

    const interval = setInterval(() => {
      if (timeleftOnPause) {
        setEndTime(dayjs().add(timeleftOnPause, 's'))
        setTimeleftOnPuase(null)
        return
      }
      const timeleft = endTime.diff(new Date(), 's')
      if (timeleft >= 0) {
        setMinutes(Math.floor(timeleft / 60))
        setSeconds(timeleft % 60)
        return
      }

      clearInterval(interval)
      // TODO: 播放鬧鈴音效
    }, 200)
    setIntervalId(interval)
    return () => {
      clearInterval(interval)
      setIntervalId(null)
    }
  }, [pomodoroState, endTime])

  const minutesText = `${minutes}`.padStart(2, '0')
  const secondsText = `${seconds}`.padStart(2, '0')

  return (
    <Flex direction='column'>
      <Text
        size='9'
        weight='bold'
      >
        {minutesText}:{secondsText}
      </Text>
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
