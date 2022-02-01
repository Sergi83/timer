import React, { useState, useEffect } from "react";

// rxjs
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// representational component
import Home from "../pages/Home";


const Main = () => {

  // states for controlling time flow
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(0);
  const [state, setState] = useState("stop");

  // get time string (hh:mm:ss)
  const timer = new Date(seconds)
    .toISOString()
    .slice(11, 19);

  // get time flow (+changes)
  useEffect(() => {
    const subscriberSubject$ = new Subject();
    const timeInterval$ = interval(1000);

    timeInterval$
      .pipe(takeUntil(subscriberSubject$))
      .subscribe(() => {
        if (state === "start") {
        setSeconds(seconds => seconds + 1000);
        setPause(0);
      }
    });

    return () => {
      subscriberSubject$.next();
      subscriberSubject$.complete();
    };
  }, [state]);


  // onClick functions for buttons
  const onStartTimer = () => {
    setState("start");
  };

  const onStopTimer = () => {
    setState("stop");
    setSeconds(0);
    setPause(0);
  };

  const onResetTimer = () => {
    setSeconds(0);
    setState("start");
  };

  const onWaitTimer = () => {
    const pauseTimer = Date.now();

    if (pauseTimer - pause <= 300) {
      setState("wait");
    }
    setPause(pauseTimer);
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
