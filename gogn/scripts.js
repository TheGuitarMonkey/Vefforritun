
document.addEventListener('DOMContentLoaded', function () {
  program.init();
});

const program = (function () {
  let container;

  /* Tekur inn millisekúndur og breytir þeim í
     stærstu mögulega einingu(t.d. mínútur, klukkustundur)
     og skilar streng sem lýsir því */
  function millisecondsToString(milliseconds) {
    const sec = 1000;
    const min = 60 * sec;
    const hour = 60 * min;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;
    let time;
    if (milliseconds < min) {
      time = Math.floor(milliseconds / sec);
      if (time !== 1) {
        return 'Fyrir ' + time + ' sekúndum síðan';
      }
      return 'Fyrir ' + time + ' sekúndu síðan';
    }
    else if (milliseconds < hour) {
      time = Math.floor(milliseconds / min);
      if (time !== 1) {
        return 'Fyrir ' + time + ' mínútum síðan';
      }
      return 'Fyrir ' + time + ' mínútu síðan';
    }

    else if (milliseconds < day) {
      time = Math.floor(milliseconds / hour);
      if (time !== 1) {
        return 'Fyrir ' + time + ' klukkustundum síðan';
      }
      return 'Fyrir ' + time + ' klukkustund síðan';
    }

    else if (milliseconds < week) {
      time = Math.floor(milliseconds / day);
      if (time !== 1) {
        return 'Fyrir ' + time + ' dögum síðan';
      }
      return 'Fyrir ' + time + ' degi síðan';
    }

    else if (milliseconds < month) {
      time = Math.floor(milliseconds / week);
      if (time !== 1) {
        return 'Fyrir ' + time + ' vikum síðan';
      }
      return 'Fyrir ' + time + ' viku síðan';
    }

    else if (milliseconds < year) {
      time = Math.floor(milliseconds / month);
      if (time !== 1) {
        return 'Fyrir ' + time + ' mánuðum síðan';
      }
      return 'Fyrir ' + time + ' mánuði síðan';
    }

    else{
      time = Math.floor(milliseconds / year);
      if (time !== 1) {
        return 'Fyrir ' + time + ' árum síðan';
      }
      return 'Fyrir ' + time + ' ári síðan';
    }
  }

  /* Tekur inn millisekúndurnur sem höfðu liðið frá
    1. jan 1970 þangað til myndbandið var sett inn
    og skilar streng sem segir hvað er langt síðan
    myndbandið var sett inn */
  function timeSinceCreated(created) {
    const oldDate = new Date(created);
    const newDate = Date.now();
    const difference = newDate - oldDate;
    return millisecondsToString(difference);
  }

  function secondToMinutesAndSeconds(totalSeconds) {
    const min = 60;
    const minutes = Math.floor(totalSeconds / min);
    let seconds = totalSeconds % min;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }


  function element(name, className, child) {
    const el = document.createElement(name);
    el.className = className;
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (typeof child === 'object') {
      el.appendChild(child);
    }
    return el;
  }

  function showError(error) {
    const errorMessage = element('p', error);
    container.appendChild(errorMessage);
  }

  function addPoster(video) {
    const videoPoster = element('img', 'vidimg');
    videoPoster.src = video.poster;
    return videoPoster;
  }
  function addTitle(video) {
    const videoTitle = element('p', 'vidtitle', video.title);
    return videoTitle;
  }
  function addCreated(video) {
    const videoCreated = element('p', 'vidcreated', timeSinceCreated(video.created));
    return videoCreated;
  }


  /* tekur inn json object sem hefur verið parse-að, býr til div elements fyrir
     hvert category, setur inn titil fyrir hvert category og birtir allar upplýsingar
     fyrir hvert myndband. */
  function addVideoList(data) {
    const videoData = data; // json objectið

    /* Býr til div fyrir hvert category og inni í því divi
       er búið til div utan um hverja mynd og texta tilheyrandi
      þeirri mynd */
    for (let i = 0; i < videoData.categories.length; i += 1) {
      const divTitle = element('h2', 'categorytitle', videoData.categories[i].title);
      const div = element('div', 'category', divTitle);
      for (let j = 0; j < videoData.categories[i].videos.length; j += 1) {
        const innerDiv = element('div', 'imagediv');
        const videoID = videoData.categories[i].videos[j];
        const video = videoData.videos[videoID - 1];
        const videoPoster = addPoster(video);
        const videoTitle = addTitle(video);
        const videoCreated = addCreated(video);
        const linkToVideo = element('a');
        linkToVideo.href = 'video.html?id=' + video.id;
        const imageContainer = element('div', 'imagecontainer');
        const thumbnail = element('div', 'thumbnail', secondToMinutesAndSeconds(video.duration));
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
      const borderContainerDiv = element('div', 'bordercontainerdiv');
      const borderDiv = element('div', 'borderdiv');
      borderContainerDiv.appendChild(borderDiv);
      container.appendChild(borderContainerDiv);
    }
  }

  function loadJSON() {
    const r = new XMLHttpRequest();
    r.open('GET', 'videos.json', true);
    r.onload = function () {
      const data = JSON.parse(r.response);
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
    init,
  };
})();
