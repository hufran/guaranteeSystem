/*
 *leftNav action行为操作
 * */

export const CHANGELEFTNAVSTATUS="CHANGE_LEFT_NAV_STATUS";

/*改变导航的选中列表*/
export const changeNavStatus=(navList)=>{
  return{
    type:CHANGELEFTNAVSTATUS,
    navList
  }
};
