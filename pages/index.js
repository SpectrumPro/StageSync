import React, { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client";

const user = "User_" + String(new Date().getTime()).substr(-3);

const Index = () => {
  const inputRef = useRef(null);

  const [connected, setConnected] = useState(false);

  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");

  const [activeCategoryButtons, setactiveCategoryButtons] = useState([]);
  const [activeFunctionButtons, setactiveFunctionButtons] = useState([]);


  const [categoryButtons, setCategoryButtons] = useState([
    { text: "Backing Track", id: 1, opacity: 1, disabled:false },
    { text: "Microphones", id: 2, opacity: 1, disabled:false  },
    { text: "Instruments", id: 3, opacity: 1, disabled:false  },
    { text: "Lighting", id: 4, opacity: 1, disabled:false  },
    { text: "Cameras", id: 5, opacity: 1, disabled:false  },
    { text: "Graphics / Slides", id: 6, opacity: 1, disabled:false  },
    { text: "Live Stream", id: 7, opacity: 1, disabled:false  },
    { text: "", id: 8, opacity: 1, disabled:false  },
    { text: "", id: 9, opacity: 1, disabled:false  },
    { text: "", id: 10, opacity: 1, disabled:false  },
    { text: "", id: 12, opacity: 1, disabled:false  },
    { text: "", id: 13, opacity: 1, disabled:false  },
    { text: "", id: 14, opacity: 1, disabled:false  },
    { text: "", id: 15, opacity: 1, disabled:false  },
    { text: "", id: 16, opacity: 1, disabled:false  },
    { text: "", id: 17, opacity: 1, disabled:false  },
    { text: "", id: 18, opacity: 1, disabled:false  },
    { text: "", id: 19, opacity: 1, disabled:false  },
    { text: "", id: 20, opacity: 1, disabled:false  },
    { text: "", id: 21, opacity: 1, disabled:false  },
  ]);

  const [functionButtonsL, setfunctionButtonsL] = useState([
    { text: "Increase", id: 22, opacity: 0.5, disabled:true  },
    { text: "Decrease", id: 23, opacity: 0.5, disabled:true  },
    { text: "Stop", id: 24, opacity: 0.5, disabled:true  },
    { text: "Start", id: 25, opacity: 0.5, disabled:true  },
  ]);

  const [functionButtonsB, setfunctionButtonsB] = useState([
    { text: "Next", id: 26, opacity: 0.5, disabled:true },
    { text: "Prevoius", id: 27, opacity: 0.5, disabled:true },
    { text: "Voulme", id: 28, opacity: 0.5, disabled:true },
    { text: "Problem", id: 29, opacity: 0.5, disabled:true },
    { text: "", id: 30, opacity: 0.5, disabled:true },
  ]);


  function disableButtons(buttons,setButtons, not, onlyVisual=false) {
    const updatedButtons = buttons.map((button) => {
      if(not && button.id == not) {return {...button,opacity: 1}}
      return { ...button, opacity: 0.5, disabled:(onlyVisual) ? false : true};
    });
    setButtons(updatedButtons);
  }

  function enableButtons(buttons, setButtons) {
    const updatedButtons = buttons.map((button) => {
      return { ...button, opacity: 1, disabled:false};
    });
    setButtons(updatedButtons);
  }

  function buttonClick(buttonId) {
    console.log(buttonId)
    
    if(buttonId <= 21){

      console.log("Main")

      if (activeCategoryButtons.includes(buttonId)) {
        setactiveCategoryButtons([])
        enableButtons(categoryButtons, setCategoryButtons)
        disableButtons(functionButtonsL, setfunctionButtonsL)
        disableButtons(functionButtonsB, setfunctionButtonsB)
        return 
      }

      disableButtons(categoryButtons, setCategoryButtons, buttonId, true)
      enableButtons(functionButtonsL, setfunctionButtonsL)
      enableButtons(functionButtonsB, setfunctionButtonsB)
      setactiveCategoryButtons([buttonId])
    }
    if(buttonId > 21 && buttonId <=30){
      console.log("Function")

      if (activeFunctionButtons.includes(buttonId)) {
        setactiveFunctionButtons([])
        enableButtons(functionButtonsL, setfunctionButtonsL)
        enableButtons(functionButtonsB, setfunctionButtonsB)
        return 
      }

      disableButtons(functionButtonsL, setfunctionButtonsL, buttonId, true)
      disableButtons(functionButtonsB, setfunctionButtonsB, buttonId, true)
      setactiveFunctionButtons([buttonId])


    }

    if(buttonId==31) {
      console.log(activeCategoryButtons)
    }

  }


  useEffect(() => {
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message) => {
      chat.push(message);
      setChat([...chat]);
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      const message = {
        user,
        msg,
      };

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (resp.ok) setMsg("");
    }

    inputRef?.current?.focus();
  };

  


  return (
    <div class="flex flex-row w-screen h-screen bg-black">
      <div class="w-1/3 m-5">
        <div className="flex flex-col w-full h-full ">
          <div className="py-4 text-white sticky top-0 bg-slate-700 rounded-t-2xl">
            <h1 className="text-center text-2xl font-semibold">
              Realtime Chat App
            </h1>
            <h2 className="mt-2 text-center">in Next.js and Socket.io</h2>
          </div>
          <div className="flex flex-col flex-1 bg-slate-800 rounded-b-2xl">
            <div className="flex-1 p-4 font-mono">
              {chat.length ? (
                chat.map((chat, i) => (
                  <div key={"msg_" + i} className="mt-1">
                    <span
                      className={
                        chat.user === user ? "text-red-500" : "text-black"
                      }
                    >
                      {chat.user === user ? "Me" : chat.user}
                    </span>
                    : {chat.msg}
                  </div>
                ))
              ) : (
                <div className="text-sm text-center text-gray-400 py-6">
                  No chat messages
                </div>
              )}
            </div>
            <div className="bg-slate-700 p-4 h-20 sticky bottom-0 rounded-b-2xl">
              <div className="flex flex-row flex-1 h-full divide-gray-200 divide-x">
                <div className="pr-2 flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={msg}
                    placeholder={
                      connected ? "Type a message..." : "Connecting..."
                    }
                    className="w-full h-full rounded-full shadow border-gray-400 border px-4"
                    disabled={!connected}
                    onChange={(e) => {
                      setMsg(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center items-stretch pl-2">
                  <button
                    className="bg-blue-500 rounded-full shadow text-sm text-white h-full px-2"
                    onClick={sendMessage}
                    disabled={!connected}
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/3 h-full flex ">
        <div class="flex flex-col w-full h-full">
          <div class="h-3/4 w-full flex">
            <div class="flex flex-row w-full h-full">
              <div class="w-3/4 h-full flex">
                <div class="grid grid-cols-5 p-5">
                {categoryButtons.map((button) => (
                  <button
                    key={button.id}
                    className={"messageButton"}
                    style={{ opacity: button.opacity }}
                    onClick={() => buttonClick(button.id)}
                    disabled={button.disabled}
                  >
                    {button.text}
                  </button>
                ))}
                </div>
              </div>
              <div class="w-1/4 h-full flex">
                <div class="grid grid-cols-1 p-5">
                {functionButtonsL.map((button) => (
                  <button
                    key={button.id}
                    className={"messageButton"}
                    style={{ opacity: button.opacity }}
                    onClick={() => buttonClick(button.id)}
                    disabled={button.disabled}

                  >
                    {button.text}
                  </button>
                ))}
                </div>
              </div>
            </div>
          </div>
          <div class="h-1/4 w-full flex">
            <div class="flex flex-row w-full h-full">
              <div class="w-3/4 h-full flex">
                <div class="grid grid-cols-5 p-5">
                {functionButtonsB.map((button) => (
                  <button
                    key={button.id}
                    className={"messageButton"}
                    style={{ opacity: button.opacity }}
                    onClick={() => buttonClick(button.id)}
                    disabled={button.disabled}

                  >
                    {button.text}
                  </button>
                ))}
                </div>
              </div>
              <div class="w-1/4 h-full flex">
                <div class="grid grid-cols-1 p-5">
                  <button className="messageButton" onClick={() => buttonClick("31")}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
