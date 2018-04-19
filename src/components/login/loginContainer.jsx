/*
 *给组件分配数据以及方法
 * */
import {connect} from "react-redux";
import Login from "./login.jsx";
import {setError,setUserName,setPass,setRemeber,loginIsFetching,loginLastUpdata,loginRequestSuccess,changeLoginStatus,changeModalStatus} from "./loginAction.jsx"
import Util from "../../assets/js/util.jsx";
import UrlList from "../../assets/js/urlList.jsx";
import $ from "jquery";
import * as bootstrap from "bootstrap"
import {PASSWORDMINLENGTH,PASSWORDMAXLENGTH,USERNAMEMINLENGTH,RegexValue} from "../../assets/js/regex.jsx";


let {apiUrl}=UrlList;

const errorStatus={
  usernameRequire:"用户名不能为空",
  usernameError:"用户名格式不正确（请使用手机号登录）",
  usernameTypeError:"请输入正确的手机号码",
  passRequire:"密码不能为空",
  passLengthError:"密码长度不正确（8-16位）",
  passError:"密码格式不正确（8-16位数字字母组合）",
  userNotExit:"用户不存在，请更换账号",
  passCheckError:"用户密码错误",
  userHasLogin:"用户已经登录，请退出其他客户端后在登录"
};

//登录状态
const getLoginStatus=({point})=>{
  const loginStatus=point.loginStatus;
  return loginStatus;
};

//获取错误信息
const getErrorContent=({errorContent})=>{
  return {...errorContent};
};

//获取表单存储数据
const getFormValue=({formValue})=>{
  return {...formValue};
};

//获取modal数据状态
const getModalValue=({modal})=>{
  return {...modal};
};

const mapStateToProps=(state)=>{
  console.log("stateww:",state);
  return{
    loginStatus:getLoginStatus(state.LoginReducer),
    errorContent:getErrorContent(state.LoginReducer),
    formValue:getFormValue(state.LoginReducer),
    modalValue:getModalValue(state.LoginReducer)
  }
};

const mapDispatchToProps=(dispatch,ownerProps)=>{
  return {
    setUser:({target,stopPropagation,cancelBubble})=>{
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      let value=target.value;
      if(value.length<=USERNAMEMINLENGTH){
        dispatch(setUserName(target.value));
      }
    },
    setPass:({target,stopPropagation,cancelBubble})=>{
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      if(target.value.length<=PASSWORDMAXLENGTH){
        dispatch(setPass(target.value));
      }
    },
    checkUser:({target,stopPropagation,cancelBubble})=>{
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      const result=RegexValue.checkUser(target.value);
      if(result.flag){
        dispatch(setError(errorStatus[result.errType]));
      }else{
        dispatch(setError(errorStatus[result.errType],true));
      }
    },
    checkPass:({target,stopPropagation,cancelBubble})=>{
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      const result=RegexValue.checkPass(target.value);
      if(result.flag){
        dispatch(setError(errorStatus[result.errType]));
      }else{
        dispatch(setError(errorStatus[result.errType],true));
      }
    },
    setRemeber:({target,stopPropagation,cancelBubble})=>{
      let value=target.checked;
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      dispatch(setRemeber(value));
    },
    forget:()=>{
      dispatch(changeModalStatus("请联系管理员！",true));
    },
    closeModal:()=>{
      dispatch(changeModalStatus("",false));
    },
    login:({target,stopPropagation,cancelBubble},formValue)=>{
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      dispatch(changeLoginStatus(true));
      const checkUserresult=RegexValue.checkUser(formValue.userName);
      if(checkUserresult.flag){
        dispatch(setError(errorStatus[checkUserresult.errType]));
      }else{
        dispatch(setError(errorStatus[checkUserresult.errType],true));
        return;
      }
      const checkPassresult=RegexValue.checkPass(formValue.passWord);
      if(checkPassresult.flag){
        dispatch(setError(errorStatus[checkPassresult.errType]));
      }else{
        dispatch(setError(errorStatus[checkPassresult.errType],true));
        return;
      }

      const sendParam={baseUrl:UrlList.baseUrl};
      const data={
        username:formValue.userName,
        password:formValue.passWord,
        remember:formValue.remember
      };
      const actionList={
        isFetching:loginIsFetching,
        lastUpdated:loginLastUpdata
      };
      const success=(data)=>{
        dispatch(loginRequestSuccess(data.status,data.msg,data));
        if(data.status==0){
          dispatch(changeLoginStatus(true));
        }else{
          dispatch(changeLoginStatus(false));
          dispatch(changeModalStatus(data.msg,true));
          $("#myModal").modal("show");
        }
      };
      const fail=(err)=>{
        dispatch(changeModalStatus("服务器异常，请稍后重试",true));
        $("#myModal").modal("show");
      };

      //Util.sendRequest({method:"POST",url:apiUrl.login,urlParam:sendParam,data,actionList,success,fail});


    }
  };
};

const LoginComponent=connect(mapStateToProps,mapDispatchToProps)(Login);

export default LoginComponent;
