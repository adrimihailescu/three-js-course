import { useState, useEffect, useRef } from "react";

export default function CLicker({ increment, keyName, color }) {
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  ); //set the state with what is saved in localStorage

  //first create a reference then associate it to the targeted element with ref attribute
  const buttonRef = useRef();
  // console.log(buttonRef);

  //retrieve value from the first render
  useEffect(() => {
    // const savedCount = parseInt(localStorage.getItem("count") ?? 0);
    // // console.log(savedCount);
    // setCount(savedCount);

    buttonRef.current.style.backgroundColor = "papayawhip";
    return () => {
      localStorage.removeItem(keyName); //remove from localStorage
    };
  }, []);

  //save to localStorage when count changes
  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  const buttonCLick = () => {
    setCount(count + 1);
    increment();
  };
  return (
    <div>
      <div style={{ color }}>CLick counts {count}</div>
      <button onClick={buttonCLick} ref={buttonRef}>
        CLick me
      </button>
    </div>
  );
}
