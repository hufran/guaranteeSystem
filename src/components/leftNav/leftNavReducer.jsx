/*
 *leftNav reducer更新数据
 * */
import {CHANGELEFTNAVSTATUS} from "./leftNavAction.jsx";

let initState=[
  {
    title:"我的账户",
    link:"/",
    className:"active",
    leftIconClass:"left-icon"
  },
  {
    title:"担保管理",
    link:"/",
    className:"",
    leftIconClass:"left-icon"
  },
  {
    title:"交易记录",
    link:"/",
    className:"",
    leftIconClass:"left-icon"
  },
  {
    title:"账户管理",
    link:"javascript:void(0);",
    className:"",
    leftIconClass:"left-icon",
    childList:[
      {
        title:"公司信息",
        link:"/",
        className:"active"
      },
      {
        title:"银行存管",
        link:"/",
        className:""
      },
      {
        title:"密码管理",
        link:"/",
        className:""
      }
    ]
  }
];

const LeftNavReducer=(state=initState,action)=>{
  switch(action.type){
    case CHANGELEFTNAVSTATUS:
      return action.navList;
    default:
      return state;
  }

};

export default LeftNavReducer;

