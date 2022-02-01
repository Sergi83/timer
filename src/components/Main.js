import React, { useState, useEffect } from "react";

// rxjs
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// representational component
import Home from "../pages/Home";


const Main = () => {
  //
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(0);
  const [state, setState] = useState("stop");

  // get time format (hh:mm:ss)
  const timer = new Date(seconds).toISOString().slice(11, 19);


  useEffect(() => {
    const observer = new Subject();
    const timeInterval = interval(1000);

    timeInterval.pipe(takeUntil(observer)).subscribe(() => {
      if (state === "start") {
        setSeconds((seconds) => seconds + 1000);
      }
    });

    return () => {
      observer.next();
      observer.complete();
    };
  }, [state]);


  const onStartTimer = () => {
    setState("start");
  };

  const onStopTimer = () => {
    setState("stop");
    setSeconds(0);
  };

  const onResetTimer = () => {
    setSeconds(0);
    setState("start");
  };

  const onWaitTimer = () => {
    const stopTimer = Date.now();

    if (stopTimer - pause <= 300) {
      setState("wait");
    }
    setPause(stopTimer);
  };

  return (
    <>
      <Home
        timer={timer}
        state={state}
        onStartTimer={onStartTimer}
        onStopTimer={onStopTimer}
        onWaitTimer={onWaitTimer}
        onResetTimer={onResetTimer}
      />
    </>
  );
};

export default Main;
