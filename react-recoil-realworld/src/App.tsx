import { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loading from './components/common/Loading';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Article from './pages/Article';
import NewArticle from './pages/NewArticle';

import { getUser } from './api/user';
import { isLoggedInAtom, userAtom } from './atom';

const App = () => {
  const [loading, setLoading] = useState(true);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const initApp = async () => {
      const hasToken = !!localStorage.getItem('jwtToken');
      if (!hasToken) return;

      try {
        const data = await getUser();
        const { email, username, bio, image } = data.user;
        setIsLoggedIn(true);
        setUser({
          email: email,
          username: username,
          bio: bio,
          image: image,
        });
      } catch (e: any) {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setUser({
          email: '',
          username: '',
          bio: '',
          image: '',
        });
      }
    };

    initApp().then(() => setLoading(false));
  }, [setIsLoggedIn, setUser]);

  if (loading) return <Loading height={75} />;

  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:urlSlug" element={<Article />} />
          <Route path="/editor" element={<NewArticle />} />
          {/* <Route path="/editor/:urlSlug" element={<EditArticle />} />
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
