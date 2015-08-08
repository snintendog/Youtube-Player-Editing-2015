// ==UserScript==
// @name        Youtube Player August 2015
// @namespace   meh
// @description Brings back the old player and restores Watch later button
// @author      snintendog-MechaLynx
// @include     https://www.youtube.com/*
// @version     0.0.1
// @grant       none
// ==/UserScript==

(function() {
	//mouse over the controls to update them (this seems to also work with 2000ms instead of 1000ms)
	var evObj = document.createEvent('Events');
	evObj.initEvent("mousemove", true, false);
	var moviePlayer = document.getElementById("movie_player");
    setInterval(function() { moviePlayer.dispatchEvent(evObj); }, 1000);
	
var origbutt = document.getElementsByClassName('ytp-watch-later-button ytp-button')[0]
var watchlaterbutt = origbutt.cloneNode(1);

watchlaterbutt.style.float = 'right';
watchlaterbutt.addEventListener('click', function(e){
    origbutt.click();
})

document.getElementsByClassName('ytp-chrome-controls')[0].appendChild(watchlaterbutt);


	
	//the css: 
	var css = document.createElement('style');
    css.type = "text/css";
    css.textContent = [
		"div.ytp-chrome-bottom { opacity: 1 !important; display: block !important; width: 100% !important; left: 0% !important; height: 30px !important; background: black !important; bottom: -2px !important; }",
		".ytp-subtitles-player-content { bottom: 40px !important; }", //subtitles fix no longer bounces or hides on mouse hover
		".ytp-watch-later-button.ytp-button{ padding: 2px !important}", //cleans up the watch later restore button to match the rest of the buttons sizes
		".ytp-gradient-bottom {height: 0px !important;}",
		".ytp-chrome-controls{ height: 30px !important; line-height: 30px !important;Display: block !important; }",
		".ytp-progress-bar-container { background: black !important;display: block !important;bottom: 27px !important; }",
		".watch-stage-mode #movie_player { height: calc(100% + 31px)!important; }",
		":not(.watch-stage-mode) #movie_player { height: calc(100% + 30px)!important; }",
		"#watch7-content {transform: translateY(30px); }",
		"body:not(.ytwp-window-player) .watch-stage-mode #watch7-sidebar-contents{ transform: translateY(48px); }",
		"body:not(.ytwp-window-player) .watch-stage-mode #watch7-content { transform: translateY(48px); }",
		".ytp-big-mode video { height: calc(100% + 33px)!important; }",
		".watch-stage-mode #theater-background{  bottom: -34px!important; left: 0px!important; position: absolute!important; background-color: black!important; height: 0px!important; width: 100%!important; }",
		".html5-video-container { height: 91%!important; }",
		".ytp-button.ytp-cards-button { top: 0% !important;}",
		".watch-wide .watch-playlist{ transform: translateY(89%)!important; margin-bottom: 30px; }", //Fixes wide+playlist/mix
		".html5-video-content{top: 0% !important; }", //-3% with YTCenter dev >V 531 on now fixed
	//	".video-stream{ margin-top: -3% !important; }", //-3% with YTCenter dev >V 531 on 0% without unknown cause bug does not affect fullscreen but fix does
	].join("\n");
    document.head.appendChild(css);
})();