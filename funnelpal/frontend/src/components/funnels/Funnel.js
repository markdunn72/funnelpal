import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFunnel, deleteFunnel } from "../../actions/funnels";

export class Funnel extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="mt-5">Funnel</h1>
      </Fragment>
    );
  }
}

export default Funnel;
