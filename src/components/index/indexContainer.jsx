/*
*给组件分配数据以及方法
* */
import {showPoint,hidePoint} from "./indexAction.jsx";
import {connect} from "react-redux";
import Index from "./index.jsx";

const getUserInfo=({point:{loginStatus},user})=>{
  if(loginStatus){
    return user;
  }else{
    return null;
  }

};
const getLoginStatus=({loginStatus})=>{
  return loginStatus;
};

const mapStateToProps=(state)=>{
  return{
    loginStatus:getLoginStatus(state.Login.point),
    user:getUserInfo(state.Login),
    index:state.Index
  }
};

const mapDispatchToProps = dispatch => {
  return{
    onShowPoint:()=>{
      dispatch(showPoint())
    },
    onHidePoint:()=>{
      dispatch(hidePoint())
    }
  };
};

const IndexComponent=connect(mapStateToProps,mapDispatchToProps)(Index);
export default IndexComponent;
