import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Flex, Text } from '@radix-ui/themes'

export function Pomodoro() {
  const [pomodoroState, setPomodoroState] = useState('pause')
  const [endTime, setEndTime] = useState(null)

  const onStart = () => {
    setPomodoroState('start')
    const endTime = dayjs().add(25, 'minutes')
    setEndTime(endTime)
  }

  const [minutes, setMinutes] = useState("25")
  const [seconds, setSeconds] = useState("00")
  useEffect(() => {
    if (pomodoroState !== 'start') {
      return
    }

    const interval = setInterval(() => {
      const timeleft = endTime.diff(new Date(), 's')
      setMinutes(Math.floor(timeleft / 60))
      setSeconds(timeleft % 60)
    }, 200)
    return () => clearInterval(interval)
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
          onClick={onStart}
        >
          Start
        </Button>
        <Button>Pause</Button>
      </Flex>
    </Flex>
  )
}
