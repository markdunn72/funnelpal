import React, { Component, Fragment, createRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { CompactPicker } from "react-color";

import { returnErrors } from "../../actions/messages";
import { tokenConfig } from "../../actions/auth";

import { getFunnel, updateFunnel, deleteFunnel } from "../../actions/funnels";
import Editable from "./Editable";

import store from "../../store";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBInput,
  MDBRangeInput,
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
    funnel: {},
    task: "",
    setTask: "",
    description: "",
    setDescription: "",
    activeItem: "1",
    showSettings: false,
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
    updateFunnel: PropTypes.func.isRequired,
    deleteFunnel: PropTypes.func.isRequired,
  };

  async loadFunnel() {
    const url = window.location.href;
    const url_arr = url.split("/");
    const id = url_arr.pop();

    await axios
      .get(`/api/funnels/${id}`, tokenConfig(store.getState))
      .then((res) => {
        const funnel = res.data;
        this.setState({ funnel });
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );

    this.setState({
      optin_h1: this.state.funnel.optinpage.h1,
      optin_h2: this.state.funnel.optinpage.h2,
      optin_p: this.state.funnel.optinpage.p,
      optin_btn: this.state.funnel.optinpage.btn,
      optin_bgcolor: this.state.funnel.optinpage.settings.bgcolor,
      optin_cardbgcolor: this.state.funnel.optinpage.settings.cardbgcolor,
      optin_cardwidth: this.state.funnel.optinpage.settings.cardwidth,
      landing_h1: this.state.funnel.landingpage.h1,
      landing_h2: this.state.funnel.landingpage.h2,
      landing_p: this.state.funnel.landingpage.p,
      landing_bgcolor: this.state.funnel.landingpage.settings.bgcolor,
      landing_cardbgcolor: this.state.funnel.landingpage.settings.cardbgcolor,
      landing_cardwidth: this.state.funnel.landingpage.settings.cardwidth,
    });
  }

  async componentDidMount() {
    this.loadFunnel();
  }

  toggle = (tab) => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onBlur = () => {
    const {
      optin_h1,
      optin_h2,
      optin_p,
      optin_btn,
      landing_h1,
      landing_h2,
      landing_p,
    } = this.state;
    const funnel = {
      optinpage: {
        h1: optin_h1,
        h2: optin_h2,
        p: optin_p,
        btn: optin_btn,
        settings: this.state.funnel.optinpage.settings,
      },
      landingpage: {
        h1: landing_h1,
        h2: landing_h2,
        p: landing_p,
        settings: this.state.funnel.landingpage.settings,
      },
    };
    this.props.updateFunnel(funnel, this.state.funnel.id);
  };

  toggleSettings = () => {
    this.setState((prevState) => ({
      showSettings: !prevState.showSettings,
    }));
    this.loadFunnel();
  };

  updateOptInSettings = (settings) => {
    const funnel = {
      ...this.state.funnel,
      optinpage: {
        ...this.state.funnel.optinpage,
        settings: {
          id: this.state.funnel.optinpage.settings.id,
          bgcolor: settings.bgcolor,
          cardbgcolor: settings.cardbgcolor,
          cardwidth: settings.cardwidth,
        },
      },
    };
    this.props.updateFunnel(funnel, this.state.funnel.id);
  };

  updateLandingSettings = (settings) => {
    const funnel = {
      ...this.state.funnel,
      landingpage: {
        ...this.state.funnel.landingpage,
        settings,
      },
    };

    this.props.updateFunnel(funnel, this.state.funnel.id);
  };

  render() {
    const funnel = this.props.funnel;

    if (funnel === {}) {
      return null;
    }

    const inputRef = createRef();

    const SettingsButton = ({ handleClick, isActive }) => {
      const [isHovering, setHovering] = useState(false);

      const handleMouseEnter = () => setHovering(true);
      const handleMouseLeave = () => setHovering(false);

      const getClassName = () => {
        var className = "float-right mt-1";
        if (isActive) className = `${className} orange-text`;
        if (isHovering) className = `${className} black-text`;

        return className;
      };

      return (
        <Fragment>
          <MDBIcon
            fas
            icon="cog"
            className={getClassName()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          />
        </Fragment>
      );
    };

    const { showSettings } = this.state;

    return (
      <Fragment>
        <h1 className="text-center my-4 underline">{this.state.funnel.name}</h1>

        <MDBContainer className="mb-4">
          <MDBNav pills color="indigo" className="nav-justified">
            <MDBNavItem>
              <MDBNavLink
                link
                to="#"
                active={this.state.activeItem === "1"}
                onClick={this.toggle("1")}
                role="tab"
              >
                <MDBIcon fas icon="user-plus" /> Opt-In Page
                {this.state.activeItem === "1" ? (
                  <SettingsButton
                    handleClick={this.toggleSettings}
                    isActive={this.state.showSettings}
                  />
                ) : (
                  ""
                )}
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
                {this.state.activeItem === "2" ? (
                  <SettingsButton handleClick={this.toggleSettings} />
                ) : (
                  ""
                )}
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBTabContent className="card" activeItem={this.state.activeItem}>
            <MDBTabPane tabId="1" role="tabpanel">
              <MDBCardBody>
                {!showSettings ? (
                  <OptInForm
                    h1={this.state.optin_h1}
                    h2={this.state.optin_h2}
                    p={this.state.optin_p}
                    btn={this.state.optin_btn}
                    bgcolor={this.state.optin_bgcolor}
                    cardbgcolor={this.state.optin_cardbgcolor}
                    cardwidth={this.state.optin_cardwidth}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    inputRef={inputRef}
                  />
                ) : (
                  <OptInSettingsForm
                    funnel={this.state.funnel}
                    updateSettings={this.updateOptInSettings}
                  />
                )}
              </MDBCardBody>
            </MDBTabPane>
            <MDBTabPane tabId="2" role="tabpanel">
              <MDBCard
                className="card-image"
                style={{
                  backgroundColor: "#fff",
                }}
              >
                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                  <MDBCardBody>
                    <LandingForm
                      h1={this.state.landing_h1}
                      h2={this.state.landing_h2}
                      p={this.state.landing_p}
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      inputRef={inputRef}
                    />
                  </MDBCardBody>
                </div>
              </MDBCard>
            </MDBTabPane>
          </MDBTabContent>
        </MDBContainer>
      </Fragment>
    );
  }
}

class OptInForm extends Component {
  state = {
    isHovered: {},
    settings: {},
  };

  handleMouseEnter = (index) => {
    this.setState((prevState) => {
      return { isHovered: { ...prevState.isHovered, [index]: true } };
    });
  };

  handleMouseLeave = (index) => {
    this.setState((prevState) => {
      return { isHovered: { ...prevState.isHovered, [index]: false } };
    });
  };

  bgColor = () => {
    if (this.props.bgcolor === undefined) return "#fff";
    return this.props.bgcolor;
  };

  cardBgColor = () => {
    if (this.props.cardbgcolor === undefined) return "#fff";
    return this.props.cardbgcolor;
  };

  cardWidth = () => {
    if (this.props.cardwidth === undefined) return 6;
    return this.props.cardwidth / 10;
  };

  render() {
    return (
      <div
        style={{
          backgroundImage:
            "url('http://mdbootstrap.com/img/Photos/Others/images/91.jpg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <MDBRow center>
          <MDBCol className={`col-${this.cardWidth()} text-center py-5`}>
            <MDBCard
              style={{
                backgroundColor: this.cardBgColor(),
              }}
            >
              <MDBCardBody style={{ opacity: "1.0" }}>
                <MDBCardTitle>
                  <Editable
                    text={this.props.h1}
                    childRef={this.props.inputRef}
                    type="input"
                    onBlur={this.props.onBlur}
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
                        position: "relative",
                      }}
                    />
                  </Editable>
                </MDBCardTitle>
                <MDBCardTitle>
                  <Editable
                    text={this.props.h2}
                    childRef={this.props.inputRef}
                    type="input"
                    onBlur={this.props.onBlur}
                  >
                    <input
                      ref={this.props.inputRef}
                      type="text"
                      name="optin_h2"
                      className="text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                      text={this.props.h2}
                      value={this.props.h2}
                      onChange={this.props.onChange}
                      style={{
                        backgroundColor: "transparent",
                      }}
                    />
                  </Editable>
                </MDBCardTitle>
                <MDBCardText>
                  <Editable
                    text={this.props.p}
                    childRef={this.props.inputRef}
                    type="input"
                    onBlur={this.props.onBlur}
                  >
                    <textarea
                      ref={this.props.inputRef}
                      type="text"
                      name="optin_p"
                      className="text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                      text={this.props.p}
                      value={this.props.p}
                      onChange={this.props.onChange}
                      style={{
                        backgroundColor: "transparent",
                      }}
                    />
                  </Editable>
                </MDBCardText>
                <MDBInput
                  label="Email Address"
                  type="email"
                  className="text-white"
                ></MDBInput>
                <MDBBtn href="#">{this.props.btn}</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

class OptInSettingsForm extends Component {
  state = {
    bgcolor: "",
    cardbgcolor: "",
    cardwidth: 0,
  };

  componentDidMount() {
    this.setState((state, props) => ({
      bgcolor: props.funnel.optinpage.settings.bgcolor,
      cardbgcolor: props.funnel.optinpage.settings.cardbgcolor,
      cardwidth: props.funnel.optinpage.settings.cardwidth,
    }));
  }

  handleChangeCompleteBg = (color) => {
    this.setState({ bgcolor: color.hex });
    this.props.updateSettings(this.state);
  };

  handleChangeCompleteBgCard = (color) => {
    this.setState({ cardbgcolor: color.hex });
    this.props.updateSettings(this.state);
  };

  handleChangeCompleteCardWidth = (e) => {
    console.log(e.target.value);
    this.setState({ cardwidth: e.target.value });
    this.props.updateSettings(this.state);
  };

  render() {
    return (
      <div>
        <h3>Opt-In Page Settings</h3>
        <hr />
        <label>Background Color:</label>
        <br />
        <CompactPicker
          id="bg-color"
          name="bgcolor"
          color={this.state.bgcolor}
          onChangeComplete={this.handleChangeCompleteBg}
        />
        <br />
        <hr />
        <label>Card Width (%):</label>
        <MDBRangeInput
          id="card-width"
          min={20}
          max={100}
          value={this.state.cardwidth}
          step={20}
          onChange={this.handleChangeCompleteCardWidth}
        ></MDBRangeInput>
        <label>Card Background Color:</label>
        <br />
        <CompactPicker
          id="card-bg-color"
          name="cardbgcolor"
          color={this.state.cardbgcolor}
          onChangeComplete={this.handleChangeCompleteBgCard}
        />
        <br />
      </div>
    );
  }
}

class LandingForm extends Component {
  render() {
    return (
      <Fragment>
        <MDBCardTitle>
          <Editable
            text={this.props.h1}
            childRef={this.props.inputRef}
            type="input"
            onBlur={this.props.onBlur}
          >
            <input
              ref={this.props.inputRef}
              type="text"
              name="landing_h1"
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
        <MDBCardTitle>
          <Editable
            text={this.props.h2}
            childRef={this.props.inputRef}
            type="input"
            onBlur={this.props.onBlur}
          >
            <input
              ref={this.props.inputRef}
              type="text"
              name="landing_h2"
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              text={this.props.h2}
              value={this.props.h2}
              onChange={this.props.onChange}
              style={{
                backgroundColor: "transparent",
              }}
            />
          </Editable>
        </MDBCardTitle>
        <MDBCardText>
          <Editable
            text={this.props.p}
            childRef={this.props.inputRef}
            type="input"
            onBlur={this.props.onBlur}
          >
            <textarea
              ref={this.props.inputRef}
              type="text"
              name="landing_p"
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              text={this.props.p}
              value={this.props.p}
              onChange={this.props.onChange}
              style={{
                backgroundColor: "transparent",
              }}
            />
          </Editable>
        </MDBCardText>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  funnel: state.funnels.funnel,
});

export default withRouter(
  connect(mapStateToProps, { getFunnel, updateFunnel, deleteFunnel })(Funnel)
);
