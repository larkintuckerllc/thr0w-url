(function() {
  'use strict';
  var chrome = window.chrome;
  chrome.runtime.onMessage.addListener(handleMessage);
  function handleMessage(message) {
    if (message.action === 'focus') {
      window.focus();
    } else if (message.action === 'back') {
      window.focus();
      window.history.back();
    } else if (message.action === 'update') {
      window.focus();
      window.location.assign(message.url);
    }
  }
})();
