/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件
 */

//设置 type类型
export const GETUSER="GET_USER";

export const SHOWPOINT="SHOW_POINT";
export const HIDEPOINT="HIDE_POINT";
export const USERFUNDNEW="USER_FUND_NEW";
export const INDEXISFETCHING="INDEX_IS_FETCHING";
export const INDEXLASTUPDATE="INDEX_LAST_UPDATE";
export const INDEXINVALIDATE="INDEX_INVALIDATE";

//显示提示框
export const showPoint=(text="您尚未开通银行存管！",btnText="立即开通",linkTo="/authentication")=>{
  return {
    type:SHOWPOINT,
    status:true,
    text,
    btnText,
    linkTo
  }
};

//隐藏提示框
export const hidePoint=()=>{
  return {
    type:HIDEPOINT,
    status:false,
    text:null
  }
};

//获取用户数据
export const getUser=()=>{
  return {
    type:GETUSER
  }
};

//获取用户账户余额
export const userFundNew=(account)=>{
  return{
    type:USERFUNDNEW,
    account
  }
}

//是否在抓取数据
export const indexFetching=(status)=>{
  return{
    type:INDEXISFETCHING,
    status
  }
}

//更新上一次更新时间
export const indexLastUpdate=(time)=>{
  return {
    type:INDEXLASTUPDATE,
    time
  }
}

//表示数据是否过时
export const indexInvalidate=(status)=>{
  return{
    type:INDEXINVALIDATE,
    status
  }
}



