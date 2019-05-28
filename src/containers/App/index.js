import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorToast from "../../components/ErrotToast";
import { actions as appActions, getError } from "../../redux/modules/app";

import Home from "../Home";

// react-slick 样式
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  render(){
    const { error, appActions:{clearError} } = this.props;
    return (
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </Router>
          {
            error ? <ErrorToast msg={error} clearError={clearError} /> : null
          }
        </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state)
  }
};

const mapDispatchToProps =(dispatch) => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
