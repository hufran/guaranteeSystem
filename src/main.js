/**
 * Created by Administrator on 2018/4/8.
 */
import React from "react";
import ReactDOM from "react-dom"
import routes from "./router/index.jsx"
import {Provider} from "react-redux"
import state from "./store"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/userSet.css"

if(window.ver=='production'){
  //正式环境
  if(window.location.port==""){
    window.baseUrl=window.location.origin+"/lend/h5";
  }else{
    window.baseUrl=window.location.origin;
  }
}else{
  //测试环境
  window.baseUrl=window.location.origin;
}


console.log("main:",state.getState());
ReactDOM.render(
  <Provider store={state}>
  {routes}
  </Provider>,
  document.getElementById("guarantee")
);

