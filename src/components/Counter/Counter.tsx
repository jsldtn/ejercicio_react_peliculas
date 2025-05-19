import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const incrementCounter = () => {
    setCount((count) => count + 1);
  };

  const decreaseCounter = () => {
    setCount((count) => count - 1);
  };

  return (
    <div>
      <div>count is {count}</div>
      <button onClick = {incrementCounter}>Suma</button>
      <button onClick = {decreaseCounter}>Resta</button>
    </div>
  );
};

export default Counter;
