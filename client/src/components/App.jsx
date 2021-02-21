import React, { Component } from "react";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiResponse: "",
      dbResponse: ""
    };
  }

  componentDidMount(){
    this.callAPI();
    this.callDB();
  }

  callAPI(){
    const self = this;
    fetch('http://localhost:3000/testAPI')
      .then(res=>res.text())
      .then(res=> this.setState({apiResponse:res}));
  }

  callDB(){
    const self = this;
    fetch('http://localhost:3000/testDB')
      .then(res=>res.text())
      .then(res=> this.setState({dbResponse:res}));
  }


  render() {
    return (
      <div>
        <h1>My MERN App!!</h1>
        <p>{this.state.apiResponse}</p>
        <p>{this.state.dbResponse}</p>
      </div>
    );
  }
}

export default App;
