'use strict';

(function () {
  var URL = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var SUCCESS_CODE = 200;
  var TIMEOUT_INTERVAL = 10000;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_INTERVAL;
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('GET', URL.LOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('POST', URL.SAVE);
      xhr.send(data);
    }
  };
})();
