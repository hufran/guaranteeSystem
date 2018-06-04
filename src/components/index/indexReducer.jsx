/*
*index reducer功能 主要用来变更数据
* */

import {SHOWPOINT,HIDEPOINT,USERFUNDNEW,INDEXISFETCHING,INDEXLASTUPDATE,INDEXINVALIDATE} from "./indexAction.jsx"
let initState={
  point:{
    status:false,
    text:""
  },
  accountInfo:{
    isFetching:true,//是否在抓取数据
    didInvalidate:true,//表示数据是否过时
    lastUpdated:0,//表示上一次更新时间
  }
};

const IndexReducer=(state=initState,action)=>{
  let newValue={...state};
  switch (action.type){
    case SHOWPOINT:
      Object.assign(newValue.point,{
        status:action.status,
        text:action.text,
        btnText:action.btnText,
        linkTo:action.linkTo
      });
      return newValue;
    case HIDEPOINT:
      Object.assign(newValue.point,{
        status:action.status,
        text:action.text
      });
      return newValue;
    case USERFUNDNEW:
      Object.assign(newValue.accountInfo,action.account);
      return newValue;
    case INDEXISFETCHING:
      Object.assign(newValue.accountInfo,{isFetching:action.status});
      return newValue;
    case INDEXLASTUPDATE:
      Object.assign(newValue.accountInfo,{lastUpdated:action.time});
      return newValue;
    case INDEXINVALIDATE:
      Object.assign(newValue.accountInfo,{didInvalidate:action.status});
      return newValue;
    default:
      return state;
  }
};

export default IndexReducer;
