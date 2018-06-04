import React from "react";
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";
import UserTitleComponent from "../userTitle/userTitleContainer.jsx"
import Modal from "../modal/modal.jsx"
import {NavLink} from "react-router-dom";
import $ from "jquery"
import bootstrap from "bootstrap"

class Authentication extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    changeNavList:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {changeNavList, navList, lastUpdateTime, user, queryLccbId, queryBankList} = this.props;
    changeNavList(navList);
    $('#collapseOne').collapse('show');
    queryBankList();
    if(user.id){
      queryLccbId(lastUpdateTime,user);

    }
  }

  render() {
    const {user,name,license,card,bankCode,bankList,pointMsg,showErrorMsg,setName,setLicense,setCard,getBankValue,submit}=this.props;
    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        <UserTitleComponent></UserTitleComponent>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="authentication">
              <div className="ftips">
                <span className="glyphicon glyphicon-exclamation-sign exclamation" style={{"color":"#ff7200"}}></span>
                重要提示：开通银行存管操作关系到您的切身利益，请保护好帐号安全
              </div>
              <div className="account-opened-wrapper">
                <div className="account-info-row">
                  <label className="text">公司名称：</label>
                  {
                    user.corporationUser&&user.corporationUser.name&&user.corporationUser.name.length>0?
                      (<span className="value">{user.corporationUser.name}</span>):
                      (<input type="text" name="name" onChange={(event)=>{setName(event,name)}} placeholder="请输入公司名称" />)
                  }
                </div>
                <div className="account-info-row">
                  <label className="text">营业执照：</label>
                  {
                    user.corporationUser&&user.corporationUser.busiCode&&user.corporationUser.busiCode.length>0?
                      (<span className="value">{user.corporationUser.busiCode}</span>):
                      (<input type="text" name="license" onChange={(event)=>{setLicense(event,license)}} placeholder="请输入营业执照号" />)
                  }
                </div>
                <div className="account-info-row">
                  <label className="text">银行卡号：</label>
                  {
                    user.bankCards&&user.bankCards[0]&&user.bankCards[0].account&&user.bankCards[0].account.account.length>0?
                      (<span className="value">{user.bankCards[0].account.account}</span>)
                      :(<input type="number" name="bankCard" onChange={(event)=>{setCard(event,card)}} placeholder="请输入银行卡号" />)
                  }
                </div>
                <div className="account-info-row">
                  <label className="text">所属银行：</label>
                  {
                    user.bankCards&&user.bankCards[0]&&user.bankCards[0].account&&user.bankCards[0].account.account.bank>0?
                      (<span>
                        <span className="bankpic" style={{"backgroundImage": "url(/static/images/bank-icons/"+user.bankCards[0].account.bank+".png)"}}></span>
                        <span className="value" style={{"width": "250px"}}>{user.bankCards[0].account.bank}</span>
                      </span>):
                      (<select className="bankList" onChange={(event)=>{getBankValue(event,bankCode)}}>
                        <option>请选择</option>
                        {
                          bankList.map((item,index,ele)=>{
                            console.log("item:"+item+" index:"+index+" ele:"+ele)
                            return(
                              <option></option>
                            )
                          })
                        }
                      </select>)
                  }
                </div>
                <form id="form2" method="POST" target="_blank" style={{"display":"none"}}></form>
                {showErrorMsg?(<p className="error">{pointMsg}</p>):""}
                <div className="account-submit">
                  <input type="button" className="btn info-submit" onClick={(event)=>{submit(event,user,name,license,card,bankCode)}} value={user.lccbUserId&&user.lccbUserId!=-1?(user.lccbUserId==0?"立即激活":(user.lccbAuth!=null&&user.lccbAuth?"取消授权":"授权投资")):"开通存管"}/>
                </div>
              </div>
              <div className="point-msg">
                <p className="tips" style={{"color":"#f58220"}}>温馨提示：</p>
                <p className="tips">3、开通银行存管过程遇到问题，请联系客服：4001-718-718（工作日：8：30-17：30）。
                </p>
              </div>
            </div>
          </div>
        </div>
        <Modal modalBody={pointMsg} modalBtn={{sure:true}} ></Modal>
      </div>
    );
  }
}
export default Authentication;
