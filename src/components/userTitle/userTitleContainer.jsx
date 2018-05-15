import {connect} from "react-redux";
import UserTitle from "./userTitle.jsx"


const getUserInfo=({point:{loginStatus},user})=>{
  if(loginStatus){
    return {...user};
  }else{
    return {};
  }
};

const mapStateToProps=(state)=>{
  return{
    loginStatus:state.LoginReducer.point.loginStatus,
    user:getUserInfo(state.LoginReducer),
  }
};

const mapDispatchToProps = (dispatch) => {
  return{}
};


const UserTitleComponent=connect(mapStateToProps,mapDispatchToProps)(UserTitle);
export default UserTitleComponent;
