/*
*index reducer功能 主要用来变更数据
* */

import {SHOWPOINT,HIDEPOINT} from "./indexAction.jsx"
let initState={
  point:{
    status:false,
    text:""
  }
};

const IndexReducer=(state={},action)=>{
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
    default:
      return state;
  }
};

export default IndexReducer;
