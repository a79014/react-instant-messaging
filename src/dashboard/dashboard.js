import React from "react";
import ChatListComponent from "../chatlist/chatlist";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";

import ChatViewComponent from "../chatview/chatview";
import ChatTextBoxComponent from "../chattextbox/chattextbox";
const firebase = require("firebase");

class DashboardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: []
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if (!_usr) {
        this.props.history.push("/login");
      } else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _usr.email,
              chats: chats
            });
            console.log(this.state);
          });
      }
    });
  };

  newChatBtnClicked = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  selectChat = async chatIndex => {
    console.log("index: ", chatIndex);
    await this.setState({ selectedChat: chatIndex });
    this.messageRead();
  };

  buildDocKey = friend => {
    return [this.state.email, friend].sort().join(":");
  };

  messageRead = () => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        _usr => _usr !== this.state.email
      )[0]
    );
    if (this.clickedChatWhereNotSender(this.state.selectedChat)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log("clicked message where the user was the sender");
    }
  };

  clickedChatWhereNotSender = chatIndex => {
    return (
      this.state.chats[chatIndex].messages[
        this.state.chats[chatIndex].messages.length - 1
      ].sender !== this.state.email
    );
  };
  sendMessage = message => {
    const key = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        _usr => _usr !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(key)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: message,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      });
  };

  signOut = () => firebase.auth().signOut();

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ChatListComponent
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        />
        {this.state.newChatFormVisible ? null : (
          <ChatViewComponent
            user={this.state.email}
            chat={this.state.chats[this.state.selectedChat]}
          />
        )}
        {this.state.selectedChat !== null && !this.state.newChatFormVisible ? (
          <ChatTextBoxComponent
            messageReadFn={this.messageRead}
            sendMessageFn={this.sendMessage}
          />
        ) : null}
        <Button onClick={this.signOut} className={classes.signOutBtn}>
          Sign out
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardComponent);
