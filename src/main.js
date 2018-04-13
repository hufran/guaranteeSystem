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


console.log("main:",state.getState());
ReactDOM.render(
  <Provider store={state}>
  {routes}
  </Provider>,
  document.getElementById("guarantee")
);

