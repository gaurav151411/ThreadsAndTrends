import React, { Component } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import stopwords from './stopwords';
import clothingSet from './fashionkeywords';


const API_KEY = "1f38974303mshd6e14d884ce909fp1a50f6jsnb816a2be044a"; // Update with your API key

class FashionAssistant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: false,
      messages: [
        {
          message: `Hello, This is your Stylist In Chief, Reporting for Duty :)`,
          sender: "Stylist"
        }
      ],
      productsData:[],
      filteredArray:[]
    };
  }

  handleSend = async (message) => {
    const { messages } = this.state;

    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };



    await this.processMessageToChatGPT(message);
  }

  processMessageToChatGPT = async (userMessage) => {
    const { messages } = this.state;

    const newUserMessage = {
      message: userMessage,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newUserMessage]; // Add the user's message
    this.setState({ messages: newMessages, typing: true });

    
    const options = {
      method: 'POST',
      url: 'https://open-ai21.p.rapidapi.com/conversationllama',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: userMessage // Use the user's message here
          }
        ],
        web_access: false
      }
    };

    
    try {
      const response = await axios.request(options);
     console.log(response.data);
      const assistantMessage=response.data.LLAMA;
      const newAssistantMessage = {
        message: assistantMessage,
        sender: 'ChatGPT',
        direction: 'incoming',
      };
      const finalResponse=[...newMessages,newAssistantMessage];
      this.setState({messages:finalResponse,typing:false});

      const myresponse=assistantMessage.split(' ');
      const cleanWords = myresponse.map(word => word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());
      
        // Remove common stopwords (e.g., "the", "and", "is", etc.)
        
        const keywords = cleanWords.filter(word => !stopwords.has(word));

        // Count the frequency of each keyword
        const keywordCounts = {};
        keywords.forEach(keyword => {
            keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        });

        console.log(keywordCounts);


      

        let lowercaseClothingSet = new Set();
    
        clothingSet.forEach(item => {
          lowercaseClothingSet.add(item.toLowerCase());
        });

        const filter=keywords.filter(element=>lowercaseClothingSet.has(element));
        this.setState({filteredArray:filter});
        console.log(filter);
        const finalApparel=filter.filter((item,index)=> filter.indexOf(item)==index)
        //removing repeating elements 
        let p=3;
        const productsData = await Promise.all(finalApparel.map(async keyword => {
          try {
            const response = await axios.get(`https://flipkart-scraper-api.dvishal485.workers.dev/search/${keyword}`);
            
            const productData = response.data.result[p++];
            
            console.log(productData);
            return productData;
          } catch (error) {
            console.error('Error fetching product data:', error);
            return null; // Handle the error gracefully
          }
        }));
    
        this.setState({ productsData });
        
    
    } catch (error) {
      console.error(error);
    }
  }

  
  render() {
    const { typing, messages,productsData} = this.state;

    return (
      <div className='FashionAssistant' style={{marginRight:"0em",width:"80em"}}>
       
        <div style={{ position: "relative", height: "700px", width: "600px" }}>
          
          <MainContainer className='MainContainer' >
      
            <ChatContainer className='ChatContainer' style={{width:"30em"}}>
              <MessageList
                scrollBehavior='smooth'
                typingIndicator={typing ? <TypingIndicator content="Chief is Typing" style={{marginBottom:"0"}}/> : null}
                className='MessageList'
                style={{marginBottom:"0",height:"1000em"}}
              >
                {messages.map((message, i) => (   
                  <Message
                    key={i}
                    model={message}
                    className={message.sender === "ChatGPT" ? 'AssistantMessage' : 'UserMessage'}
                  />
                ))}
              </MessageList>
              <MessageInput placeholder='Type Message Here' onSend={this.handleSend} className='MessageInput' />
            </ChatContainer>
          </MainContainer>
        </div>
        <div className='Trending' style={{width:"100em"}}>
          
          {
            productsData.length==0?(
              <div>
                <h1 style={{marginLeft:"2.5em",color:"#047BD5",fontSize:"50px"}}>See what's Trending on Instagram</h1>
              <div class="pic-ctn" style={{marginLeft:"-20em", marginTop:"5em"}}>
              <img src="https://picsum.photos/200/300?t=1" alt="" class="pic" style={{width:"20em",height:"18em"}}/>
              <img src="https://picsum.photos/200/300?t=2" alt="" class="pic"style={{width:"20em",height:"18em"}}/>
              <img src="https://picsum.photos/200/300?t=3" alt="" class="pic"style={{width:"20em",height:"18em"}}/>
              <img src="https://picsum.photos/200/300?t=4" alt="" class="pic"style={{width:"20em",height:"18em"}}/>
              <img src="https://picsum.photos/200/300?t=5" alt="" class="pic"style={{width:"20em",height:"18em"}}/>

              </div> 
              <h1 style={{marginLeft:"3em",marginTop:"2em",color:"#047BD5"}}>Chief is selecting some great picks for you!</h1>
              <div class="spinner-border text-danger" style={{marginLeft:"30em"}} role="status">
                <span class="sr-only">Loading...</span>
              </div>
              </div>
              
            ):(
              <div className="pic-ctn" style={{display:"flex",flexWrap:"wrap",marginTop:"2em",justifyContent:"center",paddingBottom:"2em"}}>
              {productsData.map((product, index) => (
                
                <div class="card" key={index} style={{marginRight:"2em",width:"18em",height:"12em",marginTop:"2em",marginBottom:"9em"}}>
                <img class="card-img-top" src={product.thumbnail} style={{width:"17em",height:"12em"}} alt={product.name} />
                <div class="card-body">
                  <h5 class="card-title" style={{color:"black"}}>{product.name}</h5>
                  <p class="card-text"> ₹{product.current_price}</p>
                  <a href={product.link} class="btn btn-primary">View Product on Flipkart</a>
                </div>
              </div>
              ))}
            </div>
            )
          }
          

          
        </div>
      </div>
    );
  }
}

export default FashionAssistant;

