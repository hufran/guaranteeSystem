import React from "react";
import {Route,Redirect,Switch} from "react-router-dom"
import FootComponent from "./components/footer/footer.jsx"
import HeadComponent from "./components/header/headContainer.jsx"
import IndexComponent from "./components/index/indexContainer.jsx"
import LoginComponent from "./components/login/loginContainer.jsx"

class App extends React.Component{
  constructor(props){
    super(props);

  }


  render(){
    return (
      <div className="guarantee">
        <HeadComponent></HeadComponent>
        <div className="container">
          {/* 用了Switch 这里每次只匹配一个路由，所有只有一个节点。 */}
          <Switch>
            <Route path="/" exact component={IndexComponent} />
            <Route path="/login" exact component={LoginComponent} />
          </Switch>
        </div>
        <FootComponent></FootComponent>
      </div>
    );
  }

}

export default App;
