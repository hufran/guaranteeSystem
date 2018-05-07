import React from "react";
import {Redirect,Link} from "react-router-dom";
import Modal from "../modal/modal.jsx"
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";

class Guarantee extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    loginStatus:PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
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
    let {user,guaranteeList,searchValue,modalInfo,setSearchValue,submit,repay,sureOperate}=this.props;
    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        {/*{
         loginStatus?index.point.text:(<Redirect from="/" to="/login"></Redirect>)
         }*/}
        <div id="userinfo">
          <div className="userinfowra" style={{"backgroundImage":'url("/static/images/topbg.png")'}}>
            <div className="container">
              <div className="info clearfix">
                <div className="tx" style={{backgroundImage: "url('/static/images/txn.png')"}}></div>
                <ul className="doCredit">
                  <li className="rzpa cmo-active" style={{backgroundImage: "url('/static/images/phone.png')"}}></li>
                  <li>
                    <a href="/authentication" className="mouse-enter rzpa cid-active" rel="nofollow" style={user.lccbAuth&&user.lccbAuth.length>0?{backgroundImage: "url('/static/images/ID-active.png')"}:{backgroundImage: "url('/static/images/ID.png')"}}></a>
                    <p className="info-tip" style={{top: "16px", left: "30px",display: "none"}}>点击查看银行存管</p>
                  </li>
                </ul>
              </div>
              <div className="user">
                <div className="name">{user.name||"杜文亚"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="guarantee">
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
                      return (<li className="data-list">
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
                      <li className="noData">暂无担保数据!!!</li>
                    )
                  }
                </ul>
              </form>


            </div>
          </div>
        </div>
        <Modal modalBody="确定执行此操作？" modalBtn={{sure:sureOperate(modalInfo),cancelBtn:true}} ></Modal>
      </div>
    );

  }
}

export default Guarantee;
