import React from "react";

class Index extends React.Component{
  // static propTypes: {
  //   path: PropTypes.string,
  //   exact: PropTypes.bool,
  //   component: PropTypes.func,
  //   render: PropTypes.func,
  // }

  constructor(props){
    super(props);
    console.log("index");
  }

  render(){
    console.log("sssss");
    return (
      <div>
        index yemian{this.props.Children}
      </div>
    );
  }
}

export default Index;
