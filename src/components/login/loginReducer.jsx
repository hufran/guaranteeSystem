/*
 *login reducer功能 主要用来变更数据
 * */
import {SETERRORCONTENT,SETUSERNAME,SETPASSWORD,SETREMEMBER,LOGINSUCCESS} from "./loginAction.jsx";

let initState={
  point:{
    loginStatus:false,
    isFetching:true,//是否在抓取数据
    didInvalidate:true,//表示数据是否过时
    lastUpdated:0,//表示上一次更新时间
    status:null,
    msg:null,
    response:null
  },
  formValue:{
    userName:'',
    passWord:'',
    remember:false
  },
  errorContent:{
    msg:'',
    status:false
  },
  user:null
};

const Login=(state=initState,action)=>{
  console.log("state3:",state);
  let newState={...state};
  let keys=Object.keys(newState);
  switch (action.type){
    case SETERRORCONTENT:
      //设置错误信息
      Object.assign(newState.errorContent,{msg:action.msg, status:action.status});
      return newState;
    case SETUSERNAME:
      //设置用户名
      Object.assign(newState.formValue,{userName:action.username});
      return newState;
    case SETPASSWORD:
      //设置登录密码
      Object.assign(newState.formValue,{passWord:action.password});
      return newState;
    case SETREMEMBER:
      //设置记住密码状态
      Object.assign(newState.formValue,{remember:action.remember});
      return newState;
    case LOGINSUCCESS:
      //登录请求操作成功
      Object.assign(newState.point,{status:action.status,msg:action.msg,response:action.response});
      return newState;
    default:
      return state;
  }
};

export default Login;
