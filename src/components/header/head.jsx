/*
*head头部组件信息
* */
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types"

class Head extends React.Component{
  static propTypes: {
    loginStatus:PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
    loginOut:PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
  }

  render(){
    let {loginStatus,user,loginOut}=this.props;
    return (
      <header className="head">
        <div className="head_info">
          <div className="container clearfix">
            <div className="float-left">
              <span className="nav-phone"><img src="./static/images/phone.png" /></span>
              <span className="nav-customer">客服电话：4001-718-718</span>
            </div>
            {
              !loginStatus?(
                <div className="float-right">
                  <Link to="/login">登录</Link>
                </div>
              ):(
                <div className="float-right">
                  <Link to="" >
                    <img src="./static/images/user.png" />
                    user.name
                  </Link>
                  <span className="退出" onClick={()=>{loginOut()}}></span>
                </div>
              )
            }
          </div>
        </div>
        <div className="head_menu">
          <div className="container">
            <Link to="/">
              <img className="" src="./static/images/navLogo.png" title="logo"/>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Head;
