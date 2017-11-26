'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var program = function startProgram() {
  var container = void 0;

  /* Tekur inn millisekúndur og breytir þeim í
     stærstu mögulega einingu(t.d. mínútur, klukkustundur)
     og skilar streng sem lýsir því */
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
      if (time !== 1) return 'Fyrir ' + time + ' sek\xFAndum s\xED\xF0an';
      return 'Fyrir ' + time + ' sek\xFAndu s\xED\xF0an';
    } else if (milliseconds < hour) {
      time = Math.floor(milliseconds / min);
      if (time !== 1) return 'Fyrir ' + time + ' m\xEDn\xFAtum s\xED\xF0an';
      return 'Fyrir ' + time + ' m\xEDn\xFAtu s\xED\xF0an';
    } else if (milliseconds < day) {
      time = Math.floor(milliseconds / hour);
      if (time !== 1) return 'Fyrir ' + time + ' klukkustundum s\xED\xF0an';
      return 'Fyrir ' + time + ' klukkustund s\xED\xF0an';
    } else if (milliseconds < week) {
      time = Math.floor(milliseconds / day);
      if (time !== 1) return 'Fyrir ' + time + ' d\xF6gum s\xED\xF0an';
      return 'Fyrir ' + time + ' degi s\xED\xF0an';
    } else if (milliseconds < month) {
      time = Math.floor(milliseconds / week);
      if (time !== 1) return 'Fyrir ' + time + ' vikum s\xED\xF0an';
      return 'Fyrir ' + time + ' viku s\xED\xF0an';
    } else if (milliseconds < year) {
      time = Math.floor(milliseconds / month);
      if (time !== 1) return 'Fyrir ' + time + ' m\xE1nu\xF0um s\xED\xF0an';
      return 'Fyrir ' + time + ' m\xE1nu\xF0i s\xED\xF0an';
    }
    time = Math.floor(milliseconds / year);
    if (time !== 1) return 'Fyrir ' + time + ' \xE1rum s\xED\xF0an';
    return 'Fyrir ' + time + ' \xE1ri s\xED\xF0an';
  }

  /* Tekur inn millisekúndurnur sem höfðu liðið frá
    1. jan 1970 þangað til myndbandið var sett inn
    og skilar streng sem segir hvað er langt síðan
    myndbandið var sett inn */
  function timeSinceCreated(created) {
    var oldDate = new Date(created);
    var newDate = Date.now();
    var difference = newDate - oldDate;
    return millisecondsToString(difference);
  }

  function secondToMinutesAndSeconds(totalSeconds) {
    var min = 60;
    var minutes = Math.floor(totalSeconds / min);
    var seconds = totalSeconds % min;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  function element(name, className, child) {
    var el = document.createElement(name);
    el.className = className;
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object') {
      el.appendChild(child);
    }
    return el;
  }

  function showError(error) {
    var errorMessage = element('p', error);
    container.appendChild(errorMessage);
  }

  function addPoster(video) {
    var videoPoster = element('img', 'vidimg');
    videoPoster.src = video.poster;
    return videoPoster;
  }
  function addTitle(video) {
    var videoTitle = element('p', 'vidtitle', video.title);
    return videoTitle;
  }
  function addCreated(video) {
    var videoCreated = element('p', 'vidcreated', timeSinceCreated(video.created));
    return videoCreated;
  }

  /* tekur inn json object sem hefur verið parse-að, býr til div elements fyrir
     hvert category, setur inn titil fyrir hvert category og birtir allar upplýsingar
     fyrir hvert myndband. */
  function addVideoList(data) {
    var videoData = data; // json objectið

    /* Býr til div fyrir hvert category og inni í því divi
       er búið til div utan um hverja mynd og texta tilheyrandi
      þeirri mynd */
    for (var i = 0; i < videoData.categories.length; i += 1) {
      var divTitle = element('h2', 'categorytitle', videoData.categories[i].title);
      var div = element('div', 'category', divTitle);
      for (var j = 0; j < videoData.categories[i].videos.length; j += 1) {
        var innerDiv = element('div', 'imagediv');
        var videoID = videoData.categories[i].videos[j];
        var video = videoData.videos[videoID - 1];
        var videoPoster = addPoster(video);
        var videoTitle = addTitle(video);
        var videoCreated = addCreated(video);
        var linkToVideo = element('a');
        linkToVideo.href = 'video.html?id=' + video.id;
        var imageContainer = element('div', 'imagecontainer');
        var thumbnail = element('div', 'thumbnail', secondToMinutesAndSeconds(video.duration));
        linkToVideo.appendChild(videoPoster);
        imageContainer.appendChild(linkToVideo);
        imageContainer.appendChild(thumbnail);
        innerDiv.appendChild(imageContainer);
        innerDiv.appendChild(videoTitle);
        innerDiv.appendChild(videoCreated);
        div.appendChild(innerDiv);
      }
      container.appendChild(div);

      // Setur border á milli categories
      var borderContainerDiv = element('div', 'bordercontainerdiv');
      var borderDiv = element('div', 'borderdiv');
      borderContainerDiv.appendChild(borderDiv);
      container.appendChild(borderContainerDiv);
    }
  }

  function loadJSON() {
    var r = new XMLHttpRequest();
    r.open('GET', 'videos.json', true);
    r.onload = function load() {
      var data = JSON.parse(r.response);
      if (r.status >= 200 && r.status < 400) {
        addVideoList(data);
      } else {
        showError('Engin myndbönd fundust');
      }
    };
    r.send();
  }

  function init() {
    container = document.querySelector('.container');
    loadJSON();
  }

  return {
    init: init
  };
}();

document.addEventListener('DOMContentLoaded', function () {
  program.init();
});
//# sourceMappingURL=scripts.js.map