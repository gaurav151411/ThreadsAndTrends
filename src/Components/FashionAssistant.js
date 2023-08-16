import React, { Component } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";

class FashionAssistant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: false,
      messages: [
        {
          message: "Hello, I am ChatGPT",
          sender: "ChatGPT"
        }
      ]
    };
  }

  handleSend = async (message) => {
    const { messages } = this.state;

    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];
    this.setState({ messages: newMessages, typing: true });

    await this.processMessageToChatGPT(newMessages);
  }

  processMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain everything as if I need Fashion Suggestions and I am based in India."
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        const { messages } = this.state;
        const newChatMessages = [
          ...messages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }
        ];
      
        this.setState({ messages: newChatMessages, typing: false });
      } else {
        // Handle the case when the data is not as expected
      }
    
  }

  render() {
    const { typing, messages } = this.state;

    return (
        <div className='FashionAssistant' style={{backgroundColor:"#EDEADE"}}>
        <div style={{ position: "relative", height: "700px", width: "800px" }}>
          <MainContainer className='MainContainer'>
            <div className='Header'>Fashion Assistant Chat</div>
            <ChatContainer className='ChatContainer' style={{width:"40em"}}>
              <MessageList
                scrollBehavior='smooth'
                typingIndicator={typing ? <TypingIndicator content="ChatGPT is Typing" /> : null}
                className='MessageList'
              >
                {messages.map((message, i) => (   
                          <Message key={i} model={message} className={message.sender === "ChatGPT" ? 'AssistantMessage' : 'UserMessage'} />
                ))}
              </MessageList>
              <MessageInput placeholder='Type Message Here' onSend={this.handleSend} className='MessageInput' />
            </ChatContainer>
          </MainContainer>
        </div>
        <div >
          <h1>See what's Trending on Instagram</h1>
          <div class="pic-ctn" style={{width:"40em",marginRight:"0em", marginTop:"0em"}}>
            <img src="https://picsum.photos/200/300?t=1" alt="" class="pic"/>
            <img src="https://picsum.photos/200/300?t=2" alt="" class="pic"/>
            <img src="https://picsum.photos/200/300?t=3" alt="" class="pic"/>
            <img src="https://picsum.photos/200/300?t=4" alt="" class="pic"/>
            <img src="https://picsum.photos/200/300?t=5" alt="" class="pic"/>
          </div>
        </div>
      </div>
    );
  }
}

export default FashionAssistant;
