window.onload = function(){
	vid = document.getElementById('my_video');
	document.getElementById('current_time').innerHTML = '00:00/';
	document.getElementById('vid_length').innerHTML = formatTime(Math.floor(vid.duration));
	document.getElementById('control_bar').style.width = vid.offsetWidth;
};

function startLoop() {
	document.getElementById('current_time').innerHTML = formatTime(vid.currentTime)+'/';
	myInterval = setInterval( function(){
	    document.getElementById('current_time').innerHTML = formatTime(vid.currentTime)+'/';
	    document.getElementById('slider').value =(vid.currentTime/vid.duration)*100;
	    if(vid.ended){
	    	document.getElementById('play').style.display = 'block';
				document.getElementById('pause').style.display = 'none';
	    }
	}, 1000 );
}

function formatTime(time){//time =  in seconds
		var hours = Math.floor(time/3600);
		var minutes = Math.floor((time-(3600*hours))/60);
		var seconds = Math.floor(time-(3600*hours)-(60*minutes));
		if(hours && hours < 10){
			hours = '0'+hours;
		}
		if(minutes && minutes < 10 || minutes === 0){
			minutes = '0'+minutes;
		}
		if(seconds && seconds < 10 ||seconds === 0){
			seconds = '0' + seconds;
		}
		return hours? hours + ':':'' + minutes + ':' + seconds
}

function changeTime(){
	var btn = document.getElementById('play_pause');
	vid.currentTime = (vid.duration/100)*document.getElementById('slider').value;
	document.getElementById('current_time').innerHTML = formatTime(vid.currentTime);
	setTimeout(playPause(btn),100);
}

function playPause(btn){
	if(vid.paused){
		document.getElementById('pause').style.display = 'inline-block';
		document.getElementById('play').style.display = 'none';
		vid.play();
		startLoop();
	}else{
		document.getElementById('play').style.display = 'block';
		document.getElementById('pause').style.display = 'none';
		clearInterval(myInterval);
		vid.pause();
		document.getElementById('control_bar').style.display = 'block';
	}
}

function fullscreen() {
	if( window.innerHeight == screen.height) {
		exitFullscreen();
		document.getElementById('fullscreen1').style.display = 'inline-block';
		document.getElementById('exit_fullscreen').style.display = 'none';
  		document.getElementById('control_bar').style.width = vid.offsetWidth;
	}else{
		enterFullscreen();
		document.getElementById('exit_fullscreen').style.display = 'inline-block';
		document.getElementById('fullscreen1').style.display = 'none';
	  document.getElementById('control_bar').style.width = window.innerWidth;
	}
  
}

function enterFullscreen(){
	if(vid.requestFullscreen) {
	  vid.requestFullscreen();
	} else if(vid.mozRequestFullScreen) {
	  vid.mozRequestFullScreen();
	} else if(vid.webkitRequestFullscreen) {
	  vid.webkitRequestFullscreen();
	} else if(vid.msRequestFullscreen) {
	  vid.msRequestFullscreen();
	}
}
function exitFullscreen() {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

	
function showControls(){
	document.getElementById('control_bar').style.display = 'block';
}
function hideControls(){
	if(!vid.paused){
	document.getElementById('control_bar').style.display = 'none';
	}
}

function changeVolume(){
	vid.volume = document.getElementById('volume_slider').value/100;
}
function mute(){
	if(vid.volume === 0){
		vid.volume = 1;
		document.getElementById('volume_on').style.display = 'inline-block';
		document.getElementById('volume_off').style.display = 'none';
		document.getElementById('volume_slider').value = 100;
	}else{
		vid.volume = 0;
		document.getElementById('volume_on').style.display = 'none';
		document.getElementById('volume_off').style.display = 'inline-block';
		document.getElementById('volume_slider').value = 0;
		
	}
}

function exitHandler() {
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
	    document.getElementById('fullscreen1').style.display = 'inline-block';
	document.getElementById('exit_fullscreen').style.display = 'none';
		document.getElementById('control_bar').style.width = vid.offsetWidth;
	}
}

 if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}