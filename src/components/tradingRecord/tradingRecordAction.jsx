/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件
 */


//交易类型
export const CHANGETRADINGTYPE="CHANGE_TRADING_TYPE";

//开始时间设置
export const CHANGETRADINGSTARTTIME="CHANGE_TRADING_START_TIME";

//结束时间设置
export const CHANGETRADINGENDTIME="CHANGE_TRADING_END_TIME";

//设置结束时间选择中的开始时间
export const CHANGETRADINGBEGINTIME="CHANGE_TRADING_BEGIN_TIME";

//设置交易数据
export const SETTRADINGDATA="SET_TRADING_DATA";

//设置数据更新状态
export const SETTRADINGFETCHING="SET_TRADING_FETCHING";

//设置数据是否过时
export const SETTRADINGINVALIDATE="SET_TRADING_INVALIDATE";

//设置数据上一次更新时间lastUpdated
export const SETTRADINGLASTUPDATE="SET_TRADING_LAST_UPDATE";

//设置提示信息
export const SETTRADINGPOINTMAG="SET_TRADING_POINT_MSG";

//更新列表数据展示
export const UPDATETRADINGPAGERLIST="UPDATE_TRADING_PAGER_LIST";

//设置交易类型
export const changeTradingType=(value)=>{
  return {
    type:CHANGETRADINGTYPE,
    value
  }
};

//设置开始时间
export const changeTradingStartTime=(startTime)=>{
  return{
    type:CHANGETRADINGSTARTTIME,
    value:startTime
  }
};

//设置结束时间
export const changeTradingEndTime=(endTime)=>{
  return{
    type:CHANGETRADINGENDTIME,
    value:endTime
  }
};

//设置结束时间选择中的开始时间方法
export const changeTradingBeginTime=(time)=>{
  return {
    type:CHANGETRADINGBEGINTIME,
    value:time
  }
};


//设置交易数据的更新
export const changeTradingData=(listData)=>{
  return {
    type:SETTRADINGDATA,
    listData
  }
};

//设置数据更新状态
export const setTradingFetching=(fetching)=>{
  return {
    type:SETTRADINGFETCHING,
    fetching
  }
};

//设置数据是否过时
export const setTradingInvalidate=(invalidate)=>{
  return {
    type:SETTRADINGINVALIDATE,
    invalidate
  }
};

//设置数据上一次更新时间lastUpdated
export const setTradingLastUpdate=(time)=>{
  return {
    type:SETTRADINGLASTUPDATE,
    time
  }
};

//设置错误提示信息
export const setTradingPointMsg=(pointMsg)=>{
  return{
    type:SETTRADINGPOINTMAG,
    pointMsg
  }
};

//更新列表数据展示
export const updateTradingPagerList=(listData)=>{
  return{
    type:UPDATETRADINGPAGERLIST,
    listData
  }
};


