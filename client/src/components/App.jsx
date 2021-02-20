import React, { Component } from "react";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { apiResponse: "" };
  }

  componentDidMount(){
    this.callAPI();
  }

  callAPI(){
    fetch('http://localhost:3000/testAPI',{mode:"cors"})
      .then(res=>res.text())
      .then(res=> res.setState({apiResponse:res}));
  }

  render() {
    return (
      <div>
        <h1>My MERN App!!</h1>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
