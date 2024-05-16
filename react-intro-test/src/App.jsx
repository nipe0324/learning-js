import Counter from './Counter';
import './App.css';

function App() {
  return (
    <>
      <h1>My Counter</h1>
      {/* defaultCountを渡さないので、カウント値はデフォルト値の0になる */}
      <Counter />
      {/* defaultCountを渡すので、カウント値は10になる */}
      <Counter defaultCount={10} />
    </>
  )
}

export default App
