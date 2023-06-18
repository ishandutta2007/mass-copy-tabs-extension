import 'libs/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { OptionsProvider } from "context/Options";
import { TodoProvider } from "context/Todo";
import Todo from "components/Todo";
import TodoContainer from "components/TodoContainer";
import browser from "webextension-polyfill";
import './styles.scss'
import { isIOS, changeToast } from './utils'

function copyToClipboard(text, disp_msg) {
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

const copy_titles_links = () => {
  try {
    browser.runtime.sendMessage({ greeting: "getTabInfo", titles: true }).then( function (response) {
      try {
        console.log("copy_titles_links");
        console.log(response);
        let ret = copyToClipboard(response, "titles & links");
        console.log("ret=", ret);
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
          var activeTab = tabs[0];
          console.log(ret==true ? "copySuccessful" : "copyUnsuccessful");
          chrome.tabs.sendMessage(activeTab.id, {greeting: ret==true ? "copySuccessful" : "copyUnsuccessful", what: "titles & links"});
          return true;
        });
      } catch(error){
        console.log('popup:error:', error);
      }
    });
  } catch(error) {
    console.log('popup:error:', error);
  }
  return true;
}

const copy_links = () => {
  try {
    browser.runtime.sendMessage({ greeting: "getTabInfo", titles: false }).then( function (response) {
      try {
        console.log("copy_links");
        console.log(response);
        let ret = copyToClipboard(response, "links");
        console.log("ret=", ret);
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
          var activeTab = tabs[0];
          console.log(ret==true ? "copySuccessful" : "copyUnsuccessful");
          chrome.tabs.sendMessage(activeTab.id, {greeting: ret==true ? "copySuccessful" : "copyUnsuccessful", what: "links"});
          return true;
        });
      } catch(error){
        console.log('popup:error:', error);
      }
    });
  } catch(error){
    console.log('popup:error:', error);
  }
  return true;
}

const Popup = () => {
  return (<div>
    <ul >
      <li id="actionCopy" style="display: block; ">
        <div class="menu">
          <span class="text" onClick={copy_titles_links}>Copy Titles and Links</span>
        </div>
      </li>
      <div class="separator"></div>
      <li id="actionCopy" style="display: block; ">
        <div class="menu">
          <span class="text" onClick={copy_links}>Copy Links Only</span>
        </div>
      </li>
      <div class="separator"></div>
    </ul>
  </div>);
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<Popup />, root);
