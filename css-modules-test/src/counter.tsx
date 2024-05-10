import { useState } from 'react';
import styles from './counter.module.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        className={`${styles.counter} ${styles.counterLarge}`}
        onClick={() => setCount(count + 1)}
      >
        Clicked {count} times
      </button>
    </div>
  );
};

export default Counter;
