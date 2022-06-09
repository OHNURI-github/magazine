import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import magazine from './modules/magazine';

// 미들웨어 설정!
const middlewares = [thunk];

// 스토어는 리듀서들을 묶어 만든다.
const rootReducer = combineReducers({ magazine });

// 옵셔널한 것 묶음
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
