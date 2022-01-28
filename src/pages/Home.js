import React from "react";
import { GiPauseButton } from "react-icons/gi";
import { VscDebugStart, VscStopCircle } from "react-icons/vsc";


const Home = ({ timer, totalSeconds, isActive, toggleTimer, resetTimer }) => {

  return (
    <div className="page">
      <div className="container">
        <div className="title">
          <h1>timer</h1>

          <div id="time">
            <span>{timer} (hh: mm: ss)</span>
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

export default Home;
