import { useState } from "react";
import CLicker from "./Clicker";

export default function App({ clickersCount }) {
  // console.log(clickersCount);
  const [hasClicker, setHasClicker] = useState(true);

  const [count, setCount] = useState(0);

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker);
  };

  const increment = () => {
    setCount(count + 1);
  };

  // const tempArray = [...Array(clickersCount)];

  // console.log(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
  return (
    <>
      <div>Total count: {count}</div>
      <button onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show Clicker"}
      </button>
      {hasClicker && (
        <>
          {[...Array(clickersCount)].map((value, index) => {
            return (
              <CLicker
                increment={increment}
                keyName={`count${index}`}
                key={index}
                color={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
              />
            );
          })}
        </>
      )}
    </>
  );
}
