import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { auth } from '../shared/firebase';
import { signOut } from 'firebase/auth';

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1
        onClick={() => {
          navigate('/');
        }}
      >
        Magazine
      </h1>
      {props.isLogin ? (
        <Btns>
          <button>내 정보</button>
          <button>알림</button>
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            로그아웃
          </button>
        </Btns>
      ) : (
        <Btns>
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </button>
          <button
            onClick={() => {
              navigate('/join');
            }}
          >
            회원가입
          </button>
        </Btns>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #eee;
  width: 100vw;
  height: 70px;

  position: fixed;
  top: 0;
  z-index: 1;

  display: flex;
  align-items: center;

  & h1 {
    margin-left: 20px;
    cursor: pointer;
  }
`;

const Btns = styled.div`
  position: fixed;
  right: 20px;
  }

  & button {
    margin-left: 10px;
  }
`;

export default Header;
