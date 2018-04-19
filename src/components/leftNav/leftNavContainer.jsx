/*
 *leftNav action行为操作
 * */
import {connect} from "react-redux";
import LeftNav from "./leftNav.jsx";
import {changeNavStatus} from "./leftNavAction.jsx";

const getNavList=(navList)=>{
  return [...navList];
};

const mapStateToProps=(state)=>{
  console.log("state:",state);
  return {
    navList:getNavList(state.LeftNavReducer)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addClick(event){
      console.log("event:",event);
    },
    addItemClick(event){
      console.log("child event:",event);
    }
  };
};


const LeftNavComponent=connect(mapStateToProps,mapDispatchToProps)(LeftNav);
export default LeftNavComponent;

