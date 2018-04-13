/*
 *给组件分配数据以及方法
 * */
import {connect} from "react-redux";
import Login from "./login.jsx";
import {setError,setUserName,setPass,setRemeber,loginSuccess} from "./loginAction.jsx"
import bootstrap from "bootstrap";
import {PASSWORDMINLENGTH,PASSWORDMAXLENGTH,regexValue} from "../../assets/js/regex.jsx"



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
  return point.loginStatus;
};

//获取错误信息
const getErrorContent=({errorContent})=>{
  return errorContent;
};

//获取表单存储数据
const getFormValue=({formValue})=>{
  return formValue;
};

const mapStateToProps=(state)=>{
  return{
    loginStatus:getLoginStatus(state.Login),
    errorContent:getErrorContent(state.Login),
    formValue:getFormValue(state.Login)
  }
};

const mapDispatchToProps=(dispatch)=>{
  return {
    setUser:({target})=>{
      let value=target.value;

      dispatch(setUserName(target.value));
    },
    setPass:({target})=>{

      dispatch(setPass(target.value));
    },
    checkUser:(event)=>{
      regexValue()
    },
    checkPass:(event)=>{

    },
    setRemeber:(event)=>{

    },
    forget:()=>{

    },
    login:()=>{

    }
  };
};

const LoginComponent=connect(mapStateToProps,mapDispatchToProps)(Login);

export default LoginComponent;
