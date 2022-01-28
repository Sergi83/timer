import React, { useState, useEffect } from "react";
import { GiPauseButton } from "react-icons/gi";
import { VscDebugStart, VscStopCircle } from "react-icons/vsc";

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
    let minutes = Math.floor((totalSeconds / 60) - (hours * 60));
    let seconds = Math.floor(totalSeconds  % 60);

    // get 2 digits numbers
    let [hh, mm, ss] = [hours, minutes, seconds].map(i => ("0" + i).slice(-2));

    // get limit
    const dayLimit = 24 * 3600;

    return (totalSeconds < dayLimit ? setTimer(`${hh}: ${mm}: ${ss}`) : setTimer("More than one day"));
    
  }, [timer, totalSeconds]);

  return (
    <div className="page">
      <div className="container">
        <div className="title">
          <h1>timer</h1>
          
          <div id="time">
            <span>
              {timer} (hh:mm:ss)
            </span>
          </div>
          <div>{totalSeconds} s</div>
        </div>
        <div className="btn-container">
          <div
            id="start"
            className={`btn ${isActive ? "active" : ""}`}
            onClick={toggleTimer}
          >
            {isActive ? <VscStopCircle /> : <VscDebugStart />}
          </div>

          {!isActive && totalSeconds !== 0 && (
            <div
              id="wait"
              className={`btn ${
                !isActive & (totalSeconds !== 0) ? "active" : ""
              }`}
              onDoubleClick={toggleTimer}
            >
              <GiPauseButton />
            </div>
          )}
          {!isActive && totalSeconds > 0 && (
            <div id="reset" className="btn" onClick={resetTimer}>
              reset
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
