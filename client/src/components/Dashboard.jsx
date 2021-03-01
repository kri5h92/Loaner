import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render(){
    return(
      <div className="dashboard">
        <div className="flex flex-col items-center justify-center p-8">
          <h4 className="text-2xl">
            <strong>Hey there</strong>, you are logged in a kreditpay portal.
          </h4>
          <button onClick={this.handleLogoutClick}>
            LogOut
          </button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {logoutUser}
)(Dashboard);
