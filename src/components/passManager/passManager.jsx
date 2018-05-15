import React from "react";
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";
import UserTitleComponent from "../userTitle/userTitleContainer.jsx"
import $ from "jquery"
import bootstrap from "bootstrap"

class PassManager extends React.Component {
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    changeNavList:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {changeNavList, navList} = this.props;
    changeNavList(navList);
    $('#collapseOne').collapse('show');
  }

  render() {
    const {oldPass,newPass,ensurePass,validateCode,pointMsg,errorPos,showError,imgUrl,operaOldPass,operaNewPass,operaEnsurePass,operaValidate,changeImage,submit} = this.props;
    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        <UserTitleComponent></UserTitleComponent>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="pass-manager">
              <div className="pass-manager-title">
                <span>登陆密码</span>
              </div>
              <div className="modify-password-wrapper">
                <div className="modify-password">
                  <form action=""  onSubmit={(event)=>{submit(event,oldPass,newPass,ensurePass,validateCode);}} encType="application/x-www-form-urlencoded" method="post"
                        autoComplete="off">
                    <div className="row">
                      <span className="tipss">原密码</span>
                      <input type="password" className="payInp" name="currentPassword" maxLength="16" onChange={(event)=>{operaOldPass(event)}} />
                      {errorPos=="old"&&showError?(<div className="errorMessage errorPass">{pointMsg}</div>):""}
                    </div>
                    <div className="row">
                      <span className="tipss">新密码</span>
                      <input type="password" className="payInp" name="newPassword" maxLength="16" onChange={(event)=>{operaNewPass(event)}} />
                      {errorPos=="new"&&showError?(<div className="errorMessage errorPass">{pointMsg}</div>):""}
                    </div>
                    <div className="row">
                      <span className="tipss">确认新密码</span>
                      <input type="password" className="payInp" name="passwordConfirm" maxLength="16" onChange={(event)=>{operaEnsurePass(event)}} />
                      {errorPos=="ensure"&&showError?(<div className="errorMessage errorPass">{pointMsg}</div>):""}
                    </div>
                    <div className="row">
                      <span className="tipss">图形验证码</span>
                      <div className="border-block">
                        <input type="text" className="payInp" name="captcha" onChange={(event)=>{operaValidate(event)}} />
                        <span className="input-group-addon btn btn-get-validate cap" onClick={()=>{changeImage()}}>
                          <img src={imgUrl} alt="" height="20" width="70" />
                        </span>
                      </div>
                      {errorPos=="validate"&&showError?(<div className="errorMessage errorPass">{pointMsg}</div>):""}
                    </div>
                    <div className="space-30">
                      <input type="submit" className="btn modify-button btn-update" value="确定修改" />
                    </div>

                    <input type="hidden" name="token" value="" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
  }

  }
export default PassManager;
