/*
*给组件分配数据以及方法
* */
import {showPoint,hidePoint,userFundNew,indexFetching,indexLastUpdate} from "./indexAction.jsx";
import {UPDATEDATAMINTIME} from  "../../assets/js/regex.jsx"
import {connect} from "react-redux";
import Index from "./index.jsx";
import Util from "../../assets/js/util.jsx";
import UrlList from "../../../router/util/urlHandler";
import {loginIsFetching,loginLastUpdata,updateLccb} from "../login/loginAction.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"

const {apiUrl}=UrlList;

const getUserInfo=({point:{loginStatus},user})=>{
  if(loginStatus){
    return {...user};
  }else{
    return {};
  }

};
const getLoginStatus=({loginStatus})=>{
  return loginStatus;
};

const getAccount=(accountInfo)=>{
  const account={...accountInfo};
  return account;
};

const mapStateToProps=(state)=>{
  return{
    loginStatus:getLoginStatus(state.LoginReducer.point),
    lastUpdateTime:state.LoginReducer.point.lastUpdated,
    user:getUserInfo(state.LoginReducer),
    accountInfo:getAccount(state.IndexReducer.accountInfo)
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    onHidePoint:()=>{
      $("#myModal").modal("hide");
    },
    queryLccbId:(lastUpdateTime,user)=>{
      const modal=$("#myModal");
      const time=new Date().getTime();
      if(time-lastUpdateTime>UPDATEDATAMINTIME&&user&&user.id){
        const sendParam={baseUrl:window.baseUrl,userId:user.id};
        const data={};
        const actionList={
          isFetching:loginIsFetching,
          lastUpdated:loginLastUpdata
        };
        const success=(data)=>{
          if(data.status==0){
            dispatch(updateLccb(data.data.lccbId,data.data.lccbAuth));
            if(user.lccbUserId==-1||user.lccbUserId==0||!user.lccbUserId){
              modal.modal("show");
            }
          }else{
            alert(data.msg||data.message);
          }
        };
        const fail=(err)=>{
        };
        Util.sendRequest({method:"POST",url:apiUrl.lccbId,urlParam:sendParam,data,actionList,success,fail});
      }else{
        console.log("user.lccbAuth:",user.lccbAuth);
        if(user.lccbUserId==-1||user.lccbUserId==0||!user.lccbUserId){
          modal.modal("show");
        }
      }
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
    }
  };
};

const IndexComponent=connect(mapStateToProps,mapDispatchToProps)(Index);
export default IndexComponent;
