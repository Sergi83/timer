import React from "react";
import { GiPauseButton } from "react-icons/gi";
import { VscDebugStart, VscStopCircle } from "react-icons/vsc";

const Home = ({
  timer,
  state,
  onStartTimer,
  onStopTimer,
  onWaitTimer,
  onResetTimer,
}) => {
  return (
    <div className="page">
      <div className="container">
        <div className="title">
          <h1>timer</h1>

          <div id="time">
            <span>{timer}</span>
          </div>
        </div>

        <div className="btn-container">
          {state !== "start" && (
            <div onClick={onStartTimer} className="btn">
              <VscDebugStart />
            </div>
          )}

          {state !== "stop" && (
            <div onClick={onStopTimer} className="btn">
              <VscStopCircle />
            </div>
          )}

          {state === "start" && (
            <div onClick={onWaitTimer} className="btn">
              <GiPauseButton />
            </div>
          )}

          {state !== "stop" && (
            <div onClick={onResetTimer} className="btn">
              reset
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
