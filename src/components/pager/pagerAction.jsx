/**
 * Created by Administrator on 2018/4/10.
 * React-Redux action文件
 */

//获取担保数据
export const SETPAGERLISTDATA="SET_PAGER_LIST_DATA";

//设置分页总数量分页数量
export const PAGERLISTCOUNT="PAGER_LIST_COUNT";

//更新列表数据展示
export const UPDATEPAGERLISTDATA="UPDATE_PAGER_LIST_DATA";

//设置列表数据方法
export const setListData=(listData)=>{
  return {
    type:SETPAGERLISTDATA,
    listData,
  };
};

//设置分页总数量方法
export const setPagerListCount=(count)=>{
  return {
    type:PAGERLISTCOUNT,
    count
  };
};

//设置分页数据列表更新
export const updatePagerList=(index,)=>{
  return {
    type:UPDATEPAGERLISTDATA,
    index
  }
};

