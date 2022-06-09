import React from 'react';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadMagazine, loadMagazineFB } from '../redux/modules/magazine';

const Detail = (props) => {
  const user_doc_id = useParams().id;
  console.log(user_doc_id);

  const data = useSelector((state) => state.magazine.list);
  // console.log(data);

  // React.useEffect(() => {
  //   dispatch(loadMagazineFB);
  // }, []);

  return (
    <div style={{ marginTop: '90px' }}>
      <Container>
        <Top>
          <div>
            <Profile>
              <PersonIcon style={{ fontSize: '30px', color: '#bcbcbc' }} />
            </Profile>
            <h4></h4>
          </div>
          <div style={{ position: 'absolute', right: '15px' }}>
            <p></p>
          </div>
        </Top>
        <Middle>
          <p></p>
          <img />
        </Middle>
        <Bottom>
          <p>
            좋아요<span>00개</span>
            <FavoriteIcon style={{ position: 'absolute', right: '20px', color: '#eee' }} />
          </p>
        </Bottom>
      </Container>
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

export default Detail;
