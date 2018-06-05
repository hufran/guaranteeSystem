import React from "react";
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";
import UserTitleComponent from "../userTitle/userTitleContainer.jsx"


class Withdraw extends React.Component {
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    guaranteeList: PropTypes.Array,
    changeNavList: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.first=0;
  }

  componentDidMount() {
    const {changeNavList, navList} = this.props;
    changeNavList(navList);

  }

  componentWillReceiveProps(nextProps){
    const {userfundNew,accountInfo,user}=nextProps;
    if(this.first==0&&user.id){
      userfundNew(user,accountInfo);
      this.first=1;
    }
  }

  componentWillUnmount(){
    const {unmount}=this.props;
    unmount();
  }

  render() {
    const {user,pointMsg,showErrorStatus,withdrawMoney,accountInfo,setWithdrawMoney,submit} = this.props;

    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        <UserTitleComponent></UserTitleComponent>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="withdraw">
              <div className="row">
                <div className="methodwr" style={{"textIndent":"14px"}}>提现操作</div>
                <div className="rows">
                  <div className="col-md-12">
                    <form action="" method="post"></form>
                    <form role="form" noValidate={true} name="withdrawForm" method="POST" onSubmit={(event)=>{submit(event,withdrawMoney,user,accountInfo)}} target="_blank" autoComplete="off">
                      <div className="">
                        <div className="rows">
                          <span className="tipss">账户余额</span>
                          <span className="ava">{accountInfo.depositAmount||0}.<span style={{"fontSize":"14px"}}>{accountInfo.dueInAmount||"00"}</span></span>
                          <span className="tipss" style={{"color":"#f58220"}}>元</span>
                        </div>
                        <div className="rows">
                          <span className="tipss">提现金额</span>
                          <input type="number" name="amount" id="withdraw" autoComplete="off" onChange={(event)=>{setWithdrawMoney(event,accountInfo)}} placeholder="请输入提现金额" />
                          <span className="tipss" style={{"position":"relative","left":"5px","top":"10px"}}>元</span>
                          {
                            showErrorStatus?(<p className="help-block text-danger">{pointMsg}</p>):""
                          }
                        </div>
                      </div>
                      <button type="submit" className="btn btn-warning btn-lg post-btn" disabled={parseFloat(accountInfo.availableAmount)>0?false:true}>确认提现</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="row ccc-container">
                <div className="col-md-12">
                  <div className="space space-20"></div>
                  <p style={{"color": "#f58220", "textAlign": "left"}}>温馨提示：</p>
                  <ul className="dec-li">
                    <li>1、718金融暂不收取您的提现费用（第三方收取的费用由718金融垫付）。</li>
                    <li>2、提现到账时间：提现申请提交成功后，T+1工作日到账。 </li>
                    <li></li>
                    <li>3、根据《反洗钱法》规定，718金融禁止洗钱、虚假交易等行为。</li>
                    <li>4、提现过程遇到问题，请查看<a href="https://www.718bank.com/help/cash" target="_blank" style={{"fontSize":"16px","color":"#009ada"}}>帮助中心</a>或联系客服：4001-718-718（工作日：8：30-17：30）。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Withdraw;
