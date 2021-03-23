import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import FormFieldValidationErr from './shared/FormFieldValidationErr';
import { loginUser,purgeErrors } from '../actions';
import {validateSignInFormFields} from '../validation/signIn';
import LoadingModal from './shared/modals/LoadingModal';
import ApiErrorsRender from './shared/ApiErrorsRender';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      apiErrors: [],
      validationErrors: {},
      showModal: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const {purgeErrors} = this.props;
    purgeErrors();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.apiErrors !== prevState.apiErrors) {
      return { apiErrors: nextProps.apiErrors };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { auth, history } = this.props;
    const { apiErrors } = this.state;
    if (prevProps.auth !== auth) {
      auth.loading
        ? this.setState({ showModal: true })
        : this.setState({ showModal: false });

      if (auth.isAuthenticated) {
        history.push('/dashboard');
      }
    }

    if (prevState.apiErrors !== apiErrors) {
      this.setState({apiErrors});
    }
  }

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

    const { errors, isValid } = validateSignInFormFields({ ...payloads });
    if (!isValid) {
      this.setState({ validationErrors: errors });
    } else {
      loginUser(payloads);
      this.setState({validationErrors: {}});
    }

  }

  render() {
    const { password, email, showModal,validationErrors,apiErrors } = this.state;

    return (
      <section className='sign-in'>
        {showModal && <LoadingModal />}
        <div className='p-8 min-h-screen'>
          <div className='max-w-md mx-auto md:max-w-1/2'>
            <header className='space-y-4 text-center'>
              <h1 className='text-4xl font-bold tracking-wide'>Welcome</h1>
            </header>
            <form
              action=''
              onSubmit={this.handleSubmit}
              className='flex flex-col mt-16 w-full'
              noValidate
            >
              <ApiErrorsRender errors={apiErrors}/>
              <div className='flex flex-col space-y-1 mt-2'>
                <label htmlFor='email' className='text-lg'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none'
                  onChange={this.handleInputChange}
                  value={email}
                  placeholder='your@email.com'
                  required
                />
                <FormFieldValidationErr error={validationErrors.email}/>
              </div>
              <div className='flex flex-col space-y-1 mt-2'>
                <label htmlFor='password' className='text-lg'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className='px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none'
                  onChange={this.handleInputChange}
                  value={password}
                  placeholder='Your Password'
                  required
                />
                <FormFieldValidationErr error={validationErrors.password}/>
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
  loginUser: PropTypes.func.isRequired,
  purgeErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  apiErrors: state.errors
});

export default connect(mapStateToProps, { loginUser,purgeErrors })(withRouter(SignIn));
