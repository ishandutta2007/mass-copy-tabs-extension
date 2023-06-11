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

const GlobalStyle = createGlobalStyle`
  :host {
    all: initial;
    ${globalStyle}
  }
`;
const root = document.createElement("div");
const shadow = root.attachShadow({ mode: "open" });
const styleContainer = document.createElement("div");
const appContainer = document.createElement("div");
shadow.appendChild(styleContainer);
shadow.appendChild(appContainer);
document.body.appendChild(root);

function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData("Text", text);
  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");  // Security exception may be thrown by some browsers.
    }
    catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }
    finally {
      document.body.removeChild(textarea);
    }
  }
}

const App = () => {
  browser.runtime.onMessage.addListener((msg) => {
    console.log("content", msg);
    if (msg.greeting === 'sendTabInfo') {
      try {
        const { tabs_string } = msg.payload;
        console.log('content:msg:', msg);
        copyToClipboard(msg.payload.tabs_string)
      } catch(error){
        console.log('content:error:', error);
      }
    }
    return true;
  });
  return (<div/>);
};
ReactDOM.render(<App />, appContainer);
