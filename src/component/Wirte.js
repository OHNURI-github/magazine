import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import { auth, db, storage } from '../shared/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMagazineFB } from '../redux/modules/magazine';

const Write = () => {
  const [fileName, setFileName] = React.useState('이미지를 선택해주세요.');
  const [fileImage, setFileImage] = React.useState(null);
  const [fileImageFB, setFileImageFB] = React.useState(null);
  const [userNick, setUserNick] = React.useState(null);

  const file_link_ref = React.useRef(null);
  const post_ref = React.useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    // console.log(e.target.files[0].name); // 파일 이름 가져옴
    setFileName(e.target.files[0].name);
    setFileImage(URL.createObjectURL(e.target.files[0]));
    setFileImageFB(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
  };

  // 닉네임 찾기
  const user = auth.currentUser;

  React.useEffect(() => {
    // console.log(user.email);
    test(user);
  }, []);

  const test = async (user) => {
    const user_docs = await getDocs(
      query(collection(db, 'users'), where('user_id', '==', user.email))
    );
    // console.log(user_docs);

    const user_nick = user_docs.forEach((u) => {
      // console.log(u.data().nickname);
      setUserNick(u.data().nickname);
    });
  };

  console.log(userNick);

  // 스토리지 관련
  const uploadFB = async () => {
    const user = auth.currentUser;

    if (fileName !== '' && post_ref.current.value !== '') {
      const uploaded_file = await uploadBytes(ref(storage, `images/${fileName}`), fileImageFB);
      // console.log(uploaded_file);

      const file_url = await getDownloadURL(uploaded_file.ref);
      // console.log(file_url);
      file_link_ref.current = { url: file_url };

      // const post_doc = await addDoc(collection(db, 'posts'), {
      //   user_id: user.email,
      //   user_nick: userNick,
      //   user_post: post_ref.current.value,
      //   image_url: file_link_ref?.current.url,
      //   date: moment().format('YYYY/MM/DD HH:mm'),
      // });
      // console.log(post_doc.user_nick);

      dispatch(
        addMagazineFB({
          user_id: user.email,
          user_nick: userNick,
          user_post: post_ref.current.value,
          image_url: file_link_ref?.current.url,
          date: moment().format('YYYY/MM/DD HH:mm'),
        })
      );

      alert('작성 완료!');
      navigate('/');
    } else {
      alert('이미지 선택과 내용을 입력해주세요.');
    }
  };

  return (
    <Container>
      <h2>게시글 작성하기</h2>
      <FileUpload>
        <input type='text' value={fileName} disabled />
        <label for='input-file'>파일 선택</label>
        <input type='file' accept='image/*' id='input-file' onChange={onChange} hidden />
      </FileUpload>
      <h3>미리보기</h3>
      <Preview>
        {fileImage ? <img alt='sample' src={fileImage} /> : <div>이미지 미리보기</div>}
      </Preview>
      <p>게시글 내용</p>
      <div>
        <textarea ref={post_ref} />
        <button onClick={uploadFB}>작성 완료</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 80px;
  width: 65vw;

  & div > textarea {
    width: 100%;
  }

  & div > button {
    width: 100%;
    height: 40px;
    margin-top: 20px;
  }
`;

const FileUpload = styled.div`
  display: flex;
  align-items: center;

  & input {
    width: calc(100% - 90px);

    padding: 6px 0px;
    margin-right: 10px;
  }

  & label {
    background-color: #eee;

    width: 90px;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
  }
`;

const Preview = styled.div`
  & img {
    width: 100%;
    height: auto;
  }

  & div {
    background-color: #eee;
    color: #969696;
    width: 100%;
    height: 400px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Write;
