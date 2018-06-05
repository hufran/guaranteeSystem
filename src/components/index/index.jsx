import React from "react";
import {Redirect,Link} from "react-router-dom";
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";
import UserTitleComponent from "../userTitle/userTitleContainer.jsx"

class Index extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    onShowPoint:PropTypes.func.isRequired,
    onHidePoint:PropTypes.func.isRequired,
    loginStatus:PropTypes.bool.isRequired,
    index:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
  }

  componentDidMount(){
    let {queryLccbId,user,lastUpdateTime,accountInfo,userfundNew}=this.props;
    if(user.id){
      queryLccbId(lastUpdateTime,user);
      userfundNew(user,accountInfo);
    }
  }
  componentDidUpdate(){
    let {queryLccbId,user,lastUpdateTime}=this.props;
    if(user.id){
      queryLccbId(lastUpdateTime,user);
    }
  }
  componentWillUnmount(){
    let {onHidePoint}=this.props;
    onHidePoint();
  }
  render(){
    let {loginStatus,user,accountInfo,onHidePoint,children}=this.props;
    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        <UserTitleComponent></UserTitleComponent>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="home-topnav">
              <div className="homeTopBox">
                <div className="home-avaliable">
                  <span className="home-tab-info">账户余额：</span>
                  <span className="home-tab-amount">
                    <span className="money">{accountInfo.availableAmount||"0.00"}</span> 元
                  </span>
                </div>
                <div className="home-bottomBar">
                  <button className="btn-sm home-withdraw-btn"><Link to="/recharge">充值</Link></button>
                  <button className="btn-sm home-recharge-btn"><Link to="/withdraw">提现</Link></button>
                </div>
              </div>
              <div className="home-top-container clearfix">
                <div className="home-yesterday col-md-4">
                  <div className="home-tab-info">累计担保金额</div>
                  <div className="home-tab-amount">
                    <span className="money">{accountInfo.yesterdayAmount||"0.00"}</span>&nbsp;元
                  </div>
                </div>
                <div className="home-interest col-md-4">
                  <div className="home-tab-info">当前偿还金额</div>
                  <div className="home-tab-amount">
                    <span className="money">{accountInfo.investInterestAmount||"0.00"}</span>&nbsp;元
                  </div>
                </div>
                <div className="home-total col-md-4">
                  <div className="home-tab-info">累代偿金额
                    <span className="wh tips-top" data-original-title="总资产=可用余额+待收本息+冻结资金 1174273.94 = 0.00 + 1174273.94 + 0.00"></span>
                  </div>
                  <div className="home-tab-amount">
                    <span className="money">{accountInfo.totalAmount||"0.00"}</span>&nbsp;元
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
          <div className="modal fade hide" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-width">
              <div className="modal-content" onClick={()=>{onHidePoint()}}>
                <img src={user.lccbUserId==-1?"/static/images/true-name.png":(user.lccbUserId==0?"/static/images/activate-name.png":"")} />
                <Link to="/authentication" onClick={(event)=>{try{event.stopPropagation()}catch(e){event.cancelBubble=true;}}}>
                  <img src={user.lccbUserId==-1?"/static/images/rightnow.png":(user.lccbUserId==0?"/static/images/rightnow1.png":"")} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
