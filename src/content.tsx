import "libs/polyfills";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled, {
  StyleSheetManager,
  createGlobalStyle
} from "styled-components";
import globalStyle from "assets/styles/global";
import { OptionsProvider } from "context/Options";
import { ThemeProvider } from "context/Theme";
import useClickOutside from "use-click-outside";
import FixedPlusButton from "components/FixedPlusButton";
import TodoContainer from "components/TodoContainer";
import Todo from "components/Todo";
import { TodoProvider } from "context/Todo";
import usePressOnEsc from "hooks/usePressOnEsc";
import { layer1 } from "constants/layers";
import Global from './Global'
import browser from "webextension-polyfill";

const root = document.createElement("div");
const shadow = root.attachShadow({ mode: "open" });
const styleContainer = document.createElement("div");
const appContainer = document.createElement("div");
shadow.appendChild(styleContainer);
shadow.appendChild(appContainer);
document.body.appendChild(root);

const App = () => {
  browser.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    if (msg.greeting === "copySuccessful") {
      alert("copied " + msg.what + " successfully");
    }
    else if (msg.greeting === "copyUnsuccessful") {
      alert("Please retry");
    }
    return true;
  });
  return (<div/>);
};
ReactDOM.render(<App />, appContainer);
