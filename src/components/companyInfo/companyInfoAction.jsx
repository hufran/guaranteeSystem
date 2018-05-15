/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件
 */

//设置资料完整度情况
export const SETDATAINTEGRITY="SET_DATA_INTEGRITY";

//设置资料完整度方法
export const setDataIntegrity=(level)=>{
  return {
    type:SETDATAINTEGRITY,
    level
  }
};
