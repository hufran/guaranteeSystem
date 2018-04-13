/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件 header
 */

export const LOGINOUT="LOGIN_OUT";

export const loginOut=()=>{
  return{
    type:LOGINOUT,
    status:true
  }
};


