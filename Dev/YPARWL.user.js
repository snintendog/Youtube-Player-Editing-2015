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
	var addWatchLater = true;
	var watchLaterAdded = false;
	
	//mouse over the controls to update them (this seems to also work with 2000ms instead of 1000ms)
	var evObj = document.createEvent('Events');
	evObj.initEvent("mousemove", true, false);
	var moviePlayer = document.querySelector(".html5-video-player");
	setInterval(function() 
	{
		if (!moviePlayer)
		{
			moviePlayer = document.querySelector(".html5-video-player");
		}
		else if (!moviePlayer.classList.contains("seeking-mode"))
		{
			moviePlayer.dispatchEvent(evObj); 
		}
		
		if (addWatchLater && !watchLaterAdded && moviePlayer)
		{
			var watchLater = document.querySelector(".ytp-watch-later-button");
			if (watchLater)
			{
				var qaulitybutton = document.querySelector(".ytp-subtitles-button") || document.querySelector(".ytp-settings-button");
				if (qaulitybutton)
				{
					qaulitybutton.parentNode.insertBefore(watchLater, qaulitybutton.nextSibling);
					watchLaterAdded = true;
				}
			}
		}
	}, 1000);
	
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
		//".html5-video-player div { transition-property: none !important; animation: none !important; }",//Animations on Player dissabled
		".videowall-still-image { transform: none !important; }",
		".html5-endscreen * { transition-property: none !important; animation: none !important; }",
		"#player-api:hover .annotation.iv-branding { bottom: 5% !important;}", //move the channel brand annotation visible on hover
    		".annotation.iv-branding {bottom: -30px !important;}", //hides the channel brand behind the controls
    		".ytp-player-content.ytp-iv-player-content{ bottom: 30px}", //fixes the bounceing channel brand
		"#player-api:hover .ytp-button.ytp-cards-button {opacity: 1!important;}", //allow the icard icon to appear on hover
    		".ytp-button.ytp-cards-button { opacity: 0 !important; top: 0% !important;}", //fixes position and hides when not hovering
			
			
			
		///*Control Style*/
		".ytp-chrome-controls{ height: 30px !important; line-height: 30px !important;Display: block !important; }",
		".ytp-progress-bar-container { background: black !important;display: block !important;bottom: 27px !important; }",
		".ytp-gradient-bottom, .ytp-gradient-top {display: none!important;}",
		".ytp-progress-bar-container { width: 96% !important; left: 2% !important; }", //Shrinks the progress bar to fix the offset bug
		".ytp-watch-later-button.ytp-button{ padding: 2px !important; float: right!important;}", //cleans up the watch later restore button to match the rest of the buttons sizes/corrects position
		".ytp-tooltip-image-enabled { bottom: 35px!important; top: auto!important};",//the watchlater popoup	
			
		///*Theater Mode Fix*/
		".watch-wide .watch-playlist{ transform: translateY(89%)!important; margin-bottom: 30px; }", //Fixes wide+playlist/mix
		".watch-stage-mode #theater-background::after {  bottom: -34px!important; left: 0px!important; position: absolute!important; background-color: black!important; height: 0px!important; width: 100%!important; }",
		"body:not(.ytwp-window-player) .watch-stage-mode #watch7-sidebar-contents{ transform: translateY(48px); }",
		"body:not(.ytwp-window-player) .watch-stage-mode #watch7-content { transform: translateY(48px); }",
		".watch-stage-mode #movie_player { height: calc(100% + 31px)!important; }",
	
		///*Fullscreen Fix*/
		".ytp-big-mode video { height: calc(100% - 33px)!important; }",
		".ytp-fullscreen .html5-video-container { height: 100%!important; }",
		".ytp-big-mode .ytp-settings-button.ytp-hd-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-4k-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-5k-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-8k-quality-badge::after{ content:'HD'!important; height: 20% ; width: 28% ; font-size: 50%; line-height: 50%; }",
		".ytp-big-mode .ytp-subtitles-button.ytp-button::after{ top: 70% }",

		///*YTC Compatibility Fixes*/
		".html5-video-content{top: 0% !important; }", //-2% with YTCenter dev >V 531 on now fixed
	//	".video-stream{ margin-top: -2% !important; }", //-2% with YTCenter dev >V 531 on 0% without unknown cause bug does not affect fullscreen but fix does
	//	".ytp-fullscreen .html5-video-container { margin-top: 2% !important; }", //Counters YTC fix in fullscreen. Wonders why I didn't think of this simple fix.
		
		///*Embedded Fixes*/	
	  	"div#player.full-frame{height: calc(100% + 0px) !important;}", //changes controls height but not container only embeds
		"div#player.full-frame:hover .ytp-chrome-bottom, div#player.full-frame:hover .ytp-chrome-top { opacity: 1 !important; }", //shows control bar on hover of embed
		"div#player.full-frame .ytp-chrome-bottom, div#player.full-frame .ytp-chrome-top { opacity: 0 !important; }", //hides control bar on embeds
			
		///*UI Fixes*/
		"#masthead-positioner {position:relative!important;top:0!important;}", //Static Header Fix
		"#masthead-positioner-height-offset{display:none!important}", //Static Header Fix
		".yt-valign-container.guide-count-value{display: none!important;}", // Remove Guide Count
		".video-extras-sparkbar-likes{background: #590 none repeat scroll 0% 0%}", //Green color for likes bar
		".video-extras-sparkbar-dislikes{background: #F00 none repeat scroll 0% 0%}",//red color for dislikes bar
    		".yt-subscription-button-subscriber-count-branded-horizontal.yt-uix-tooltip, .yt-subscription-button-subscriber-count-unbranded-horizontal{display: inline-flex !important;}", //restores sub count next to sub button after subbing
	
	
	].join("\n");
    document.head.appendChild(css);
})();
