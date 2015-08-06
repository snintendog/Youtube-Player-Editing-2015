// ==UserScript==
// @name        restore-watch-later
// @namespace   meh
// @author MechaLynx
// @date 2015-08-04
// @description Places the 'Watch Later' button on the youtube player
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @run-at document-end
// @version     0.0.1
// @grant       none
// ==/UserScript==

var origbutt = document.getElementsByClassName('ytp-watch-later-button ytp-button')[0]
var watchlaterbutt = origbutt.cloneNode(1);

watchlaterbutt.style.float = 'right';
watchlaterbutt.addEventListener('click', function(e){
    origbutt.click();
})

document.getElementsByClassName('ytp-chrome-controls')[0].appendChild(watchlaterbutt);
