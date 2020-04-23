import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBLink,
} from "mdbreact";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;

    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = { username, password, email };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/"></Redirect>;
    }

    const { username, email, password, password2 } = this.state;
    return (
      <MDBContainer className="mt-5 mb-5">
        <MDBRow>
          <MDBCol md="6 m-auto">
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                    Sign up
                  </h3>
                </MDBRow>
              </div>
              <MDBCardBody className="mx-4 mt-4 mb-4">
                <form onSubmit={this.onSubmit}>
                  <MDBInput
                    label="Your username"
                    group
                    type="text"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                    validate
                  />
                  <MDBInput
                    label="Your email"
                    group
                    type="text"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    validate
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    validate
                    containerClass="mb-0"
                  />
                  <MDBInput
                    label="Confirm password"
                    group
                    type="password"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                    validate
                    containerClass="mb-0"
                  />
                  <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      gradient="peach"
                      type="submit"
                      className="btn-block z-depth-2"
                    >
                      Sign up
                    </MDBBtn>
                  </div>
                  <p className="font-small grey-text d-flex justify-content-center">
                    Already have an account?
                    <a
                      href="/login"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Log in
                    </a>
                  </p>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
