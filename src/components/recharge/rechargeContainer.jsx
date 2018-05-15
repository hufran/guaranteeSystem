import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import Recharge from "./recharge.jsx"
import {setRechargeMoney,setBankList,setRequestBankList,setMoreBankList,setShowMore,setPointMsg,setErrorMsg,setRechargeFetching,setRechargeInvalidate,setRechargeUpdate} from "./rechargeAction.jsx"
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

const getBankItemList=(reducer)=>{
  const newList=[...reducer.showBankList];
  return newList;
};

const getMoreBankList=(reducer)=>{
  const newList=[...reducer.moreList];
  return newList;
};

const mapStateToProps=(store)=> {
  return {
    user: getUserInfo(store.LoginReducer),
    navList:getNavList(store.LeftNavReducer),
    bankItemList:getBankItemList(store.RechargeReducer),
    moreList:getMoreBankList(store.RechargeReducer),
    showMoreStatus:store.RechargeReducer.showMoreStatus,
    rechargeMoney:store.RechargeReducer.rechargeMoney,
    pointMsg:store.RechargeReducer.pointMsg,
    showErrorStatus:store.RechargeReducer.showErrorStatus
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
    bankList(){
      dispatch(setErrorMsg(false));
      const actionList={
        isFetching:setRechargeFetching,
        lastUpdated:setRechargeUpdate
      };
      const sendParam={
        baseUrl:""
      };
      const success=(data)=>{
        if(data.status==0){
          const bankList=[];
          for(const key in data.data){
            bankList.push({bankCode:key,checked:false,bankName:data.data[key]});
          }
          dispatch(setRequestBankList(bankList));
          const bankItemList=bankList.length>9?bankList.slice(0,9):bankList;
          const moreList=bankList.length>9?bankList.slice(9):[];
          dispatch(setBankList(bankItemList));
          dispatch(setMoreBankList(moreList));
          dispatch(setShowMore(false));
        }else{
          dispatch(setPointMsg(data.msg));
          dispatch(setErrorMsg(true));
        }
      };
      const fail=(err)=>{
        dispatch(setPointMsg("网络异常，请稍后重试"));
        dispatch(setErrorMsg(true));
      };
      success({
        data:{
          ABC:"中国农业银行",BCM:"交通银行",BOB:"北京银行", BOC:"中国银行",
          CCB:"建设银行",
          CEB:"光大银行",
          CGBC:"广发银行",
          CIB:"兴业银行",CITICBANK:"中信银行",CZBANK:"浙商银行",
          ICBC:"中国工商银行",PINGANBANK:"平安银行",PSBC:"邮政储蓄银行",
          SHCB:"上海银行",SPDB:"浦发银行"},
        status:0,
        msg:""
      });
      //Util.sendRequest({method:"POST",url:apiUrl.search,urlParam:sendParam,"",actionList,success,fail});

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
    submit(event,rechargeMoney,bankItemList){
      event.preventDefault();
      dispatch(setErrorMsg(false));
      if(Number.parseFloat(rechargeMoney)<=0){
        dispatch(setPointMsg("充值金额需要大于0！"));
        dispatch(setErrorMsg(true));
        return;
      }
      let checkItem=null;
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

      const actionList={
        isFetching:null,
        lastUpdated:null
      };
      const sendParam={
        baseUrl:""
      };
      const success=(data)=>{
        if(data.status==0){
          dispatch(setErrorMsg(false));
          document.forms[0].action=data.data;
          document.forms[0].submit();
        }else{
          dispatch(setPointMsg(data.msg));
          dispatch(setErrorMsg(true));
        }
      };
      const fail=(err)=>{
        dispatch(setPointMsg("网络异常，请稍后重试"));
        dispatch(setErrorMsg(true));
      };
      //Util.sendRequest({method:"POST",url:apiUrl.search,urlParam:sendParam,"",actionList,success,fail});
      alert("验证成功！");
    }
  }
};

const RechargeComponent=connect(mapStateToProps,mapDispatchToProps)(Recharge);
export default RechargeComponent;


