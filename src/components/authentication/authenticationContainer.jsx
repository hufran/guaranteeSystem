import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import Authentication from "./authentication.jsx";
import {setCompanyName,setBusinessLicense,setBankCardNumber,setBankCode,setAuthenticationPointMsg,setErrorStatus,authenticationIsFetching,authenticationLastUpdate,setBankList} from "./authenticationAction.jsx"
import {loginIsFetching,loginLastUpdata,updateLccb} from "../login/loginAction.jsx";
import $ from "jquery"
import bootstrap from "bootstrap"
import Util from "../../assets/js/util.jsx";
import {RegexValue} from "../../assets/js/regex.jsx"
import UrlList from "../../../router/util/urlHandler";


const {apiUrl}=UrlList;

const errorContent={
  bankAccountRequire:"银行卡号不能为空！",
  bankAccountError:"银行卡号格式不正确！",
  licenseRequire:"营业执照编号不能为空！",
  licenseError:"营业执照编号格式不正确！",
  companyNameRequire:"公司名称不能为空!",
  companyNameError:"公司名称格式不正确！",
  bankCodeRequire:"请选择所属银行！",
  userIdRequire:"请刷新页面后重新操作！"
};

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

const getBankList=(authentication)=>{
  const bankList={...authentication.bankList};
  return bankList;
};

