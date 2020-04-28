import React, { Component, Fragment, createRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getFunnel, deleteFunnel } from "../../actions/funnels";
import Editable from "./Editable";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

export class Funnel extends Component {
  state = {
    task: "",
    setTask: "",
    description: "",
    setDescription: "",
    activeItem: "1",
    optin_h1: "",
    optin_h2: "",
    optin_p: "",
    optin_btn: "",
    landing_h1: "",
    landing_h2: "",
    landing_p: "",
  };

  static propTypes = {
    funnel: PropTypes.object.isRequired,
    getFunnel: PropTypes.func.isRequired,
    deleteFunnel: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const url = window.location.href;
    const url_arr = url.split("/");
    const id = url_arr.pop();
    this.props.getFunnel(id); // getFunnel is async and will populate this.props.funnel with data

    this.setState({ optin_h1: this.props.funnel.optinpage.h1 }); // Cannot perform as this.props.funnel === {}
  }

  toggle = (tab) => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const funnel = this.props.funnel;

    if (funnel === {}) {
      return null;
    }

    const inputRef = createRef();

    return (
      <Fragment>
        <h1 className="mt-5">Funnel: {funnel.name}</h1>

        <MDBContainer className="mb-4">
          <MDBNav tabs color="light-blue">
            <MDBNavItem>
              <MDBNavLink
                link
                to="#"
                active={this.state.activeItem === "1"}
                onClick={this.toggle("1")}
                role="tab"
              >
                <MDBIcon fas icon="user-plus" /> Opt-In Page
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                link
                to="#"
                active={this.state.activeItem === "2"}
                onClick={this.toggle("2")}
                role="tab"
              >
                <MDBIcon fas icon="handshake" /> Welcome Page
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBTabContent className="card" activeItem={this.state.activeItem}>
            <MDBTabPane tabId="1" role="tabpanel">
              <MDBCard
                className="card-image"
                style={{
                  backgroundImage:
                    "url('https://mdbootstrap.com/img/Photos/Horizontal/Work/8-col/img%20%2814%29.jpg')",
                  mx: "auto",
                }}
              >
                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                  <MDBCardBody>
                    <OptInForm
                      h1={this.state.optin_h1}
                      h2={this.state.optin_h2}
                      p={this.state.optin_p}
                      btn={this.state.optin_btn}
                      onChange={this.onChange}
                      inputRef={inputRef}
                    />
                  </MDBCardBody>
                </div>
              </MDBCard>
            </MDBTabPane>
            <MDBTabPane tabId="2" role="tabpanel"></MDBTabPane>
          </MDBTabContent>
        </MDBContainer>
      </Fragment>
    );
  }
}

class OptInForm extends Component {
  render() {
    return (
      <Fragment>
        <MDBCardTitle>
          <Editable
            text={this.props.h1}
            childRef={this.props.inputRef}
            type="input"
          >
            <input
              ref={this.props.inputRef}
              type="text"
              name="optin_h1"
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              text={this.props.h1}
              value={this.props.h1}
              onChange={this.props.onChange}
              style={{
                backgroundColor: "transparent",
              }}
            />
          </Editable>
        </MDBCardTitle>
        <MDBCardTitle>{this.props.h2}</MDBCardTitle>
        <MDBCardText>
          <p>{this.props.p}</p>
        </MDBCardText>
        <MDBInput
          label="Email Address"
          type="email"
          className="text-white"
        ></MDBInput>
        <MDBBtn href="#">{this.props.btn}</MDBBtn>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  funnel: state.funnels.funnel,
});

export default withRouter(
  connect(mapStateToProps, { getFunnel, deleteFunnel })(Funnel)
);
