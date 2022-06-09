import React from 'react';
import styled from 'styled-components';

import { auth, db, storage } from '../shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const id_ref = React.useRef(null);
  const nick_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pw_confirm_ref = React.useRef(null);
  // const file_link_ref = React.useRef(null);

  const navigate = useNavigate();

  const joinFB = async () => {
    // 이메일 조건
    const isValidEmail = id_ref.current.value.includes('@') && id_ref.current.value.includes('.');
    // console.log(isValidEmail); // 아이디 인풋값에 따라 true, false로 반환

    // 패스워드 조건
    const isValidPassword = pw_ref.current.value.length >= 8;
    // console.log(isValidPassword); // 8자리 이상이 아니면 false 반환

    // 패스워드 확인
    const isValidPasswordConfirm = pw_ref.current.value === pw_confirm_ref.current.value;
    // console.log(isValidPasswordConfirm);

    // 닉네임 조건
    const isValidNickname = nick_ref.current.value.length >= 1;

    // 회원가입 유효성 검사
    if (
      id_ref.current.value === '' &&
      nick_ref.current.value === '' &&
      pw_ref.current.value === '' &&
      pw_confirm_ref.current.value === ''
    ) {
      alert('빈칸을 채워주세요.');
      return false;
    } else if (!isValidEmail || !isValidNickname || !isValidPassword || !isValidPasswordConfirm) {
      alert('가입 양식을 확인해주세요.');
      return false;
    } else {
      alert('가입을 축하드립니다!');
      navigate('/login');
    }

    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user);

    const user_doc = await addDoc(collection(db, 'users'), {
      user_id: user.user.email,
      nickname: nick_ref.current?.value,
      // image_url: file_link_ref?.current.url,
    });

    console.log(user_doc.id);
  };

  // 스토리지 관련
  // const uploadFB = async (e) => {
  //   console.log(e.target.files);
  //   const uploaded_file = await uploadBytes(
  //     ref(storage, `images/${e.target.files[0].name}`),
  //     e.target.files[0]
  //   );
  //   console.log(uploaded_file);

  //   const file_url = await getDownloadURL(uploaded_file.ref);
  //   console.log(file_url);
  //   file_link_ref.current = { url: file_url };
  // };

  return (
    <Container>
      아이디 : <input type='text' ref={id_ref} />
      <br />
      닉네임 : <input type='text' ref={nick_ref} />
      <br />
      비밀번호 : <input type='password' ref={pw_ref} />
      <br />
      비밀번호 확인 : <input type='password' ref={pw_confirm_ref} />
      <br />
      {/* 이미지 : <input type='file' onChange={uploadFB} />
      <br /> */}
      <button onClick={joinFB}>가입하기</button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 80px;
`;

export default Join;
