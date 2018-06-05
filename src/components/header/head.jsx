/*
*head头部组件信息
* */
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types"
import {Redirect} from 'react-router-dom'
import {loginIsFetching,loginLastUpdata,loginRequestSuccess,changeLoginStatus} from "../login/loginAction.jsx"
import Util from "../../assets/js/util.jsx"
import state from "../../store"

class Head extends React.Component{
  static propTypes: {
    loginStatus:PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
    loginOut:PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
  }
  componentWillMount(){
    const sendParam={baseUrl:window.location.origin};
    const data={};
    const actionList={
      isFetching:loginIsFetching,
      lastUpdated:loginLastUpdata
    };
    const success=(data)=>{
      state.dispatch(loginRequestSuccess(data.status,data.msg,data));
      if(data.status==0){
        state.dispatch(changeLoginStatus(true));
      }else{
        state.dispatch(changeLoginStatus(false));
        if(this.props.location.pathname!=='/login'){
          this.props.history.push('/login')
        }
      }
    };
    const fail=(err)=>{
      if(this.props.location.pathname!=='/login'){
          this.props.history.push('/login')
        }
    };
    Util.sendRequest({method:"POST",url:"{baseUrl}/api/v2/getSessionInfo",urlParam:sendParam,data,actionList,success,fail});
  }

  render(){
    let {loginStatus,user,loginOut}=this.props;
    // console.log(this.props)
    return (
      <header className="head">
        <div className="head_info">
          <div className="container clearfix">
            <div className="float-left">
              <span className="nav-phone"><img className="float-left" src="/static/images/tel-phone.png" /></span>
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
                    <img src="/static/images/user.png" />
                    {user.name}
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
              <img className="" src="/static/images/navLogo.png" title="logo"/>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Head;
