import React, { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client";

import Navbar from "./components/navbar";
import Aside from "./components/aside";
import Chat from "./components/chat";


const Index = () => {
  

  const [activeCategoryButtons, setactiveCategoryButtons] = useState([]);
  const [activeFunctionButtons, setactiveFunctionButtons] = useState([]);


  const [categoryButtons, setCategoryButtons] = useState([
    { text: "Backing Track", id: 1, opacity: 1, disabled: false },
    { text: "Microphones", id: 2, opacity: 1, disabled: false },
    { text: "Instruments", id: 3, opacity: 1, disabled: false },
    { text: "Lighting", id: 4, opacity: 1, disabled: false },
    { text: "Cameras", id: 5, opacity: 1, disabled: false },
    { text: "Graphics / Slides", id: 6, opacity: 1, disabled: false },
    { text: "Live Stream", id: 7, opacity: 1, disabled: false },
    { text: "", id: 8, opacity: 1, disabled: false },
    { text: "", id: 9, opacity: 1, disabled: false },
    { text: "", id: 10, opacity: 1, disabled: false },
    { text: "", id: 12, opacity: 1, disabled: false },
    { text: "", id: 13, opacity: 1, disabled: false },
    { text: "", id: 14, opacity: 1, disabled: false },
    { text: "", id: 15, opacity: 1, disabled: false },
    { text: "", id: 16, opacity: 1, disabled: false },
    { text: "", id: 17, opacity: 1, disabled: false },
    { text: "", id: 18, opacity: 1, disabled: false },
    { text: "", id: 19, opacity: 1, disabled: false },
    { text: "", id: 20, opacity: 1, disabled: false },
    { text: "", id: 21, opacity: 1, disabled: false },
  ]);

  const [functionButtonsL, setfunctionButtonsL] = useState([
    { text: "Increase", id: 22, opacity: 0.5, disabled: true },
    { text: "Decrease", id: 23, opacity: 0.5, disabled: true },
    { text: "Stop", id: 24, opacity: 0.5, disabled: true },
    { text: "Start", id: 25, opacity: 0.5, disabled: true },
  ]);

  const [functionButtonsB, setfunctionButtonsB] = useState([
    { text: "Next", id: 26, opacity: 0.5, disabled: true },
    { text: "Prevoius", id: 27, opacity: 0.5, disabled: true },
    { text: "Voulme", id: 28, opacity: 0.5, disabled: true },
    { text: "Problem", id: 29, opacity: 0.5, disabled: true },
    { text: "", id: 30, opacity: 0.5, disabled: true },
  ]);


  function disableButtons(buttons, setButtons, not, onlyVisual = false) {
    const updatedButtons = buttons.map((button) => {
      if (not && button.id == not) { return { ...button, opacity: 1 } }
      return { ...button, opacity: 0.5, disabled: (onlyVisual) ? false : true };
    });
    setButtons(updatedButtons);
  }

  function enableButtons(buttons, setButtons) {
    const updatedButtons = buttons.map((button) => {
      return { ...button, opacity: 1, disabled: false };
    });
    setButtons(updatedButtons);
  }

  function buttonClick(buttonId) {
    console.log(buttonId)

    if (buttonId <= 21) {

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
    if (buttonId > 21 && buttonId <= 30) {
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

    if (buttonId == 31) {
      console.log(activeCategoryButtons)
    }

  }


 




  return (
    <div class="bg-black h-screen">
      {Navbar("Backstage")}

      <Aside></Aside>

      <main class="md:ml-64 h-auto pt-16">
        <div class="inline-block">
          
          <div class="block bg-slate-900 rounded-2xl m-5">
            <div class="">
              <div class="inline-block  m-2">
                <div class="grid grid-cols-5">
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
              <div class="inline-block">
                <div class="grid grid-cols-1 m-2">
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
            <div className=" ">
              <div class="inline-block  m-2">
                <div class="grid grid-cols-5">
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
              <div class="inline-block  m-2">
                <div class="grid grid-cols-1">
                  <button className="messageButton" onClick={() => buttonClick("31")}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>


  );
};

export default Index;
