// useStateフックをインポート
import { useState } from 'react';
import './Counter.css';

const Counter = ({ defaultCount = 0 }) => {
  const [count, setCount] = useState(defaultCount);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter">
      {/* setStateの返り値の count を使うように変更 */}
      <div className="counter__count">Count is {count}</div>
      <button
        className="counter__button"
        onClick={handleClick}
      >
        Click Me
      </button>
    </div>
  );
};

export default Counter;
