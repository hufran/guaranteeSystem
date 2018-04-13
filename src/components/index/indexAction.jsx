/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件
 */

//设置 type类型
export const GETUSER="GET_USER";

export const SHOWPOINT="SHOW_POINT";
export const HIDEPOINT="HIDE_POINT";

//显示提示框
export const showPoint=(text="您尚未开通银行存管！",btnText="立即开通",linkTo="/authentication")=>{
  return {
    type:SHOWPOINT,
    status:true,
    text,
    btnText,
    linkTo
  }
};

//隐藏提示框
export const hidePoint=()=>{
  return {
    type:HIDEPOINT,
    status:false,
    text:null
  }
};

//获取用户数据
export const getUser=()=>{
    return {
      type:GETUSER
    }
}


