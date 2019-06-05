import React from "react";
import ChatListComponent from "../chatlist/chatlist";

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

  newChatBtnClicked = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  selectChat = chatIndex => {
    console.log("selected a chat", chatIndex);
  };

  render() {
    return (
      <div>
        <div>Hello dashboard</div>
        <ChatListComponent
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        />
      </div>
    );
  }
}

export default DashboardComponent;
