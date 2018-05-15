/*
 *companyInfo reducer功能 主要用来变更数据
 * */
import {SETDATAINTEGRITY} from "./companyInfoAction.jsx";

let initState={
  level:0
};

const CompanyInfoReducer=(state=initState,action)=>{
  let newValue={...state};
  switch(action.type){
    case SETDATAINTEGRITY:
      Object.assign(newValue,{level:action.level});
      return newValue;
    default:
      return newValue;
  }
};

export default CompanyInfoReducer;
