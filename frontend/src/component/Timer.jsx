import React, { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import dayjs from 'dayjs'

export function Timer({ timerState, countdownMinutes, onTimeUp }) {
  const [minutes, setMinutes] = useState(countdownMinutes)
  const [seconds, setSeconds] = useState(0)
  const [intervalId, setIntervalId] = useState(null)
  const [timeleftOnPause, setTimeleftOnPuase] = useState(null)
  const [endTime, setEndTime] = useState(null)

  useEffect(() => {
    if (timerState === 'start') {
      setEndTime(dayjs().add(countdownMinutes, 'm'))
    } else if (timerState === 'stop') {
      setMinutes(countdownMinutes)
      setSeconds(0)
      setIntervalId(null)
      setTimeleftOnPuase(null)
      setEndTime(null)
    }
  }, [timerState, countdownMinutes])

  useEffect(() => {
    if (timerState === 'stop') {
      clearInterval(intervalId)
      return
    }
    if (timerState === 'pause') {
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
      onTimeUp()
    }, 200)
    setIntervalId(interval)
    return () => {
      clearInterval(interval)
      setIntervalId(null)
    }
  }, [timerState, endTime])

  const minutesText = `${minutes}`.padStart(2, '0')
  const secondsText = `${seconds}`.padStart(2, '0')

  return (
    <Text
      size='9'
      weight='bold'
    >
      {minutesText}:{secondsText}
    </Text>
  )
}
