(function() {
  'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    var base = localStorage.getItem('thr0w_url_base');
    var username = localStorage.getItem('thr0w_url_username');
    var password = localStorage.getItem('thr0w_url_password');
    var channel = localStorage.getItem('thr0w_url_channel');
    var formEl = document.getElementById('form');
    var baseEl = document.getElementById('base');
    var usernameEl = document.getElementById('username');
    var passwordEl = document.getElementById('password');
    var channelEl = document.getElementById('channel');
    baseEl.value = base;
    usernameEl.value = username;
    passwordEl.value = password;
    channelEl.value = channel;
    formEl.addEventListener('submit', submit);
    function submit(e) {
      e.preventDefault();
      if (baseEl.value === '' ||
        usernameEl.value === '' ||
        passwordEl.value === '' ||
        channelEl.value === ''
        ) {
        return;
      }
      localStorage.setItem('thr0w_url_base', baseEl.value);
      localStorage.setItem('thr0w_url_username', usernameEl.value);
      localStorage.setItem('thr0w_url_password', passwordEl.value);
      localStorage.setItem('thr0w_url_channel', channelEl.value);
      window.close();
    }
  });
})();
