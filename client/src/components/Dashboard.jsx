/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react';
import Header from './Header';
import Users from './Users';

class Dashboard extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <Users />
      </>
    );
  }
}

export default Dashboard;
