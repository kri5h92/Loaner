/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react';
import Header from './Header';
import UserPage from './User/UserPage';

class Dashboard extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <UserPage />
      </>
    );
  }
}

export default Dashboard;
