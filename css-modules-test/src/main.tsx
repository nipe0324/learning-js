import React from 'react'
import ReactDOM from 'react-dom/client'
// 次の不要なコンポーネントとCSSファイルのインポートをコメントアウト
// import App from './App.tsx'
// import './index.css'
import Counter from './counter.tsx'
import ButtonA from './components/button-a.tsx'
import ButtonB from './components/button-b.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <div><Counter /></div>
    <section>
      <h2>Buttons</h2>
      <div><ButtonA /></div>
      <div><ButtonB /></div>
    </section>
  </React.StrictMode>,
)
