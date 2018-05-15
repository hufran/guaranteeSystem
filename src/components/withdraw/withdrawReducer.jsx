/*
 *withdraw reducer功能 主要用来变更数据
 * */
import {SETWITHDRAWMONEY,SETWITHDRAWPOINTMSG,SETWITHDRAWERRORSTATUS} from "./withdrawAction.jsx"

const initState={
  pointMsg:"",
  showErrorStatus:false,
  withdrawMoney:0
};

const WithdrawReducer=(state=initState,action)=>{
  let newValue={...state};
  switch (action.type){
    case SETWITHDRAWMONEY:
      Object.assign(newValue,{withdrawMoney:action.money});
      return newValue;
    case SETWITHDRAWPOINTMSG:
      Object.assign(newValue,{pointMsg:action.pointMsg});
      return newValue;
    case SETWITHDRAWERRORSTATUS:
      Object.assign(newValue,{showErrorStatus:action.status});
      return newValue;
    default:
      return newValue;
  }
};

export default WithdrawReducer;
