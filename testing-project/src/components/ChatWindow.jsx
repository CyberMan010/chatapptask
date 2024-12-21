import React from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import UserList from "./UserList";
import TypingIndicator from "./TypingSimulate";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typingUser: null,
      users: ["Alice", "Bob", "Charlie"], // Simulated users
    };
    this.chatRef = React.createRef();
  }

  componentDidMount() {
    this.addMessage("Welcome to the chat!", "System");
    this.simulateMessages();
    this.simulateTyping();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    if (this.messageInterval) clearInterval(this.messageInterval);
    if (this.typingInterval) clearInterval(this.typingInterval);
  }

  scrollToBottom = () => {
    if (this.chatRef.current) {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
    }
  };

  addMessage = (text, author) => {
    const newMessage = {
      id: Date.now(),
      text,
      author,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        // HH:MM:SS format 
      }),
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessage],
      typingUser: null,
    }));
  };

  handleNewMessage = (messageText) => {
    this.addMessage(messageText, "You");
  };

  handleTyping = (isTyping) => {
    this.setState({ typingUser: isTyping ? "You" : null });
  };

  simulateMessages = () => {
    const simulatedMessages = [
      "Hey there!",
      "How are you?",
      "Nice weather today!",
      "What are you working on?",
      "I am good, you?",
    ];

    this.messageInterval = setInterval(() => {
      const randomUser =
        this.state.users[
          Math.floor(Math.random() * this.state.users.length)
        ];
      const randomMessage =
        simulatedMessages[
          Math.floor(Math.random() * simulatedMessages.length)
        ];

      this.addMessage(randomMessage, randomUser);
    }, Math.random() * 5000 + 3000); 
    // try 8000 ms instead 
  };

  simulateTyping = () => {
    this.typingInterval = setInterval(() => {
      if (!this.state.typingUser) {
        const randomUser =
          this.state.users[
            Math.floor(Math.random() * this.state.users.length)
          ];

        this.setState({ typingUser: randomUser });

        setTimeout(() => {
          this.setState((prevState) => {
            if (prevState.typingUser === randomUser) {
              return { typingUser: null };
            }
            return prevState;
          });
        }, Math.random() * 2000 + 1000);
      }
    }, Math.random() * 8000 + 5000);
  };

  render() {
    const { messages, typingUser, users } = this.state;

    return (
      <div className="flex max-w-4xl mx-auto border rounded shadow-lg">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div
            ref={this.chatRef}
            className="h-[500px] overflow-y-auto p-4"
          >
            {messages.map((message) => (
              <Message
                key={message.id}
                author={message.author}
                text={message.text}
                timestamp={message.timestamp}
              />
            ))}
            <TypingIndicator typingUser={typingUser} />
          </div>

          {/* Message Input */}
          <MessageInput
            onSendMessage={this.handleNewMessage}
            onTyping={this.handleTyping}
          />
        </div>

        {/* User List Sidebar */}
        <div className="w-64 bg-gray-100 border-l">
          <UserList users={users.map((name) => ({ id: name, name }))} typingUser={typingUser ? [typingUser] : []} />
        </div>
      </div>
    );
  }
}

export default ChatWindow;