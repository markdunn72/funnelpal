import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { MDBContainer } from "mdbreact";

import Header from "./layout/MDBHeader";
import Dashboard from "./funnels/Dashboard";
import Funnel from "./funnels/Funnel";
import Form from "./funnels/Form";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// Alert options
const alertOptions = {
  timeout: 3000,
  position: "bottom center",
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <MDBContainer className="pt-5">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />} />
                  <PrivateRoute exact path="/create-funnel" component={Form} />
                  <PrivateRoute exact path="/funnels/:id" component={Funnel} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </MDBContainer>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
