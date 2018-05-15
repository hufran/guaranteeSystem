import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import {changeLoginStatus,loginRequestSuccess} from "../login/loginAction.jsx";
import PassManager from "./passManager.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"
import {RegexValue} from "../../assets/js/regex.jsx"
import Util from "../../assets/js/util.jsx";
import UrlList from "../../assets/js/urlList.jsx";
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


const mapStateToProps=(store)=>{
  return{
    navList:getNavList(store.LeftNavReducer),
    oldPass:store.PassManagerReducer.oldPass,
    newPass:store.PassManagerReducer.newPass,
    ensurePass:store.PassManagerReducer.ensurePass,
    validateCode:store.PassManagerReducer.validateCode,
    pointMsg:store.PassManagerReducer.pointMsg,
    errorPos:store.PassManagerReducer.errorPos,
    showError:store.PassManagerReducer.showError,
    imgUrl:store.PassManagerReducer.imgUrl
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
    changeImage(){
      const actionList={
        isFetching:setPassManagerFetching,
        lastUpdated:setPassManagerLastUpdated
      };
      const sendParam={
        baseUrl:""
      };
      dispatch(setPassErrorShow(false));
      const success=(data)=>{
        if(data.status==0){
          dispatch(setImageUrl(data.data));
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
      alert("更换成功");
      //Util.sendRequest({method:"POST",url:apiUrl.search,urlParam:sendParam,data:{searchValue:searchValue},actionList,success,fail});
    },
    submit(event,oldPass,newPass,ensurePass,validateCode){
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

      const actionList={
      };
      const sendParam={
        baseUrl:""
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
      //Util.sendRequest({method:"POST",url:apiUrl.login,urlParam:sendParam,data,actionList,success,fail});

    },
  }
};

const PassManagerComponent=connect(mapStateToProps,mapDispatchToProps)(PassManager);
export default PassManagerComponent;
