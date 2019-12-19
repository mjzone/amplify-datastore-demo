import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodoComponent from "./components/todo-component";
import PageNotFound from "./components/page-not-found";
import "./App.css";

// import Auth from "@aws-amplify/auth";
// import API from "@aws-amplify/api";
// import awsconfig from "./aws-exports";
// import { withAuthenticator } from "aws-amplify-react";
// Auth.configure(awsconfig);
// API.configure(awsconfig);
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={TodoComponent} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

// export default withAuthenticator(App);

export default App;
