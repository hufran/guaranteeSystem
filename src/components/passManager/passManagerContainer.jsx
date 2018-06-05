import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import {changeLoginStatus,loginRequestSuccess} from "../login/loginAction.jsx";
import PassManager from "./passManager.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"
import {RegexValue} from "../../assets/js/regex.jsx"
import Util from "../../assets/js/util.jsx";
import UrlList from "../../../router/util/urlHandler";
import {
  setOldPass,
  setNewPass,
  setEnsurePass,
  setValidateCode,
  setPassErrorPointMsg,
  setErrorPos,
  setPassErrorShow,
  setImageUrl,
  setPassManagerFetching,
  setPassManagerLastUpdated
} from "./passManagerAction.jsx";

const {apiUrl}=UrlList;

const getNavList=(leftNav)=>{
  let navList=[...leftNav];
  return navList;
};

const getUserInfo=({point:{loginStatus},user})=>{
  if(loginStatus){
    return {...user};
  }else{
    return {};
  }

};

const mapStateToProps=(store)=>{
  return{
    navList:getNavList(store.LeftNavReducer),
    user:getUserInfo(store.LoginReducer),
    oldPass:store.PassManagerReducer.oldPass,
    newPass:store.PassManagerReducer.newPass,
    ensurePass:store.PassManagerReducer.ensurePass,
    validateCode:store.PassManagerReducer.validateCode,
    pointMsg:store.PassManagerReducer.pointMsg,
    errorPos:store.PassManagerReducer.errorPos,
    showError:store.PassManagerReducer.showError,
    imgUrl:store.PassManagerReducer.imgUrl,
    lastUpdate:store.PassManagerReducer.lastUpdated,
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    changeNavList(navList){
      let newState=[...navList];
      for(let item of newState){
        if(item.childList){
          for(let key of item.childList){
            key.className="";
            key.childClass="gray";
          }
        }
        item.active=false;
      }
      newState[3].active=true;
      newState[3].childList[2].className="active";
      newState[3].childList[2].childClass="blue";
      dispatch(changeNavStatus(newState));
    },
    operaOldPass({target}){
      const value=target.value;
      dispatch(setOldPass(value));
    },
    operaNewPass({target}){
      const value=target.value;
      dispatch(setNewPass(value));
    },
    operaEnsurePass({target}){
      const value=target.value;
      dispatch(setEnsurePass(value));
    },
    operaValidate({target}){
      const value=target.value;
      dispatch(setValidateCode(value));
    },
    unmountLastTime(){
      dispatch(setPassManagerLastUpdated(0));
    },
    changeImage(lastUpdate){
      const time=new Date().getTime();
      console.log("time:"+time+" lastUpdate:"+lastUpdate);
      if(time-lastUpdate>10000){
        const actionList={
          isFetching:setPassManagerFetching,
          lastUpdated:setPassManagerLastUpdated
        };
        const sendParam={
          baseUrl:window.baseUrl
        };
        dispatch(setPassErrorShow(false));
        const success=(data)=>{
          dispatch(setImageUrl(data.captcha));
        };
        const fail=(err)=>{
          dispatch(setErrorPos("validate"));
          dispatch(setPassErrorPointMsg("网络异常，请稍后重试！"));
          dispatch(setPassErrorShow(true));
        };
        Util.sendRequest({method:"GET",url:apiUrl.captcha,urlParam:sendParam,data:{},actionList,success,fail});
      }else{
        alert("您刷新太频繁，请稍后重试！");
      }
    },
    submit(event,oldPass,newPass,ensurePass,validateCode,user){
      event.preventDefault();
      try {
        event.stopPropagation();
      }catch(e){
        event.cancelBubble=true;
      }
      dispatch(setPassErrorShow(false));
      let result=RegexValue.checkPass(oldPass);
      if(!result.flag){
        if(result.errType=="passRequire"){
          dispatch(setPassErrorPointMsg("请输入原密码！"));
          dispatch(setErrorPos("old"));
          dispatch(setPassErrorShow(true));
          return;
        }else if(result.errType=="passLengthError"){
          dispatch(setPassErrorPointMsg("原密码长度不正确！"));
          dispatch(setErrorPos("old"));
          dispatch(setPassErrorShow(true));
          return
        }else{
          dispatch(setPassErrorPointMsg("原密码格式不正确！"));
          dispatch(setErrorPos("old"));
          dispatch(setPassErrorShow(true));
          return
        }
      }

      result=RegexValue.checkPass(newPass);
      if(!result.flag){
        if(result.errType=="passRequire"){
          dispatch(setPassErrorPointMsg("请输入新密码！"));
          dispatch(setErrorPos("new"));
          dispatch(setPassErrorShow(true));
          return;
        }else if(result.errType=="passLengthError"){
          dispatch(setPassErrorPointMsg("新密码长度不正确！"));
          dispatch(setErrorPos("new"));
          dispatch(setPassErrorShow(true));
          return
        }else{
          dispatch(setPassErrorPointMsg("新原密码格式不正确！"));
          dispatch(setErrorPos("new"));
          dispatch(setPassErrorShow(true));
          return
        }
      }
      if(newPass===ensurePass){
        dispatch(setPassErrorPointMsg("两次密码输入不一致！"));
        dispatch(setErrorPos("ensure"));
        dispatch(setPassErrorShow(true));
        return;
      }

      if(!(/^\w{6}$/.test(validateCode))){
        dispatch(setPassErrorPointMsg("验证码格式不正确！"));
        dispatch(setErrorPos("validate"));
        dispatch(setPassErrorShow(true));
        return;
      }
      if(!user.id){
        dispatch(setPassErrorPointMsg("请登录后重新操作！"));
        dispatch(setErrorPos("validate"));
        dispatch(setPassErrorShow(true));
      }
      const actionList={
      };
      const sendParam={
        baseUrl:window.baseUrl,
        userId:user.id
      };
      dispatch(setPassErrorShow(false));
      const success=(data)=>{
        if(data.status==0){
          //退出登录

          dispatch(changeLoginStatus(false));
          dispatch(loginRequestSuccess(null,null,null));
        }else{
          dispatch(setPassErrorPointMsg(data.msg));
          dispatch(setErrorPos("validate"));
          dispatch(setPassErrorShow(true));
        }
      };
      const fail=(err)=>{
        dispatch(setErrorPos("validate"));
        dispatch(setPassErrorPointMsg("网络异常，请稍后重试！"));
        dispatch(setPassErrorShow(true));
      };
      Util.sendRequest({method:"POST",url:apiUrl.setPaymentPassword,urlParam:sendParam,data,actionList,success,fail});
    },
  }
};

const PassManagerComponent=connect(mapStateToProps,mapDispatchToProps)(PassManager);
export default PassManagerComponent;
