/*
 *guarantee reducer功能 主要用来变更数据
 * */
import {SEARCHTYPE,GUARANTEELIST,UPDATEREQUESTSTATUS,SETPOINTMAG,SETMODALTYPE,SETGUARANTEEFETCHING,SETGUARANTEEINVALIDATE,SETGUARANTEELASTUPDATE,UPDATEGUARANTEEPAGERLIST} from "./guaranteeAction.jsx"

let initState={
  listData:[],
  pageCountList:[],
  searchValue:"",
  pointMsg:"",
  requestStatus:{},
  modalType:0,//0代表错误提示框，1代表代偿操作模态框
  isFetching:true,//是否在抓取数据
  didInvalidate:true,//表示数据是否过时
  lastUpdated:0,//表示上一次更新时间
};

const GuaranteeReducer=(state=initState,action)=>{
  let newValue={...state};
  switch (action.type){
    case SEARCHTYPE:
      newValue.searchValue=action.field;
      return newValue;
    case GUARANTEELIST:
      Object.assign(newValue,{listData:action.list});
      return newValue;
    case UPDATEREQUESTSTATUS:
      Object.assign(newValue,{requestStatus:action.requestStatus});
      return newValue;
    case SETPOINTMAG:
      Object.assign(newValue,{pointMsg:action.pointMsg});
      return newValue;
    case SETMODALTYPE:
      Object.assign(newValue,{modalType:action.modalType});
      return newValue;
    case SETGUARANTEEFETCHING:
      Object.assign(newValue,{isFetching:action.fetching});
      return newValue;
    case SETGUARANTEEINVALIDATE:
      Object.assign(newValue,{didInvalidate:action.invalidate});
      return newValue;
    case SETGUARANTEELASTUPDATE:
      Object.assign(newValue,{lastUpdated:action.lastUpdate});
      return newValue;
    case UPDATEGUARANTEEPAGERLIST:
      Object.assign(newValue,{pageCountList:action.listData});
      return newValue;
    default:
      return state;
  }

};


export default GuaranteeReducer;
