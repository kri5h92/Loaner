/* eslint-disable camelcase */
import React, { Component } from 'react';
import RootModal from '../shared/modals/RootModal';
import axios from 'axios';

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/destructuring-assignment
    this.state = {
      first_name: this.props.userData.first_name,
      last_name: this.props.userData.last_name,
      email: this.props.userData.email,
      role: this.props.userData.role
    };

    this.roleOptions = [
      {
        value: 'admin',
        label: 'Admin'
      },
      {
        value: 'customer',
        label: 'Customer'
      },
      {
        value: 'agent',
        label: 'Agent'
      }
    ];

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  }

  handleClose(e) {
    e.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { closeModal, saveUserEditData, userData } = this.props;

    const userPayloads = this.state;
    const data = await this.updateUser(userData._id, userPayloads);
    saveUserEditData(data);
    closeModal();
  }

  async updateUser(userId, payloads) {
    let data = {};
    try {
      const response = await axios.put(`/v1/users/${userId}`, payloads);
      data = response.data.data[0];
    } catch (err) {
      console.error(err);
    }
    return data;
  }

  render() {
    const { isOpen } = this.props;
    const { first_name, last_name, email, role } = this.state;

    return isOpen ? (
      <RootModal>
        <div className='max-w-md mx-auto md:max-w-1/2 p-8 bg-white text-black relative'>
          <header className='space-y-4 text-center'>
            <h1 className='text-2xl font-bold tracking-wide'>User Details</h1>
          </header>
          <button
            type='button'
            className='appearance-none absolute top-4 right-8 hover:text-gray-600'
            onClick={this.handleClose}
          >
            <svg
              height='24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          <form
            action=''
            noValidate
            onSubmit={this.handleSubmit}
            className='flex flex-col mt-8 w-full'
          >
            <div className='flex flex-wrap justify-between gap-2'>
              <div className='flex flex-col flex-1 space-y-1 mt-2'>
                <label htmlFor='first-name' className='text-lg'>
                  First Name
                </label>
                <input
                  type='text'
                  id='first-name'
                  name='first_name'
                  onChange={this.handleChange}
                  value={first_name}
                  className='px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none'
                  placeholder='Your first name'
                  required
                />
                {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div>  */}
              </div>
              <div className='flex flex-col flex-1 space-y-1 mt-2'>
                <label htmlFor='last-name' className='text-lg'>
                  Last Name
                </label>
                <input
                  type='text'
                  id='last-name'
                  name='last_name'
                  onChange={this.handleChange}
                  value={last_name}
                  className='px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none'
                  placeholder='Your last name'
                  required
                />
                {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
              </div>
            </div>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='email' className='text-lg'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                onChange={this.handleChange}
                value={email}
                className='px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none'
                placeholder='your@email.com'
                required
              />
              {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
            </div>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='email' className='text-lg'>
                Role
              </label>
              <select
                name='role'
                id=''
                onChange={this.handleChange}
                className='px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none'
                value={role.toLowerCase()}
              >
                {this.roleOptions.map((role, idx) => (
                  <option key={idx} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
            </div>
            <button
              type='submit'
              className='py-2 px-3 mt-6 bg-black font-bold text-white focus:ring-2 border-none hover:bg-gray-800 ml-auto '
            >
              Update
            </button>
          </form>
        </div>
      </RootModal>
    ) : null;
  }
}

export default UserEditModal;
