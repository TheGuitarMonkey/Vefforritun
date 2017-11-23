//Fyrir video.html
document.addEventListener('DOMContentLoaded', function (){
  var video_div = document.querySelector(".video");
  videoplayer.init(video_div);
});


var videoplayer = (function(){
  var div; // Aðal divvið
  var video; // video elementið
  var controls; // controls divvið

  // Breytur fyrir takkana sem breytast, (play, pause, mute, unmute)
  var play_img;
  var pause_img;
  var mute_img;
  var unmute_img;

  // Breytur fyrir takkana
  var back;
  var playpause;
  var mute;
  var fullscreen;
  var next;

  /**
   * load video
   */
  function load() {
    var vid = 0;
  }

  /**
   * Býr til img element, tekur inn src.
   */
  function imgElement(src) {
    var el = document.createElement('img');
    el.setAttribute('src',src);
    return el;
  }

  /**
   * Býr til video element, tekur inn src.
   */
  function videoElement(src) {
    var el = document.createElement('video');
    el.setAttribute('src',src);
    return el;
  }

  /**
   * Býr til element með klasa. Rekur inn týpu og klasa.
   */
  function element(type, klasi) {
    var el = document.createElement(type);
    el.setAttribute('class',klasi);
    return el;
  }

  /**
   * Eyðir börnum elements.
   */
  function empty(element) {
    while(element.firstChild){
      element.removeChild(element.firstChild);
    }
  }

  /**
   * Returns a div filled with video controls
   */
  function makeControls() {
    var el = element('div','video__controls');
    var img;

    // Takki 1
    back = element('button','video__controls--button');
    img = imgElement('img/back.svg');
    back.appendChild(img);
    el.appendChild(back);

    // Takki 2
    playpause = element('button','video__controls--button');
    img = imgElement('img/play.svg');
    playpause .appendChild(img);
    el.appendChild(playpause);

    // Takki 3
    mute = element('button','video__controls--button');
    img = imgElement('img/mute.svg');
    mute.appendChild(img);
    el.appendChild(mute);

    // Takki 4
    fullscreen = element('button','video__controls--button');
    img = imgElement('img/fullscreen.svg');
    fullscreen.appendChild(img);
    el.appendChild(fullscreen);

    // Takki 5
    next = element('button','video__controls--button');
    img = imgElement('img/next.svg');
    next.appendChild(img);
    el.appendChild(next);

    return el;
  }

  // Föll þegar ýtt er á takka.
  //
  function clickPlaypause() {
    if(video.paused) {
      video.play();
      playpause.removeChild(playpause.firstChild);
      playpause.appendChild(pause_img);
    } else {
      video.pause();
      playpause.removeChild(playpause.firstChild);
      playpause.appendChild(play_img);
    }
  }

  function clickBack() {
    video.currentTime = video.currentTime - 5;
  }

  function clickNext() {
    video.currentTime = video.currentTime + 5;
  }

  function clickMute() {
    if(!video.muted) {
      video.muted = true;
      mute.removeChild(mute.firstChild);
      mute.appendChild(unmute_img);
    } else {
      video.muted = false;
      mute.removeChild(mute.firstChild);
      mute.appendChild(mute_img);
    }
  }

  function clickFullscreen() {
    if(video.requestFullscreen){
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen){
        video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen){
        video.msRequestFullscreen();
    }   
  }

  // ---------- Hér lýkur takkaföllum ------------
  
  function init(video_div) {
    console.log("Hæ! Kveðja frá videoplayer.init()");

    // látum div vera vídjóið
    div = video_div;
    console.log(div);

    // Myndir sem breytast: Play, pause, mute, unmute
    play_img = imgElement('img/play.svg');
    pause_img = imgElement('img/pause.svg');
    mute_img = imgElement('img/mute.svg');
    unmute_img = imgElement('img/unmute.svg');
    console.log(play_img);

    // Vantar að velja vídjó út frá breytu
    video = videoElement('videos/bunny.mp4');
    controls = makeControls();

    // Bæta vídjói og controls í video div
    div.appendChild(video);
    div.appendChild(controls);

    // Event listeners á takkana
    back.addEventListener('click', clickBack);
    playpause.addEventListener('click', clickPlaypause);
    mute.addEventListener('click', clickMute);
    fullscreen.addEventListener('click', clickFullscreen);
    next.addEventListener('click', clickNext);
  }

return {
  init: init
}

})();
