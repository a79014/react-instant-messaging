import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

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

ReactDOM.render(<div>Hello world</div>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
