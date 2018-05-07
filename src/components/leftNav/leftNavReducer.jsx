/*
 *leftNav reducer更新数据
 * */
import {CHANGELEFTNAVSTATUS} from "./leftNavAction.jsx";

let initState=[
  {
    title:"我的账户",
    link:"/",
    active:true,
    leftIconStyle:{
      "backgroundImage":"url('/static/images/icon-home.png')",
      "backgroundRepeat":"no-repeat"
    },
    leftIconActiveStyle:{
      "backgroundImage":"url('/static/images/icon-home-active.png')",
      "backgroundRepeat":"no-repeat"
    }
  },
  {
    title:"担保管理",
    link:"/guarantee",
    active:false,
    leftIconStyle:{
      "backgroundImage":"url('/static/images/my-invest.png')",
      "backgroundRepeat":"no-repeat"
    },
    leftIconActiveStyle:{
      "backgroundImage":"url('/static/images/icon-my-invest-active.png')",
      "backgroundRepeat":"no-repeat"
    }
  },
  {
    title:"交易记录",
    link:"/",
    active:false,
    leftIconStyle:{
      "backgroundImage":"url('/static/images/icon-fund.png')",
      "backgroundRepeat":"no-repeat"
    },
    leftIconActiveStyle:{
      "backgroundImage":"url('/static/images/icon-fund-active.png')",
      "backgroundRepeat":"no-repeat"
    }
  },
  {
    title:"账户管理",
    link:"javascript:void(0);",
    active:false,
    leftIconStyle:{
      "backgroundImage":"url('/static/images/icon-account.png')",
      "backgroundRepeat":"no-repeat"
    },
    leftIconActiveStyle:{
      "backgroundImage":"url('/static/images/icon-account-acitve.png')",
      "backgroundRepeat":"no-repeat"
    },
    childList:[
      {
        title:"公司信息",
        link:"/",
        className:"active",
        childClass:"blue"
      },
      {
        title:"银行存管",
        link:"/",
        className:"",
        childClass:"gray"
      },
      {
        title:"密码管理",
        link:"/",
        className:"",
        childClass:"gray"
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

