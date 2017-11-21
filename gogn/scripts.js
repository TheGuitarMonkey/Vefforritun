
/*document.addEventListener('DOMContentLoaded', function (){
  program.init();
});


var program = (function(){*/

  function timeSinceCreated(created){
    var oldDate = new Date(created);
    var newDate = Date.now();
    var difference = newDate - oldDate
    console.log(difference);
  }

this.timeSinceCreated(1509804047011);

/*return {
  init: init
}

})();*/
