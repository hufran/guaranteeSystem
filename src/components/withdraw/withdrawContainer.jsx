import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import Withdraw from "./withdraw.jsx";
import {setWithdrawMoney,setWithdrawPoint,setErrorStatus} from "./withdrawAction.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"
import Util from "../../assets/js/util.jsx";
import UrlList from "../../assets/js/urlList.jsx";


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

const mapStateToProps=(store)=> {
  return {
    user: getUserInfo(store.LoginReducer),
    navList:getNavList(store.LeftNavReducer),
    pointMsg:store.WithdrawReducer.pointMsg,
    showErrorStatus:store.WithdrawReducer.showErrorStatus,
    withdrawMoney:store.WithdrawReducer.withdrawMoney,
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
    setWithdrawMoney(event,user){
      let {target:{value}}=event;
      value=Number.parseInt(value);
      if(value>0&&user.availableAmount>=value){
        dispatch(setWithdrawMoney(value));
        dispatch(setErrorStatus(false));
      }else if(!user.availableAmount){
        dispatch(setWithdrawPoint("用户信息不正确，请退出重新登录！"));
        dispatch(setErrorStatus(true));
      }else if(value<=0){
        dispatch(setWithdrawPoint("提现金额需要大于0！"));
        dispatch(setErrorStatus(true));
      }else if(user.availableAmount<value){
        dispatch(setWithdrawPoint("提现金额不能大于账户余额，请确认后重新输入！"));
        dispatch(setErrorStatus(true));
      }else{
        console.log("user数据不存在！")
      }
    },
    submit(event,withdrawMoney,user){
      event.preventDefault();
      console.log("withdrawMoney:",withdrawMoney);
      if(!user.availableAmount){
        dispatch(setWithdrawPoint("用户信息不正确，请退出重新登录！"));
        dispatch(setErrorStatus(true));
        return;
      }else if(withdrawMoney<=0){
        dispatch(setWithdrawPoint("提现金额需要大于0！"));
        dispatch(setErrorStatus(true));
        return;
      }else if(withdrawMoney>user.availableAmount){
        dispatch(setWithdrawPoint("提现金额不能大于账户余额，请确认后重新输入！"));
        dispatch(setErrorStatus(true));
        return;
      }

      const actionList={
        isFetching:null,
        lastUpdated:null
      };
      const sendParam={
        baseUrl:""
      };
      const success=(data)=>{
        if(data.status==0){
          document.forms[0].action=data.data;
          document.forms[0].submit();
        }else{
          dispatch(setWithdrawPoint(data.msg));
          dispatch(setErrorStatus(true));
        }
      };
      const fail=(err)=>{
        dispatch(setWithdrawPoint("网络异常，请稍后重试"));
        dispatch(setErrorStatus(true));
      };
      //Util.sendRequest({method:"POST",url:apiUrl.search,urlParam:sendParam,"",actionList,success,fail});
    }

  }
};

const WithdrawComponent=connect(mapStateToProps,mapDispatchToProps)(Withdraw);
export default WithdrawComponent;
