import React, { Component } from "react";

import { MDBNavLink } from "mdbreact";

export class CustomNavLink extends MDBNavLink {
  state = {
    ...super.state,
    isHovering: false,
  };

  onHover() {
    super.onHover();
    // show settings
  }

  render() {
    return <div></div>;
  }
}

export default CustomNavLink;
