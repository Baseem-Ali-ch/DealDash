"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  endTime: Date
  onComplete?: () => void
}

export function CountdownTimer({ endTime, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (onComplete) onComplete()
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime, onComplete])

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 dark:bg-primary/20 rounded-md p-2 min-w-[40px] text-center">
          <span className="text-lg md:text-xl font-bold text-primary dark:text-primary">{timeLeft.days}</span>
        </div>
        <span className="text-xs mt-1">Days</span>
      </div>
      <span className="text-lg font-bold">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 dark:bg-primary/20 rounded-md p-2 min-w-[40px] text-center">
          <span className="text-lg md:text-xl font-bold text-primary dark:text-primary">{timeLeft.hours}</span>
        </div>
        <span className="text-xs mt-1">Hours</span>
      </div>
      <span className="text-lg font-bold">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 dark:bg-primary/20 rounded-md p-2 min-w-[40px] text-center">
          <span className="text-lg md:text-xl font-bold text-primary dark:text-primary">{timeLeft.minutes}</span>
        </div>
        <span className="text-xs mt-1">Mins</span>
      </div>
      <span className="text-lg font-bold">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 dark:bg-primary/20 rounded-md p-2 min-w-[40px] text-center">
          <span className="text-lg md:text-xl font-bold text-primary dark:text-primary">{timeLeft.seconds}</span>
        </div>
        <span className="text-xs mt-1">Secs</span>
      </div>
    </div>
  )
}
