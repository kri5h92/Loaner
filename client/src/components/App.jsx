import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";
import store from "../store";
import setAuthToken from "../utils/setAuthToken";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

if(localStorage.jwtToken){
  const token = localStorage.jwtToken;
  setAuthToken(token);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      dbResponse: "",
    };
  }

  componentDidMount() {
    this.callAPI();
    this.callDB();
  }

  callAPI() {
    fetch("/v1/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  callDB() {
    fetch("/v1/testDB")
      .then((res) => res.text())
      .then((res) => this.setState({ dbResponse: res }));
  }

  render() {
    return (
      <Provider store={store}>
         <div className="bg-gray-100 min-h-screen">
          <Router>
            <Switch>
              <Route exact path="/">
                <SignIn/>
              </Route>
              <Route exact path="/signup">
                <SignUp/>
              </Route>
              <PrivateRoute exact path="/dashboard">
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
