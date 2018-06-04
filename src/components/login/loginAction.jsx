/*
*login action'行为操作
* */

export const SETERRORCONTENT="SET_ERROR_CONTENT";
export const SETUSERNAME="SET_USERNAME";
export const SETPASSWORD="SET_PASSWORD";
export const SETREMEMBER="SET_REMERMBER";
export const LOGINREQUESTSUCCESS="LOGIN_REQUEST_SUCCESS";
export const LOGINFETCHING="LOGIN_FETCHING";
export const LOGINLASTUPDATE="LOGIN_LAST_UPDATE";
export const CHANGELOGINSTATUS="CHANGE_LOGIN_STATUS";
export const CHANGEMODALSTATUS="CHANGE_MODAL_STATUS";
export const UPDATELCCB="UPDATE_LCCB";

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

//设置请求登录接口是否在抓取数据操作
export const loginIsFetching=(status)=>{
  return{
    type:LOGINFETCHING,
    status
  }
};

//设置请求登录接口表示上一次更新时间
export const loginLastUpdata=(time)=>{
  return{
    type:LOGINLASTUPDATE,
    time
  }
};

//登录请求操作成功
export const loginRequestSuccess=(status=0,msg='',response)=>{
  return {
    type:LOGINREQUESTSUCCESS,
    status,
    msg,
    response
  }
};

//设置用户登录状态
export const changeLoginStatus=(loginStatus)=>{
  return {
    type:CHANGELOGINSTATUS,
    loginStatus
  }
};

//设置状态窗口变化
export const changeModalStatus=(msg="",status=false)=>{
  return {
    type:CHANGEMODALSTATUS,
    msg,
    status
  }
};

//查询廊坊银行的用户id
export const updateLccb=(lccbId,lccbAuth)=>{
  return {
    type:UPDATELCCB,
    lccbId,
    lccbAuth
  }
};



