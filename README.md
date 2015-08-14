# YouTube Player Restoration Project

On August of 2015 Google updated their YouTube player. While the performance and bug fixes where welcomed by some, many users disliked the new interface and missed old features. This project attempts to restore the look and interface of the YouTube player to its state before the update on 03-08-2015.

It was born from this reddit thread:

https://www.reddit.com/r/youtube/comments/3fn5ys/has_the_video_player_been_redesigned/

_As an aside, there has been a bit too much hostility towards Google developers for the changes - please remember that they are professionals doing their best and it's more than likely that the UI changes have been made after considerable study of user metrics. While we are trying to restore the UI to how it was, this is to provide choice, not to avoid change._

##Installing

###Stable

For those coming here for the install the stable version, its hosted at:

https://userstyles.org/styles/117273/youtube-player-august-2015

You'll need [Stylish](https://userstyles.org/) to use it.

So far, this only restores the overall look of the player to mostly how it used to be before the update. Some changes require Javascript, which is why a userscript is in development, although it isn't complete enough yet.

###Development

For those interested in testing the in-development userscript version, it can be found here:

https://raw.githubusercontent.com/snintendog/Youtube-Player-Editing-2015/master/Dev/YPARWL.user.js

Please report any bugs as you come across them. This includes the changes from the userstyle, but is likely to be more unstable.

To use it you'll need [Greasemonkey](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/) for Firefox or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) for Chrome. Tampermonkey should work for Opera as well.

Support is unknown for IE and Safari (and if you're still using IE, please get a better browser, it'll make the world a better place). The script has been tested on Firefox mainly, so if you find issues on Chrome or Opera, report any strange behaviors.

##TODO

Decided to go further than originally planned:

  * UI

    - Grid Subsciptions
    - Watch Page
    - Auto play next video removal and disable default
    - Hide comments section and load with a button
    - Auto expand description
    - Color customization
    - Add settings page to contain all changes and save them

  * Player

    - Fix embeds
    - Allow for full screen to have auto hide and scaled controls
      - new transparent controls have the mouse over fix not affect full screen while keeping it for embeds and watch page
    - Settings for all of player items to be toggled

  * Other

    - Logo and Better Name

##Credits

Reddit user TheCoryKid (auto-hide)

Github user MechaLynx (restoring the 'Watch Later' button on the player's bar)

Greasyfork/userstyle user anon ymous/anon1928 (progress bar fix)

##License

This project is released under the terms of the GNU GPL v2. See the included LICENSE file for details.
