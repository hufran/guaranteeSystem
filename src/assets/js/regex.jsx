/*
*正则表达式验证js
* */
export const USERNAMEMINLENGTH=11;
export const USERNAMEMAXLENGTH=11;
export const PASSWORDMINLENGTH=6;
export const PASSWORDMAXLENGTH=16;
export const UPDATEDATAMINTIME=600000;


const RegexValue=Object.create({
  checkUser:(value="")=>{
    const result={flag:false,errType:null};
    if(value.length==0){
      Object.assign(result,{errType:"usernameRequire"});
    }else if(value.length<USERNAMEMINLENGTH||value.length>USERNAMEMAXLENGTH){
      Object.assign(result,{errType:"usernameError"});
    }else if (!/^1\d{10}$/.test(value)) {
      Object.assign(result,{errType:"usernameTypeError"});
    } else {
      result.flag = true;
    }
    return result;
  },
  checkPass:(value="")=>{
    const result={flag:false,errType:null};
    if(value.length==0){
      Object.assign(result,{errType:"passRequire"});
    }else if(value.length<PASSWORDMINLENGTH||value.length>PASSWORDMAXLENGTH){
      Object.assign(result,{errType:"passLengthError"});
    }else if (!(/^\w{6,16}$/.test(value))) {///^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      Object.assign(result,{errType:"passError"});
    } else {
      result.flag = true;
    }
    return result;
  },
  checkBankAccount:(value="")=>{
    const result={flag:false,errType:null};
    if(value.length==0){
      Object.assign(result,{errType:"bankAccountRequire"});
    }else if(!(/^\d{16,19}$/.test(value))){
      Object.assign(result,{errType:"bankAccountError"});
    }else{
      result.flag = true;
    }
    return result;
  },
  checkLicense:(value="")=>{
    const result={flag:false,errType:null};
    if(value.length==0){
      Object.assign(result,{errType:"licenseRequire"});
    }else if(!(/^\w{15}|\w{18}$/.test(value))){
      Object.assign(result,{errType:"licenseError"});
    }else{
      result.flag = true;
    }
    return result;
  },
  checkCompanyName:(value="")=>{
    const result={flag:false,errType:null};
    if(value.length==0){
      Object.assign(result,{errType:"companyNameRequire"});
    }else if(!(/^[\u4e00-\u9fa5]{1,19}$/.test(value))){
      Object.assign(result,{errType:"companyNameError"});
    }else{
      result.flag = true;
    }
    return result;
  }
});

export {RegexValue};
