import { useState, useReducer, createContext, useContext } from 'react';

export default function App() {
  return (
    <>
      <MyCounterWithState />
      <MyCounterWithReducer />
      <MyThemeWithContext />
    </>
  );
}

// useState

interface MyButtonProps {
  title: string;
  onButtonClick: () => void;
}

function MyButton({ title, onButtonClick }: MyButtonProps) {
  return (
    <button onClick={(e) => onButtonClick()}>{title}</button>
  )
}

type Status = "idle" | "loading" | "success" | "error";
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: Error };

function MyCounterWithState() {
  // useState
  const [value, setValue] = useState<string>("Change me");
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <div>
      <h1>MyCounter with State</h1>

      <input value={value} onChange={handleChange} />

      <p>Count: {count}</p>
      <MyButton title="Click me" onButtonClick={() => setCount(count+1)} />
    </div>
  )
}

// useReducer

interface State {
  count: number
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

function MyCounterWithReducer() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>MyCounter with Reducer</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// useContext

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

function MyThemeWithContext() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent />
      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("dark")}>dark</button>
      <button onClick={() => setTheme("system")}>system</button>
    </ThemeContext.Provider>
  )
}

function MyComponent() {
  const theme = useGetTheme();

  return (
    <div>
      <h1>MyComponent</h1>
      <p>Current theme: {theme}</p>
    </div>
  )
}

// Children


interface ModalRendererProps {
  title: string;
  children: React.ReactNode; // or React.ReactElement
}

// Style Props

interface MyComponentProps {
  style: React.CSSProperties
}
