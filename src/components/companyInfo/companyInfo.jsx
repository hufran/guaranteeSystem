import React from "react";
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";
import UserTitleComponent from "../userTitle/userTitleContainer.jsx"
import {NavLink} from "react-router-dom";
import $ from "jquery"
import bootstrap from "bootstrap"

class CompanyInfo extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    changeNavList:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {changeNavList, navList, setLevel, user} = this.props;
    changeNavList(navList);
    $('#collapseOne').collapse('show');
    setLevel(user);
  }

  render() {
    const {user,level}=this.props;
    return (
      <div className="col-lg-12 col-md-12 index-content clearfix pl-xl-0 pr-xl-0">
        <UserTitleComponent></UserTitleComponent>
        <div className="container">
          <LeftNavComponent></LeftNavComponent>
          <div className="col-lg-10 col-md-10 float-left">
            <div className="company-info">
              <div className="company-info-title">
                <span>基本信息</span>
              </div>
              <div className="level-wrapper">
                <span style={{"fontWeight":"bold"}}>安全等级</span>
                <div className="safetyLevel">
                  <div className="levelBar" style={{"height":level+"%"}}></div>
                  <span className="level-info" style={{"color":"white"}}>{level>=0&&level<=50?"低":(level<=80?"中":"高")}</span>
                </div>
                <span style={{"fontSize":"18px","marginLeft":"100px"}}>您的信息资料完整度为 <span style={{"color":"#F58220","marginLeft":"20px"}}>{level}%</span></span>
              </div>
              <div className="safety-wrapper">
                <table className="table">
                  <tbody>
                  <tr>
                    <td style={{"width":"35%"}}><span className="glyphicon"><img src={user.mobile&&user.mobile.length==11?"/static/images/sure_btn.jpg":"/static/images/error_btn.jpg"} /></span> &nbsp;手机认证：</td>
                    <td style={{"width":"45%"}}>
                        {
                          user.mobile&&user.mobile.length==11?(<span>{user.mobile}</span>):(<span className="status-no">未认证</span>)
                        }
                    </td>
                    <td className="align-center">
                      {
                        user.mobile&&user.mobile.length==11?(<span className="status">已认证</span>):(<NavLink to="/company/authentication" className="btn" rel="nofollow">去开通</NavLink>)
                      }
                    </td>
                  </tr>
                  <tr>
                    <td><span className="glyphicon"><img src={user.lccbUserId&&user.lccbUserId.length>0?"/static/images/sure_btn.jpg":"/static/images/error_btn.jpg"} /></span> &nbsp;银行存管：</td>
                    <td>
                      {user.lccbUserId==-1||user.lccbUserId==null?(<span className="status-no">未开通</span>):user.lccbUserId==0?(<span className="status-no">未激活</span>):(<NavLink style={{"color":"#009ada"}} to="/company/authentication">查看详情</NavLink>)}
                    </td>
                    <td className="align-center">
                      {
                        user.lccbUserId==-1||user.lccbUserId==null?(<NavLink to="/company/authentication" className="btn" rel="nofollow">去开通</NavLink>):user.lccbUserId==0?(<NavLink to="/company/authentication" className="btn" rel="nofollow">去开通</NavLink>):(<span className="status">已开通</span>)
                      }
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="img-wrapper"><img src="/static/images/userInfo.png" /></div>
            </div>
          </div>
        </div>
      </div>
  );
  }
  }

  export default CompanyInfo;
