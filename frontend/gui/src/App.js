import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import "antd/dist/antd.css";
import { connect } from "react-redux";

import { authCheckState } from "./store/actions/authActions";
import CustomLayout from "./containers/Layout";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
