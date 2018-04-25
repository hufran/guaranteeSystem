import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import LeftNavComponent from "../leftNav/leftNavContainer.jsx";

class Index extends React.Component{
  static propTypes: {
    path: PropTypes.string,
    component: PropTypes.func,
    onShowPoint:PropTypes.func.isRequired,
    onHidePoint:PropTypes.func.isRequired,
    loginStatus:PropTypes.bool.isRequired,
    index:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    console.log("store111:",this.props);
  }

  render(){
    let {loginStatus,user,index,onShowPoint,onHidePoint,children}=this.props;
    return (
      <div className="col-lg-12 col-md-12 index-content clearfix">
        {/*{
          loginStatus?index.point.text:(<Redirect from="/" to="/login"></Redirect>)
        }*/}

        <LeftNavComponent></LeftNavComponent>
        <div className="col-lg-10 col-md-10 float-left">
          index yemian{children}
        </div>

      </div>
    );
  }
}

export default Index;
