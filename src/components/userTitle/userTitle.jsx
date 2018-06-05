import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

class UserTitle extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    loginStatus:PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
  }

  constructor(props){
    super(props);
  }

  render(){
    let {user,loginStatus}=this.props;
    return (
      <div id="userinfo">
        {/*{
         loginStatus?"":(<Redirect from="/" to="/login"></Redirect>)
         }*/}
        <div className="userinfowra" style={{"backgroundImage":'url("/static/images/topbg.png")'}}>
          <div className="container">
            <div className="info clearfix">
              <div className="tx" style={{backgroundImage: "url('/static/images/txn.png')"}}></div>
              <ul className="doCredit">
                <li className="rzpa cmo-active" style={{backgroundImage: "url('/static/images/phone.png')"}}></li>
                <li>
                  <a href="/authentication" className="mouse-enter rzpa cid-active" rel="nofollow" style={user.lccbAuth&&user.lccbAuth.length>0?{backgroundImage: "url('/static/images/ID-active.png')"}:{backgroundImage: "url('/static/images/ID.png')"}}></a>
                  <p className="info-tip" style={{top: "16px", left: "30px",display: "none"}}>点击查看银行存管</p>
                </li>
              </ul>
            </div>
            <div className="user">
              <div className="name">{user.name||"杜文亚"}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default UserTitle;
