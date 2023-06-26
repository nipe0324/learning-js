// import { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Home from './pages/Home';
import Register from './pages/Register';
import NewArticle from './pages/NewArticle';

const App = () => {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editor" element={<NewArticle />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/article/:URLSlug" element={<Article />} />
          <Route path="/editor/:URLSlug" element={<EditArticle />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:userId/*" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} /> */}
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
