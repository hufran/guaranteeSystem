import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import Modal from '../modal/modal.jsx';

class Login extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func
  }

  constructor(props){
    super(props);
  }
  componentDidMount(){
    const modal= document.getElementsByClassName('modal-backdrop')[0];
    if(modal){
      modal.className=modal.className.substring(modal.className.indexOf("show"))
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render(){
    let {children,loginStatus,errorContent,formValue,modalValue,setUser,setPass,checkUser,checkPass,setRemeber,forget,closeModal,login}=this.props;
    return (
      <div className="container">
        {loginStatus?(<Redirect to="/" />):""}
        <div className="col-lg-12 col-md-12">
          <div className="col-lg-6 login_container">
            <form className="login_form">
              <p className="err_point"><span className={errorContent.status?'show':'hide'}>{errorContent.msg}</span></p>
              <label className="login_user clearfix">
                <img src="./static/images/loginUser.png" className="float-left" />
                <input type="text" maxLength="11" placeholder="请输入用户名" name="username" className="float-left" id="username" onChange={(event)=>{setUser(event)}} onBlur={(event)=>{checkUser(event)}} defaultValue={formValue.userName} />
              </label>
              <label className="login_user clearfix">
                <img src="./static/images/loginLock.png" className="float-left" />
                <input type="password" maxLength="16" placeholder="请输入密码" name="pass" className="float-left" id="pass" defaultValue={formValue.passWord} onChange={(event)=>{setPass(event)}} onBlur={(event)=>{checkPass(event)}} />
              </label>
              <div className="remember_password clearfix">
                <label className="col-xs-6">
                  <input type="checkbox" defaultChecked={formValue.remember} onChange={(event)=>{setRemeber(event)}} />
                  <i>记住密码(30天内有效)</i>
                </label>
                <span className="col-xs-6" data-toggle="modal" data-target="#myModal" onClick={()=>{forget()}}>找回密码</span>
              </div>
              <div className="btn_group">
                <button type="submit" className="btn" onClick={(event)=>{event.preventDefault();login(event,formValue)}}>登录</button>
              </div>
            </form>
          </div>
          <Modal modalBody={modalValue.msg} modalBtn={{sure:closeModal}} ></Modal>
        </div>
      </div>
    );
  }
}

export default Login;
