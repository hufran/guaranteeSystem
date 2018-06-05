import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import Recharge from "./recharge.jsx"
import {
  setRechargeMoney,
  setBankList,
  setRequestBankList,
  setMoreBankList,
  setShowMore,
  setPointMsg,
  setErrorMsg,
  setRechargeFetching,
  setRechargeUpdate,
  updateRechargeIndex,
  setCorporationFetching,
  setCorporationLastUpdate,
  setCorporationDateUpdate
} from "./rechargeAction.jsx"
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

const getBankItemList=(reducer)=>{
  const newList=[...reducer.showBankList];
  return newList;
};

const getAllBankList=(reducer)=>{
  const newList=[...reducer.bankList];
  return newList;
}

const getMoreBankList=(reducer)=>{
  const newList=[...reducer.moreList];
  return newList;
};

const getIndexAccountInfo=(reducer)=>{
  const newList={...reducer.accountInfo};
  return newList;
};

const mapStateToProps=(store)=> {
  return {
    user: getUserInfo(store.LoginReducer),
    navList:getNavList(store.LeftNavReducer),
    bankList:getAllBankList(store.RechargeReducer),
    bankItemList:getBankItemList(store.RechargeReducer),
    moreList:getMoreBankList(store.RechargeReducer),
    showMoreStatus:store.RechargeReducer.showMoreStatus,
    rechargeMoney:store.RechargeReducer.rechargeMoney,
    pointMsg:store.RechargeReducer.pointMsg,
    showErrorStatus:store.RechargeReducer.showErrorStatus,
    checkedIndex:store.RechargeReducer.tabCheckIndex,
    accountInfo:getIndexAccountInfo(store.IndexReducer),
    corporation:{...store.RechargeReducer.corporation}
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
    setRechargeMoney(event,user){
      const {target:{value}}=event;

      if(value<=0){
        dispatch(setPointMsg("充值金额需要大于0！"));
        dispatch(setErrorMsg(true));
        return;
      }
      dispatch(setErrorMsg(false));
      dispatch(setRechargeMoney(value));
    },
    unmountRechargeMoney(){
      dispatch(setErrorMsg(false));
      dispatch(setRechargeMoney(0));
    },
    unmountOperateTab(){
      dispatch(updateRechargeIndex(0));
    },

    queryCorporation:(user)=>{
      const sendParam={baseUrl:window.baseUrl,userId:user.id};
      const data={};
      const actionList={
        isFetching:setCorporationFetching,
        lastUpdated:setCorporationLastUpdate
      };
      const success=(data)=>{
        dispatch(setCorporationDateUpdate(data));
      };
      const fail=(err)=>{
      };
      Util.sendRequest({method:"POST",url:apiUrl.corporation,urlParam:sendParam,data,actionList,success,fail});
    },
    userfundNew:(user,accountInfo)=>{
      const time=new Date().getTime();
      if(time-accountInfo.lastUpdated>UPDATEDATAMINTIME&&user&&user.id){
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
    bankList(){
      dispatch(setErrorMsg(false));
      const actionList={
        isFetching:setRechargeFetching,
        lastUpdated:setRechargeUpdate
      };
      const sendParam={baseUrl:window.baseUrl};
      const success=(data)=>{
          const bankList=[];
          for(const key in data){
            bankList.push({bankCode:key,checked:false,bankName:data[key]});
          }
          dispatch(setRequestBankList(bankList));
          const bankItemList=bankList.length>9?bankList.slice(0,9):bankList;
          const moreList=bankList.length>9?bankList.slice(9):[];
          dispatch(setBankList(bankItemList));
          dispatch(setMoreBankList(moreList));
          dispatch(setShowMore(false));
      };
      const fail=(err)=>{
        dispatch(setPointMsg("网络异常，请稍后重试"));
        dispatch(setErrorMsg(true));
      };

      Util.sendRequest({method:"GET",url:apiUrl.banks,urlParam:sendParam,data:{},actionList,success,fail});

    },
    operateTab(event){
      const dataset=event.target.dataset;
      dispatch(updateRechargeIndex(dataset.index));
      $(".recharge-info").css("display","none");
    },
    checkList(event,bankItemList){
      const {target}=event,dataSet=target.dataset;
      const newList=[...bankItemList];
      for(let key of newList){
        if(key.bankCode==dataSet.code){
          key.checked=true;
          $(".recharge-info").css("display","block");
          $("#"+key.bankCode).css("display","table-row");
        }else{
          key.checked=false;
          $("#"+key.bankCode).css("display","none");
        }
      }
      dispatch(setBankList(newList));
    },
    showMore(bankItemList,moreList){
      dispatch(setShowMore(true));
      if(bankItemList.length>0&&moreList.length>0){
        const newList=[...bankItemList,...moreList];
        dispatch(setBankList(newList));
      }
    },
    submit(event,rechargeMoney,bankItemList,checkedIndex,user){
      event.preventDefault();
      dispatch(setErrorMsg(false));
      console.log("rechargeMoney:",rechargeMoney);
      if(Number.parseFloat(rechargeMoney)<=0){
        dispatch(setPointMsg("充值金额需要大于0！"));
        dispatch(setErrorMsg(true));
        return;
      }
      let checkItem=null;
      const data={};
      if(checkedIndex==0){
        //网银
        for(const list of bankItemList){
          if(list.checked){
            checkItem=list;
            break;
          }
        }
        if(!checkItem){
          dispatch(setPointMsg("请选择银行！"));
          dispatch(setErrorMsg(true));
          return;
        }

        data.bankCode=checkItem.bankCode;

      }else if(checkedIndex==1){
        //快捷

      }
      if(!user.id){
        dispatch(setPointMsg("用户登录失效，请重新登录"));
        dispatch(setErrorMsg(true));
        return;
      }
      dispatch(setErrorMsg(false));
      data.transamt=rechargeMoney;
      data.successUrl=successUrl;
      const actionList={
        isFetching:null,
        lastUpdated:null
      };
      const sendParam={baseUrl:window.baseUrl,userId:user.id};
      const successUrl=window.location.href;
      const success=(data)=>{
        if(data.status==0){
          document.forms[0].action=data.data;
          document.forms[0].submit();
        }else{
          dispatch(setPointMsg(data.msg||data.message));
          dispatch(setErrorMsg(true));
        }
      };
      const fail=(err)=>{
        dispatch(setPointMsg("网络异常，请稍后重试"));
        dispatch(setErrorMsg(true));
      };

      Util.sendRequest({method:"POST",url:checkedIndex==0?apiUrl.onlineRecharge:apiUrl.fasterRecharge,urlParam:sendParam,data:data,actionList,success,fail});

    }
  }
};

const RechargeComponent=connect(mapStateToProps,mapDispatchToProps)(Recharge);
export default RechargeComponent;


