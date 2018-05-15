/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件
 */

//获取原密码
export const SETOLDPASS="SET_OLD_PASS";

//获取新密码
export const SETNEWPASS="SET_NEW_PASS";

//获取确认密码
export const SETENSUREPASS="SET_ENSURE_PASS";

//设置验证码
export const SETVALIDATECODE="SET_VALIDATE_CODE";

//获取提示消息
export const SETPASSERRORPOINTMSG="SET_PASS_ERROR_POINT_MSG";

//获取错误提示的位置
export const SETERRORPOS="SET_ERROR_POS";

//设置错误提示显示状态
export const SETPASSERRORSHOW="SET_PASS_ERROR_SHOW";

//设置数据更新状态
export const SETPASSMANAGERFETCHING="SET_PASS_MANAGER_FETCHING";

//设置数据是否过时
export const SETPASSMANAGERINVALIDATE="SET_PASS_MANAGER_INVALIDATE";

//设置数据上一次更新时间lastUpdated
export const SETPASSMANAGERLASTUPDATE="SET_PASS_MANAGER_LAST_UPDATE";

//设置图片的imgurl
export const SETIMAGEURL="SET_IMAGE_URL";

//获取原密码方法
export const setOldPass=(value)=>{
  return{
    type:SETOLDPASS,
    value
  }
};

//获取新密码方法
export const setNewPass=(value)=>{
  return{
    type:SETNEWPASS,
    value
  }
};

//获取确认密码方法
export const setEnsurePass=(value)=>{
  return{
    type:SETENSUREPASS,
    value
  }
};

//设置验证码方法
export const setValidateCode=(value)=>{
  return{
    type:SETVALIDATECODE,
    value
  }
};

//获取提示消息方法
export const setPassErrorPointMsg=(pointMsg)=>{
  return{
    type:SETPASSERRORPOINTMSG,
    pointMsg
  }
};

//获取错误提示位置方法
export const setErrorPos=(pos)=>{
  return{
    type:SETERRORPOS,
    pos
  }
};

//设置错误提示显示状态方法
export const setPassErrorShow=(status)=>{
  return{
    type:SETPASSERRORSHOW,
    status
  }
};

//设置数据更新状态方法
export const setPassManagerFetching=(fetching)=>{
  return{
    type:SETPASSMANAGERFETCHING,
    fetching
  }
};

//设置数据是否过时方法
export const setPassManagerInvalidate=(invalidate)=>{
  return {
    type:SETPASSMANAGERINVALIDATE,
    invalidate
  }
};

//设置数据上一次更新时间方法lastUpdated
export const setPassManagerLastUpdated=(lastUpdated)=>{
  return{
    type:SETPASSMANAGERLASTUPDATE,
    lastUpdated
  }
};

//设置图片的url
export const setImageUrl=(url)=>{
  return{
    type:SETIMAGEURL,
    url
  }
};
