(function() {
  'use strict';
  var chrome = window.chrome;
  var thr0w = window.thr0w;
  var base = localStorage.getItem('thr0w_url_base');
  var username = localStorage.getItem('thr0w_url_username');
  var password = localStorage.getItem('thr0w_url_password');
  var channel = parseInt(localStorage.getItem('thr0w_url_channel'));
  thr0w.setBase(base);
  thr0w.login(username, password, login);
  function login(error) {
    var controlTabId;
    if (error) {
      throw 401;
    }
    thr0w.connect(channel, connect, message);
    chrome.tabs.onCreated.addListener(handleTabsChange);
    chrome.tabs.onUpdated.addListener(handleTabsChange);
    chrome.tabs.onRemoved.addListener(handleTabsChange);
    function connect() {
    }
    function message(data) {
      var captureTarget;
      switch (data.message.action) {
        case 'update':
          chrome.tabs.query({}, handleUpdate);
          break;
        case 'control':
          if (controlTabId) {
            chrome.tabs.get(controlTabId, handleGet);
          } else {
            createControlTab();
          }
          break;
        case 'capture':
          captureTarget = data.message.target;
          if (captureTarget === undefined ||
            typeof captureTarget !== 'number') {
            return;
          }
          chrome.tabs.captureVisibleTab(handleCapture);
          break;
        default:
      }
      function handleUpdate(tabs) {
        var i;
        for (i = 0; i < tabs.length; i++) {
          if (i === 0) {
            chrome.tabs.update(tabs[i].id, {
              url: data.message.url
            });
          } else {
            chrome.tabs.remove(tabs[i].id);
          }
        }
      }
      function handleGet() {
        if (!chrome.runtime.lastError) {
          chrome.tabs.remove(controlTabId);
        }
        createControlTab();
      }
      function handleCapture(dataUrl) {
        thr0w.thr0w([captureTarget], {thr0w: {
          type: 'capture',
          dataUrl: dataUrl
        }});
      }
    }
    function handleTabsChange() {
      if (controlTabId) {
        chrome.tabs.get(controlTabId, handleGet);
      }
      function handleGet() {
        if (!chrome.runtime.lastError) {
          chrome.tabs.sendMessage(controlTabId, {
            action: 'update'
          });
        }
      }
    }
    function createControlTab() {
      chrome.windows.getAll(handleGet);
      function handleGet(windows) {
        chrome.tabs.create({
          windowId: windows[0].id,
          url: 'control.html'
        }, handleCreate);
        function handleCreate(tab) {
          controlTabId = tab.id;
        }
      }
    }
  }
})();
