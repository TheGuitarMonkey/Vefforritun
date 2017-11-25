/**
 * Fyrsta tilraun til vídjóspilara
 */
const videoplayer = (function videoplayer() {
  let div; // Aðal divvið
  let video; // video elementið
  let controls; // controls divvið

  // Breytur fyrir takkana sem breytast, (play, pause, mute, unmute)
  let playImg;
  let pauseImg;
  let muteImg;
  let unmuteImg;

  // Breytur fyrir takkana
  let back;
  let playpause;
  let mute;
  let fullscreen;
  let next;

  // Breyta fyrir videos.json
  let data;
  let videoID;

  /**
   * Býr til img element, tekur inn src.
   */
  function imgElement(src) {
    const el = document.createElement('img');
    el.setAttribute('src', src);
    return el;
  }

  /**
   * Býr til video element, tekur inn src, poster
   */
  function videoElement(src, poster) {
    const el = document.createElement('video');
    el.setAttribute('src', src);
    el.setAttribute('poster', poster);
    el.setAttribute('class', 'video__vid');
    return el;
  }

  /**
   * Býr til element með klasa. Tekur inn týpu og klasa.
   */
  function element(type, klasi) {
    const el = document.createElement(type);
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
    const pp = document.querySelector('.video__wrapper--playpause');
    const ol = document.querySelector('.video__wrapper--overlay');
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
    for (let i = 0; i < arr.length; i += 1) {
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
    const el = element('div', 'video__controls');
    let img;

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
    div.appendChild(document.createTextNode('Hahaha loading motherfucker!'));
  }

  function showError() {
    empty(div);
    div.appendChild(document.createTextNode('Æjæjæj... vídjóið fannst ekki... mikið er það leitt.'));
  }

  function showData() {
    empty(div);

    const vid = findVideoByID(data.videos, videoID);

    // Ef vídjó finnst, sýndu það
    if (vid) {
      const titill = element('h1', 'video__title');
      titill.appendChild(document.createTextNode(vid.title));
      const vidwrapper = element('div', 'video__wrapper');
      video = videoElement(vid.video, vid.poster);
      vidwrapper.addEventListener('click', clickPlaypause);
      vidwrapper.appendChild(video);
      vidwrapper.appendChild(element('div', 'video__wrapper--playpause'));
      vidwrapper.appendChild(element('div', 'video__wrapper--overlay'));
      controls = makeControls();

      const link = element('a', 'video__link');
      link.setAttribute('href', 'index.html');
      link.appendChild(document.createTextNode('Til baka'));

      // Bæta vídjói og controls í video div
      div.appendChild(titill);
      div.appendChild(vidwrapper);
      div.appendChild(controls);
      div.appendChild(link);
    } else {
      console.log('else...');
      showError();
    }
  }

  /**
   * load video
   * Finnur út hvaða vídjó skal ná í
   */
  function load() {
    const r = new XMLHttpRequest();
    showLoading();

    r.open('GET', 'videos.json', true);
    r.onload = function onload() {
      data = JSON.parse(r.response);
      if (r.status >= 200 && r.status < 400) {
        showData();
      } else {
        // Hér er showError í sýnilausn
        console.log('villa!', r);
        showError();
      }
    };

    // Fall sem keyrir ef villa kemur upp
    r.onerror = function onerror() {
      // Hér er showError í sýnilausn
      console.log('villa í tengingu');
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
    init,
  };
}());

// Fyrir video.html
document.addEventListener('DOMContentLoaded', () => {
  // Fyrsta tilraun, með fullt af var and stuff
  const videoDiv = document.querySelector('.video');
  videoplayer.init(videoDiv);
});
