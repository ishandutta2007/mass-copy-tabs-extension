import "libs/polyfills";
import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.greeting === "showOptionsPage") {
    browser.runtime.openOptionsPage();
  }
  else if (msg.greeting === "getTabInfo") {
    browser.tabs.query({}).then(async (tabs) => {
      console.log('background:getTabInfo:tabs:', tabs);
      console.log('background:getTabInfo:sender:', sender);
      let tabs_string = "";
      let active_tab;
      for (let i=0;i< tabs.length; i++) {
        tabs_string = tabs_string + tabs[i].title + " - " + tabs[i].url + "\n";
        if (tabs[i].active == true) {
          active_tab = tabs[i];
        }
      }
      const response = { greeting: 'sendTabInfo', payload: { tabs_string } };
      browser.tabs.sendMessage(active_tab.id, response); // Send the response directly to the content script
      return true;
    }).catch((error) => {
      console.error('background:getTabInfo:Error:', error);
    });
  }
  sendResponse({});
  return true;
});
