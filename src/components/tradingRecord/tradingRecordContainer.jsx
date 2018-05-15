import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import TradingRecord from "./tradingRecord.jsx";
import {changeTradingType,changeTradingStartTime,changeTradingEndTime,changeTradingBeginTime,changeTradingData,setTradingFetching,setTradingInvalidate,setTradingLastUpdate,setTradingPointMsg,updateTradingPagerList} from "./tradingRecordAction.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"
import Util from "../../assets/js/util.jsx";
import UrlList from "../../assets/js/urlList.jsx";
import state from "../../store"
import {
  guaranteeLastUpdate,
  setGuaranteeList,
  setModalType, setPointMsg,
  updateFetching,
  updatePagerList
} from "../guarantee/guaranteeAction";
import {setListData} from "../pager/pagerAction";

const {apiUrl}=UrlList;

const getNavList=(leftNav)=>{
  let navList=[...leftNav];
  return navList;
};

const getListData=(trading)=>{
  return [...trading.pageList];
}

const mapStateToProps=(store)=>{
  return{
    navList:getNavList(store.LeftNavReducer),
    pointMsg:store.TradingRecordReducer.pointMsg,
    tradingType:store.TradingRecordReducer.tradingType,
    listData:getListData(store.TradingRecordReducer),
    startTime:store.TradingRecordReducer.startTime,
    endTime:store.TradingRecordReducer.endTime,
    beginTime:store.TradingRecordReducer.beginTime,
    disabled:store.TradingRecordReducer.disabled
  }
};

const mapDispatchToProps = (dispatch) => {
  let loanId="";
  return{
    changeNavList(navList){
      let newState=[...navList];
      for(let item of newState){
        item.active=false;
      }
      newState[2].active=true;
      dispatch(changeNavStatus(newState));
    },
    selectChange({target,stopPropagation,cancelBubble}){
      try {
        stopPropagation();
      }catch(e){
        cancelBubble=true;
      }
      const value=target.value;
      dispatch(changeTradingType(value));
    },
    startTimeChange(value){
      console.log("startTime:",value);
      if(value){
        dispatch(changeTradingBeginTime(value));
        value=Util.formatTime(value);
        dispatch(changeTradingStartTime(value));
      }
    },
    endTimeChange(value){
      console.log("endTime:",value);
      if(value){
        value=Util.formatTime(value);
        dispatch(changeTradingEndTime(value));
      }
    },
    submit(event,tradingType,startTime,endTime){
      event.preventDefault();
      const modal=$('#myModal');

      if(!tradingType||tradingType<=0){
        dispatch(setTradingPointMsg("请选择交易类型！"));
        modal.modal("show");
        return;
      }
      if(!startTime||startTime.length==0){
        dispatch(setTradingPointMsg("请选择开始日期！"));
        modal.modal("show");
        return;
      }
      if(!endTime||endTime.length==0){
        dispatch(setTradingPointMsg("请选择结束日期！"));
        modal.modal("show");
        return;
      }
      console.log("tradingType："+tradingType);
      console.log("startTime："+startTime);
      console.log("endTime："+endTime);
      const actionList={
        isFetching:setTradingFetching,
        lastUpdated:setTradingLastUpdate
      };
      const sendParam={
        baseUrl:""
      };
      const success=(data)=>{
        if(data.status==0){
          dispatch(changeTradingData(data.data));
          dispatch(setListData(data.data));
          const dataList=state.getState().PagerReducer;
          dispatch(updateTradingPagerList(dataList.pagerListData));
        }else{
          dispatch(setTradingPointMsg(data.msg));
          modal.modal("show");
        }
      };
      const fail=(err)=>{
        dispatch(setTradingPointMsg("网络异常，请稍后重试！"));
        modal.modal("show");
      };
      //测试数据开始
      success({status:0,data:[
          {date:"测试一",tradingType:'130852',orderNumber:'标题一',money:"465165",status:"12",remark:50000},
          {date:"测试而",tradingType:'13054852',orderNumber:'标题二',money:"4650165",status:"5",remark:500000},
          {date:"测试三",tradingType:'13054852',orderNumber:'标题三',money:"4650165",status:"9",remark:5000000},
          {date:"测试一",tradingType:'130852',orderNumber:'标题一',money:"465165",status:"12",remark:50000},
          {date:"测试而",tradingType:'13054852',orderNumber:'标题二',money:"4650165",status:"5",remark:500000},
          {date:"测试三",tradingType:'13054852',orderNumber:'标题三',money:"4650165",status:"9",remark:5000000},
          {date:"测试一",tradingType:'130852',orderNumber:'标题一',money:"465165",status:"12",remark:50000},
          {date:"测试而",tradingType:'13054852',orderNumber:'标题二',money:"4650165",status:"5",remark:500000},
          {date:"测试三",tradingType:'13054852',orderNumber:'标题三',money:"4650165",status:"9",remark:5000000},
          {date:"测试一",tradingType:'130852',orderNumber:'标题一',money:"465165",status:"12",remark:50000},
          {date:"测试而",tradingType:'13054852',orderNumber:'标题二',money:"4650165",status:"5",remark:500000},
          {date:"测试三",tradingType:'13054852',orderNumber:'标题三',money:"4650165",status:"9",remark:5000000},

        ]});
      //测试数据结束
      //Util.sendRequest({method:"POST",url:apiUrl.search,urlParam:sendParam,data:{searchValue:searchValue},actionList,success,fail});
    },
    changePager(data){
      dispatch(updateTradingPagerList(data));
    },
  }
};

const tradingRecordComponent=connect(mapStateToProps,mapDispatchToProps)(TradingRecord);
export default tradingRecordComponent;
