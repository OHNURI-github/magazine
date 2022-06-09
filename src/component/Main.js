import React from 'react';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Main = (props) => {
  const navigate = useNavigate();

  const data = useSelector((state) => state.magazine.list);
  // console.log(data.list.magazine);
  return (
    <div style={{ marginTop: '90px' }}>
      {data.map((list, idx) => {
        // console.log(list);
        return (
          <Container key={idx}>
            <Top>
              <div>
                <Profile>
                  <PersonIcon style={{ fontSize: '30px', color: '#bcbcbc' }} />
                </Profile>
                <h4>{list.magazine.user_nick}</h4>
              </div>
              <div style={{ position: 'absolute', right: '15px' }}>
                <p>{list.magazine.date}</p>
                {props.isLogin === true ? (
                  <button style={{ marginLeft: '10px' }}>수정</button>
                ) : null}
              </div>
            </Top>
            <Middle>
              <p>{list.magazine.user_post}</p>
              <img
                src={list.magazine.image_url}
                style={{ width: '100%' }}
                onClick={() => navigate(`/detail/${list.id}`)}
              />
            </Middle>
            <Bottom>
              <p>
                좋아요<span>00개</span>
                <FavoriteIcon style={{ position: 'absolute', right: '20px', color: '#eee' }} />
              </p>
            </Bottom>
          </Container>
        );
      })}
      {props.isLogin === true ? (
        <WriteBtn
          onClick={() => {
            navigate('/write');
          }}
        >
          <CreateIcon />
        </WriteBtn>
      ) : null}
    </div>
  );
};

const Container = styled.div`
  margin-bottom: 10px;
  width: 80vw;

  position: relative;

  padding: 10px 15px;

  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.04);
`;

const Top = styled.div`
  display: flex;

  & div {
    display: flex;
    align-items: center;
  }
  & Profile {
    width: 50px;
    height: 50px;
    background-color: #eee;
  }
`;

const Profile = styled.div`
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 50px;

  margin-right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Middle = styled.div`
  & div {
    background-color: #eee;
    width: 100%;
    height: 400px;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
`;

const WriteBtn = styled.div`
  background-color: #eee;

  width: 65px;
  height: 65px;

  border-radius: 50px;

  position: fixed;
  bottom: 2rem;
  right: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Main;
