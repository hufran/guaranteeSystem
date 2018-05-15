/*
 *passManager reducer功能 主要用来变更数据
 * */

import {
  SETOLDPASS,
  SETNEWPASS,
  SETENSUREPASS,
  SETVALIDATECODE,
  SETERRORPOS,
  SETPASSERRORSHOW,
  SETPASSERRORPOINTMSG,
  SETPASSMANAGERFETCHING,
  SETPASSMANAGERINVALIDATE,
  SETPASSMANAGERLASTUPDATE,
  SETIMAGEURL} from "./passManagerAction.jsx"

let initState={
  oldPass:"",
  newPass:"",
  ensurePass:"",
  validateCode:"",
  pointMsg:"",
  errorPos:"",
  showError:false,
  imgUrl:"",
  isFetching:true,//是否在抓取数据
  didInvalidate:true,//表示数据是否过时
  lastUpdated:0,//表示上一次更新时间
};

const PassManagerReducer=(state=initState,action)=>{
  let newValue={...state};
  switch(action.type){
    case SETOLDPASS:
      Object.assign(newValue,{oldPass:action.value});
      return newValue;
    case SETNEWPASS:
      Object.assign(newValue,{newPass:action.value});
      return newValue;
    case SETENSUREPASS:
      Object.assign(newValue,{ensurePass:action.value});
      return newValue;
    case SETVALIDATECODE:
      Object.assign(newValue,{validateCode:action.value});
      return newValue;
    case SETERRORPOS:
      Object.assign(newValue,{errorPos:action.pos});
      return newValue;
    case SETPASSERRORSHOW:
      Object.assign(newValue,{showError:action.status});
      return newValue;
    case SETPASSERRORPOINTMSG:
      Object.assign(newValue,{pointMsg:action.pointMsg});
      return newValue;
    case SETPASSMANAGERFETCHING:
      Object.assign(newValue,{isFetching:action.fetching});
      return newValue;
    case SETPASSMANAGERINVALIDATE:
      Object.assign(newValue,{didInvalidate:action.invalidate});
      return newValue;
    case SETPASSMANAGERLASTUPDATE:
      Object.assign(newValue,{lastUpdated:action.lastUpdated});
      return newValue;
    case SETIMAGEURL:
      Object.assign(newValue,{imgUrl:action.url});
      return newValue;
    default:
      return newValue;
  }
};

export default PassManagerReducer;
