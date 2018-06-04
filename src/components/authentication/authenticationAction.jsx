/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件
 */

//设置公司信息
export const SETCOMPANYNAME="SET_COMPANY_NAME";

//设置公司营业执照号
export const SETBUSINESSLICENSE="SET_BUSINESS_LICENSE";

//设置银行卡号
export const SETBANKCARDNUMBER="SET_BANK_CARD_NUMBER";

//设置银行名称
export const SETBANKCODE="SET_BANK_CODE";

//设置消息提示窗口
export const SETAUTHENTICATIONPOINTMSG="SET_AUTHENTICATION_POINT_MSG";

//设置银行卡列表信息
export const SETBANKLIST="SET_BANK_LIST";

//设置错误提示状态信息
export const SETERRORMSGSTATUS="SET_ERROR_MSG_STATUS";

//设置是否在抓取数据
export const AUTHENTICATIONISFETCHING="AUTHENTICATION_IS_FETCHING";

//设置上一次更新时间
export const AUTHENTICATIONLASTUPDATE="AUTHENTICATION_LAST_UPDATE";

//设置数据是否过时
export const AUTHENTICATIONINVALIDATE="AUTHENTICATION_INVALIDATE";

//设置公司信息方法
export const setCompanyName=(value)=>{
  return {
    type:SETCOMPANYNAME,
    value
  }
};

//设置公司营业执照号方法
export const setBusinessLicense=(value)=>{
  return {
    type:SETBUSINESSLICENSE,
    value
  }
};

//设置银行卡号方法
export const setBankCardNumber=(value)=>{
  return {
    type:SETBANKCARDNUMBER,
    value
  }
};

//设置银行名称方法
export const setBankCode=(value)=>{
  return {
    type:SETBANKCODE,
    value
  }
};

//设置消息提示方法
export const setAuthenticationPointMsg=(point)=>{
  return {
    type:SETAUTHENTICATIONPOINTMSG,
    point
  }
};

//设置银行卡列表信息方法
export const setBankList=(list)=>{
  return{
    type:SETBANKLIST,
    list
  }
};


//错误提示显示状态
export const setErrorStatus=(status)=>{
  return{
    type:SETERRORMSGSTATUS,
    status
  }
}

//设置是否在抓取数据
export const authenticationIsFetching=(status)=>{
  return {
    type:AUTHENTICATIONISFETCHING,
    status
  }
};

//设置上一次更新时间
export const authenticationLastUpdate=(time)=>{
  return {
    type:AUTHENTICATIONLASTUPDATE,
    time
  }
};

//设置数据是否过时
export const authenticationInvalidate=(status)=>{
  return {
    type:AUTHENTICATIONINVALIDATE,
    status
  }
};

