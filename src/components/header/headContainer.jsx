/*
 *给组件分配数据以及方法
 * */
import {connect} from "react-redux";
import {loginOut} from "./headAction.jsx";
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
    loginStatus:getLoginStatus(state.Login),
    user:getUser(state.Login)
  }
};

const mapDispatchToProps=(dispatch)=>{
  return {
    loginOut:()=>{
      dispatch(loginOut());
    }
  }
};



const HeadComponent=connect(mapStateToProps,mapDispatchToProps)(Head);

export default HeadComponent;
