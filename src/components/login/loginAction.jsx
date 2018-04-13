/*
*login action'行为操作
* */

export const SETERRORCONTENT="SET_ERROR_CONTENT";
export const SETUSERNAME="SET_USERNAME";
export const SETPASSWORD="SET_PASSWORD";
export const SETREMEMBER="SET_REMERMBER";
export const LOGINSUCCESS="LOGIN_SUCCESS";


//设置错误内容
export const setError=(msg="",status=false)=>{
  return {
    type:SETERRORCONTENT,
    msg:msg,
    status
  }
};

//设置登录名
export const setUserName=(username="")=>{
  return{
    type:SETUSERNAME,
    username
  }
};

//设置登录密码
export const setPass=(password="")=>{
  return{
    type:SETPASSWORD,
    password
  }
};

//设置记住登录状态信息
export const setRemeber=(remember=false)=>{
  return{
    type:SETREMEMBER,
    remember
  }
};

//登录请求操作成功
export const loginSuccess=(status=0,msg='',response)=>{
  return {
    type:LOGINSUCCESS,
    status,
    msg,
    response
  }
};


