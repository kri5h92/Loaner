import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from '../actions/authActions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  componentDidUpdate() {
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }

  /*  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState(() => ({
        errors: nextProps.errors
      }));
    }
  } */

  handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  }

  handleSubmit(e) {
    e.preventDefault();
	
    const { loginUser } = this.props;
    const { email, password } = this.state;

    const payloads = {
      email,
      password
    };

    loginUser(payloads);
  }

  render() {
    const { password, email } = this.state;

    return (
      <section className='sign-in'>
        <div className='p-8 min-h-screen'>
          <div className='flex flex-col justify-center w-full mx-auto md:w-1/2'>
            <header className='space-y-4 text-center'>
              <h1 className='text-4xl font-bold tracking-wide'>Welcome</h1>
            </header>
            <form
              action=''
              onSubmit={this.handleSubmit}
              className='flex flex-col mt-16 w-full'
            >
              <div className='flex flex-col space-y-1 mt-2'>
                <label htmlFor='email' className='text-lg'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='px-3 py-2 border text-gray-700 focus:ring-2 shadow-md'
                  onChange={this.handleInputChange}
                  value={email}
                  placeholder='your@email.com'
                  required
                />
                {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
              </div>
              <div className='flex flex-col space-y-1 mt-2'>
                <label htmlFor='password' className='text-lg'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className='px-3 py-2 border text-gray-700 focus:ring-2 shadow-md'
                  onChange={this.handleInputChange}
                  value={password}
                  placeholder='Your Password'
                  required
                />
                {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
              </div>
              <button
                type='submit'
                className='py-2 mt-4 bg-black font-bold text-white hover:bg-gray-800'
              >
                Sign In
              </button>
            </form>
            <footer className='text-sm space-y-2 mt-6 text-center'>
              <p>
                Don't have an account?
                <Link
                  to='/signup'
                  className='underline font-semibold hover:text-blue-800'
                >
                  Register here
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </section>
    );
  }
}

SignIn.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(SignIn));
