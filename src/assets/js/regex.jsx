/*
*正则表达式验证js
* */
export const USERNAMEMINLENGTH=11;
export const USERNAMEMAXLENGTH=11;
export const PASSWORDMINLENGTH=8;
export const PASSWORDMAXLENGTH=16;


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
    }else if(value.length<USERNAMEMINLENGTH||value.length>USERNAMEMAXLENGTH){
      Object.assign(result,{errType:"passLengthError"});
    }else if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value))) {
      Object.assign(result,{errType:"passError"});
    } else {
      result.flag = true;
    }
    return result;
  }
})

export {RegexValue};
