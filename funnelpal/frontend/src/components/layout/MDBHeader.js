import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import {
  MDBContainer,
  MDBNavbar,
  MDBSideNav,
  MDBSideNavNav,
  MDBSideNavCat,
  MDBSideNavItem,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBLink,
} from "mdbreact";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStateA: false,
      breakWidth: 1300,
      windowWidth: 0,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () =>
    this.setState({
      windowWidth: window.innerWidth,
    });

  handleToggleClickA = () => {
    this.setState({
      toggleStateA: !this.state.toggleStateA,
    });
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <MDBNavItem>
          <MDBNavLink to="#!">
            <MDBIcon far icon="user" className="d-inline-inline" />{" "}
            <div className="d-none d-md-inline">Account</div>
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="" onClick={this.props.logout}>
            <MDBIcon icon="sign-out-alt" className="d-inline-inline" />{" "}
            <div className="d-none d-md-inline">Logout</div>
          </MDBNavLink>
        </MDBNavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <MDBNavItem>
          <MDBNavLink to="/register">
            <div className="d-none d-md-inline">Register</div>
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/login">
            <div className="d-none d-md-inline">Login</div>
          </MDBNavLink>
        </MDBNavItem>
      </Fragment>
    );

    const sideNavToggle = (
      <MDBNavItem>
        <div
          onClick={this.handleToggleClickA}
          key="sideNavToggleA"
          style={{
            lineHeight: "32px",
            marginRight: "1em",
            verticalAlign: "middle",
          }}
        >
          <MDBIcon icon="bars" color="white" size="2x" />
        </div>
      </MDBNavItem>
    );

    const navStyle = {
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? "210px" : "16px",
    };

    const mainStyle = {
      margin: "0 6%",
      paddingTop: "5.5rem",
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? "240px" : "0",
    };

    const specialCaseNavbarStyles = {
      WebkitBoxOrient: "horizontal",
      flexDirection: "row",
    };

    return (
      <div className="fixed-sn light-blue-skin mb-4">
        <MDBSideNav
          logo="https://i.ibb.co/xf577Vg/blue-logo-funnelpal-white-text.png"
          triggerOpening={this.state.toggleStateA}
          breakWidth={this.state.breakWidth}
          mask="strong"
          fixed
        >
          <li>
            <ul className="social">
              <li>
                <a href="#!">
                  <MDBIcon fab icon="facebook" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <MDBIcon fab icon="pinterest" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <MDBIcon fab icon="google-plus-g" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <MDBIcon fab icon="twitter" />
                </a>
              </li>
            </ul>
          </li>
          <MDBSideNavNav>
            <MDBSideNavCat name="Funnels" id="funnel-cat" icon="funnel-dollar">
              <MDBSideNavItem>Dashboard</MDBSideNavItem>
              <MDBSideNavItem to="/create-funnel">Create funnel</MDBSideNavItem>
            </MDBSideNavCat>
            <MDBSideNavCat name="Tools" id="tools-cat" icon="tools">
              <MDBSideNavItem>Analytics</MDBSideNavItem>
              <MDBSideNavItem>User data</MDBSideNavItem>
            </MDBSideNavCat>
            <MDBSideNavCat
              iconRegular
              name="Tutorials"
              id="tutorial-cat"
              icon="hand-pointer"
            >
              <MDBSideNavItem>Creating funnels</MDBSideNavItem>
              <MDBSideNavItem>Managing funnels</MDBSideNavItem>
            </MDBSideNavCat>
          </MDBSideNavNav>
        </MDBSideNav>
        <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
          <MDBNavbarBrand href="/">
            {isAuthenticated ? (
              ""
            ) : (
              <img
                src="https://i.ibb.co/xf577Vg/blue-logo-funnelpal-white-text.png"
                className="img-fluid"
                alt=""
                width="150px"
              />
            )}
          </MDBNavbarBrand>
          <MDBNavbarNav left>
            {isAuthenticated ? sideNavToggle : ""}
            <MDBNavItem
              className="d-none d-md-inline"
              style={{ paddingTop: 5 }}
            ></MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav right style={specialCaseNavbarStyles}>
            {isAuthenticated ? authLinks : guestLinks}
          </MDBNavbarNav>
        </MDBNavbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
