
document.addEventListener('DOMContentLoaded', function (){
  program.init();
});


var program = (function(){
  var newVideos, studyVideos, funVideos;

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
    var time;
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


  function element(name, child) {
    const el = document.createElement(name);

    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (typeof child === 'object') {
      el.appendChild(child)
    }

    return el;
  }
  function loadJSON() {

    const r = new XMLHttpRequest();
r.open('GET', 'videos.json', true);
r.onload = function() {
  var data = JSON.parse(r.response);
  if (r.status >=200 && r.status < 400) {
    console.log(data.videos[0]);
  } else {
    // meðhöndla villu
  }
};

r.send();
   }

  function addVideo(container){
    loadJSON();
  }



  function init(){
    newVideos = document.querySelector('.container_newvideos');
    studyVideos = document.querySelector('.container_studyvideos');
    funVideos = document.querySelector('.container_funvideos');
    addVideo("yo");
  }


return {
  init: init
}

})();
