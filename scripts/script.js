// Handle carousel default
$(function(){
	$('.carousel').carousel({
		interval: false,
		wrap:false
	});
});

// Load data from JSON

// var slides = $.get( "test.json", function(data, json) {
// 	populateCarousel(data);
// }).done(function() {
//     console.log("carousel ready");
// }).fail(function() {
//     console.log("error");
// });

var slides = [  
	{  
		id: 41,
		song: "",
		class_name: "",
		start_time: 0,
		blink: 0
	},
	{  
	 	id: 42,
	 	song: "Bob Dylan - Mr. Tambourine Man.mp3",
		class_name: "music",
		start_time: 0,
		blink: 30000
	},
	{
	 	id: 43,
	 	song: "Bob Dylan - Mr. Tambourine Man.mp3",
	 	class_name: "music",
	 	start_time: 30000,
	 	blink: 60000
	},
	{
	 	id: 44,
	 	song: "",
		class_name: "",
		start_time: 0,
		blink: 0
	}
];

var populateCarousel = function(){
	for(var i = 0; i < slides.length; i++){
		var classes = "item " + slides[i].class_name;
		// if (i === 0) {
		// 	classes += " active";
		// }
		var newDiv = '<div class="' + classes + '" id="' + slides[i].id + '"></div>';
		var newImg = '../images/Comics/' + slides[i].id + '.jpg';
		$('<div/>',{
    		'id'    : slides[i].id,
    		'class' : classes
		}).appendTo('.carousel-inner').append(
    		$('<img/>', {
        		'src' : newImg
    		})
		);
	}
};
populateCarousel();

// variables:

var musicOn = false;
var slideNum = -1; // Although index 0, the first slide is manually generated.

//Call event on page flip
$('#myCarousel').on('slid.bs.carousel', function(){
	music();
});

// TODO - Find better solution for slideNum.
$('.right').click(function(){
	slideNum++;
});

$('.left').click(function(){
	slideNum--;
});

// Music hnadler
function music() {

	//TODO - add start_time consideration for cases when we jump to slide.
	// TODO - dynamically choose song
	// Get current music time
	var musicTime = 0;
	if(musicOn) {
		musicTime = Math.floor($('.rotem-music').get(0).currentTime) * 1000;
	}
	console.log('entered music function');
	console.log('current time is: ' + musicTime);
	console.log('slideNum is: ' + slideNum);

	// Reset Blink
	stopBlink();

	// Music is required but already playing
	if($('.active').hasClass('music') && musicOn) {
		
		var blinkTime = slides[slideNum].blink - musicTime;

		console.log('blink is: ' + slides[slideNum].blink + 'blinkTime: ' + blinkTime);
		setBlink(blinkTime);
	} // Music is required and not yet playing 
	else if($('.music').hasClass('active') && !musicOn) {
		startMusic();
		var blinkTime = slides[slideNum].blink;
		console.log('blinkTime: ' + blinkTime);
		setBlink(blinkTime);
		musicOn = true;
	} // no music required
	else {
		stopMusic();
		musicOn = false;
	}
}

function setBlink(time) {
	setTimeout(function(){
		console.log('blink started');
		$('.right').addClass('blink');
	}, time);
}

function stopBlink(time) {
	if($('.right').hasClass('blink')){
    	$('.right').removeClass('blink');
  }
}

var startMusic = function(){
	if($('.rotem-music').get(0).volume === 0) { 
		$('.rotem-music').animate({volume: 1}, 2000);
	}
	$('.rotem-music').get(0).play();
	console.log('Music started!');
};

var stopMusic = function(){
	console.log('Stop Music!!!');
	$('.rotem-music').animate({volume: 0}, 2000);
	setTimeout(function(){
		$('.rotem-music').get(0).pause();
	}, 2000);
};

