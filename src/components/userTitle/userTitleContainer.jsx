import {connect} from "react-redux";
import UserTitle from "./userTitle.jsx";
import { withRouter } from 'react-router-dom'


const getUserInfo=({point:{loginStatus},user})=>{
  if(loginStatus){
    return {...user};
  }else{
    return {};
  }
};

const mapStateToProps=(state)=>{
  // console.log(state.LoginReducer.point)
  // console.log(state.LoginReducer.point.loginStatus)
  return{
    loginStatus:state.LoginReducer.point.loginStatus,
    user:getUserInfo(state.LoginReducer),
  }
};

const mapDispatchToProps = (dispatch) => {
  return{}
};


const UserTitleComponent=withRouter(connect(mapStateToProps,mapDispatchToProps)(UserTitle));
export default UserTitleComponent;
