// import { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Header from './components/header/Header';

const App = () => {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
