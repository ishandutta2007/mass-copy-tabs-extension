import 'libs/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { OptionsProvider } from "context/Options";
import { TodoProvider } from "context/Todo";
import Todo from "components/Todo";
import TodoContainer from "components/TodoContainer";
import browser from "webextension-polyfill";

const Popup = () => {
  browser.runtime.sendMessage({ greeting: "getTabInfo" });
  return (<div></div>);
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<Popup />, root);
