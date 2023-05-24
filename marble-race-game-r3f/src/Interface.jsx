import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import useGame from "./stores/useGame";
import { useRef, useEffect } from "react";

export default function Interface() {
  const time = useRef();
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  //object containing all inputs as properties where each key is true or false, depending on whether or not the key is pressed
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const jump = useKeyboardControls((state) => state.jump);

  //we call useEffect only on the first render, we then access addEffect from r3f inside of it
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      // console.log(state);
      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);
      // console.log(elapsedTime);

      if (time.current) time.current.textContent = elapsedTime;
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);
  return (
    <div className="interface">
      <div className="time" ref={time}>
        0.00
      </div>
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
