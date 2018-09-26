import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { signup } from '../../actions';

import './style.scss';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  onSubmit(formProps) {
    this.props.signup(formProps, this.redirect());
    this.setState({
      open: true
    });
    this.props.reset();
  }

  dropDown() {
    const { errorMessage } = this.props;
    const message = errorMessage.length === 0 ? 'Welcome Back!' : errorMessage;
    const color = errorMessage.length === 0 ? '#30cd9a' : '#f68f7c';
    return (
      <div className="drop-down" style={{ backgroundColor: color }}>
        { message }
      </div>
    );
  }

  redirect() {
    setTimeout(() => {
      this.props.history.push('/dashboard');
    }, 1000);
  }

  render() {
    return (
      <div className="signup-page">
        {
          this.state.open ? this.dropDown() : null
        }
        <div className="signup-header">
          <h5>
            Sign Up
          </h5>
        </div>
        <div className="signup-icon">
          <FaUserPlus />
        </div>
        <div className="signup-form">
          <form
            id="signup-form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <div className="form-input">
              <label htmlFor="firstName">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                component="input"
                placeholder="First Name"
              />
            </div>

            <div className="form-input">
              <label htmlFor="lastName">
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                component="input"
                placeholder="Last Name"
              />
            </div>

            <div className="form-input">
              <label htmlFor="email">
                E-mail
              </label>
              <Field
                name="email"
                type="text"
                component="input"
                placeholder="E-mail"
              />
            </div>

            <div className="form-input">
              <label htmlFor="firstName">
                Password
              </label>
              <Field
                name="password"
                type="password"
                component="input"
                placeholder="Password"
              />
            </div>

            <button type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

const mapDispatchProps = dispatch => ({
  signup: (formProps, callback) => dispatch(signup(formProps, callback)),
});

export default compose(
  connect(mapStateToProps, mapDispatchProps),
  reduxForm({ form: 'signup' }),
  withRouter
)(SignupForm);
