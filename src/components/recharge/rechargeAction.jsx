/*
 *recharge action行为操作
 * */
//设置充值金额
export const SETRECHARGEMONEY="SET_RECHARGE_MONEY";

//设置网银充值列表
export const SETBANKITEMLIST="SET_BANK_ITEM_LIST";

//设置银行列表请求后的结果
export const SETREQUESTBANKLIST="SET_REQUEST_BANK_LIST";

//设置更多银行列表信息
export const SETMOREBANKLIST="SET_MORE_BANK_LIST";

//设置更多银行列表选项
export const SETSHOWMORELISTSTATUS="SET_SHOW_MORE_LIST_STATUS";

//设置错误信息的显示
export const SETRECHARGEPOINTMSG="SET_RECHARGE_POINT_MSG";

//设置错误信息的显示隐藏
export const SETRECHARGESHOWSTATUS="SET_RECHARGE_SHOW_STATUS";

//设置数据更新状态
export const SETRECHARGEFETCHING="SET_RECHARGE_FETCHING";

//设置数据是否过时
export const SETRECHARGEINVALIDATE="SET_RECHARGE_INVALIDATE";

//设置数据上一次更新时间lastUpdated
export const SETRECHARGELASTUPDATE="SET_RECHARGE_LAST_UPDATE";

//设置tab数据的切换
export const CHANGERECHARGETABINDEX="CHANGE_RECHARGE_TAB_INDEX";

//设置corporation数据更新状态
export const SETCORPORATIONRECHARGEFETCHING="SET_CORPORATION_RECHARGE_FETCHING";

//设置corporation数据是否过时
export const SETCORPORATIONRECHARGEINVALIDATE="SET_CORPORATION_RECHARGE_INVALIDATE";

//设置corporation数据上一次更新时间lastUpdated
export const SETCORPORATIONRECHARGELASTUPDATE="SET_CORPORATION_RECHARGE_LAST_UPDATE";

//设置corporation数据更新
export const SETCORPORATIONDATEUPDATE="SET_CORPORATION_DATE_UPDATE";

//设置充值金额方法
export const setRechargeMoney=(money)=>{
  return{
    type:SETRECHARGEMONEY,
    money
  }
};

//设置网银充值列表方法
export const setBankList=(list)=>{
  return{
    type:SETBANKITEMLIST,
    list
  }
};

//设置银行列表请求后的结果方法
export const setRequestBankList=(list)=>{
  return{
    type:SETREQUESTBANKLIST,
    list
  }
};

//设置网银充值更多列表方法
export const setMoreBankList=(moreList)=>{
  return {
    type:SETMOREBANKLIST,
    moreList
  }
};

//设置更多银行列表选项
export const setShowMore=(moreStatus)=>{
  return{
    type:SETSHOWMORELISTSTATUS,
    moreStatus
  }
};

//设置错误信息的显示方法
export const setPointMsg=(pointMsg)=>{
  return {
    type:SETRECHARGEPOINTMSG,
    pointMsg
  }
};

//设置错误的信息的显示隐藏方法
export const setErrorMsg=(status)=>{
  return {
    type:SETRECHARGESHOWSTATUS,
    status
  }
};

//设置数据更新状态方法
export const setRechargeFetching=(fetching)=>{
  return{
    type:SETRECHARGEFETCHING,
    fetching
  }
};

//设置数据是否过时方法
export const setRechargeInvalidate=(invalidate)=>{
  return{
    type:SETRECHARGEINVALIDATE,
    invalidate
  }
};

//设置数据的更新时间
export const setRechargeUpdate=(lastUpdate)=>{
  return{
    type:SETRECHARGELASTUPDATE,
    lastUpdate
  }
};

//设置tab更新状态
export const updateRechargeIndex=(index)=>{
  return {
    type:CHANGERECHARGETABINDEX,
    index
  }
};

//设置corporation数据更新状态
export const setCorporationFetching=(fetching)=>{
  return{
    type:SETCORPORATIONRECHARGEFETCHING,
    fetching
  }
};

//设置corporation数据是否过时
export const setCorporationInvalidate=(invalidate)=>{
  return{
    type:SETCORPORATIONRECHARGEINVALIDATE,
    invalidate
  }
};

//设置corporation数据上一次更新时间lastUpdated
export const setCorporationLastUpdate=(lastUpdate)=>{
  return{
    type:SETCORPORATIONRECHARGELASTUPDATE,
    lastUpdate
  }
};

//设置corporation数据更新
export const setCorporationDateUpdate=(data)=>{
  return{
    type:SETCORPORATIONDATEUPDATE,
    data
  }
}