const mapStateToProps=(store)=>{
  console.log("state:",store);
  return {
    navList:getNavList(store.LeftNavReducer),
    user:getUserInfo(store.LoginReducer),
    lastUpdateTime:store.LoginReducer.point.lastUpdated,
    name:store.AuthenticationReducer.companyName,
    license:store.AuthenticationReducer.businessLicense,
    card:store.AuthenticationReducer.bankCardNumber,
    bankCode:store.AuthenticationReducer.bankCode,
    pointMsg:store.AuthenticationReducer.pointMsg,
    bankList:getBankList(store.AuthenticationReducer),
    showErrorMsg:store.AuthenticationReducer.showErrorMsg
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
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
      newState[3].childList[1].className="active";
      newState[3].childList[1].childClass="blue";
      dispatch(changeNavStatus(newState));
    },
    setName({target,stopPropagation,cancelBubble}){
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      if(target.value.length>19){
        target.value=target.value.slice(0,20);
      }else{
        dispatch(setCompanyName(target.value));
      }
    },
    setLicense({target,stopPropagation,cancelBubble}){
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      if(target.value.length>18){
        target.value=target.value.slice(0,18);
      }else{
        dispatch(setBusinessLicense(target.value));
      }
    },
    setCard({target,stopPropagation,cancelBubble}){
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      if(target.value.length>19){
        target.value=target.value.slice(0,19);
      }else{
        dispatch(setBankCardNumber(target.value));
      }
    },
    getBankValue({target,stopPropagation,cancelBubble}){
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      dispatch(setBankCode(target.value));
    },
    queryLccbId:(lastUpdateTime,user)=>{
      const time=new Date().getTime();
      if(time-lastUpdateTime>UPDATEDATAMINTIME&&user&&user.id){
        const sendParam={baseUrl:window.baseUrl,userId:user.id};
        const data={};
        const actionList={
          isFetching:loginIsFetching,
          lastUpdated:loginLastUpdata
        };
        const success=(data)=>{
          dispatch(setBankList(data.data));
        };
        const fail=(err)=>{
          dispatch();
        };
        Util.sendRequest({method:"POST",url:apiUrl.lccbId,urlParam:sendParam,data,actionList,success,fail});
      }
    },
    queryBankList:()=>{
      const modal=$("#myModal");
      const sendParam={baseUrl:window.baseUrl};
      const data={};
      const actionList={
        isFetching:null,
        lastUpdated:null
      };
      const success=(data)=>{
        if(data.status==0){
          dispatch(updateLccb(data.data.lccbId,data.data.lccbAuth));
        }
      };
      const fail=(err)=>{
        dispatch(setAuthenticationPointMsg("获取银行列表操作异常，请稍后重试!"));
        modal.modal("show");
      };
      Util.sendRequest({method:"POST",url:apiUrl.banks,urlParam:sendParam,data,actionList,success,fail});
    },
    submit({target,stopPropagation,cancelBubble},user,name,license,card,bankCode){
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      if(!user.lccbUserId||user.lccbUserId==-1){
        //开通存管
        let result=RegexValue.checkCompanyName(name);
        if(!result.flag){
          dispatch(setAuthenticationPointMsg(errorContent[result.errType]));
          dispatch(setErrorStatus(true));
          return;
        }
        result=RegexValue.checkLicense(license);
        if(!result.flag){
          dispatch(setAuthenticationPointMsg(errorContent[result.errType]));
          dispatch(setErrorStatus(true));
          return;
        }
        result=RegexValue.checkBankAccount(card);
        if(!result.flag){
          dispatch(setAuthenticationPointMsg(errorContent[result.errType]));
          dispatch(setErrorStatus(true));
          return;
        }
        if(!bankCode||bankCode==""){
          dispatch(setAuthenticationPointMsg(errorContent["bankCodeRequire"]));
          dispatch(setErrorStatus(true));
          return;
        }
        if(!user.id){
          dispatch(setAuthenticationPointMsg(errorContent["userIdRequire"]));
          dispatch(setErrorStatus(true));
          return;
        }
        dispatch(setErrorStatus(false));
        console.log("user:",user);
        console.log("name:"+name+" license:"+license," card:"+card+" bankCode:"+bankCode);
        const actionList={};
        const sendParam={baseUrl:window.baseUrl};
        const success=(data)=>{
          if(data.status==0){
            window.document.forms[0].action=data.data;
            window.document.forms[0].submit();
            dispatch(setErrorStatus(false));
          }else{
            dispatch(setAuthenticationPointMsg(data.msg));
            dispatch(setErrorStatus(true));
          }
        };
        const fail=(err)=>{
          dispatch(setAuthenticationPointMsg("网络异常，请稍后重试！"));
          dispatch(setErrorStatus(true));
        };
        Util.sendRequest({method:"POST",url:apiUrl.openAccount,urlParam:sendParam,data:{transtype:searchValue},actionList,success,fail});
      }else if(user.lccbUserId==0){
        //激活流程
        const actionList={};
        const sendParam={
          baseUrl:""
        };
        const success=(data)=>{
          if(data.status==0){
            window.document.forms[0].action=data.data;
            window.document.forms[0].submit();
            dispatch(setErrorStatus(false));
          }else{
            dispatch(setAuthenticationPointMsg(data.msg));
            dispatch(setErrorStatus(true));
          }
        };
        const fail=(err)=>{
          dispatch(setAuthenticationPointMsg("网络异常，请稍后重试！"));
          dispatch(setErrorStatus(true));
        };
        //Util.sendRequest({method:"POST",url:apiUrl.open,urlParam:sendParam,data:{searchValue:searchValue},actionList,success,fail});
      }else{
        //已经开通银行存管
        if(user.lccbAuth){
          //授权
          const actionList={};
          const sendParam={
            baseUrl:""
          };
          const success=(data)=>{
            if(data.status==0){
              window.document.forms[0].action=data.data;
              window.document.forms[0].submit();
              dispatch(setErrorStatus(false));
            }else{
              dispatch(setAuthenticationPointMsg(data.msg));
              dispatch(setErrorStatus(true));
            }
          };
          const fail=(err)=>{
            dispatch(setAuthenticationPointMsg("网络异常，请稍后重试！"));
            dispatch(setErrorStatus(true));
          };
          //Util.sendRequest({method:"POST",url:apiUrl.open,urlParam:sendParam,data:{searchValue:searchValue},actionList,success,fail});

        }else{
          //未授权
          const actionList={};
          const sendParam={
            baseUrl:""
          };
          const success=(data)=>{
            if(data.status==0){
              window.document.forms[0].action=data.data;
              window.document.forms[0].submit();
              dispatch(setErrorStatus(false));
            }else{
              dispatch(setAuthenticationPointMsg(data.msg));
              dispatch(setErrorStatus(true));
            }
          };
          const fail=(err)=>{
            dispatch(setAuthenticationPointMsg("网络异常，请稍后重试！"));
            dispatch(setErrorStatus(true));
          };
          //Util.sendRequest({method:"POST",url:apiUrl.open,urlParam:sendParam,data:{searchValue:searchValue},actionList,success,fail});
        }
      }
    }

  }
};

const AuthenticationComponent=connect(mapStateToProps,mapDispatchToProps)(Authentication);
export default AuthenticationComponent;