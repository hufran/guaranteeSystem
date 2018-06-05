/*
*左侧导航通用组件
* */
import React from "react";
import {NavLink,Link} from "react-router-dom";
import PropTypes from 'prop-types';


class LeftNav extends React.Component{

  constructor(props){
    super(props);
    // console.log("left props:",this.props);
  }

  render(){
    let {navList,addClick,addItemClick}=this.props;
    return(
      <div className="collapse navbar-collapse show col-lg-2 col-md-2 left-nav float-left" id="example-navbar-collapse">
        <div className="btn-group">
          <button className="btn btn-warning btn-sm"><Link to="/recharge">充值</Link></button>
        </div>
        <ul className="nav navbar-nav">
        {
          navList.map((item,index) => {
            return (
              <li className={item.active?"active":""} data-index={index} onClick={(event)=>{addClick(event,{navList})}} key={index}>
                {
                  !item.childList ? (
                    <NavLink to={item.link}><span className="left-icon float-left" style={!item.active?item.leftIconStyle:item.leftIconActiveStyle}></span><span className="float-left">{item.title}</span><i className="left-arrow float-left" style={item.active?{"backgroundImage":"url('/static/images/toggle.png')","backgroundRepeat":"no-repeat"}:{"backgroundImage":"url('/static/images/toggle-up.png')","backgroundRepeat":"no-repeat"}}></i></NavLink>
                  ) : (
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                            <span className="left-icon float-left" style={!item.active?item.leftIconStyle:item.leftIconActiveStyle}></span>
                            <span className="float-left">{item.title}</span>
                            <i className="left-arrow float-left" style={item.active?{"backgroundImage":"url('/static/images/toggle.png')","backgroundRepeat":"no-repeat"}:{"backgroundImage":"url('/static/images/toggle-up.png')","backgroundRepeat":"no-repeat"}}></i>
                          </a>
                        </div>
                        <div id="collapseOne" className="panel-collapse collapse">
                          <ul>
                            {
                              item.childList.map((child,i)=>{
                                return(
                                  <li data-index={index} className={child.className} data-child-index={i}  key={i} onClick={(event)=>{addItemClick(event,{navList})}}><NavLink to={child.link} className={child.childClass}>{child.title}</NavLink></li>
                                );
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}

export default LeftNav;
