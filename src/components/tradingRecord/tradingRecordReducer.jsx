/*
 *guarantee reducer功能 主要用来变更数据
 * */

import {
  CHANGETRADINGTYPE,
  CHANGETRADINGSTARTTIME,
  CHANGETRADINGENDTIME,
  SETTRADINGDATA,
  SETTRADINGFETCHING,
  SETTRADINGINVALIDATE,
  SETTRADINGLASTUPDATE,
  SETTRADINGPOINTMAG,
  CHANGETRADINGBEGINTIME,
  UPDATETRADINGPAGERLIST
} from "./tradingRecordAction.jsx"

let initState={
  listData:[],
  pageList:[],
  pointMsg:"",
  tradingType:"",
  beginTime:"",
  startTime:"",
  endTime:"",
  disabled:true,
  isFetching:true,//是否在抓取数据
  didInvalidate:true,//表示数据是否过时
  lastUpdated:0,//表示上一次更新时间
};

const TradingRecordReducer=(state=initState,action)=>{
  let newValue={...state};
  switch(action.type){
    case CHANGETRADINGTYPE:
      Object.assign(newValue,{tradingType:action.value});
      return newValue;
    case CHANGETRADINGSTARTTIME:
      Object.assign(newValue,{startTime:action.value});
      return newValue;
    case CHANGETRADINGENDTIME:
      Object.assign(newValue,{endTime:action.value});
      return newValue;
    case CHANGETRADINGBEGINTIME:
      Object.assign(newValue,{beginTime:action.value});
      return newValue;
    case SETTRADINGDATA:
      Object.assign(newValue,{listData:action.listData});
      return newValue;
    case SETTRADINGFETCHING:
      Object.assign(newValue,{isFetching:action.fetching});
      return newValue;
    case SETTRADINGINVALIDATE:
      Object.assign(newValue,{didInvalidate:action.invalidate});
      return newValue;
    case SETTRADINGLASTUPDATE:
      Object.assign(newValue,{lastUpdated:action.time});
      return newValue;
    case SETTRADINGPOINTMAG:
      Object.assign(newValue,{pointMsg:action.pointMsg});
      return newValue;
    case UPDATETRADINGPAGERLIST:
      Object.assign(newValue,{pageList:action.listData});
      return newValue;
    default:
      return newValue;
  }

};

export default TradingRecordReducer;
