import "libs/polyfills";
import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.greeting === "showOptionsPage") {
    browser.runtime.openOptionsPage();
  }
  else if (msg.greeting === "getTabInfo") {
    return browser.tabs.query({}).then(async (tabs) => {
      console.log('background:getTabInfo:tabs:', tabs);
      console.log('background:getTabInfo:sender:', sender);
      let tabs_string = "";
      for (let i = 0;i < tabs.length; i++) {
        tabs_string = tabs_string + (msg.titles == true ? tabs[i].title  + " - " : "") + tabs[i].url + "\n";
      }
      const response = { greeting: 'sendTabInfo', payload: { tabs_string } };
      sendResponse(tabs_string);
      return tabs_string;
    }).catch((error) => {
      console.error('background:getTabInfo:Error:', error);
      sendResponse("");
      return true;
    });
  }
  return true;
});
