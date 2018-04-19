/*
 *给组件分配数据以及方法
 * */
import {connect} from "react-redux";
import {changeLoginStatus,loginRequestSuccess,setUserName,setPass,setRemeber} from "../login/loginAction.jsx";
import Head from "./head.jsx"

//获取用户数据
const getUser=(Login)=>{
  return Login.user;
};

//获取用户登录状态
const getLoginStatus=(Login)=>{
  return Login.point.loginStatus;
};

const mapStateToProps=(state)=>{
  return{
    loginStatus:getLoginStatus(state.LoginReducer),
    user:getUser(state.LoginReducer)
  }
};

const mapDispatchToProps=(dispatch)=>{
  return {
    loginOut:()=>{
      dispatch(changeLoginStatus(false));
      dispatch(loginRequestSuccess(null,null,null));
      dispatch(setUserName());
      dispatch(setPass());
      dispatch(setRemeber());
      dispatch(setRemeber());
    }
  }
};



const HeadComponent=connect(mapStateToProps,mapDispatchToProps)(Head);

export default HeadComponent;
