import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(e) {
    e.preventDefault();
    
    const {logoutUser, history} = this.props;
    
    logoutUser();
    history.push('/');
  }

  render() {
    const { auth } = this.props;
    console.log(auth);

    return (
      <div className='dashboard'>
        <div className='flex flex-col items-center justify-center p-8'>
          <h4 className='text-2xl'>
            <strong>Hey there</strong>, you are logged in a kreditpay portal.
          </h4>
          <button type='button' className='px-4 py-2 bg-green-600' onClick={this.handleLogoutClick}>
            LogOut
          </button>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Dashboard));
