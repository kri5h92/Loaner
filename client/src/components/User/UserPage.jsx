// eslint-disable class-methods-use-this

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'is-empty';
import uniqid from 'uniqid';
import { toast } from 'react-toastify';

import UserEditModal from '../modals/UserEditModal';
import { apiUsers } from '../../services/api';
import LoadingModal from '../shared/modals/LoadingModal';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isModalOpen: false,
      loading: false
    };

    this.userEditData = {};
    this._setLoading = this._setLoading.bind(this);
    this._getUsers = this._getUsers.bind(this);
    this._deleteUser = this._deleteUser.bind(this);
    this.handleUserDeletion = this.handleUserDeletion.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.saveUserEditData = this.saveUserEditData.bind(this);
    this.handleAddNewClick = this.handleAddNewClick.bind(this);
  }

  componentDidMount() {
    this._getUsers();
  }

  handleOpenModal(user) {
    this.userEditData = user;
    this.setState({ isModalOpen: true });
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

  async handleUserDeletion(id) {
    const isDeleted = await this._deleteUser(id);
    if (isDeleted) {
      const users = this.state.users.filter((user) => user._id !== id);
      this.setState({ users });
    }
  }

  handleAddNewClick() {
    const { history } = this.props;
    history.push('users/add');
  }

  _setLoading = (flag = false) => this.setState({ loading: flag });

  // -------------API CALLS-----------
  async _getUsers() {
    let users = [];
    this._setLoading(true);
    try {
      const res = await apiUsers.getAll();
      users = res.data;

      /** show all users except logedIn */
      if (!isEmpty(users)) {
        const { auth } = this.props;
        const notLogedInUsers = users.filter((user) => user._id !== auth.user._id);
        this.setState({ users: [...notLogedInUsers] });
      }
      this._setLoading(false);
    } catch (err) {
      this._setLoading(false);
      console.error(err);
    }
  }

  async _deleteUser(id) {
    this._setLoading(true);
    try {
      await apiUsers.delete(id);
      this._setLoading(false);
      toast.success('User successfully deleted');
    } catch (err) {
      console.error(err);
      this._setLoading(false);
      toast.delete('Unable to delete the user');
      return false;
    }
    return true;
  }

  // ----------END APICALLS------------

  saveUserEditData(updatedUser) {
    if (updatedUser) {
      const { users } = this.state;
      const updatedUsersList = users.map((user) => {
        if (user._id === updatedUser._id) {
          return updatedUser;
        }
        return user;
      });
      this.setState({ users: updatedUsersList });
    }
  }

  render() {
    const { users, isModalOpen, loading } = this.state;
    return (
      <>
        {isModalOpen && (
          <UserEditModal
            isOpen={isModalOpen}
            closeModal={this.handleCloseModal}
            userData={this.userEditData}
            saveUserEditData={this.saveUserEditData}
          />
        )}
        {loading && <LoadingModal type='DualRing' />}
        <section className='users p-8'>
          <header className='users__header'>
            <div className='flex items-center justify-between bg-purple-700 px-4 py-6 text-white shadow-md rounded-md'>
              <h3 className='font-bold text-xl'>Users</h3>
              <button
                className='flex px-4 py-2 bg-purple-500  hover:bg-purple-400 rounded-sm'
                type='button'
                onClick={this.handleAddNewClick}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  height='24'
                  width='24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
                Add
              </button>
            </div>
          </header>
          <div className='users__content px-2 relative'>
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
                      <div className='flex gap-2'>
                        {/*  <button
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
                        </button> */}
                        <button
                          type='button'
                          className='w-4 transform hover:text-gray-800 hover:scale-110'
                          onClick={this.handleOpenModal.bind(null, user)}
                          title='Edit'
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
                          title='Delete'
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
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

UserPage.propTypes = {
  auth: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps)(withRouter(UserPage));
