$(function(){
	$('.carousel').carousel({
		interval: false,
		wrap:false
	});
});

var musicOn = false;

function blink(time) {
  window.setTimeout(function(){
  $('.right').addClass('blink');
  }, time);
}
//Starts music
function playClip(){
  if($('.right').hasClass('blink')){
    $('.right').removeClass('blink');
  }
  if($('.stop').hasClass('active') && musicOn){
    $('.rotem-music').get(0).pause();
    musicOn = false;
  }
    if($('.rotem').hasClass('active') && !musicOn){
		  //$('.rotem-music').get(0).currentTime = 65;
      $('.rotem-music').get(0).play();
      musicOn = true;
      blink(30000); //TODO - bring time from JSON
    }
}

function stopMusic(name, time){
   setTimeout( function(){
   		$(name).get(0).pause();
   		musicOn = false;}, time);
   console.log('timer set');
}

$('.carousel-control').click(playClip);

// window.setInterval(playClip,1000); // Check if relevant slide is active

/* Psuedo - for script:

set an interval for the intial call
Clear it in the playClip function
Have a stopmusic function

add a test for if the music is on

call the function in every slide with music and have it receive a start time.*/