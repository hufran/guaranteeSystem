import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

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
    console.log("store111:",this.props.store);
  }

  render(){
    console.log("render fdssdfvgasf:",this.props);
    let {loginStatus,user,index,onShowPoint,onHidePoint,children}=this.props;
    return (
      <div className="col-lg-12 col-md-12">
        {/*{
          loginStatus?index.point.text:(<Redirect from="/" to="/login"></Redirect>)
        }*/}

        index yemian{children}
        <div className="modal fade {index.point&&index.point.status?'in':'out'}" id="myModal" >
          <div className="modal-body">
            {index.point}
          </div>
          <div className="modal-backdrop fade {index.point&&index.point.status?'in':'out'}"></div>
        </div>
      </div>
    );
  }
}

export default Index;
