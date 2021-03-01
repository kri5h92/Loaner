import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { signUpUser } from "../actions/authActions";

class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState(()=>({
        errors: nextProps.errors
      }));
    }
  }

  handleSubmit(e){
    e.preventDefault();

    let payloads = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      password: this.password.value,
      password2: this.password2.value,
    }

    this.props.signUpUser(payloads, this.props.history);
  }


  render() {
    return (
      <section className="sign-up">
        <div className="p-8 min-h-screen">
          <div className="max-w-md mx-auto md:max-w-1/2">
            <header className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-wide">Join Us</h1>
            </header>
            <form
              action=""
              noValidate
              onSubmit={this.handleSubmit}
              className="flex flex-col mt-16 w-full"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex flex-col flex-1 space-y-1 mt-2">
                  <label htmlFor="first-name" className="text-lg">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first_name"
                    ref={input=>this.first_name=input}
                    className="px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none"
                    placeholder="Your first name"
                    required
                  />
                  {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div>  */}
                </div>
                <div className="flex flex-col flex-1 space-y-1 mt-2">
                  <label htmlFor="last-name" className="text-lg">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last_name"
                    ref={input=>this.last_name=input}
                    className="px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none"
                    placeholder="Your last name"
                    required
                  />
                  {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
                </div>
              </div>
              <div className="flex flex-col space-y-1 mt-2">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  ref={input=>this.email=input}
                  className="px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none"
                  placeholder="your@email.com"
                  required
                />
                {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex flex-col flex-1 space-y-1 mt-2">
                  <label htmlFor="password" className="text-lg">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    ref={input=>this.password=input}
                    className="px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none"
                    placeholder="Your Password"
                    required
                  />
                  {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
                </div>
                <div className="flex flex-col flex-1 space-y-1 mt-2">
                  <label htmlFor="password2" className="text-lg">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    ref={input=>this.password2=input}
                    className="px-3 py-2 border text-gray-700 focus:ring-2 shadow-md outline-none"
                    placeholder="Your Password Confirmation"
                    required
                  />
                  {/* <div className="border px-3 py-1 border-red-200 bg-red-200 text-red-800">Error</div> */}
                </div>
              </div>
              <button className="py-2 mt-4 bg-black font-bold text-white focus:ring-2 border-none hover:bg-gray-800">
                Sign Up
              </button>
            </form>
            <footer className="text-sm space-y-2 mt-6 text-center">
              <p>
                Already have an account?
                <Link to='/'
                  className="underline font-semibold hover:text-blue-800"
                  href="#"
                >
                  Sign In
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </section>
    );
  }
}

// allow us to call this.props.auth || this.props.errors
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {signUpUser},
)(withRouter(SignUp));
