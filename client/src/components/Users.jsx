// eslint-disable class-methods-use-this

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'is-empty';
import uniqid from 'uniqid';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.getUsers = this.getUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleUserDeletion = this.handleUserDeletion.bind(this);
  }

  componentDidMount() {
    (async () => {
      const users = await this.getUsers();
      if (!isEmpty(users)) {
        const {auth} = this.props;
        let notLogedInUsers = users.filter(user => user._id !== auth.user._id);
        this.setState({ users: [...notLogedInUsers] });
      }
    })();
  }

  async handleUserDeletion(id) {
    const isDeleted = await this.deleteUser(id);
    if (isDeleted) {
      const users = this.state.users.filter((user) => user._id !== id);
      this.setState({ users });
    } else {
      console.error('Unable to delete the user :(');
    }
  }

  async getUsers() {
    const { auth } = this.props;
    const accessToken = auth.user.access_token;
    let users = [];
    try {
      const response = await axios.get('/v1/users/', {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      users = response.data.data;
    } catch (err) {
      console.error(err);
    }
    return users;
  }

  async deleteUser(id) {
    const { auth } = this.props;
    const accessToken = auth.user.access_token;

    try {
      await axios.delete(`/v1/users/${id}`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  render() {
    const { users } = this.state;
    return (
      <div className='users p-8'>
        <table className='table-auto w-full'>
          <thead>
            <tr className='text-left bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6'>id</th>
              <th className='py-3 px-6'>name</th>
              <th className='py-3 px-6'>email</th>
              <th className='py-3 px-6'>type</th>
              <th className='py-3 px-6'>actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={uniqid()}
                className='border-b border-gray-200 bg-gray-50 hover:bg-gray-100'
                data-id={user._id}
              >
                <td className='py-3 px-6'>{user._id}</td>
                <td className='py-3 px-6'>{`${user.first_name} ${user.last_name}`}</td>
                <td className='py-3 px-6'>{user.email}</td>
                <td className='py-3 px-6'>{user.role}</td>
                <td className='py-3 px-6'>
                  <div className='flex justify-center gap-2'>
                    <button
                      type='button'
                      className='w-4 transform hover:text-gray-800 hover:scale-110'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    </button>
                    <button
                      type='button'
                      className='w-4 transform hover:text-gray-800 hover:scale-110'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                        />
                      </svg>
                    </button>
                    <button
                      type='button'
                      className='w-4 transform hover:text-red-800 hover:scale-110'
                      onClick={this.handleUserDeletion.bind(null, user._id)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

Users.propTypes = {
  auth: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps)(Users);
