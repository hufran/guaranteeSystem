import React from "react";
import {Redirect,Link} from "react-router-dom";

class Pager extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const {listData,changePageNumber,currentPage,totalPage,pagerChangeEvent}=this.props;
    const listItem=[];
    for(let i=1;i<=totalPage;i++){
      listItem.push(i);
    }
    return (
      <div className="text-center pager-container">
        {
          listData&&listData.length>0?(
            <ul className="pagination pagination-sm">
              <li className={currentPage<=1?"page-item disabled":"page-item"} onClick={(event)=>{currentPage<=1?null:changePageNumber(currentPage-1,pagerChangeEvent)}}><a href="javascript:void(0);" className="page-link">&laquo;</a></li>
              {listItem.map((item)=>{
                return <li key={item} className={item==currentPage?"page-item active":"page-item"} onClick={(event)=>{changePageNumber(item,pagerChangeEvent)}}><a href="javascript:void(0);" className="page-link">{item}</a></li>
              })}
              <li className={currentPage>=totalPage?"page-item disabled":"page-item"} onClick={(event)=>{currentPage>=totalPage?null:changePageNumber(currentPage+1,pagerChangeEvent)}}><a href="javascript:void(0);" className="page-link">&raquo;</a></li>
            </ul>
          ):""
        }
      </div>
    );
  }
}

export default Pager;
