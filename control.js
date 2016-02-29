(function() {
  'use strict';
  var chrome = window.chrome;
  document.addEventListener('DOMContentLoaded', ready);
  function ready() {
    var tabsEl = document.getElementById('tabs');
    chrome.runtime.onMessage.addListener(handleMessage);
    updateTabList();
    function handleMessage(message) {
      if (message.action === 'update') {
        updateTabList();
      }
    }
    function updateTabList() {
      chrome.tabs.getCurrent(handleCurrent);
      function handleCurrent(thisTab) {
        var thisTabId = thisTab.id;
        chrome.tabs.query({}, handleQuery);
        function handleQuery(tabs) {
          var i;
          var tabEl;
          var tabItemEl;
          var firstTab = true;
          var tab;
          tabsEl.innerHTML = '';
          for (i = 0; i < tabs.length; i++) {
            tab = tabs[i];
            if (tab.id !== thisTabId) {
              tabEl = document.createElement('li');
              tabEl.classList.add('tabs__tab');
              // TITLE
              tabItemEl = document.createElement('div');
              tabItemEl.classList.add('tabs__tab__title');
              tabItemEl.innerHTML = [
                tab.title,
                '<div class="tabs__tab__focus">',
                '<div class="tabs__tab__focus__arrow">',
                '</div>',
                '</div>'
              ].join('');
              tabEl.appendChild(tabItemEl);
              /* jshint ignore:start */
              (function(id) {
                tabItemEl.addEventListener('click', sendFocus);
                function sendFocus(e) {
                  chrome.tabs.sendMessage(id, {
                    action: 'focus'
                  });
                  chrome.tabs.remove(thisTabId);
                }
              })(tab.id);
              /* jshint ignore:end */
              // BACK
              tabItemEl = document.createElement('div');
              tabItemEl.classList.add('tabs__tab__button');
              tabItemEl.innerHTML = [
                'back'
              ].join('');
              tabEl.appendChild(tabItemEl);
              /* jshint ignore:start */
              (function(id) {
                tabItemEl.addEventListener('click', backTab);
                function backTab(e) {
                  chrome.tabs.sendMessage(id, {
                    action: 'back'
                  });
                  chrome.tabs.remove(thisTabId);
                }
              })(tab.id);
              /* jshint ignore:end */
              // CLOSE
              if (!firstTab) {
                tabItemEl = document.createElement('div');
                tabItemEl.classList.add('tabs__tab__button');
                tabItemEl.innerHTML = [
                  'close'
                ].join('');
                tabEl.appendChild(tabItemEl);
                /* jshint ignore:start */
                (function(id) {
                  tabItemEl.addEventListener('click', closeTab);
                  function closeTab(e) {
                    chrome.tabs.remove(id);
                    chrome.tabs.remove(thisTabId);
                  }
                })(tab.id);
                /* jshint ignore:end */
              }
              tabsEl.appendChild(tabEl);
              firstTab = false;
            }
          }
        }
      }
    }
  }
})();
