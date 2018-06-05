import {connect} from "react-redux";
import {changeNavStatus} from "../leftNav/leftNavAction.jsx";
import CompanyInfo from "./companyInfo.jsx";
import {setDataIntegrity} from "./companyInfoAction.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"

const getNavList=(leftNav)=>{
  let navList=[...leftNav];
  return navList;
};

const getUserInfo=({point:{loginStatus},user})=>{
  if(loginStatus){
    return {...user};
  }else{
    return {};
  }
};

const mapStateToProps=(store)=>{
  console.log(store.LoginReducer)
  return{
    navList:getNavList(store.LeftNavReducer),
    user:getUserInfo(store.LoginReducer),
    level:store.CompanyInfoReducer.level
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
      newState[3].active=true;
      newState[3].childList[0].className="active";
      newState[3].childList[0].childClass="blue";
      dispatch(changeNavStatus(newState));
    },
    setLevel(user){
      let num = 0
      if(user.mobile&&user.mobile.length==11){
        num+=50
      }
      if(user.lccbUserId&&user.lccbUserId!=0&&user.lccbUserId!=-1){
        num+=50
      }
      dispatch(setDataIntegrity(num));
    },
  }
};


const CompanyInfoComponent=connect(mapStateToProps,mapDispatchToProps)(CompanyInfo);
export default CompanyInfoComponent;
