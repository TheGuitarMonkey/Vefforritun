'use strict';

/**
 * Fyrsta tilraun til vídjóspilara
 */
var videoplayer = function videoplayer() {
  var div = void 0; // Aðal divvið
  var video = void 0; // video elementið
  var controls = void 0; // controls divvið

  // Breytur fyrir takkana sem breytast, (play, pause, mute, unmute)
  var playImg = void 0;
  var pauseImg = void 0;
  var muteImg = void 0;
  var unmuteImg = void 0;

  // Breytur fyrir takkana
  var back = void 0;
  var playpause = void 0;
  var mute = void 0;
  var fullscreen = void 0;
  var next = void 0;

  // Breyta fyrir videos.json
  var data = void 0;
  var videoID = void 0;

  /**
   * Býr til img element, tekur inn src.
   */
  function imgElement(src) {
    var el = document.createElement('img');
    el.setAttribute('src', src);
    return el;
  }

  /**
   * Býr til video element, tekur inn src, poster
   */
  function videoElement(src, poster) {
    var el = document.createElement('video');
    el.setAttribute('src', src);
    el.setAttribute('poster', poster);
    el.setAttribute('class', 'video__vid');
    return el;
  }

  /**
   * Býr til element með klasa. Tekur inn týpu og klasa.
   */
  function element(type, klasi) {
    var el = document.createElement(type);
    el.setAttribute('class', klasi);
    return el;
  }

  /**
   * Eyðir börnum elements.
   */
  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  /**
   * ATH breyta!!
   * Bætir div með class overlay á video__wrapper
   */
  function videoOverlay(bool) {
    var pp = document.querySelector('.video__wrapper--playpause');
    var ol = document.querySelector('.video__wrapper--overlay');
    if (bool) {
      pp.style.display = '';
      ol.style.display = '';
    } else {
      pp.style.display = 'none';
      ol.style.display = 'none';
    }
  }

  /**
   * Fær inn fylki og id, skilar því vídjói sem hefur það id. Ef ekkert finnst,
   * þá null.
   */
  function findVideoByID(arr, id) {
    for (var i = 0; i < arr.length; i += 1) {
      if (arr[i].id === id) {
        return arr[i];
      }
    }
    return null;
  }

  /**
   * Nær í id úr url. Fallið gerir ráð fyrir að strengurinn url sé á forminu
   * www.example.com/?id=4 og að ekki séu fleiri breytur en id í url
   */
  function getID() {
    return parseInt(window.location.search.substr(4), 10);
  }

  // Föll þegar ýtt er á takka.
  //
  function clickPlaypause() {
    if (video.paused) {
      video.play();
      videoOverlay(false);
      playpause.removeChild(playpause.firstChild);
      playpause.appendChild(pauseImg);
    } else {
      video.pause();
      videoOverlay(true);
      playpause.removeChild(playpause.firstChild);
      playpause.appendChild(playImg);
    }
  }

  function clickBack() {
    video.currentTime -= 3;
  }

  function clickNext() {
    video.currentTime += 3;
  }

  function clickMute() {
    if (!video.muted) {
      video.muted = true;
      mute.removeChild(mute.firstChild);
      mute.appendChild(unmuteImg);
    } else {
      video.muted = false;
      mute.removeChild(mute.firstChild);
      mute.appendChild(muteImg);
    }
  }

  function clickFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  }
  // ---------- Hér lýkur takkaföllum ------------

  /**
   * Returns a div filled with video controls
   */
  function makeControls() {
    var el = element('div', 'video__controls');
    var img = void 0;

    // Takki 1
    back = element('button', 'video__controls--button');
    img = imgElement('img/back.svg');
    back.appendChild(img);
    el.appendChild(back);

    // Takki 2
    playpause = element('button', 'video__controls--button');
    img = imgElement('img/play.svg');
    playpause.appendChild(img);
    el.appendChild(playpause);

    // Takki 3
    mute = element('button', 'video__controls--button');
    img = imgElement('img/mute.svg');
    mute.appendChild(img);
    el.appendChild(mute);

    // Takki 4
    fullscreen = element('button', 'video__controls--button');
    img = imgElement('img/fullscreen.svg');
    fullscreen.appendChild(img);
    el.appendChild(fullscreen);

    // Takki 5
    next = element('button', 'video__controls--button');
    img = imgElement('img/next.svg');
    next.appendChild(img);
    el.appendChild(next);

    // Event listeners á takkana
    back.addEventListener('click', clickBack);
    playpause.addEventListener('click', clickPlaypause);
    mute.addEventListener('click', clickMute);
    fullscreen.addEventListener('click', clickFullscreen);
    next.addEventListener('click', clickNext);

    return el;
  }

  function showLoading() {
    empty(div);
    var p = element('p', 'video__loading');

    p.appendChild(document.createTextNode('Loading...'));
    div.appendChild(p);
  }

  function showError() {
    empty(div);
    var p = element('p', 'video__error');
    p.appendChild(document.createTextNode('Vídjóið fannst ekki... mikið er það leitt.'));
    div.appendChild(p);
    var link = element('a', 'video__link');
    link.setAttribute('href', 'index.html');
    link.appendChild(document.createTextNode('Til baka'));
    div.appendChild(link);
  }

  function showData() {
    empty(div);

    var vid = findVideoByID(data.videos, videoID);

    // Ef vídjó finnst, sýndu það
    if (vid) {
      var titill = element('h1', 'video__title');
      titill.appendChild(document.createTextNode(vid.title));
      var vidwrapper = element('div', 'video__wrapper');
      video = videoElement(vid.video, vid.poster);
      vidwrapper.addEventListener('click', clickPlaypause);
      vidwrapper.appendChild(video);
      vidwrapper.appendChild(element('div', 'video__wrapper--playpause'));
      vidwrapper.appendChild(element('div', 'video__wrapper--overlay'));
      controls = makeControls();

      var link = element('a', 'video__link');
      link.setAttribute('href', 'index.html');
      link.appendChild(document.createTextNode('Til baka'));

      // Bæta vídjói og controls í video div
      div.appendChild(titill);
      div.appendChild(vidwrapper);
      div.appendChild(controls);
      div.appendChild(link);
    } else {
      showError();
    }
  }

  /**
   * load video
   * Finnur út hvaða vídjó skal ná í
   */
  function load() {
    var r = new XMLHttpRequest();
    showLoading();

    r.open('GET', 'videos.json', true);
    r.onload = function onload() {
      data = JSON.parse(r.response);
      if (r.status >= 200 && r.status < 400) {
        showData();
      } else {
        // Hér er showError í sýnilausn
        showError();
      }
    };

    // Fall sem keyrir ef villa kemur upp
    r.onerror = function onerror() {
      // Hér er showError í sýnilausn
      showError();
    };
    r.send();
  }

  function init(videoDiv) {
    // látum div vera vídjóið
    div = videoDiv;
    videoID = getID();

    // Myndir sem breytast: Play, pause, mute, unmute
    playImg = imgElement('img/play.svg');
    pauseImg = imgElement('img/pause.svg');
    muteImg = imgElement('img/mute.svg');
    unmuteImg = imgElement('img/unmute.svg');

    load();
  }

  return {
    init: init
  };
}();

// Fyrir video.html
document.addEventListener('DOMContentLoaded', function () {
  // Fyrsta tilraun, með fullt af var and stuff
  var videoDiv = document.querySelector('.video');
  videoplayer.init(videoDiv);
});
//# sourceMappingURL=vscripts.js.map