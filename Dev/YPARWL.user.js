// ==UserScript==
// @name        Youtube Player August 2015
// @namespace   meh
// @description Brings back the old player and restores Watch later button
// @author      snintendog-MechaLynx
// @include     https://www.youtube.com/*
// @exclude			https://www.youtube.com/feed/trending
// @exclude			https://www.youtube.com/embed/*
// @version     0.0.1
// @grant       none
// ==/UserScript==

/*	var elem = document.getElementById("guide-subscriptions-section");
elem.remove();*/

/*$("guide-subscriptions-section").remove();*/

/*var videos = document.getElementsByTagName('video');
window.addEventListener('load', stopVideo, false);
function stopVideo()
{
    for (var i=0; i<videos.length; i++)
    {
        videos[i].pause();
        video.currentTime = 0;
    }
}*/

(function () {
    "use strict";
    function nukeSubs() {
        var guideSubs = document.getElementById("guide-subscriptions-section");
        // or use "guide-channels" instead to show the "SUBSCRIPTIONS" link title
        if (guideSubs) {
            guideSubs.remove();
        }
    }
    document.addEventListener("readystatechange", nukeSubs);
    document.addEventListener("load", nukeSubs, true);
}());



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

//Removes Autoplay Up next checkbox andsets it to off
function f() {
  try {
    var node = document.getElementById('autoplay-checkbox').parentNode.parentNode;
    if (node.className == 'checkbox-on-off')
      node.parentNode.removeChild(node);
  }
  catch (e) {}
}
	
f();
document.body.addEventListener('DOMSubtreeModified', f, false);

	
	// Sets to Auto pause and start Buffering
