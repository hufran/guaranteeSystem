/*
 *guarantee reducer功能 主要用来变更数据
 * */
import {SEARCHTYPE,GUARANTEELIST,UPDATEREQUESTSTATUS,SETPOINTMAG,SETMODALTYPE} from "./guaranteeAction.jsx"

let initState={
  listData:[],
  searchValue:"",
  pointMsg:"",
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
      newValue.listData=action.list;
      return newValue;
    case UPDATEREQUESTSTATUS:
      Object.assign(newValue,action.requestStatus);
      return newValue;
    case SETPOINTMAG:
      newValue.pointMsg=action.pointMsg;
      return newValue;
    case SETMODALTYPE:
      newValue.modalType=action.modalType;
      return newValue;
    default:
      return state;
  }

};
export default GuaranteeReducer;
