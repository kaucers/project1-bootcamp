import React, { useState, useEffect } from "react";

function StopWatch() {
  const [time, setTime] = useState(300); // initial time in seconds (5 minutes)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive && time > 0) {
      intervalId = setInterval(() => {
        setTime(time - 1); //count down per second
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setTime(300);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      <div>{formatTime(time)}</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default StopWatch;