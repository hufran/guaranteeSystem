/*
*弹窗组件，根据参数指定弹窗参数
* */
import React from "react";
import PropTypes from 'prop-types';
import $ from "jquery"
import bootstrap from "bootstrap"

class Modal extends React.Component{
  static propTypes: {
    component: PropTypes.func,
  }
  constructor(props){
    super(props);
  }
  render(){
    let {modalTitle="提示",modalBody,modalBtn:{sureBtn=true,sureText='确定',sure=null,cancelBtn=false,cancelText='取消',cancel=null}}=this.props;
    return(
      <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog col-sm-6">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                {modalTitle}
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
            </div>
            <div className="modal-body">
              {modalBody}
            </div>
            <div className="modal-footer text-center">
              {
                sureBtn?(
                  <button type="button" className="btn btn-default"  onClick={(event)=>{if(typeof sure=="function"){sure()};$('#myModal').modal("hide");}}>{sureText}</button>
                ):''
              }
              {
                cancelBtn?(
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(event)=>{if(typeof cancel=="function"){cancel()}}}>{cancelText}</button>
                ):''
              }

            </div>
          </div>
        </div>
      </div>
    );
  }

};

export default Modal;