/*(function() {
'use strict';

function forcePause(video) {
	function resetPause() {
		video.pause();
		video.currentTime = 0;
	}
	video.addEventListener('playing', resetPause, false);
	var timeout = document.hasFocus() ? 500 : 1000;
	window.setTimeout(function() {
		video.removeEventListener('playing', resetPause, false);
	}, timeout);
}

function forcePlay(video) {
	function onClick() {
		video.removeEventListener('click', onClick, false);
		function onPause() {
			video.play();
		}
		video.addEventListener('pause', onPause, false);
		window.setTimeout(function() {
			video.removeEventListener('pause', onPause, false);
		}, 750);
		onPause();
	}
	video.addEventListener('click', onClick, false);
	function onPlay() {
		video.removeEventListener('click', onClick, false);
		video.removeEventListener('play', onPlay, false);
	}
	window.setTimeout(function() {
		video.addEventListener('play', onPlay, false);
	}, 250);
}

var MOVIE_PLAYER = '#movie_player';
var YTP_TIME_LIVE = '.ytp-time-live,.ytp-time-liveonly,.ytp-time-live-dvr,.ytp-live-badge';
var YTP_BUTTON_PAUSE = '.ytp-button-pause';
var YTP_PLAY_BUTTON = '.ytp-play-button';

function onLoadedmetadata(event) {
	var video = event.target;
	var movie_player = document.querySelector(MOVIE_PLAYER);
	if(!movie_player) {
		video.pause();
		forcePause(video);
		forcePlay(video);
		return;
	}
	if(movie_player.querySelector(YTP_TIME_LIVE) &&
		movie_player.querySelector(YTP_TIME_LIVE).getAttribute('disabled') !== 'true')
		return;
	function onPlaying() {
		if(location.href.indexOf('list=') != -1)
			return;
		if(movie_player.pauseVideo) {
			movie_player.pauseVideo();
			if(movie_player.seekTo && location.href.indexOf('t=') == -1)
				movie_player.seekTo(0);
		}
		else {
			var ytp_button = movie_player.querySelector(YTP_BUTTON_PAUSE) || movie_player.querySelector(YTP_PLAY_BUTTON);
			if(ytp_button && ytp_button.click)
				ytp_button.click();
		}
	}
	video.addEventListener('playing', onPlaying, false);
	window.setTimeout(function() {
		video.removeEventListener('playing', onPlaying, false);
	}, 1000);
}
window.addEventListener('loadedmetadata', onLoadedmetadata, true);

})();*/

	
	//the css: 
	var css = document.createElement('style');
    css.type = "text/css";
    css.textContent = [
		///*Auto Hide off*/
		"div.ytp-chrome-bottom { opacity: 1 !important; display: block !important;  height: 30px !important; background: black !important; max-width: 100% !important; min-width: 0% !important; }",
		"div.ytp-chrome-bottom:not(.ytp-fullscreen) {bottom: -35px}",
		".ytp-big-mode .ytp-chrome-bottom{bottom:-2px!important;}",
		"#player-api:not(.ytp-big-mode) {overflow:hidden; padding-bottom: 35px;}",
		".html5-video-player {overflow: visible!important;}",
			
		///*The Player Fixes*/
		".ytp-subtitles-player-content { bottom: 40px !important; }", //subtitles fix no longer bounces or hides on mouse hover
		".caption-window.ytp-caption-window-bottom {	margin-bottom:30px!important; }",
		".ytp-button.ytp-cards-button { top: 0% !important;}",		
		//"#movie_player:not(.ytp-big-mode) { padding-bottom: 33px!important; }",
		"#watch7-content {transform: translateY(30px); }",
		//".ytp-bezel {border-radius: 10px!important; }", //Changes the Circle play/pause flash to a rounded square
			".ytp-bezel {display: none !important; }",
		//".html5-video-player div { transition-property: none !important; animation: none !important; }",//Animations on Player dissabled
		".videowall-still-image { transform: none !important; }",
		".html5-endscreen * { transition-property: none !important; animation: none !important; }",
		"#player-api:hover .annotation.iv-branding { transform: rotateY(0deg) !important; bottom: 5% !important;}", //move the channel brand annotation visible on hover
    ".annotation.iv-branding {transform: rotateY(90deg) !important; transition: transform .5s; bottom: 5% !important;}", //hides the channel brand behind the controls
    ".ytp-player-content.ytp-iv-player-content{ bottom: 30px;}", //fixes the bounceing channel brand
    "#player-api:hover .ytp-button.ytp-cards-button {opacity: 1!important;}", //allow the icard icon to appear on hover
    ".ytp-button.ytp-cards-button { opacity: 0 !important; top: 0% !important;}", //fixes position and hides when not hovering
		".ytp-ce-element{transform: translateY(-14%)!important;}",
		".ytp-iv-drawer-open .iv-drawer {height: 92% !important; }",
			
		///*Text card bar at top*/
		".ytp-cards-button-icon-shopping,.ytp-cards-teaser{opacity: 0!important;}",
		".ytp-cards-button-icon-shopping:hover,.ytp-cards-teaser:hover{opacity: 1!important;}",
			
		
		///*End cards fix*/
		".html5-endscreen.ytp-endscreen-paginate{ left: 0px !important; right: 0px !important; bottom: 32px !important; }",	
		".html5-endscreen{background:black none repeat scroll 0 0!important;}",
		".ytp-big-mode .ytp-player-content {top: 0px!important; bottom: 0px!important;}",
		".ytp-autohide .ytp-player-content:not(.html5-endscreen), .ytp-hide-info-bar .ytp-player-content {top: 0px!important;bottom: 33px!important;}",	
			
		///*Control Style*/
		"#movie_player:not(.ytp-fullscreen) .ytp-chrome-bottom { border: 0px solid #000; border-width: 1px 12px 0px 12px!important; left:0 !important;}",
		".ytp-chrome-controls{ height: 30px !important; line-height: 30px !important;Display: block !important; }",
		".ytp-progress-bar-container { background: black !important;display: block !important;bottom: 29px !important; }",
		".ytp-gradient-bottom, .ytp-gradient-top {display: none!important;}",
			".ytp-progress-list {transform-origin: center bottom !important;}",
			"#movie_player:not(.ytp-fullscreen) .ytp-chrome-controls {padding-left: 0; padding-right: 0; margin-left: -12px; margin-right: -12px; }",
		//".ytp-progress-bar-container { width: 96% !important; left: 2% !important; }", //Shrinks the progress bar to fix the offset bug
			".ytp-watch-later-icon {height: 26px !important; width 36px !important;}",
		".ytp-watch-later-button.ytp-button{ padding: 2px !important; float: left !important; opacity: 1 !important;}", //cleans up the watch later restore button to match the rest of the buttons sizes/corrects position
		".ytp-tooltip-image-enabled ,.ytp-tooltip.ytp-bottom{ bottom: 35px!important; top: auto!important;}",//the watchlater popoup	
			".ytp-time-display {font-size: 90%; line-height: 29px !important;}",
			".ytp-volume-slider-handle { }",
			".ytp-volume-slider-handle::before { background: red; left: -64px }",
			".ytp-big-mode .ytp-volume-slider-handle::before { background: red; left: -96px }",
			".ytp-subtitles-button.ytp-button {display: inline !important;}",
		
		///*Progress Bar Minimizes to stretch across player*/
		"#movie_player:not(.ytp-fullscreen) .ytp-progress-bar-container:not(:hover) .ytp-progress-list{width: calc(100% + 24px); transition: width,margin-left .25s;}",	
		"#movie_player:not(.ytp-fullscreen) .ytp-progress-list{margin-left: -12px;}",
		"#movie_player:not(.ytp-fullscreen) .ytp-progress-bar-container:hover .ytp-progress-list{margin-left: 0px!important; width: 100% !important; transition: width,margin-left .25s;}",	

			
		///*Related Panel Style*/
		".exp-wn-font-14 .related-list-item span.title{font-size: 13px}",
		".yt-uix-simple-thumb-related,.exp-wn-big-thumbs-v3 .related-list-item .thumb-wrapper, .exp-wn-big-thumbs-v3 .related-list-item .yt-pl-thumb .yt-thumb, .exp-wn-big-thumbs-v3 .related-list-item .yt-pl-thumb, .exp-wn-big-thumbs .related-list-item .yt-uix-simple-thumb-related img {max-height: 63px; max-width: 110px;}",
		".exp-wn-big-thumbs-v3 .related-list-item .content-wrapper{margin-left: 120px;}",
		".exp-wn-big-thumbs-v3 .related-list-item .content-link{min-height: 60px}",
		"div.watch-sidebar-body{margin: 0px;}",
			".related-list-item .thumb-wrapper, .yt-uix-simple-thumb-related > img, .video-list-item .ux-thumb-wrap, .video-list-item .yt-pl-thumb {height: 70px !important; width: 110px !important;}",
			".related-list-item .content-wrapper{margin-left: 120px !important; height: 70px !important; }",
			".video-list .video-list-item .title {font-size: 13px !important; }",
			".related-list-item .content-link {min-height: 70px !important;}",
			".related-item-dismissable .title{ margin-right: 0px !important;}",
			"#watch7-sidebar .watch-sidebar-section{ margin: 0 0 5px 5px !important;}",
			".yt-pl-thumb .formatted-video-count-label { margin:0 0em !important; width: 90% !important; }",
			".yt-pl-thumb .formatted-video-count-label b, .yt-pl-icon{ font-size: 14px!important; line-height: 10px!important; float: left!important}",
			" {}",
			
  	///*Search page style*/
    "#results .yt-lockup-tile {padding: 5px 5px!important;}",
    ".exp-search-big-thumbs #results .yt-lockup-tile .yt-lockup-thumbnail, .exp-search-big-thumbs #results .yt-lockup-tile .yt-thumb-simple img{max-height: 110px!important; max-width: 190px!important; min-width: 10px!important; min-height: 50px!important; }",
		///*Theater Mode Fix*/
		".watch-stage-mode #theater-background { bottom: -34px!important; left: 0px!important; position: absolute!important; background-color: #f1f1f1!important; height: 0px!important; width: 100%!important; }",
		".watch-wide .watch-playlist{ transform: translateY(84%)!important; margin-bottom: 30px; }", //Fixes wide+playlist/mix
		"body:not(.ytwp-window-player) .watch-stage-mode #watch7-sidebar-contents{ transform: translateY(48px); }",
			"body:not(.ytwp-window-player) .watch-stage-mode #watch7-content { transform: translateY(48px); }",
		
			".watch-stage-mode #theater-background {background-color: transparent !important;}",
		".watch-stage-mode #watch7-sidebar-discussion {margin-top: 12%;}",
		
		
		///*Fullscreen Fix*/
		".ytp-big-mode video { height: calc(100% + 33px)!important; }",
		".ytp-fullscreen .html5-video-container { height: 92%!important; }",
		".ytp-big-mode .ytp-settings-button.ytp-hd-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-4k-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-5k-quality-badge::after,.ytp-big-mode .ytp-settings-button.ytp-8k-quality-badge::after{ content:'HD'!important; height: 20% ; width: 28% ; font-size: 50%; line-height: 50%; }",
		".ytp-big-mode .ytp-subtitles-button.ytp-button::after{ top: 70%; }",
		".ytp-big-mode .ytp-chrome-top{ display: none !important;}",
			
		///*4:3 Fixes*/
    //":not(.watch-stage-mode) .html5-main-video {max-height: 360px;}",
    //".watch-stage-mode .html5-main-video {max-height: 480px;}",
    //".ytp-fullscreen .html5-main-video{max-height: 1080px ;}",
    //".ytp-big-mode .html5-video-container{max-height: 1080px !important; }",
			
		///*YTC Compatibility Fixes*/
		".html5-main-video{top: 0px !important; }", //YT+ needs this fix now at 0px.
		//".video-stream{margin-top: -17px !important;}", //Issue with YT+ needs -17px or -34px
			".ytp-thumbnail-overlay-image{background-size: 100% ; }", ".ytp-thumbnail-overlay {height:92% !important; }", //issue with YT+ needs -17px and possibly scaling. -2% with YTCenter dev >V 531 on 0% without unknown cause bug does not affect fullscreen but fix does
		//".ytp-fullscreen .html5-video-container { margin-top: 17px !important; }", //Counters YTC fix in fullscreen. Wonders why I didn't think of this simple fix.
			".guide-pinned.show-guide .guide-pinning-enabled #P-container{padding-left: 0px !important;}",
			///*YT+ Compatiblity Fixes*/
		/*"#movie_player:not(.ended-mode) .html5-video-container video{Height: calc(100% - 30px) !important;}",*/
			"#Psettings {float: left;}",
			"#upload-btn {float: left !important;}", 
			
		///*Embedded Fixes*/	
		//"div#player.full-frame{margin-top: 0% !important;}",	
	  //"div#player.full-frame{height: calc(100% + 0px) !important;}", //changes controls height but not container only embeds
		//"div#player.full-frame:hover .ytp-chrome-bottom, div#player.full-frame:hover .ytp-chrome-top { opacity: 1 !important;}", //shows control bar on hover of embed
		//"div#player.full-frame .ytp-chrome-bottom, div#player.full-frame .ytp-chrome-top { opacity: 0 !important; }", //hides control bar on embeds
		//"div#player.full-frame .ytp-chrome-bottom { border: 0px solid #000; border-width: 0px 12px 0px 12px!important; left:0 !important;}",
			
		///*UI Fixes*/
			".yt-dialog-bg {display: none!important;}", ///*White out diag box backgound for youtube reports*/
			".ytp-iv-video-content{top: 0px !important;}",
		"#masthead-positioner {position:relative!important;top:0!important;}", //Static Header Fix
		"#masthead-positioner-height-offset{display:none!important;}", //Static Header Fix
		".yt-valign-container.guide-count-value{display: none!important;}", // Remove Guide Count
		//".ytp-chrome-bottom, .ytp-chrome-controls, .ytp-progress-bar-container {border-color: gray !important; background: gray !important;}",// Contols Color
		".ytp-color-white .ytp-swatch-background-color{background-color: Red !important;}", //Scrubber Color
		".video-extras-sparkbar-likes{background: #590 none repeat scroll 0% 0%;}", //Green color for likes bar
		".video-extras-sparkbar-dislikes{background: #F00 none repeat scroll 0% 0%;}",//red color for dislikes bar
		//".ytp-volume-slider-handle::before {background: red none repeat scroll 0 0 !important;}",// Volume bar Color
    ".yt-subscription-button-subscriber-count-branded-horizontal.yt-uix-tooltip, .yt-subscription-button-subscriber-count-unbranded-horizontal{display: inline-flex !important;}", //restores sub count next to sub button after subbing
	  "#guide-subscriptions-section{display: none;}",
		".guide-pinned .guide-pinning-enabled #appbar-guide-menu{postion: absolute;}",
		//"#guide-subscriptions-section {overflow-y: hidden; overflow-x: hidden; max-height: 50px;}",
		//"#guide-channels {height: 530px;}",
			
		///*Like/Unlike Button colors*/
    ///*Like button*/
			//".like-button-renderer-like-button-unclicked::before, .like-button-renderer-like-button-unclicked::after {}",
			".like-button-renderer-like-button-unclicked:hover::before, .like-button-renderer-like-button-unclicked:hover::after, .like-button-renderer-like-button-clicked:hover::before, .like-button-renderer-like-button-clicked:hover::after, .like-button-renderer-like-button.yt-uix-button:active::before, .like-button-renderer-like-button.yt-uix-button.yt-uix-button-toggled::before {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA%2FklEQVQ4jd3TIUsEYRDG8T8ajBY%2FhKD9bJ7RdmVmd4MfwXQYBfuBGCzPrMEmnMVkFUwWrTYNCtpNXlnL3SF3ewvrvckHpr3zG16GgX8bC25cnCfBXPRNVBa8LQUd3rLmwcBEZaLy4PPPmAW7Jp4n2Bi8ag%2BJdReXvyETlYtRdsF2Kywr2XHxWodZSdbYnJd085LuZGoW7LsYzWLTCl4suLaSo1x0TipWZr82fQxgwdlCrL7eU4NPSUEXx0nBQmwmA108zm15SbCfDgy%2BC7GRDHQxnMMAXPRc9HLRgfGVBAML7k18NYB7tWBTbMhqEWxZcODBqQV3Jj5MPLTG2uYHwfFWWxOdg3AAAAAASUVORK5CYII%3D);}",
			".like-button-renderer-like-button-unclicked:hover .yt-uix-button-content{color:#590;}",
			//".like-button-renderer-like-button-unclicked .yt-uix-button-content{}",
			".like-button-renderer-like-button-clicked:hover .yt-uix-button-content{color: #590;}",
			".like-button-renderer-like-button-clicked .yt-uix-button-content{color: #590 !important;}",
		///*Dislike Button*/
			//".like-button-renderer-dislike-button-unclicked::before, .like-button-renderer-dislike-button-unclicked::after{}",
			".like-button-renderer-dislike-button-unclicked:hover::before, .like-button-renderer-dislike-button-unclicked:hover::after, .like-button-renderer-dislike-button.yt-uix-button:active::before, .like-button-renderer-dislike-button.yt-uix-button.yt-uix-button-toggled::before, .like-button-renderer-dislike-button-clicked:hover::before, .like-button-renderer-dislike-button-clicked:hover::after{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA0UlEQVQ4jdXTMQ4BURDG8X8olBqHkNDTodRtp3KKjdIJNhGFA%2BgkNG4gUWlodRQk9CqaT2Eim7U2u%2Bs1vmSal5nfFO89%2BMsINoKLYCUYCfqCmqCYB%2BsI9KVugrUgEDStvyHwBN43cJ4Ahmts%2Fe%2BzOKwiuLsE%2FZRYanDrDBRUM2CpwKFrcOcaPLsGC3o90oFgITgkYA9B1%2Bbqgrag%2FXHLkQU9G4xiR9kvSR3bGodNBeVMmIGzCLQXtDJDIfAawgJBKTdm4Mkw%2FycoBE4ESyfYr3kCsM9h5QX1lRAAAAAASUVORK5CYII%3D);}",
			".like-button-renderer-dislike-button-unclicked:hover .yt-uix-button-content{color:#F00;}",
			//".like-button-renderer-dislike-button-unclicked .yt-uix-button-content{}",
			".like-button-renderer-dislike-button-clicked:hover .yt-uix-button-content{color: #F00;}",
			".like-button-renderer-dislike-button-clicked .yt-uix-button-content{color: #F00!important;}",
			"#comment-section-renderer .sprite-comment-actions, #comment-section-renderer .sprite-comment-actions:hover {border-color: transparent !important;} ",
			
			
			
		///*Grid Subsciption Page*/
		".feed-item-container .branded-page-module-title {display: none !important; height: 0 !important; }",
		"#browse-items-primary {font-size: 0;}",
		".section-list {padding-left: 10px;}",
		"#browse-items-primary .section-list > li { display: inline-block;margin-right: 10px;width: 200px; word-wrap: break-word;}",	
		"#browse-items-primary .expanded-shelf-content-item{ margin-bottom: initial;margin-right: initial;}",
		"#browse-items-primary .item-section .feed-item-container {border: initial;padding: initial; }",	
		"#browse-items-primary .item-section .feed-item-container .menu-container{opacity: 0;}",
		"#browse-items-primary .item-section .feed-item-container:hover .menu-container{ opacity: 1; }",	
		"#browse-items-primary .item-section .feed-item-container .menu-container{ top: 0px;left: 420%;z-index: 1; opacity: 1;}",
		"#browse-items-primary .yt-lockup-thumbnail {float: initial !important; }",
		"#browse-items-primary .yt-lockup-meta, div#browse-items-primary .yt-lockup-byline { max-width: 200px; }",
		"#browse-items-primary .yt-lockup-title, div#browse-items-primary .feed-item-dismissal {max-width: 200px;}",
		".yt-lockup-meta-info > li { display: inline; }",
		".yt-lockup-meta-info, .feed-item-container .yt-ui-ellipsis, .yt-lockup-content div{overflow: hidden; text-overflow: ellipsis; white-space: normal;}",
		"div#browse-items-primary .feed-item-dismissal {font-size: 15px; transform: translateX(30px)translateY(-148px)!important;}",
		".yt-ui-ellipsis:before, .yt-ui-ellipsis:after {content: '...';}",			
		".yt-ui-ellipsis-2 {max-height: 2.5em!important;}",
		".yt-ui-ellipsis {line-height: 1.2em; white-space: normal!important;}",
		".expanded-shelf {height: 200px!important;}",
		".watched-badge{top: 0px; left: 0px;}",
		"ul.yt-badge-list {display: none!important;}",
		".yt-uix-livereminder{display: none!important;}",
		".yt-uix-button-menu.yt-uix-button-menu-action-menu, .yt-uix-button-menu-mask {top: 100%!important;left: 100%!important;}",
		".exp-responsive .feed .yt-lockup-dismissable .yt-lockup-title .yt-uix-tile-link{margin-right: 10px!important;}",
		".branded-page-v2-col-container{width: 101%!important;}",
		"div.branded-page-v2-secondary-col {display: none!important;}",		
		".feed-item-dismissable {margin-bottom: 20px;}",	
		".yt-uix-menu.yt-uix-menu-sibling-content > .yt-uix-menu-mask, .yt-uix-menu.yt-uix-menu-sibling-content > .yt-uix-menu-content{left: auto !important; right: 0px !important; min-width: 110px !important;}",	
		".pl-video .pl-video-time {width: 90px !important;}",
			
		///*Font Fixes*/
		"#page-container{font-family:arial,sans-serif /*Comic Sans MS,Comic Sans*/ !important;}",
		"body.exp-roboto, .exp-roboto button, .exp-roboto input, .exp-roboto textarea, .exp-roboto select{font-family:arial, sans-serif /*Comic Sans*/ !important}",
		".video-list, .video-list-item, .title, .yt-user-info a, .comment-header, .all-comments, .all-comments a, .user-name, .watch-time-text, .yt-lockup-title a,  .yt-lockup-byline, .comment-renderer-header, .comment-author-text, strong{font-weight: 600 !important;}",	
			
	].join("\n");
    document.head.appendChild(css);
})();
