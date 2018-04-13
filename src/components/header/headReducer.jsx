/*
*head reducer功能 主要用来变更数据
* */
import {LOGINOUT} from "./headAction"

let initState={

};

const Head=(state,action)=>{
  let newValue={...state};
  switch (action.type){
    case LOGINOUT:
      Object.assign(newValue.point,{
        loginStatus:false,
        text:""
      });
      return newValue;
    default:
      return state;
  }
};

export default Head;
