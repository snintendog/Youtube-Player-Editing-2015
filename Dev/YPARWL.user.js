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
	var moviePlayer = document.querySelector(".html5-video-player");
    setInterval(function() { moviePlayer.dispatchEvent(evObj); }, 1000);
    
//Watch Later Restore	
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
		///*Auto Hide off*/
		"div.ytp-chrome-bottom { opacity: 1 !important; display: block !important; width: 100% !important; left: 0% !important; height: 30px !important; background: black !important; bottom: -2px !important; }",
		
		///*The Player Fixes*/
		".ytp-subtitles-player-content { bottom: 40px !important; }", //subtitles fix no longer bounces or hides on mouse hover
		".ytp-button.ytp-cards-button { top: 0% !important;}",		
		":not(.watch-stage-mode) #movie_player { height: calc(100% + 30px)!important; }",
		"#watch7-content {transform: translateY(30px); }",
		".ytp-bezel {border-radius: 10px!important; }", //Changes the Circle play/pause flash to a rounded square
		
		///*Control Style*/
		".ytp-chrome-controls{ height: 30px !important; line-height: 30px !important;Display: block !important; }",
		".ytp-progress-bar-container { background: black !important;display: block !important;bottom: 27px !important; }",
		".ytp-gradient-bottom {height: 0px !important;}",
		".ytp-watch-later-button.ytp-button{ padding: 2px !important}", //cleans up the watch later restore button to match the rest of the buttons sizes
		".ytp-progress-bar-container { width: 96% !important; left: 2% !important; }", //Shrinks the progress bar to fix the offset bug
			
		///*Theater Mode Fix*/
		".watch-wide .watch-playlist{ transform: translateY(89%)!important; margin-bottom: 30px; }", //Fixes wide+playlist/mix
		".watch-stage-mode #theater-background{  bottom: -34px!important; left: 0px!important; position: absolute!important; background-color: black!important; height: 0px!important; width: 100%!important; }",
		"body:not(.ytwp-window-player) .watch-stage-mode #watch7-sidebar-contents{ transform: translateY(48px); }",
		"body:not(.ytwp-window-player) .watch-stage-mode #watch7-content { transform: translateY(48px); }",
		".watch-stage-mode #movie_player { height: calc(100% + 31px)!important; }",
	
		///*Fullscreen Fix*/
		".ytp-big-mode video { height: calc(100% + 33px)!important; }",
		".ytp-fullscreen .html5-video-container { height: 91%!important; }",
    		".ytp-big-mode .ytp-settings-button.ytp-hd-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-4k-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-5k-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-8k-quality-badge::after{ content:'HD'!important; height: 20% ; width: 28% ; font-size: 50%; line-height: 50%; }",

		///*YTC Compatibility Fixes*/
		".html5-video-content{top: 0% !important; }", //-2% with YTCenter dev >V 531 on now fixed
	//	".video-stream{ margin-top: -2% !important; }", //-2% with YTCenter dev >V 531 on 0% without unknown cause bug does not affect fullscreen but fix does
	//	".ytp-fullscreen .html5-video-container { margin-top: 2% !important; }", //Counters YTC fix in fullscreen. Wonders why I didn't think of this simple fix.
		
		///*Embedded Fixes*/	
	//	".video-stream { height: 95vh !important; }", affects all vids including embeds
	//	".ytp-chrome-top, .ytp-gradient-top { display: none !important; }", //removes the top video title and and bar
		
		///*UI Fixes*/
		"#masthead-positioner {position:relative!important;top:0!important;}", //Static Header Fix
		"#masthead-positioner-height-offset{display:none!important}", //Static Header Fix
		".yt-valign-container.guide-count-value{display: none!important;}", // Remove Guide Count
	
	
	].join("\n");
    document.head.appendChild(css);
})();
