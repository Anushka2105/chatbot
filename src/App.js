import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import dragon from "./assets/dragon.png";
import add from "./assets/add.png";
import { useState, useEffect } from "react";
import user from "./assets/user.png";
import comment from "./assets/comment.png";
import search from "./assets/question.png";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "How can I help you today?",
      isBot: true,
    },
  ]);
  // console.log(messages);
  // console.log(input);

  async function generateAnswer() {
    console.log("waiting for response..");
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 6500);

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=API_KEY",
      method: "post",
      data: {
        contents: [{ parts: [{ text: input }] }],
      },
    });
    console.log(response);
    // console.log(response.data.candidates[0].content.parts[0].text);
    var res = response.data.candidates[0].content.parts[0].text;
    // console.log(res);
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true },
    ]);
  }
  // console.log(messages);

  const removeAsterisks = (text) => {
    return text.replace(/\*/g, "");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="sidebar">
          <div className="sidebar_name">
            <img src={dragon} alt="" className="sidebar_name_img" />
            <h3>DRAGONBOT</h3>
          </div>
          <div className="sidebar_button">
            <button>
              <span class="material-symbols-outlined">add</span>
              <span className="span_chat">New Chat</span>
            </button>
          </div>
          <div className="sidebar_chats ">
            {messages.map((message) => (
              <p>{message.isBot == false ? message.text : ""}</p>
            ))}
          </div>
          <div className="sidebar_footer">
            <div className="sidebar_booter_div">
              <span class="material-symbols-outlined">login</span>
              <p>Login</p>
            </div>
            <div className="sidebar_booter_div">
              <span class="material-symbols-outlined">settings</span>
              <p>Configuration</p>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="main_chats">
            {messages.map((message) => (
              <div
                className={
                  message.isBot ? "main_chats_chat ai" : "main_chats_chat"
                }
              >
                <img
                  src={message.isBot ? dragon : user}
                  alt=""
                  className="main_chats_chat_img"
                />
                <p className="txt">{removeAsterisks(message.text)}</p>
              </div>
            ))}
          </div>
          <div className="main_footer">
            <div className="input">
              <input
                type="text"
                placeholder="Message Bot..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button onClick={generateAnswer}>Send</button>
            </div>
          </div>
          {
            <div className="visible">
              {isVisible && <p>Searching for the query...</p>}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
