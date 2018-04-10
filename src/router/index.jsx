import React from "react";
import {BrowserRouter as Router,Route} from "react-router-dom"
import App from "../App.jsx"

const routes=(
  <Router basename="/">
    <Route component={App} path="/" />
  </Router>
);

export default routes;
