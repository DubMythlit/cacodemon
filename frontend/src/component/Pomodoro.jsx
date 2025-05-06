import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Flex, Text } from '@radix-ui/themes'

export function Pomodoro() {
  const [pomodoroState, setPomodoroState] = useState('pause')
  const [endTime, setEndTime] = useState(null)

  let startButtonText
  if (pomodoroState === 'pause') {
    startButtonText = '開始'
  } else {
    startButtonText = '暫停'
  }

  const onClick = () => {
    if (pomodoroState === 'pause') {
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

  const [minutes, setMinutes] = useState("25")
  const [seconds, setSeconds] = useState("00")
  const [intervalId, setIntervalId] = useState(null)
  const [timeleftOnPause, setTimeleftOnPuase] = useState(null)
  useEffect(() => {
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
      setMinutes(Math.floor(timeleft / 60))
      setSeconds(timeleft % 60)
    }, 200)
    setIntervalId(interval)
    return () => {
      clearInterval(interval)
      setIntervalId(null)
    }
  }, [pomodoroState, endTime])

  return (
    <Flex direction='column'>
      <Text
        size='9'
        weight='bold'
      >
        {minutes}:{seconds}
      </Text>
      <Flex gap='1'>
        <Button
          onClick={onClick}
        >
          {startButtonText}
        </Button>
      </Flex>
    </Flex>
  )
}
