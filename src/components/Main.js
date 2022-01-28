import React, { useState, useEffect } from "react";

// representational component
import Home from "../pages/Home";




const Main = () => {

  // The state for our timer
  const [timer, setTimer] = useState("00: 00: 00");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  //   onClick functions
  const toggleTimer = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const resetTimer = (e) => {
    e.preventDefault();
    setIsActive(false);
    setTotalSeconds(0);
    setTimer("00: 00: 00");
  };

  // counting
  useEffect(() => {
    let interval = null;

    // ifelse
    if (isActive) {
      // increase count every second by 1 second
      interval = setInterval(() => {
        setTotalSeconds((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // clear
      clearInterval(interval);
    }

    // clearing function
    return () => clearInterval(interval);
  }, [isActive]);

  // get formated time (string)
  useEffect(() => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor(totalSeconds / 60 - hours * 60);
    let seconds = Math.floor(totalSeconds % 60);

    // get 2 digits numbers
    let [hh, mm, ss] = [hours, minutes, seconds].map((i) =>
      ("0" + i).slice(-2)
    );

    // get limit
    const dayLimit = 24 * 3600;

    //! block seconds adding (after one day)
    if(totalSeconds >= dayLimit) {
      setTotalSeconds(dayLimit + 1);
    };

    // get time info
    return totalSeconds < dayLimit
      ? setTimer(`${hh}: ${mm}: ${ss}`)
      : setTimer("More than one day");
  }, [timer, totalSeconds]);

  return (
    <>
      <Home
        timer={timer}
        totalSeconds={totalSeconds}
        isActive={isActive}
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
      />
    </>
  );
};

export default Main;
