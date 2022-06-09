import React from 'react';
import styled from 'styled-components';

import { auth } from '../shared/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const navigate = useNavigate();

  const loginFB = async () => {
    // 인풋값 검사
    if (id_ref.current.value === '' || pw_ref.current.value === '') {
      alert('빈칸을 입력해주세요.');
      return false;
    }
    console.log(id_ref.current.value, pw_ref.current.value);

    const user = await signInWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value);
    console.log(user);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        alert('환영합니다 :)');
        navigate('/');
      } else {
      }
    });
  };

  return (
    <Container>
      아이디 : <input type='text' ref={id_ref} />
      <br />
      비밀번호 : <input type='password' ref={pw_ref} />
      <br />
      <button onClick={loginFB}>로그인</button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 80px;
`;

export default Login;
