import React, { Component } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import axios from "axios";

const OPENAI_API_KEY = '1f38974303mshd6e14d884ce909fp1a50f6jsnb816a2be044a'; // Replace with your OpenAI API key

class FashionAssistant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: false,
      messages: [
        {
          content: "Hello, I am ChatGPT",
          role: "system"
        }
      ]
    };
  }

  handleSend = (message) => {
    const { messages } = this.state;

    const userMessage = {
      content: message,
      role: "user"
    };

    const newMessages = [...messages, userMessage];
    this.setState({ messages: newMessages, typing: true });

    this.processMessageToChatGPT(newMessages);
  };

  processMessageToChatGPT = async (chatMessages) => {
    const options = {
      method: 'POST',
      url: 'https://open-ai21.p.rapidapi.com/conversationllama',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      data: {
        prompt: chatMessages.map(msg => msg.content).join('\n'),
        max_tokens: 50
      }
    };

    try {
      const response = await axios.request(options);
      const assistantMessage = {
        content: response.data.choices[0].text.trim(),
        role: 'system'
      };
      this.setState(prevState => ({
        messages: [...prevState.messages, assistantMessage],
        typing: false
      }));
    } catch (error) {
      console.error(error);
      this.setState({ typing: false });
    }
  };

  render() {
    const { typing, messages } = this.state;

    return (
      <div className='FashionAssistant' style={{ backgroundColor: "#EDEADE" }}>
        <div style={{ position: "relative", height: "700px", width: "800px" }}>
          <MainContainer className='MainContainer'>
            <div className='Header'>Fashion Assistant Chat</div>
            <ChatContainer className='ChatContainer' style={{ width: "40em" }}>
              <MessageList
                scrollBehavior='smooth'
                typingIndicator={typing ? <TypingIndicator content="ChatGPT is Typing" /> : null}
                className='MessageList'
              >
                {messages.map((message, i) => (
                  <Message key={i} model={message} className={message.role === "system" ? 'AssistantMessage' : 'UserMessage'} />
                ))}
              </MessageList>
              <MessageInput placeholder='Type Message Here' onSend={this.handleSend} className='MessageInput' />
            </ChatContainer>
          </MainContainer>
        </div>
        <div>
          <h1>See what's Trending on Instagram</h1>
          <div className="pic-ctn" style={{ width: "40em", marginRight: "0em", marginTop: "0em" }}>
            {/* Render your Instagram images here */}
          </div>
        </div>
      </div>
    );
  }
}

export default FashionAssistant;
