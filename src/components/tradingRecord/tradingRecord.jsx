import React from "react";
import {Redirect,Link} from "react-router-dom";
import Modal from "../modal/modal.jsx"
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";
import UserTitleComponent from "../userTitle/userTitleContainer.jsx"
import PagerComponent from "../pager/pagerContainer.jsx"
import "../../assets/css/datePicker.css"
import $ from "jquery"
import {DatePicker} from 'react-uikits';


class TradingRecord extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
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
    const {submit,pointMsg,listData,tradingType,startTime,endTime,beginTime,selectChange,startTimeChange,endTimeChange,changePager}=this.props;
    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        <UserTitleComponent></UserTitleComponent>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="trading-record">
              <form noValidate onSubmit={(event)=>{submit(event,tradingType,startTime,endTime)}}>
                <div className="trading-record-title clearfix">
                  <div className="float-left trading-record-type">
                    <span>交易类型：</span>
                    <select onChange={(event)=>{selectChange(event)}}>
                      <option>请选择</option>
                      <option value="1">充值</option>
                      <option value="2">提现</option>
                    </select>
                  </div>
                  <div className="float-left trading-record-time">
                    <span className="float-left trading-record-timeType">交易时间:</span>
                    <div className="dateTime float-left">
                      <DatePicker className="startTime"  format="yyyy-MM-dd" begin={new Date('2018','1','1')} end={new Date()} placeHolder="请选择开始时间" onChange={(value)=>{startTimeChange(value)}}/>
                      {
                        startTime.length==0?
                          (<span className="endTime"><input className="visualInput" placeholder="请选择开始时间在操作" disabled /></span>)
                          :
                          (<DatePicker className="endTime"  format="yyyy-MM-dd" begin={beginTime} end={new Date()} placeHolder="请选择结束时间" onChange={(value)=>{endTimeChange(value)}}/>)
                      }

                      </div>

                  </div>
                  <button>搜索</button>
                </div>
                <ul className="trading-content">
                  <li className="title">
                    <span className="firstContent">时间</span><span className="secondContent">交易类型</span>
                    <span className="thirdContent">单号</span><span className="fourthContent">收支金额</span><span className="fifthContent">操作</span>
                    <span className="sixthContent">状态</span>
                    <span className="seventhContent">备注</span>
                  </li>
                  {listData.length>0?listData.map((item,index)=>{
                    return(
                      <li className="data-list" key={index}>
                        <span className="firstContent">{item.date}</span><span className="secondContent">{item.tradingType}</span>
                        <span className="thirdContent">{item.orderNumber}</span><span className="fourthContent">{item.money}</span><span className="fifthContent">操作</span>
                        <span className="sixthContent">{item.status}</span>
                        <span className="seventhContent">{item.remark}</span>
                      </li>
                    )
                  }):(<li className="noData">
                    请输入检索内容,开始检索！！！
                  </li>)}
                </ul>
                <PagerComponent pagerChangeEvent={changePager}></PagerComponent>
              </form>
            </div>
          </div>
        </div>
        <Modal modalBody={pointMsg} modalBtn={{sureBtn:true}} ></Modal>
      </div>
    );

  }
}

export default TradingRecord;
