/*
*给组件分配数据以及方法
* */
import {showPoint,hidePoint} from "./indexAction.jsx";
import {connect} from "react-redux";
import Index from "./index.jsx";
import $ from "jquery"
import bootstrap from "bootstrap"

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

const mapStateToProps=(state)=>{
  return{
    loginStatus:getLoginStatus(state.LoginReducer.point),
    user:getUserInfo(state.LoginReducer),
    index:state.IndexReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    onShowPoint:()=>{
      $("#myModal").modal("show");
    },
    onHidePoint:()=>{
      $("#myModal").modal("show");
    }
  };
};

const IndexComponent=connect(mapStateToProps,mapDispatchToProps)(Index);
export default IndexComponent;
