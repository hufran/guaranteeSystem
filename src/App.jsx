import React from "react";
import {Route} from "react-router-dom"
import Index from "./components/index/index.jsx"


class App extends React.Component{
  // static propTypes: {
  //   path: PropTypes.string,
  //   exact: PropTypes.bool,
  //   component: PropTypes.func,
  //   render: PropTypes.func,
  // }
  constructor(props){
    super(props);

  }


  render(){
    console.log("323deddd333");
    return (
      <div>
        Hello world
        <Route exact path="/" component={Index} />
      </div>
    );
  }

}

export default App;
