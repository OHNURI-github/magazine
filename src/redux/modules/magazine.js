// magazine.js
import { db } from '../../shared/firebase';
import { collection, doc, getDocs, addDoc, getDoc } from 'firebase/firestore';

// Actions
// 액션의 타입을 정해주는 부분!
const LOAD = 'magazine/LOAD';
const CREATE = 'magazine/CREATE';

const initialState = {
  list: [
    // { word: 'hi', mean: '안녕', example: 'hi~ Nuri' },
    // { word: '안녕', mean: '안녕2', example: '안녕3' },
  ],
};

// 미들웨어!
export const loadMagazineFB = () => {
  return async function (dispatch) {
    // 파이어스토어에서 가지고 온 데이터 담을 변수 생성
    // getDocs는 콜렉션에 있는 모든 데이터를 가지고 올 수 있음
    const magazine_data = await getDocs(collection(db, 'posts'));
    // console.log(magazine_data);

    let magazine_list = [];

    magazine_data.forEach((magazine) => {
      // console.log(magazine.data());
      magazine_list.push({ id: magazine.id, ...magazine.data() });
    });
    // console.log(magazine_list);

    dispatch(loadMagazine(magazine_list));
  };
};

export const addMagazineFB = (magazine) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, 'posts'), { magazine });
    const _magazine = await getDoc(docRef);
    const magazine_data = { ..._magazine.data().magazine };

    // console.log(magazine_data);
    // console.log((await getDoc(docRef)).data().magazine);

    dispatch(createMagazine(magazine_data));
  };
};

// Action Creators
// 여기는 액션 생성 함수!
export function loadMagazine(magazine_list) {
  return { type: LOAD, magazine_list };
}

export function createMagazine(magazine) {
  return { type: CREATE, magazine };
}

// Reducer
// 리듀서는 순수함수로 이루어져 있음!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case 'magazine/LOAD': {
      return { list: action.magazine_list };
    }

    case 'magazine/CREATE': {
      const new_magazine = [...state.list, action.magazine];
      return { list: new_magazine };
    }
    default:
      return state;
  }
}
