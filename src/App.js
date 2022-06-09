import React from 'react';
import './mystyle.css';

import { Routes, Route } from 'react-router-dom';
import { auth } from './shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loadMagazineFB } from './redux/modules/magazine';

import Join from './component/Join';
import Login from './component/Login';
import Main from './component/Main';
import Header from './component/Hearder';
import Write from './component/Wirte';
import Detail from './component/Detail';

function App() {
  const [is_login, setIsLogin] = React.useState(false);
  const dispatch = useDispatch();

  console.log(auth.currentUser);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
    dispatch(loadMagazineFB());
  }, []);

  return (
    <div className='App'>
      <Header isLogin={is_login} />
      <Routes>
        <Route path='/' element={<Main isLogin={is_login} />}></Route>
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login />} />
        <Route path='/write' element={<Write />} />
        <Route path='/detail/:id' element={<Detail />} />

        {/* {is_login ? <Route path='/' element={<Main />} /> : <Route path='/' element={<Login />} />} */}
      </Routes>
    </div>
  );
}

export default App;
