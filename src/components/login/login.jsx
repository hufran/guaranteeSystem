import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

class Login extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func
  }

  constructor(props){
    super(props);
    console.log("store:",this.props);
  }

  render({children,loginStatus,errorContent,formValue,setUser,setPass,checkUser,checkPass,setRemeber,forget,login}=this.props){
    return (
      <div className="col-lg-12 col-md-12">
        {loginStatus?(<Redirect to="/" />):""}
        <div className="col-lg-6 login_container">
          <form className="login_form">
            <p className="err_point {errorContent.status?'show':'hide'}">{errorContent.msg}</p>
            <label className="login_user clearfix">
              <img src="./static/images/loginUser.png" className="float-left" />
              <input type="text" maxLength="11" name="username" className="float-left" id="username" onChange={(event)=>{setUser(event)}} onBlur={(event)=>{checkUser(event)}} defaultValue={formValue.userName} />
            </label>
            <label className="login_user clearfix">
              <img src="./static/images/loginLock.png" className="float-left" />
              <input type="password" maxLength="16" name="pass" className="float-left" id="pass" defaultValue={formValue.passWord} onChange={(event)=>{setPass(event)}} onBlur={(event)=>{checkPass(event)}} />
            </label>
            <div className="remember_password clearfix">
              <label className="col-xs-6">
                <input type="checkbox" defaultChecked={formValue.remember} onChange={(event)=>{setRemeber(event)}} />
                <i>记住密码</i>
              </label>
              <span className="col-xs-6" onClick={()=>{forget()}}>找回密码</span>
            </div>
            <div className="btn_group">
              <button type="submit" className="btn" onClick={(event)=>{login(event)}}>登录</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
