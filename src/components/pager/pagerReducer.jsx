/*
 *pager reducer功能 主要用来变更数据
 * */
import {SETPAGERLISTDATA,PAGERLISTCOUNT,UPDATEPAGERLISTDATA} from "./pagerAction.jsx"

let initState={
  listData:[],
  pagerListData:[],//分页后的数据列表
  pageCount:10,
  currentPage:1,
  totalPage:1
};

const pagerReducer=(state=initState,action)=>{
  let newValue={...state};
  switch(action.type){
    case SETPAGERLISTDATA:
      Object.assign(newValue,{listData:action.listData});
      const totalPage=parseInt(newValue.listData.length/newValue.pageCount);
      Object.assign(newValue,{totalPage:totalPage+1,currentPage:1,pagerListData:action.listData.slice(0,newValue.pageCount)});
      return newValue;
    case PAGERLISTCOUNT:
      Object.assign(newValue,{pageCount:action.count,pagerListData:updatePageCountList(newValue.listData,newValue.pageCount,1)});
      return newValue;
    case UPDATEPAGERLISTDATA:
      action.index=Number.parseInt(action.index);
      if(isNaN(action.index)){
        console.error("The data format is incorrect.");
        return;
      }
      const listData=updatePageCountList(newValue.listData,newValue.pageCount,action.index);
      Object.assign(newValue,{currentPage:action.index,pagerListData:listData});
      return newValue;
    default:
      return newValue;
  }
};

const updatePageCountList=(list,pageCount,index=1)=>{
  const length=list.length;
  const page=Math.ceil(length/pageCount);
  let pageList=[];
  if(index<1||index>page){
    console.error("The data format is incorrect.");
    return;
  }
  for(let i=1;i<=page;i++){
    if(index==i){
      let pos=Number.parseInt(index)*pageCount;
      pageList=list.slice(pos-pageCount,pos);
    }
  }

  return pageList;
};

export default pagerReducer;
