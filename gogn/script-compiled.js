"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

document.addEventListener('DOMContentLoaded', function () {

  program.init();
});

var program = function () {
  var container = void 0;
  var videoData = void 0;

  /*Tekur inn millisekúndur og breytir þeim í
    stærstu mögulega einingu(t.d. mínútur, klukkustundur)
    og skilar streng sem lýsir því*/
  function millisecondsToString(milliseconds) {
    var sec = 1000;
    var min = 60 * sec;
    var hour = 60 * min;
    var day = 24 * hour;
    var week = 7 * day;
    var month = 30 * day;
    var year = 365 * day;
    var time = void 0;
    if (milliseconds < min) {
      time = Math.floor(milliseconds / sec);
      if (time != 1) return "Fyrir " + time + " sekúndum síðan";else {
        return "Fyrir " + time + " sekúndu síðan";
      }
    } else if (milliseconds < hour) {
      time = Math.floor(milliseconds / min);
      if (time != 1) return "Fyrir " + time + " mínútum síðan";else {
        return "Fyrir " + time + " mínútu síðan";
      }
    } else if (milliseconds < day) {
      time = Math.floor(milliseconds / hour);
      if (time != 1) return "Fyrir " + time + " klukkustundum síðan";else {
        return "Fyrir " + time + " klukkustund síðan";
      }
    } else if (milliseconds < week) {
      time = Math.floor(milliseconds / day);
      if (time != 1) return "Fyrir " + time + " dögum síðan";else {
        return "Fyrir " + time + " degi síðan";
      }
    } else if (milliseconds < month) {
      time = Math.floor(milliseconds / week);
      if (time != 1) return "Fyrir " + time + " vikum síðan";else {
        return "Fyrir " + time + " viku síðan";
      }
    } else if (milliseconds < year) {
      time = Math.floor(milliseconds / month);
      if (time != 1) return "Fyrir " + time + " mánuðum síðan";else {
        return "Fyrir " + time + " mánuði síðan";
      }
    } else {
      time = Math.floor(milliseconds / year);
      if (time != 1) return "Fyrir " + time + " árum síðan";else {
        return "Fyrir " + time + " ári síðan";
      }
    }
  }

  /*Tekur inn millisekúndurnur sem höfðu liðið frá
    1. jan 1970 þangað til myndbandið var sett inn
    og skilar streng sem segir hvað er langt síðan
    myndbandið var sett inn*/
  function timeSinceCreated(created) {
    var oldDate = new Date(created);
    var newDate = Date.now();
    var difference = newDate - oldDate;
    return millisecondsToString(difference);
  }

  function element(name, child) {
    var el = document.createElement(name);

    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if ((typeof child === "undefined" ? "undefined" : _typeof(child)) === 'object') {
      el.appendChild(child);
    }
    return el;
  }

  function loadJSON() {
    var r = new XMLHttpRequest();
    r.open('GET', 'videos.json', true);
    r.onload = function () {
      var data = JSON.parse(r.response);
      if (r.status >= 200 && r.status < 400) {
        addVideos(data);
      } else {
        //villuskilaboð
      }
    };

    r.send();
  }
  /*tekur inn json object sem hefur verið parse-að, býr til div elements fyrir
    hvert category, setur inn titil fyrir hvert category og birtir allar upplýsingar
    fyrir hvert myndband.*/
  function addVideos(data) {
    var videoData = data;
    var divcount = 1;
    for (var i = 0; i < videoData.categories.length; i++) {
      var divTitle = element('h2', videoData.categories[i].title);
      var div = element('div', divTitle);
      div.className = 'category' + divcount;
      divcount++;
      for (var j = 0; j < videoData.categories[i].videos.length; j++) {
        var videoID = videoData.categories[i].videos[j];
        var video = videoData.videos[videoID - 1];
        var videoPoster = element('img');
        videoPoster.src = video.poster;
        videoPoster.className = 'vidimg';
        var videoTitle = element('p', video.title);
        videoTitle.className = 'vidtitle';
        var videoCreated = element('p', timeSinceCreated(video.created));
        videoCreated.className = 'vidcreated';
        div.appendChild(videoPoster);
        div.appendChild(videoTitle);
        div.appendChild(videoCreated);
      }

      container.appendChild(div);
    }
  }

  function init() {
    container = document.querySelector('.container');
    loadJSON();
  }

  return {
    init: init
  };
}();

//# sourceMappingURL=script-compiled.js.map