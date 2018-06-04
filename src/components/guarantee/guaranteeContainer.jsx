import {connect} from "react-redux";
import Guarantee from "./guarantee.jsx";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import {setSearchType,setGuaranteeList,updateStatus,setPointMsg,setModalType,updateFetching,guaranteeLastUpdate,updatePagerList} from "./guaranteeAction.jsx";
import {setListData} from "../pager/pagerAction.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"
import Util from "../../assets/js/util.jsx";
import UrlList from "../../assets/js/urlList.jsx";
import state from "../../store"

const {apiUrl}=UrlList;

const getUserInfo=({point:{loginStatus},user})=>{
  if(loginStatus){
    return {...user};
  }else{
    return {};
  }
};

const getGuaranteeList=(guarantee)=>{
  const list=[...guarantee.pageCountList];
  return list;
};

const getNavList=(leftNav)=>{
  let navList=[...leftNav];
  return navList;
};

const mapStateToProps=(store)=>{
  return{
    user:getUserInfo(store.LoginReducer),
    guaranteeList:getGuaranteeList(store.GuaranteeReducer),
    navList:getNavList(store.LeftNavReducer),
    searchValue:store.GuaranteeReducer.searchValue,
    modalInfo:{modalType:store.GuaranteeReducer.modalType,pointMsg:store.GuaranteeReducer.pointMsg},
    pointMsg:store.GuaranteeReducer.pointMsg,
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
      newState[1].active=true;
      dispatch(changeNavStatus(newState));
    },
    setSearchValue({target}){
      const value=target.value;
      dispatch(setSearchType(value));
    },
    submit(event,searchValue,requestInfo){
      event.preventDefault();
      if(searchValue==""){
        dispatch(setModalType(0));
        dispatch(setPointMsg("请输入姓名、身份证号、订单编号等标识，然后重新搜索！"));
        $('#myModal').modal("show");
        return;
      }
      const actionList={
        isFetching:updateFetching,
        lastUpdated:guaranteeLastUpdate
      };
      const sendParam={
        baseUrl:""
      };
      const success=(data)=>{
        if(data.status==0){
          dispatch(setGuaranteeList(data.data));
          dispatch(setListData(data.data));
          const dataList=state.getState().PagerReducer;
          dispatch(updatePagerList(dataList.pagerListData));
        }else{
          dispatch(setModalType(0));
          dispatch(setPointMsg(data.msg));
          $('#myModal').modal("show");
        }
      };
      const fail=(err)=>{
        dispatch(setModalType(0));
        dispatch(setPointMsg("网络异常，请稍后重试！"));
        $('#myModal').modal("show");
      };
      //测试数据开始
      success({status:0,data:[
        {name:"测试一",idNumber:'130852',loanTitle:'标题一',loanId:"465165",loanTerm:"12",loanAmount:50000,overdue:10,expirationDate:"2018/12/12",status:"武装他"},
        {name:"测试而",idNumber:'13054852',loanTitle:'标题二',loanId:"4650165",loanTerm:"5",loanAmount:500000,overdue:0,expirationDate:"2017/12/12",status:"武装他"},
        {name:"测试三",idNumber:'13054852',loanTitle:'标题三',loanId:"4650165",loanTerm:"9",loanAmount:5000000,overdue:0,expirationDate:"2016/12/12",status:"武装他"},
        {name:"测试一",idNumber:'130852',loanTitle:'标题一',loanId:"465165",loanTerm:"12",loanAmount:50000,overdue:10,expirationDate:"2018/12/12",status:"武装他"},
        {name:"测试而",idNumber:'13054852',loanTitle:'标题二',loanId:"4650165",loanTerm:"5",loanAmount:500000,overdue:0,expirationDate:"2017/12/12",status:"武装他"},
        {name:"测试三",idNumber:'13054852',loanTitle:'标题三',loanId:"4650165",loanTerm:"9",loanAmount:5000000,overdue:0,expirationDate:"2016/12/12",status:"武装他"},
        {name:"测试一",idNumber:'130852',loanTitle:'标题一',loanId:"465165",loanTerm:"12",loanAmount:50000,overdue:10,expirationDate:"2018/12/12",status:"武装他"},
        {name:"测试而",idNumber:'13054852',loanTitle:'标题二',loanId:"4650165",loanTerm:"5",loanAmount:500000,overdue:0,expirationDate:"2017/12/12",status:"武装他"},
        {name:"测试三",idNumber:'13054852',loanTitle:'标题三',loanId:"4650165",loanTerm:"9",loanAmount:5000000,overdue:0,expirationDate:"2016/12/12",status:"武装他"},
        {name:"测试一",idNumber:'130852',loanTitle:'标题一',loanId:"465165",loanTerm:"12",loanAmount:50000,overdue:10,expirationDate:"2018/12/12",status:"武装他"},
        {name:"测试而",idNumber:'13054852',loanTitle:'标题二',loanId:"4650165",loanTerm:"5",loanAmount:500000,overdue:0,expirationDate:"2017/12/12",status:"武装他"},
        {name:"测试三",idNumber:'13054852',loanTitle:'标题三',loanId:"4650165",loanTerm:"9",loanAmount:5000000,overdue:0,expirationDate:"2016/12/12",status:"武装他"},
        {name:"测试一",idNumber:'130852',loanTitle:'标题一',loanId:"465165",loanTerm:"12",loanAmount:50000,overdue:10,expirationDate:"2018/12/12",status:"武装他"},
        {name:"测试而",idNumber:'13054852',loanTitle:'标题二',loanId:"4650165",loanTerm:"5",loanAmount:500000,overdue:0,expirationDate:"2017/12/12",status:"武装他"},
        {name:"测试三",idNumber:'13054852',loanTitle:'标题三',loanId:"4650165",loanTerm:"9",loanAmount:5000000,overdue:0,expirationDate:"2016/12/12",status:"武装他"},
        {name:"测试一",idNumber:'130852',loanTitle:'标题一',loanId:"465165",loanTerm:"12",loanAmount:50000,overdue:10,expirationDate:"2018/12/12",status:"武装他"},
        {name:"测试而",idNumber:'13054852',loanTitle:'标题二',loanId:"4650165",loanTerm:"5",loanAmount:500000,overdue:0,expirationDate:"2017/12/12",status:"武装他"},
        {name:"测试三",idNumber:'13054852',loanTitle:'标题三',loanId:"4650165",loanTerm:"9",loanAmount:5000000,overdue:0,expirationDate:"2016/12/12",status:"武装他"},
        {name:"测试一",idNumber:'130852',loanTitle:'标题一',loanId:"465165",loanTerm:"12",loanAmount:50000,overdue:10,expirationDate:"2018/12/12",status:"武装他"},
        {name:"测试而",idNumber:'13054852',loanTitle:'标题二',loanId:"4650165",loanTerm:"5",loanAmount:500000,overdue:0,expirationDate:"2017/12/12",status:"武装他"},
        {name:"测试三",idNumber:'13054852',loanTitle:'标题三',loanId:"4650165",loanTerm:"9",loanAmount:5000000,overdue:0,expirationDate:"2016/12/12",status:"武装他"},
      ]});
      //测试数据结束

      //Util.sendRequest({method:"POST",url:apiUrl.search,urlParam:sendParam,data:{searchValue:searchValue},actionList,success,fail});

    },
    repay({target},guaranteeList){
      const index=Number.parseInt(target.parentNode.getAttribute("data-index"));
      const item=guaranteeList[index];
      loanId=item.loanId;
      if(loanId&&loanId.length>0){
        dispatch(setModalType(1));
        dispatch(setPointMsg("确定执行该操作？"));
        $('#myModal').modal("show");
      }
    },
    sureOperate(modalInfo){
      if(modalInfo.modalType==0){
        return function(){
          //执行弹出操作
          return;
        }
      }else{
        return function(){
          //执行代偿操作
          const actionList={
            isFetching:updateFetching,
            lastUpdated:guaranteeLastUpdate
          };
          const success=(data)=>{
            if(data.status==0){
              window.location.reload();
            }else{
              dispatch(setModalType(0));
              dispatch(setPointMsg(data.msg));
              $('#myModal').modal("show");
            }
          };
          const fail=(err)=>{
            dispatch(setModalType(0));
            dispatch(setPointMsg("网络异常，请稍后重试！"));
            $('#myModal').modal("show");
          };
          //Util.sendRequest({method:"POST",url:apiUrl.login,urlParam:sendParam,data,actionList,success,fail});
        }
      }

    },
    changePager:(data)=>{
      dispatch(updatePagerList(data));
    }
  }
};

const guaranteeComponent=connect(mapStateToProps,mapDispatchToProps)(Guarantee);
export default guaranteeComponent;
