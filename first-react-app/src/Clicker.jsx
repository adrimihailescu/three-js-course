import { useState, useEffect } from "react";

export default function CLicker({ increment, keyName, color }) {
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  ); //set the state with what is saved in localStorage

  //retrieve value from the first render
  useEffect(() => {
    // const savedCount = parseInt(localStorage.getItem("count") ?? 0);
    // // console.log(savedCount);
    // setCount(savedCount);
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
      <button onClick={buttonCLick}>CLick me</button>
    </div>
  );
}
