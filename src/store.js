/**
 * Created by Administrator on 2018/4/11.
 * 合并所有的reducers,生成store
 */
import {createStore,combineReducers,applyMiddleware } from "redux"
import thunkMiddleware from 'redux-thunk'
import Index from "./components/index/indexReducer.jsx"
import Login from "./components/login/loginReducer.jsx"




const reducers=combineReducers({
  Index,
  Login,
});
// thunkMiddleware 允许我们 dispatch() 函数
const state=applyMiddleware(thunkMiddleware)(createStore)(reducers);
export default state;
