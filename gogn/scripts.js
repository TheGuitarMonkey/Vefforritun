
document.addEventListener('DOMContentLoaded', function (){
  program.init();
});


var program = (function(){

  function millisecondsToString(milliseconds){
    var sec = 1000;
    var min = 60*sec;
    var hour = 60*min;
    var day = 24*hour;
    var week = 7*day;
    var month = 30.4375*day;
    var year = 365.25*day;
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
    var oldDate = new Date(created);
    var newDate = Date.now();
    var difference = newDate - oldDate;
    return millisecondsToString(difference);
  }

  function init(){
    console.log(timeSinceCreated(1507804047011));
    console.log(timeSinceCreated(1505904047011));
  }


return {
  init: init
}

})();
