import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(e) {
    e.preventDefault();

    const { logoutUser, history } = this.props;

    logoutUser();
    history.push('/');
  }

  render() {

    return (
      <header className="py-6 px-3 w-full bg-white shadow-md">
          <nav className="nav">
            <div className="flex justify-between">
              <div className="nav__brand font-bold text-2xl">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#">KreditPay</a>
              </div>
              <button type='button' className='hover:text-orange' onClick={this.handleLogoutClick}>
                  LogOut
              </button>
            </div>
          </nav>
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));
