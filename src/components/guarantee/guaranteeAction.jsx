/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件
 */

//检索的字段类型
export const SEARCHTYPE="SEARCH_TYPE";

//设置担保管理的数据
export const GUARANTEELIST="GUARANTEE_LIST";

//设置请求状态更新
export const UPDATEREQUESTSTATUS="UPDATE_REQUEST_STATUS";

//设置数据更新状态
export const SETGUARANTEEFETCHING="SET_GUARANTEE_FETCHING";

//设置数据是否过时
export const SETGUARANTEEINVALIDATE="SET_GUARANTEE_INVALIDATE";

//设置数据上一次更新时间lastUpdated
export const SETGUARANTEELASTUPDATE="SET_GUARANTEE_LAST_UPDATE";

//设置提示信息
export const SETPOINTMAG="SET_POINT_MSG";

//设置模态窗类型
export const SETMODALTYPE="SET_MODAL_TYPE";

//设置检索字段
export const setSearchType=(field)=>{
  return{
    type:SEARCHTYPE,
    field
  }
};

//设置担保数据
export const setGuaranteeList=(list)=>{
  return{
    type:GUARANTEELIST,
    list
  }
};

//更新请求状态,请求中的所有数据
export const updateStatus=(requestStatus)=>{
  return{
    type:GUARANTEELIST,
    requestStatus
  }
};

//设置提示信息
export const setPointMsg=(pointMsg)=>{
 return{
   type:SETPOINTMAG,
   pointMsg
 }
};

//设置模态窗类型
export const setModalType=(modalType)=>{
  return {
    type:SETMODALTYPE,
    modalType
  }
};
