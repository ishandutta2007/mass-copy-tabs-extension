import 'libs/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { OptionsProvider } from "context/Options";
import { TodoProvider } from "context/Todo";
import Todo from "components/Todo";
import TodoContainer from "components/TodoContainer";
import browser from "webextension-polyfill";

const copy_titles_links = () => {
  console.log("copy_titles_links");
  // browser.runtime.sendMessage({ greeting: "getTabInfo" });
}

const copy_links = () => {
  console.log("copy_links");
  // browser.runtime.sendMessage({ greeting: "getTabInfo" });
}

const Popup = () => {
  return (<div>
      <ul style="width:max-content; " >
        <li id="actionCopy" style="display: block; ">
          <div class="menu">
            <button class="text" onClick={copy_titles_links}>Copy Titles and Links</button>
          </div>
        </li>
        <li id="actionCopy" style="display: block; ">
          <div class="menu">
            <button class="text" onClick={copy_links}>Copy Links Only</button>
          </div>
        </li>
      </ul>
  </div>);
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<Popup />, root);
