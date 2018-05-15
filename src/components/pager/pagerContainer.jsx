import {connect} from "react-redux";
import $ from "jquery"
import bootstrap from "bootstrap"
import Pager from "./pager.jsx"
import {updatePagerList} from "./pagerAction.jsx"
import state from "../../store"

const getListData=(listData)=>{
  const list=[...listData];
  return list;
};

const mapStateToProps=(store,props)=>{
  return{
    listData:getListData(store.PagerReducer.pagerListData),
    totalPage:store.PagerReducer.totalPage,
    currentPage:store.PagerReducer.currentPage,
  }
};

const mapDispatchToProps = (dispatch,props) => {
  return{
    changePageNumber:(index,pagerChangeEvent)=>{
      dispatch(updatePagerList(index));
      if(typeof pagerChangeEvent=="function"){
        const data=state.getState().PagerReducer;
        pagerChangeEvent(data.pagerListData);
      }
    }
  }
};

const PagerComponent=connect(mapStateToProps,mapDispatchToProps)(Pager);
export default PagerComponent;
