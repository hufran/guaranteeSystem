import {connect} from "react-redux";
import Guarantee from "./guarantee.jsx";
import GuaranteeReducer from "./guaranteeReducer.jsx";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import {setSearchType,setGuaranteeList,updateStatus,setPointMsg,setModalType} from "./guaranteeAction.jsx";
import bootstrap from "bootstrap"
import $ from "jquery"
import Util from "../../assets/js/util.jsx";
import UrlList from "../../assets/js/urlList.jsx";

const {apiUrl}=UrlList;

const getUserInfo=({point:{loginStatus},user})=>{
  console.log("user:",user);
  if(loginStatus){
    return {...user};
  }else{
    return {};
  }
};

const getGuaranteeList=(guarantee)=>{
  const list=[...guarantee.listData];
  return list;
};

const getNavList=(leftNav)=>{
  let navList=[...leftNav];
  return navList;
};

const mapStateToProps=(state)=>{
  return{
    user:getUserInfo(state.LoginReducer),
    guaranteeList:getGuaranteeList(state.GuaranteeReducer),
    navList:getNavList(state.LeftNavReducer),
    searchValue:state.GuaranteeReducer.searchValue,
    modalInfo:{modalType:state.GuaranteeReducer.modalType,pointMsg:state.GuaranteeReducer.pointMsg},
  }
};

const mapDispatchToProps = (dispatch) => {
  let loanId="";
  return{
    changeNavList(navList){
      let newState=[...navList];
      newState[1].active=true;
      dispatch(changeNavStatus(newState));
    },
    setSearchValue({target}){
      const value=target.value;


      dispatch(setSearchType(value));
    },
    submit(event,searchValue){
      event.preventDefault();
      if(searchValue==""){

        return;
      }
    },
    repay({target},guaranteeList){
      const index=Number.parseInt(target.parentNode.getAttribute("data-index"));
      const item=guaranteeList[index];
      loanId=item.loanId;
      if(loanId&&loanId.length>0){
        dispatch(setModalType(1));
        $('#myModal').modal("show");
      }else{
        dispatch(setModalType(0));
      }
    },
    sureOperate(modalInfo,requestInfo){
      alert(1);
      if(modalInfo.modalType==0){
        return function(){

        }
      }else{

        return function(){
          const actionList={
            isFetching:requestInfo.loginIsFetching,
            lastUpdated:requestInfo.loginLastUpdata
          };
          const success=(data)=>{

          };
          const fail=(err)=>{

          };
          Util.sendRequest({method:"POST",url:apiUrl.login,urlParam:sendParam,data,actionList,success,fail});
        }
      }

    }
  }
};

const guaranteeComponent=connect(mapStateToProps,mapDispatchToProps)(Guarantee);
export default guaranteeComponent;
