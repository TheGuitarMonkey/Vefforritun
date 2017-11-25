
document.addEventListener('DOMContentLoaded', function (){

  program.init();
});


var program = (function(){
  let container;
  let videoData;

  /*Tekur inn millisekúndur og breytir þeim í
    stærstu mögulega einingu(t.d. mínútur, klukkustundur)
    og skilar streng sem lýsir því*/
  function millisecondsToString(milliseconds){
    const sec = 1000;
    const min = 60*sec;
    const hour = 60*min;
    const day = 24*hour;
    const week = 7*day;
    const month = 30*day;
    const year = 365*day;
    let time;
    if(milliseconds < min){
      time = Math.floor(milliseconds/sec);
      if(time != 1)
        return "Fyrir " + time + " sekúndum síðan";
      else{
        return "Fyrir " + time + " sekúndu síðan";
      }
    }
    else if(milliseconds < hour){
      time = Math.floor(milliseconds/min);
      if(time != 1)
        return "Fyrir " + time + " mínútum síðan";
      else{
        return "Fyrir " + time + " mínútu síðan";
      }
    }

    else if(milliseconds < day){
      time = Math.floor(milliseconds/hour);
      if(time != 1)
        return "Fyrir " + time + " klukkustundum síðan";
      else{
        return "Fyrir " + time + " klukkustund síðan";
      }
    }

    else if(milliseconds < week){
      time = Math.floor(milliseconds/day);
      if(time != 1)
        return "Fyrir " + time + " dögum síðan";
      else{
        return "Fyrir " + time + " degi síðan";
      }
    }

    else if(milliseconds < month){
      time = Math.floor(milliseconds/week);
      if(time != 1)
        return "Fyrir " + time + " vikum síðan";
      else{
        return "Fyrir " + time + " viku síðan";
      }
    }

    else if(milliseconds < year){
      time = Math.floor(milliseconds/month);
      if(time != 1)
        return "Fyrir " + time + " mánuðum síðan";
      else{
        return "Fyrir " + time + " mánuði síðan";
      }
    }

    else{
      time = Math.floor(milliseconds/year);
      if(time != 1)
        return "Fyrir " + time + " árum síðan";
      else{
        return "Fyrir " + time + " ári síðan";
      }
    }
  }

  /*Tekur inn millisekúndurnur sem höfðu liðið frá
    1. jan 1970 þangað til myndbandið var sett inn
    og skilar streng sem segir hvað er langt síðan
    myndbandið var sett inn*/
  function timeSinceCreated(created){
    const oldDate = new Date(created);
    const newDate = Date.now();
    const difference = newDate - oldDate;
    return millisecondsToString(difference);
  }

  function secondToMinutesAndSeconds(totalSeconds){
    const min = 60;
    let minutes, seconds;
    minutes = Math.floor(totalSeconds/min);
    seconds = totalSeconds % min;
    if(seconds < 10)
      seconds = "0" + seconds;
    return minutes + ":" + seconds;
  }


  function element(name, className, child) {
    const el = document.createElement(name);
    el.className = className;
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (typeof child === 'object') {
      el.appendChild(child)
    }
    return el;
  }

  function showError(error){
    let errorMessage = element('p', error);
    container.appendChild(errorMessage);
  }

  function loadJSON() {
    const r = new XMLHttpRequest();
    r.open('GET', 'videos.json', true);
    r.onload = function() {
      var data = JSON.parse(r.response);
      if (r.status >=200 && r.status < 400) {
        addVideoList(data);
      } else {
        showError('Engin myndbönd fundust');
      }
    };

    r.send();
   }

   function addPoster(video){
     let videoPoster = element('img', 'vidimg');
     videoPoster.src = video.poster;
     return videoPoster;
   }
   function addTitle(video){
     let videoTitle = element('p', 'vidtitle', video.title);
     return videoTitle;
   }
   function addCreated(video){
     let videoCreated = element('p', 'vidcreated', timeSinceCreated(video.created));
     return videoCreated;
   }


  /*tekur inn json object sem hefur verið parse-að, býr til div elements fyrir
    hvert category, setur inn titil fyrir hvert category og birtir allar upplýsingar
    fyrir hvert myndband.*/
  function addVideoList(data){
    let videoData = data; //json objectið

    /*Býr til div fyrir hvert category og inni í því divi
      er búið til div utan um hverja mynd og texta tilheyrandi
      þeirri mynd*/
    for(let i = 0; i < videoData.categories.length; i++){
      let divTitle = element('h2', 'categorytitle', videoData.categories[i].title);
      let div = element('div', 'category', divTitle);
      for(let j = 0; j < videoData.categories[i].videos.length; j++){
        let innerDiv = element('div', 'imagediv');
        let videoID = videoData.categories[i].videos[j];
        let video = videoData.videos[videoID-1];
        let videoPoster = addPoster(video);
        let videoTitle = addTitle(video);
        let videoCreated = addCreated(video);
        let linkToVideo = element('a');
        linkToVideo.href = "video.html?id=" + video.id;
        let imageContainer = element('div', 'imagecontainer');
        let thumbnail = element('div', 'thumbnail', '' +
        secondToMinutesAndSeconds(video.duration));
        linkToVideo.appendChild(videoPoster);
        imageContainer.appendChild(linkToVideo);
        imageContainer.appendChild(thumbnail);
        innerDiv.appendChild(imageContainer);
        innerDiv.appendChild(videoTitle);
        innerDiv.appendChild(videoCreated);
        div.appendChild(innerDiv);
      }
      container.appendChild(div);

      //Setur border á milli categories
      let borderContainerDiv = element('div', 'bordercontainerdiv');
      let borderDiv = element('div', 'borderdiv');
      borderContainerDiv.appendChild(borderDiv);
      container.appendChild(borderContainerDiv);
    }

  }

  function init(){
    container = document.querySelector('.container');
    loadJSON();
  }


return {
  init: init
}

})();
