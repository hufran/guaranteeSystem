/*
 *withdraw action行为操作
 * */

//设置提现金额
export const SETWITHDRAWMONEY="SET_WITHDRAW_MONEY";

//设置错误提示信息
export const SETWITHDRAWPOINTMSG="SET_WITHDRAW_POINT_MSG";

//设置错误信息显示隐藏
export const SETWITHDRAWERRORSTATUS="SET_WITHDRAW_ERROR_STATUS";

//设置提现金额的方法
export const setWithdrawMoney=(money)=>{
  return{
    type:SETWITHDRAWMONEY,
    money
  }
};

//设置错误提示信息方法
export const setWithdrawPoint=(pointMsg)=>{
  return{
    type:SETWITHDRAWPOINTMSG,
    pointMsg
  }
};

//设置信息的显示隐藏
export const setErrorStatus=(status)=>{
  return{
    type:SETWITHDRAWERRORSTATUS,
    status
  }
};
