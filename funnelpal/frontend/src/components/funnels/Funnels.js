import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFunnels, deleteFunnel } from "../../actions/funnels";

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

export class Funnels extends Component {
  static propTypes = {
    funnels: PropTypes.array.isRequired,
    getFunnels: PropTypes.func.isRequired,
    deleteFunnel: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFunnels();
  }

  goToFunnel = (id) => {
    this.props.history.push(`/funnels/${id}`);
  };

  deleteFunnel = (e) => {
    e.stopPropagation();
    const id = e.target.parentNode.id;
    this.props.deleteFunnel(id);
  };

  render() {
    const columns = [
      {
        label: "ID",
        field: "id",
        sort: "asc",
      },
      {
        label: "Funnel name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Opt-in page",
        field: "opt in page",
        sort: "asc",
      },
      {
        label: "Landing page",
        field: "landing page;",
        sort: "asc",
      },
    ];

    const rowStyle = {
      cursor: "pointer",
    };

    return (
      <Fragment>
        <MDBTable btn striped hover>
          <MDBTableHead columns={columns} />
          <MDBTableBody>
            {this.props.funnels.map((funnel) => (
              <tr
                key={funnel.id}
                style={rowStyle}
                onClick={() => this.goToFunnel(funnel.id)}
              >
                <td>{funnel.id}</td>
                <td>{funnel.name}</td>
                <td>{funnel.optinpage.h1}</td>
                <td>{funnel.landingpage.h1}</td>
                <td id={funnel.id}>
                  <MDBBtn onClick={this.deleteFunnel} color="red" size="sm">
                    <MDBIcon fas icon="trash-alt" />
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  funnels: state.funnels.funnels,
});

export default withRouter(
  connect(mapStateToProps, { getFunnels, deleteFunnel })(Funnels)
);
