import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

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

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({
      ...this.state,
      password: "",
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { username, password } = this.state;
    return (
      <MDBContainer className="mt-5 mb-5">
        <MDBRow>
          <MDBCol md="6 m-auto">
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log In</h3>
                </MDBRow>
              </div>
              <MDBCardBody className="mx-4 mt-4">
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
                    label="Your password"
                    group
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    validate
                    containerClass="mb-0"
                  />
                  <p className="font-small grey-text d-flex justify-content-end">
                    Forgot
                    <a
                      href="#!"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Password?
                    </a>
                  </p>
                  <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      gradient="peach"
                      type="submit"
                      className="btn-block z-depth-2"
                    >
                      Log in
                    </MDBBtn>
                  </div>
                  <p className="font-small grey-text d-flex justify-content-center">
                    Don't have an account?
                    <a
                      href="/register"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Sign up
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

export default connect(mapStateToProps, { login })(Login);
