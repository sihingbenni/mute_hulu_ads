# Chrome Extension
## mute_hulu_ads
Mutes the chrome tab whenever hulu is playing an ad

The script is detecting changes in the html to figure out if an ad is playing at the moment

If an ad is playing it mutes the tab

Only the background script can access the chrome.tabs api
So the hulu-script is sending a message to the background script which handles the muting


## TODOs 
- add an option to disable (pause) the script 
