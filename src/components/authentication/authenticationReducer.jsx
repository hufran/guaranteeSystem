/*
 *companyInfo reducer功能 主要用来变更数据
 * */
import {SETCOMPANYNAME,SETBUSINESSLICENSE,SETBANKCARDNUMBER,SETBANKCODE,SETAUTHENTICATIONPOINTMSG,SETBANKLIST,SETERRORMSGSTATUS,UPDATECORPORATION} from "./authenticationAction.jsx"

let initState={
  pointMsg:"",
  companyName:"",
  businessLicense:"",
  bankCardNumber:"",
  bankCode:"",
  bankList:{},
  corporation:{},
  showErrorMsg:false
};

const AuthenticationReducer=(state=initState,action)=>{
  let newValue={...state};
  switch(action.type){
    case SETCOMPANYNAME:
      Object.assign(newValue,{companyName:action.value});
      return newValue;
    case SETBUSINESSLICENSE:
      Object.assign(newValue,{businessLicense:action.value});
      return newValue;
    case SETBANKCARDNUMBER:
      Object.assign(newValue,{bankCardNumber:action.value});
      return newValue;
    case SETBANKCODE:
      Object.assign(newValue,{bankCode:action.value});
      return newValue;
    case SETAUTHENTICATIONPOINTMSG:
      Object.assign(newValue,{pointMsg:action.point});
      return newValue;
    case SETBANKLIST:
      Object.assign(newValue,{bankList:action.list});
      return newValue;
    case SETERRORMSGSTATUS:
      Object.assign(newValue,{showErrorMsg:action.status});
      return newValue;
    case UPDATECORPORATION:
      Object.assign(newValue,{corporation:action.data});
      return newValue;
    default:
      return newValue;
  }
};

export default AuthenticationReducer;
