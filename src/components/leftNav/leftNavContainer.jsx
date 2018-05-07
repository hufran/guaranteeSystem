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
  return {
    navList:getNavList(state.LeftNavReducer)
  };
};
const getAppointTag=(target,appointTag)=>{
  if(target&&appointTag){
    const tagName=target.nodeName.toLowerCase();
    if(tagName==appointTag.toLowerCase()){
      return target;
    }else{
      return target=getAppointTag(target.parentNode,appointTag);
    }

  }else{
    return null;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addClick({target},navList){
      const nodeTarget=getAppointTag(target,"LI");
      const index=Number.parseInt(nodeTarget.getAttribute("data-index"));
      const newNavList=[...navList.navList];
      for(let i=0,len=newNavList.length;i<len;i++){
        if(i==index){
          Object.assign(newNavList[i],{active:true});
        }else{
          Object.assign(newNavList[i],{active:false});
        }
      }
      dispatch(changeNavStatus(newNavList));

    },
    addItemClick({target,stopPropagation,cancelBubble},navList){
      const nodeTarget=getAppointTag(target,"LI");
      const index=Number.parseInt(nodeTarget.getAttribute("data-index"));
      const childIndex=Number.parseInt(nodeTarget.getAttribute("data-child-index"));
      const newNavList=[...navList.navList];

      for(let i=0,len=newNavList.length;i<len;i++){
        if(newNavList[i].childList&&index==i){
          newNavList[i].childList.map((item,pos)=>{
            if(pos==childIndex){
              return item.className="active",item.childClass="blue";
            }else{
              return item.className="",item.childClass="gray";
            }
          });
        }
      }
      dispatch(changeNavStatus(newNavList));
    }
  };
};


const LeftNavComponent=connect(mapStateToProps,mapDispatchToProps)(LeftNav);
export default LeftNavComponent;

