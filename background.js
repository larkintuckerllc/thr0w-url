(function() {
  'use strict';
    var chrome = window.chrome;
    var thr0w = window.thr0w;
    var base = localStorage.getItem("thr0w_url_base");
    var username = localStorage.getItem("thr0w_url_username");
    var password = localStorage.getItem("thr0w_url_password");
    var channel = parseInt(localStorage.getItem("thr0w_url_channel"));
    thr0w.setBase(base);
    thr0w.login(username, password, login);
    function login(error) {
      if (error) {
        throw 401;
      }
      thr0w.connect(channel, connect, message);
      function connect() {
      }
      function message(data) {
        var properties = {
          url: data.message
        };
        chrome.tabs.update(properties, callback);
        function callback() {
        }
    }
  }
})();
