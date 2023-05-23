import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";

export default function Interface() {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  //object containing all inputs as properties where each key is true or false, depending on whether or not the key is pressed
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const jump = useKeyboardControls((state) => state.jump);
  return (
    <div className="interface">
      <div className="time">0.00</div>
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
