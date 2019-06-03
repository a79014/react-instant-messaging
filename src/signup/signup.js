import React from "react";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "./styles";

const firebase = require("firebase");

class SignupComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: ""
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up now!
          </Typography>
          <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input" />
              Enter your email
              <Input
                onChange={e => this.userTyping("email", e)}
                autoComplete="email"
                autoFocus
                id="signup-email-input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">Password</InputLabel>
              <Input
                type="password"
                id="signup-password-input"
                onChange={e => this.userTyping("password", e)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirm password
              </InputLabel>
              <Input
                type="password"
                id="signup-password-confirmation"
                onChange={e => this.userTyping("passwordConfirmation", e)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          {this.state.signupError ? (
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              {this.state.signupError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            variant="h6"
            className={classes.hasAccountHeader}
          >
            Already have an account?
          </Typography>
          <Link className={classes.logInLink} to="/login">
            Login!
          </Link>
        </Paper>
      </main>
    );
  }

  formIsValid = () => {
    return this.state.password === this.state.passwordConfirmation;
  };

  submitSignup = e => {
    e.preventDefault();
    if (!this.formIsValid()) {
      this.setState({ signupError: "The passwords do not match" });
      return;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          authRes => {
            const userObj = {
              email: authRes.user.email
            };
            firebase
              .firestore()
              .collection("users")
              .doc(this.state.email)
              .set(userObj)
              .then(
                () => {
                  this.props.history.push("/dashboard");
                },
                dbError => {
                  console.log(dbError);
                  this.setState({ signupError: "Failed to add user" });
                }
              );
          },
          authError => {
            console.log(authError);
            this.setState({ signupError: "Failed to add user" });
          }
        );
    }
  };

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "passwordConfirmation":
        this.setState({ passwordConfirmation: e.target.value });
        break;
      default:
        break;
    }
  };
}

export default withStyles(styles)(SignupComponent);
