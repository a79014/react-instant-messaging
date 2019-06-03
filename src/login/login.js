import { Link } from "react-router-dom";
import React from "react";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const firebase = require("firebase");

class LoginComponent extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            <form className={classes.form} onSubmit={e => this.submitLogin(e)}>
              <FormControl required fullwidth margin="normal">
                <InputLabel htmlFor="login-email-input">E-mail</InputLabel>
                <Input
                  autoComplete="email"
                  autoFocus
                  id="login-email-input"
                  onChange={e => this.userIsTyping("email", e)}
                />
              </FormControl>
              <FormControl required fullwidth margin="normal">
                <InputLabel htmlFor="login-password-input">Password</InputLabel>
                <Input
                  id="login-password-input"
                  onChange={e => this.userIsTyping("password", e)}
                  type="password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </Typography>
        </Paper>
      </main>
    );
  }

  submitLogin = e => {};

  userIsTyping = (type, e) => {};
}

export default withStyles(styles)(LoginComponent);
