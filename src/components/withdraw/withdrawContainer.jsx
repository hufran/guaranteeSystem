import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import Withdraw from "./withdraw.jsx";
import {setWithdrawMoney,setWithdrawPoint,setErrorStatus} from "./withdrawAction.jsx"
import {userFundNew,indexFetching,indexLastUpdate} from "../index/indexAction.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"
import Util from "../../assets/js/util.jsx";
import UrlList from "../../../router/util/urlHandler";
import {UPDATEDATAMINTIME} from  "../../assets/js/regex.jsx"
let {apiUrl}=UrlList;

const getUserInfo=({point:{loginStatus},user})=>{
  if(loginStatus){
    return {...user};
  }else{
    return {};
  }
};

const getNavList=(leftNav)=>{
  let navList=[...leftNav];
  return navList;
};

const getIndexAccountInfo=(reducer)=>{
  const newList={...reducer.accountInfo};
  return newList;
};

const mapStateToProps=(store)=> {
  return {
    user: getUserInfo(store.LoginReducer),
    navList:getNavList(store.LeftNavReducer),
    pointMsg:store.WithdrawReducer.pointMsg,
    showErrorStatus:store.WithdrawReducer.showErrorStatus,
    withdrawMoney:store.WithdrawReducer.withdrawMoney,
    accountInfo:getIndexAccountInfo(store.IndexReducer),
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
      dispatch(changeNavStatus(newState));
    },
    userfundNew:(user,accountInfo)=>{
      const time=new Date().getTime();
      if(time-accountInfo.lastUpdated>UPDATEDATAMINTIME&&user.id){
        const sendParam={baseUrl:window.baseUrl,userId:user.id};
        const data={};
        const actionList={
          isFetching:indexFetching,
          lastUpdated:indexLastUpdate
        };
        const success=(data)=>{
          dispatch(userFundNew(data.userFundExt));
        };
        const fail=(err)=>{
          console.log(err);
        };
        Util.sendRequest({method:"POST",url:apiUrl.userfundNew,urlParam:sendParam,data,actionList,success,fail});
      }
    },
    unmount(){
      dispatch(setWithdrawMoney(0));
      dispatch(setErrorStatus(false));
    },
    setWithdrawMoney(event,accountInfo){
      let {target:{value}}=event;
      value=Number.parseFloat(value);
      if(value>0&&accountInfo.availableAmount>=value){
        dispatch(setWithdrawMoney(value));
        dispatch(setErrorStatus(false));
      }else if(!accountInfo.availableAmount){
        dispatch(setWithdrawPoint("用户信息不正确，请退出重新登录！"));
        dispatch(setErrorStatus(true));
      }else if(value<=0){
        dispatch(setWithdrawPoint("提现金额需要大于0！"));
        dispatch(setErrorStatus(true));
      }else if(accountInfo.availableAmount<value){
        dispatch(setWithdrawPoint("提现金额不能大于账户余额，请确认后重新输入！"));
        dispatch(setErrorStatus(true));
      }else{
        console.log("accountInfo数据不存在！")
      }
    },
    submit(event,withdrawMoney,user,accountInfo){
      event.preventDefault();
      withdrawMoney=Number.parseFloat(withdrawMoney);
      if(!accountInfo.availableAmount){
        dispatch(setWithdrawPoint("用户信息不正确，请退出重新登录！"));
        dispatch(setErrorStatus(true));
        return;
      }else if(withdrawMoney<=0){
        dispatch(setWithdrawPoint("提现金额需要大于0！"));
        dispatch(setErrorStatus(true));
        return;
      }else if(withdrawMoney>accountInfo.availableAmount){
        dispatch(setWithdrawPoint("提现金额不能大于账户余额，请确认后重新输入！"));
        dispatch(setErrorStatus(true));
        return;
      }
      if(!user.id){
        dispatch(setWithdrawPoint("用户登录失效，请重新登录"));
        dispatch(setErrorStatus(true));
        return;
      }
      dispatch(setErrorStatus(false));
      const successUrl=location.href;
      const actionList={
        isFetching:null,
        lastUpdated:null
      };
      const sendParam={baseUrl:window.baseUrl,userId:user.id};
      const success=(data)=>{
        if(data.status==0){
          document.forms[0].action=data.data;
          document.forms[0].submit();
        }else{
          dispatch(setWithdrawPoint(data.msg||data.message));
          dispatch(setErrorStatus(true));
        }
      };
      const fail=(err)=>{
        dispatch(setWithdrawPoint("网络异常，请稍后重试"));
        dispatch(setErrorStatus(true));
      };
      Util.sendRequest({method:"POST",url:apiUrl.withdraw,urlParam:sendParam,data:{transamt:withdrawMoney,successUrl:successUrl},actionList,success,fail});
    }

  }
};

const WithdrawComponent=connect(mapStateToProps,mapDispatchToProps)(Withdraw);
export default WithdrawComponent;
