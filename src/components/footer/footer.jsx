/*
*footer 组件（展示容器）
* */
import React from "react";

class FootComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <footer className="text-center bg_blag foot_style">
        版权所有©2016  新毅金融www.718bank.com  京ICP证160795号
      </footer>
    );
  }
};

export default FootComponent;
