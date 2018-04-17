/*
 *login reducer功能 主要用来变更数据
 * */
import {SETERRORCONTENT,SETUSERNAME,SETPASSWORD,SETREMEMBER,LOGINREQUESTSUCCESS,LOGINFETCHING,LOGINLASTUPDATE,CHANGELOGINSTATUS,CHANGEMODALSTATUS} from "./loginAction.jsx";

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
  modal:{
    msg:"",
    status:false
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
  let newState={...state};
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
    case LOGINREQUESTSUCCESS:
      //登录请求操作成功
      Object.assign(newState.point,{status:action.status,msg:action.msg,response:action.response});
      return newState;
    case CHANGELOGINSTATUS:
      //修改登录状态
      return newState;
    case LOGINFETCHING:
      //设置请求登录接口的抓取状态
      Object.assign(newState.point,{isFetching:action.status});
      return newState;
    case LOGINLASTUPDATE:
      //设置最后一次更新时间修改
      Object.assign(newState.point,{lastUpdated:action.time});
      return newState;
    case CHANGEMODALSTATUS:
      Object.assign(newState.modal,{msg:action.msg,status:action.status});
      return newState;
    default:
      return state;
  }
};

export default Login;
