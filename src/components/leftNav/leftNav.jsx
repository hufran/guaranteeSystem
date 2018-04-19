/*
*左侧导航通用组件
* */

import React from "react";
import {NavLink,Link} from "react-router-dom";
import PropTypes from 'prop-types';


class LeftNav extends React.Component{

  constructor(props){
    super(props);
    console.log("left props:",this.props);
  }

  render(){
    let {navList,addClick,addItemClick}=this.props;
    return(
      <div className="collapse navbar-collapse show col-lg-3 col-md-3 left-nav" id="example-navbar-collapse">
        <div className="">
          <button className="btn btn-warning btn-sm"><Link to="/recharge">充值</Link></button>
        </div>
        <ul className="nav navbar-nav">
        {
          navList.map((item,index) => {
            return (
              <li className={item.className} data-index={index} onClick={(event)=>{addClick(event)}} key={index}>
                {
                  !item.childList ? (
                      <NavLink to={item.link}>{item.title}</NavLink>
                  ) : (
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                            {item.title}
                          </a>
                        </div>
                        <div id="collapseOne" className="panel-collapse collapse">
                          <ul>
                            {
                              item.childList.map((child,i)=>{
                                return(
                                  <li className={child.className} data-child-index={i}  key={i} onClick={(event)=>{addItemClick(event)}}><a href="javascript:void(0);">{child.title}</a></li>
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
