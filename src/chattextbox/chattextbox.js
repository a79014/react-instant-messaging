import React from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

class ChatTextBoxComponent extends React.Component {
  userTyping = e => {
    e.keyCode === 13
      ? this.sendMessage()
      : this.setState({ chatText: e.target.value });
  };

  userClickedInput = () => {
    console.log("user clicked new chat box");
  };

  validateMessage = txt => {
    const isValid = txt.length > 0 && txt.replace(/\s/g, "").length > 0;
    return isValid;
  };

  sendMessage = () => {
    if (this.validateMessage(this.state.chatText)) {
      this.props.sendMessageFn(this.state.chatText);
      document.getElementById("chattextbox").value = "";
      this.setState({ chatText: "" });
    }
  };

  constructor() {
    super();
    this.state = {
      chatText: ""
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.chatTextBoxContainer}>
        <TextField
          placeholder="Type a message"
          onKeyUp={e => this.userTyping(e)}
          id="chattextbox"
          className={classes.chatTextBox}
          onFocus={this.userClickedInput}
        />
        <Send onClick={this.sendMessage} className={classes.sendBtn} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatTextBoxComponent);
