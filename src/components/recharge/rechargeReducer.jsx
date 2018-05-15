/*
 *recharge reducer功能 主要用来变更数据
 * */
import {
  SETRECHARGEMONEY,
  SETBANKITEMLIST,
  SETREQUESTBANKLIST,
  SETMOREBANKLIST,
  SETSHOWMORELISTSTATUS,
  SETRECHARGESHOWSTATUS,
  SETRECHARGEPOINTMSG,
  SETRECHARGEFETCHING,
  SETRECHARGEINVALIDATE,
  SETRECHARGELASTUPDATE
} from "./rechargeAction.jsx";

const initState={
  bankList:[],
  showBankList:[],
  moreList:[],
  showMoreStatus:false,
  rechargeMoney:0,
  pointMsg:"",
  showErrorStatus:false,
  isFetching:true,//是否在抓取数据
  didInvalidate:true,//表示数据是否过时
  lastUpdated:0,//表示上一次更新时间
};

const RechargeReducer=(state=initState,action)=>{
  let newValue={...state};
  switch (action.type){
    case SETRECHARGEMONEY:
      Object.assign(newValue,{rechargeMoney:action.money});
      return newValue;
    case SETBANKITEMLIST:
      Object.assign(newValue,{showBankList:action.list});
      return newValue;
    case SETREQUESTBANKLIST:
      Object.assign(newValue,{bankList:action.list});
      return newValue;
    case SETMOREBANKLIST:
      Object.assign(newValue,{moreList:action.moreList});
      return newValue;
    case SETSHOWMORELISTSTATUS:
      Object.assign(newValue,{showMoreStatus:action.moreStatus});
      return newValue;
    case SETRECHARGEPOINTMSG:
      Object.assign(newValue,{pointMsg:action.pointMsg});
      return newValue;
    case SETRECHARGESHOWSTATUS:
      Object.assign(newValue,{showErrorStatus:action.status});
      return newValue;
    case SETRECHARGEFETCHING:
      Object.assign(newValue,{isFetching:action.fetching});
      return newValue;
    case SETRECHARGEINVALIDATE:
      Object.assign(newValue,{didInvalidate:action.invalidate});
      return newValue;
    case SETRECHARGELASTUPDATE:
      Object.assign(newValue,{lastUpdated:action.lastUpdate});
      return newValue;
    default:
      return newValue;
  }

};

export default RechargeReducer;
