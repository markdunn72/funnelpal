import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createFunnel } from "../../actions/funnels";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput,
} from "mdbreact";

export class Form extends Component {
  state = {
    currentStep: 1,
    name: "",
    optin_h1: "",
    optin_h2: "",
    optin_p: "",
    optin_btn: "",
    landing_h1: "",
    landing_h2: "",
    landing_p: "",
  };

  static propTypes = {
    createFunnel: PropTypes.func.isRequired,
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  get previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <MDBBtn className="btn deep-purple" onClick={this._prev}>
          <MDBIcon fas icon="angle-left" className="ml-2" />
          Previous
        </MDBBtn>
      );
    }
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <MDBBtn className="btn deep-purple" onClick={this._next}>
          Next
          <MDBIcon fas icon="angle-right" className="ml-2" />
        </MDBBtn>
      );
    }
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;
    if (currentStep === 3) {
      return (
        <MDBBtn className="btn peach-gradient" type="submit">
          Submit
          <MDBIcon far icon="paper-plane" className="ml-2" />
        </MDBBtn>
      );
    }
  }

  get formHeader() {
    let currentStep = this.state.currentStep;
    switch (currentStep) {
      case 1:
        return (
          <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
            Create a Funnel
          </h3>
        );
      case 2:
        return (
          <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
            Create an Opt-In Page
          </h3>
        );
      case 3:
        return (
          <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
            Create a Welcome Page
          </h3>
        );
      default:
        return;
    }
  }

  onEnterNext = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      let currentStep = this.state.currentStep;
      currentStep++;
      this.setState({
        currentStep: currentStep,
      });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      optin_h1,
      optin_h2,
      optin_p,
      optin_btn,
      landing_h1,
      landing_h2,
      landing_p,
    } = this.state;
    const funnel = {
      name,
      optinpage: { h1: optin_h1, h2: optin_h2, p: optin_p, btn: optin_btn },
      landingpage: { h1: landing_h1, h2: landing_h2, p: landing_p },
    };
    this.props.createFunnel(funnel);
    this.props.history.push("/");
  };

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="mt-4">
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  {this.formHeader}
                </MDBRow>
              </div>
              <MDBCardBody>
                <form onSubmit={this.onSubmit}>
                  <FunnelForm
                    currentStep={this.state.currentStep}
                    onKeyPress={this.onEnterNext}
                    onChange={this.onChange}
                    name={this.state.name}
                  />
                  <OptInForm
                    currentStep={this.state.currentStep}
                    onKeyPress={this.onEnterNext}
                    onChange={this.onChange}
                    h1={this.state.optin_h1}
                    h2={this.state.optin_h2}
                    p={this.state.optin_p}
                    btn={this.state.optin_btn}
                  />
                  <LandingForm
                    currentStep={this.state.currentStep}
                    onChange={this.onChange}
                    h1={this.state.landing_h1}
                    h2={this.state.landing_h2}
                    p={this.state.landing_p}
                  />
                  <div className="text-center py-4 mt-3">
                    {this.previousButton}
                    {this.nextButton}
                    {this.submitButton}
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

class FunnelForm extends Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }

    return (
      <MDBInput
        label="Funnel name"
        type="text"
        name="name"
        id="defaultFormCardNameEx"
        className="form-control"
        onKeyPress={this.props.onKeyPress}
        onChange={this.props.onChange}
        value={this.props.name}
      />
    );
  }
}

class OptInForm extends Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <Fragment>
        <MDBInput
          label="Heading"
          type="text"
          name="optin_h1"
          id="defaultFormCardNameEx"
          className="form-control"
          onKeyPress={this.props.onKeyPress}
          onChange={this.props.onChange}
          value={this.props.h1}
        />
        <br />
        <MDBInput
          label="Sub-heading"
          type="text"
          name="optin_h2"
          id="defaultFormCardNameEx"
          className="form-control"
          onKeyPress={this.props.onKeyPress}
          onChange={this.props.onChange}
          value={this.props.h2}
        />
        <br />
        <MDBInput
          label="Paragraph"
          type="text"
          name="optin_p"
          id="defaultFormCardNameEx"
          className="form-control"
          onKeyPress={this.props.onKeyPress}
          onChange={this.props.onChange}
          value={this.props.p}
        />
        <br />
        <MDBInput
          label="Opt-in button"
          type="text"
          name="optin_btn"
          id="defaultFormCardNameEx"
          className="form-control"
          onKeyPress={this.props.onKeyPress}
          onChange={this.props.onChange}
          value={this.props.btn}
        />
      </Fragment>
    );
  }
}

class LandingForm extends Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    return (
      <Fragment>
        <MDBInput
          label="Heading 1"
          type="text"
          name="landing_h1"
          id="defaultFormCardNameEx"
          className="form-control"
          onChange={this.props.onChange}
          value={this.props.h1}
        />
        <br />
        <MDBInput
          label="Sub-heading"
          type="text"
          name="landing_h2"
          id="defaultFormCardNameEx"
          className="form-control"
          onChange={this.props.onChange}
          value={this.props.h2}
        />
        <br />
        <MDBInput
          label="Paragraph"
          type="text"
          name="landing_p"
          id="defaultFormCardNameEx"
          className="form-control"
          onChange={this.props.onChange}
          value={this.props.p}
        />
      </Fragment>
    );
  }
}

export default connect(null, { createFunnel })(Form);
