import React from "react";
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";
import UserTitleComponent from "../userTitle/userTitleContainer.jsx"
import {Redirect,Link} from "react-router-dom";
import $ from "jquery"

class Recharge extends React.Component {
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    guaranteeList: PropTypes.Array,
    changeNavList: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.first=0
  }

  componentDidMount() {
    const {changeNavList, navList, bankList, queryCorporation, rechargeMoney, user, userfundNew, accountInfo} = this.props;
    changeNavList(navList);
    bankList();
    $('#rechargeValue').val(rechargeMoney);
  }

  componentWillReceiveProps(nextProps){
    const {userfundNew,accountInfo,queryCorporation,user}=nextProps;
    if(this.first==0&&user.id){
      queryCorporation(user);
      userfundNew(user,accountInfo);
      this.first=1;
    }
  }

  componentWillUnmount(){
    const {unmountRechargeMoney,unmountOperateTab} =this.props;
    unmountRechargeMoney();
    unmountOperateTab();
  }

  render() {
    const {
      user,
      bankList,
      bankItemList,
      moreList,
      showMoreStatus,
      checkedIndex,
      rechargeMoney,
      pointMsg,
      corporation,
      accountInfo,
      showErrorStatus,
      setRechargeMoney,
      operateTab,
      checkList,
      showMore,
      submit
    } = this.props;
    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        <UserTitleComponent></UserTitleComponent>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="recharge">
              <form action="" method="post"></form>
              <form noValidate={true} role="form" name="rechargeForm" action="" method="POST" autoComplete="off" onSubmit={(event) => {submit(event,rechargeMoney,bankItemList,checkedIndex,user)}}>
                <div className="row">
                  <div className="">
                    <div className="rows">
                      <span className="tipss">账户余额</span>
                      <span className="ava">
                        {accountInfo.depositAmount||0}.<span style={{"fontSize": "14px"}}>{accountInfo.dueInAmount||"00"}</span>
                      </span>
                      <span className="tipss" style={{"color": "#f58220"}}>元</span>
                    </div>
                    <div className="space-20"></div>
                    <div className="rows">
                      <span className="tipss">充值金额</span>
                      <input className="recharge-money" type="number" id="rechargeValue" onChange={(event) => {setRechargeMoney(event, user)}} placeholder="请输入充值金额" autoComplete="off"/>
                      <span className="tipss" style={{"position": "relative", "left": "5px", "top": "12px"}}>元</span>
                      <p className="help-block text-danger"
                         style={{
                           "color": "red",
                           "textIndent": "95px",
                           "display": showErrorStatus ? "inline" : "none"
                         }}>{pointMsg}</p>
                    </div>
                    <div className="col-md-12"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="methodwr" data-type="net">
                    <div style={{"display": "inline-block"}}>
                      <input type="radio" id="paynet" name="payType" data-index="0" value="on" defaultChecked="true" onFocus={(event)=>{operateTab(event,checkedIndex)}} />
                      <label htmlFor="paynet" style={{"paddingLeft": "5px"}}>网银充值</label>
                    </div>
                    <div style={{"display": "inline-block"}}>
                      <input type="radio" id="Speedy" name="payType" data-index="1" value="on" onFocus={(event)=>{operateTab(event,checkedIndex)}} />
                      <label htmlFor="Speedy" style={{"paddingLeft": "5px"}}>快捷充值</label>
                    </div>
                  </div>
                  <div className="space space-30"></div>
                  <div id="paynetContainer" className="bankwrap" style={{"display":checkedIndex==0?"block":"none"}}>
                    {
                      bankItemList.length>0?bankItemList.map((item,index)=>{
                        return (
                          <span className={"bankItem "+item.bankCode+(item.checked?" currentBank":"")} style={{"backgroundImage":"url('/static/images/banks/"+item.bankCode+".png')"}} title={item.bankName} key={index} data-cc={item.bankCode} data-code={item.bankCode} onClick={(event)=>{checkList(event,bankItemList)}}>
                            <span className="check" style={{"backgroundImage":"url('/static/images/checka.png')","display":item.checked?"inline":"none"}}></span>
                          </span>
                        );
                      }):"暂无银行数据"
                    }
                    {
                      showMoreStatus?"":(<span className="bankItem more" style={{"backgroundImage":"url('/static/images/more.png')"}} onClick={()=>{showMore(bankItemList,moreList)}}></span>)
                    }

                  </div>
                  <div id="SpeedyContainer" className="bankwrap" style={{"display":checkedIndex==0?"none":"block"}}>
                    {
                      corporation.fundAccount&&corporation.fundAccount.account&&corporation.fundAccount.account.bank&&corporation.fundAccount.account.bank.length>0?
                        (<span className={"bankItem "+corporation.fundAccount.account.bank+" currentBank"} style={{"backgroundImage":"url('/static/images/banks/"+corporation.fundAccount.account.bank+".png')"}} title={bankList[corporation.fundAccount.account.bank]} data-code={corporation.fundAccount.account.bank}>
                          <span className="check" style={{"backgroundImage":"url('/static/images/checka.png')","display":"inline"}}></span>
                        </span>)
                        :(<span>您尚未绑定银行卡，<Link to='/company/authentication'>立即绑定</Link></span>)
                    }

                  </div>
                  <input type="hidden" name="transamt"/>
                  <input type="hidden" name="bankCode"/>
                </div>
                <button className="btn btn-warning btn-lg" disabled={(checkedIndex==0&&bankItemList.length==0)||(checkedIndex==1&&(!corporation.fundAccount||!corporation.fundAccount.account||!corporation.fundAccount.account.bank))?true:false}>确认充值</button>
              </form>
              <div className="line"></div>
              <div className="space space-20 recharge-info">
                <div style={{"color":"#4a4a4a","textAlign":"left","height":"50px","lineHeight":"50px","fontWeight":"600","fontSize":"14px","textIndent":"10px"}}>关于充值额度说明</div>
                <table className="tinfo">
                  <thead>
                  <tr>
                    <th>银行</th>
                    <th>支持卡种</th>
                    <th>支付方式</th>
                    <th>单卡单笔消费上限</th>
                    <th>日累计支付限额</th>
                    <th>客服电话</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr id="ICBC" style={{"display": "none"}}>
                    <td>工商银行</td>
                    <td>借记卡</td>
                    <td>
                      <div>电子银行口令客户</div>
                      <div>手机短信认证客户</div>
                      <div>电子密码器</div>
                      <div style={{"border":"none"}}>U盾客户</div>
                    </td>
                    <td>
                      <div>500</div>
                      <div>2000</div>
                      <div>50万</div>
                      <div style={{"border":"none"}}>100万</div>
                    </td>
                    <td>
                      <div>1000</div>
                      <div>5000</div>
                      <div>100万</div>
                      <div style={{"border":"none"}}>100万</div>
                    </td>
                    <td>95588</td>
                  </tr>
                  <tr id="CCB" style={{"display": "none"}}>
                    <td>建设银行</td>
                    <td>
                      <div style={{"height":"325px","lineHeight":"325px"}}>借记卡</div>
                    </td>
                    <td>
                      <div>账号支付</div>
                      <div>动态口令</div>
                      <div>一代key</div>
                      <div style={{"border":"none"}}>二代key</div>
                    </td>
                    <td>
                      <div>1000</div>
                      <div>5000</div>
                      <div>5万</div>
                      <div style={{"border":"none"}}>50万</div>
                    </td>
                    <td>
                      <div>1000</div>
                      <div>5000</div>
                      <div>10万</div>
                      <div style={{"border":"none"}}>50万</div>
                    </td>
                    <td>95533</td>
                  </tr>
                  <tr id="ABC" style={{"display": "none"}}>
                    <td>农业银行</td>
                    <td>金穗借记卡、准贷记卡</td>
                    <td>
                      <div>一代K宝</div>
                      <div>二代K宝</div>
                      <div style={{"border":"none"}}>动态口令卡</div>
                    </td>
                    <td>
                      <div>50万</div>
                      <div>100万</div>
                      <div style={{"border":"none"}}>1000</div>
                    </td>
                    <td>
                      <div>50万</div>
                      <div>100万</div>
                      <div style={{"border":"none"}}>3000</div>
                    </td>
                    <td>95599</td>
                  </tr>
                  <tr id="CMB" style={{"display": "none"}}>
                    <td>招商银行</td>
                    <td>
                      <div style={{"height":"50px","lineHeight":"50px","border":"none"}}>借记卡</div>
                    </td>
                    <td>
                      <div>专业版</div>
                      <div style={{"border":"none"}}>大众版</div>
                    </td>
                    <td>
                      <div>无限额</div>
                      <div style={{"border":"none"}}>500</div>
                    </td>
                    <td>
                      <div>无限额</div>
                      <div>500</div>
                      <div style={{"display": "none"}}></div>
                    </td>
                    <td>95555</td>
                  </tr>
                  <tr id="BCM" style={{"display": "none"}}>
                    <td>交通银行</td>
                    <td>借记卡</td>
                    <td>
                      <div>key</div>
                      <div style={{"border":"none"}}>短信</div>
                    </td>
                    <td>
                      <div>100万</div>
                      <div style={{"border":"none"}}>5万</div>
                    </td>
                    <td>
                      <div>100万</div>
                      <div style={{"border":"none"}}>5万</div>
                    </td>
                    <td>95566</td>
                  </tr>
                  <tr id="BOC" style={{"display": "none"}}>
                    <td>中国银行</td>
                    <td>
                      <div style={{"border":"none"}}>借记卡</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>全部方式</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>1万</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>20万</div>
                    </td>
                    <td>95566</td>
                  </tr>
                  <tr id="PSBC" style={{"display": "none"}}>
                    <td>邮政</td>
                    <td>借记卡</td>
                    <td>
                      <div>XXUSBkey</div>
                      <div>XX动态口令</div>
                      <div style={{"border":"none"}}>电子令牌</div>
                    </td>
                    <td>
                      <div>2000000</div>
                      <div>10000</div>
                      <div style={{"border":"none"}}>200000</div>
                    </td>
                    <td>
                      <div>2000000</div>
                      <div>10000</div>
                      <div style={{"border":"none"}}>200000</div>
                    </td>
                    <td>95580</td>
                  </tr>
                  <tr id="CEB" style={{"display": "none"}}>
                    <td>光大银行</td>
                    <td>
                      <div style={{"border":"none"}}>阳光借记卡</div>
                    </td>
                    <td>
                      <div>动态密码</div>
                      <div style={{"border":"none"}}>U盾</div>
                    </td>
                    <td>
                      <div>1万元</div>
                      <div style={{"border":"none"}}>50万元</div>
                    </td>
                    <td>
                      <div>1万元</div>
                      <div style={{"border":"none"}}>50万元</div>
                    </td>
                    <td>95595</td>
                  </tr>
                  <tr id="CMBC" style={{"display": "none"}}>
                    <td>民生银行</td>
                    <td>
                      <div style={{"height":"76px","lineHeight":"76px"}}>借记卡</div>
                      <div style={{"border":"none"}}>信用卡</div>
                    </td>
                    <td>
                      <div>大众版（短信验证码）</div>
                      <div>大众版（浏览器证书）</div>
                      <div>贵宾版（U宝）</div>
                      <div>贵宾版（OTP）</div>
                      <div>大众版 （短信验证码&amp;浏览器证书）</div>
                      <div style={{"border":"none"}}>贵宾版（U宝&amp;OTP）</div>
                    </td>
                    <td>
                      <div>5000</div>
                      <div>5000</div>
                      <div>50万</div>
                      <div>50万</div>
                      <div>5000或信用额度</div>
                      <div style={{"border":"none"}}>50万或信用额度</div>
                    </td>
                    <td>
                      <div>5000</div>
                      <div>5000</div>
                      <div>50万</div>
                      <div>50万</div>
                      <div>5000或信用额度</div>
                      <div style={{"border":"none"}}>50万或信用额度</div>
                    </td>
                    <td>95568</td>
                  </tr>
                  <tr id="CITICBANK" style={{"display": "none"}}>
                    <td>中信银行</td>
                    <td>
                      <div style={{"border":"none"}}>借记卡</div>
                    </td>
                    <td>
                      <div>动态口令</div>
                      <div style={{"border":"none"}}>USBKey</div>
                    </td>
                    <td>
                      <div>1000</div>
                      <div style={{"border":"none"}}>100万</div>
                    </td>
                    <td>
                      <div>5000</div>
                      <div style={{"border":"none"}}>100万</div>
                    </td>
                    <td>95558</td>
                  </tr>
                  <tr id="CGBC" style={{"display": "none"}}>
                    <td>广发银行</td>
                    <td>
                      <div style={{"border":"none"}}>借记卡</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>全部方式</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>95508</td>
                  </tr>
                  <tr id="SPDB" style={{"display": "none"}}>
                    <td>浦发银行</td>
                    <td>借记卡</td>
                    <td>
                      <div>签约用户（数字证书版）</div>
                      <div style={{"border":"none"}}>签约用户（动态密码版）</div>
                    </td>
                    <td>
                      <div>无限额</div>
                      <div style={{"border":"none"}}>20万</div>
                    </td>
                    <td>
                      <div>无限额</div>
                      <div style={{"border":"none"}}>20万</div>
                    </td>
                    <td>95528</td>
                  </tr>
                  <tr id="PINGANBANK" style={{"display": "none"}}>
                    <td>平安银行</td>
                    <td>
                      <div style={{"border":"none"}}>借记卡</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>全部方式</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>95511</td>
                  </tr>
                  <tr id="HXB" style={{"display": "none"}}>
                    <td>华夏银行</td>
                    <td>借记卡</td>
                    <td>
                      <div>非签约客户（密码验证）</div>
                      <div>手机动态验证</div>
                      <div style={{"border":"none"}}>证书/U-key</div>
                    </td>
                    <td>
                      <div>300</div>
                      <div>500</div>
                      <div style={{"border":"none"}}>5000</div>
                    </td>
                    <td>
                      <div>1000</div>
                      <div>2000</div>
                      <div style={{"border":"none"}}>20000</div>
                    </td>
                    <td>95577</td>
                  </tr>
                  <tr id="NB" style={{"display": "none"}}>
                    <td>宁波银行</td>
                    <td>
                      <div>动态密码令牌/短信动态密码</div>
                      <div style={{"border":"none"}}>USBKey移动证书</div>
                    </td>
                    <td>
                      <div>5万</div>
                      <div style={{"border":"none"}}>无限额</div>
                    </td>
                    <td>
                      <div>5万</div>
                      <div style={{"border":"none"}}>无限额</div>
                    </td>
                    <td>95574</td>
                  </tr>
                  <tr id="DY" style={{"display": "none"}}>
                    <td>东亚银行</td>
                    <td>
                      <div>手机动态密码</div>
                      <div style={{"border":"none"}}>USB-KEY/USB-KEY+口令卡</div>
                    </td>
                    <td>
                      <div>5000</div>
                      <div style={{"border":"none"}}>2万</div>
                    </td>
                    <td>
                      <div>2万</div>
                      <div style={{"border":"none"}}>100万</div>
                    </td>
                    <td>8008303811</td>
                  </tr>
                  <tr id="SHCB" style={{"display": "none"}}>
                    <td>上海银行</td>
                    <td>借记卡</td>
                    <td>
                      <div>E盾版网银</div>
                      <div style={{"border":"none"}}>动态密码网银</div>
                    </td>
                    <td>
                      <div>50万</div>
                      <div style={{"border":"none"}}>6000</div>
                    </td>
                    <td>
                      <div>100万</div>
                      <div style={{"border":"none"}}>1万</div>
                    </td>
                    <td>95594</td>
                  </tr>
                  <tr id="BOB" style={{"display": "none"}}>
                    <td>北京银行</td>
                    <td>普通/仅借记卡</td>
                    <td>全部方式</td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>95526</td>
                  </tr>
                  <tr id="NJCB" style={{"display": "none"}}>
                    <td>南京银行</td>
                    <td>
                      <div>普通版</div>
                      <div>手机版</div>
                      <div style={{"border":"none"}}>专业版</div>
                    </td>
                    <td>
                      <div>300</div>
                      <div>1万</div>
                      <div style={{"border":"none"}}>5万</div>
                    </td>
                    <td>
                      <div>300</div>
                      <div>1万</div>
                      <div style={{"border":"none"}}>5万</div>
                    </td>
                    <td>4008896400</td>
                  </tr>
                  <tr id="CIB" style={{"display": "none"}}>
                    <td>兴业银行</td>
                    <td>借记卡</td>
                    <td>
                      <div style={{"border":"none"}}>全部方式</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>95561</td>
                  </tr>
                  <tr id="CZBANK" style={{"display": "none"}}>
                    <td>浙商银行</td>
                    <td>借记卡</td>
                    <td>
                      <div style={{"border":"none"}}>全部方式</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>
                      <div style={{"border":"none"}}>个人设置</div>
                    </td>
                    <td>95561</td>
                  </tr>
                  </tbody>

                </table>
              </div>
              <div className="row ccc-container">
                <p style={{"color": "#f58220", "textAlign": "left"}}>温馨提示：</p>
                <ul className="dec-li">
                  <li>1、718金融暂不收取您的充值费用（第三方收取的费用由718金融垫付）。</li>
                  <li>2、充值前请确认您的银行卡限额，718金融对您的充值额度没有限制，限额是由具体开户行决定，如有疑问详询银行客服。</li>
                  <li>3、禁止洗钱、虚假交易等行为，一经发现并确认，将终止该账户的使用。</li>
                  <li>4、充值过程遇到问题，请查看<a href="#" target="_blank"
                                       style={{"fontSize": "16px", "color": "#009ada"}}>帮助中心</a>或联系客服：4001-718-718（工作日：8：30-17：30）。
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Recharge;
