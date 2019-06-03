import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { Route, BrowserRouter as Router } from "react-router-dom";

import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";
import DashboardComponent from "./dashboard/dashboard";

const firebase = require("firebase");
require("firebase/firestore");

// !!!!! TODO HIDE API KEY
firebase.initializeApp({
  apiKey: "AIzaSyCjQgeIpqDE0dZ4RQ_YXAS_KOiiSPkm96k",
  authDomain: "im-tutorial-f512c.firebaseapp.com",
  databaseURL: "https://im-tutorial-f512c.firebaseio.com",
  projectId: "im-tutorial-f512c",
  storageBucket: "im-tutorial-f512c.appspot.com",
  messagingSenderId: "107640184944",
  appId: "1:107640184944:web:a1cf02cdd0dd0c98"
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={LoginComponent} />
      <Route path="/signup" component={SignupComponent} />
      <Route path="/dashboard" component={DashboardComponent} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
