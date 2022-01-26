import React from "react";
import { GiPauseButton } from "react-icons/gi";
import { VscDebugStart, VscStopCircle } from "react-icons/vsc";

const Home = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="title">
          <h1>Timer</h1>
          <span id="time">HH:MM:SS</span>
        </div>
        <div className="btn-container">
          <div id="start" className="btn">
            <VscDebugStart />
          </div>
          <div id="stop" className="btn">
            <VscStopCircle />
          </div>
          <div id="wait" className="btn">
            <GiPauseButton />
          </div>
          <div id="reset" className="btn">
            reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
