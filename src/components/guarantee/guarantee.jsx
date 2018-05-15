import React from "react";
import Modal from "../modal/modal.jsx"
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";
import UserTitleComponent from "../userTitle/userTitleContainer.jsx"
import PagerComponent from "../pager/pagerContainer.jsx"

class Guarantee extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    guaranteeList:PropTypes.Array,
    loginStatus:PropTypes.bool.isRequired,
    changeNavList:PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
  }
  componentDidMount(){
    const {changeNavList,navList}=this.props;
    changeNavList(navList);
  }
  render(){
    let {guaranteeList,searchValue,modalInfo,pointMsg,setSearchValue,submit,repay,sureOperate,changePager}=this.props;

    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        <UserTitleComponent></UserTitleComponent>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="guarantee guarantee-info">
              <form noValidate onSubmit={(event)=>{submit(event,searchValue)}}>
                <div className="search-title">
                  <label>关键字：</label><input type="search" onChange={(event)=>{setSearchValue(event)}} placeholder="姓名、身份证号、唯一编号" /><button>搜索</button>
                </div>
                <ul className="search-content">
                  <li className="title">
                    <span className="firstContent">借款人姓名/身份证号</span><span className="secondContent">借款标的/唯一编号</span>
                    <span className="thirdContent">期数</span><span className="fourthContent">待还金额</span><span className="fifthContent">逾期天数</span>
                    <span className="sixthContent">到期时间</span>
                    <span className="seventhContent">状态</span><span className="eighthContent">操作</span>
                  </li>
                  {
                    guaranteeList&&guaranteeList.length>0?guaranteeList.map((item,index)=>{
                      return (<li className="data-list" key={index}>
                        <span className="firstContent">{item.name}/{item.idNumber}</span>
                        <span className="secondContent">{item.loanTitle}/{item.loanId}</span>
                        <span className="thirdContent">{item.loanTerm}</span>
                        <span className="fourthContent">{item.loanAmount}</span>
                        <span className="fifthContent">{item.overdue}</span>
                        <span className="sixthContent">{item.expirationDate}</span>
                        <span className="seventhContent">{item.status}</span>
                        <span className="eighthContent" data-index={index}>{item.status?(<a href="#" onClick={(event)=>{repay(event,guaranteeList)}}>代偿</a>):""}</span>
                      </li>);
                    }):(
                      <li className="noData">请输入检索内容！！！</li>
                    )
                  }
                </ul>
              </form>
              <PagerComponent pagerChangeEvent={changePager}></PagerComponent>

            </div>
          </div>
        </div>
        <Modal modalBody={pointMsg} modalBtn={{sure:sureOperate(modalInfo),cancelBtn:true}} ></Modal>
      </div>
    );

  }
}

export default Guarantee;
