/**
 * Created by Administrator on 2018/4/11.
 * 合并所有的reducers,生成store
 */
import {createStore,combineReducers,applyMiddleware } from "redux"
import thunkMiddleware from 'redux-thunk'
import IndexReducer from "./components/index/indexReducer.jsx"
import LoginReducer from "./components/login/loginReducer.jsx"
import LeftNavReducer from "./components/leftNav/leftNavReducer.jsx"
import GuaranteeReducer from "./components/guarantee/guaranteeReducer.jsx"




const reducers=combineReducers({
  IndexReducer,
  LoginReducer,
  LeftNavReducer,
  GuaranteeReducer
});
// thunkMiddleware 允许我们 dispatch() 函数
const state=applyMiddleware(thunkMiddleware)(createStore)(reducers);
export default state;
