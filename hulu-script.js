info("Have fun watching Hulu!")

checkIfReady()

/**
 * Checks if the dom is ready. 
 * By testing if the hulu web player is present in the dom, if not waiting 2s and trying again
 */
function checkIfReady() {
    let web_player_app = document.getElementById('web-player-app');

    if (!web_player_app) {
        info("Web Player not ready! Waiting 2s")
        setTimeout(checkIfReady, 2000)
        return
    }

    info("Web Player ready!")
    init(web_player_app)
}

/**
 * puts the ClassWatcher on the ad_player and
 * @param {Element} web_player_app 
 */
function init(web_player_app) {

    let ad_player = web_player_app.getElementsByClassName("AdPlayer")[0];

    // watch for a hulu specific class change
    new ClassWatcher(ad_player, 'AdPlayer--hidden', classAdded, classRemoved)
}

/**
 * The ClassWatcher detected, that an ad is running
 * muting the tab
 */
function classAdded() {
    info("Ad is running!")
    muteTab()
}

/**
 * The ClassWatcher detected, that an ad has stopped running
 * unmuting the tab
 */
function classRemoved() {
    info("Ads are over, Pheww!")
    unMuteTab()
}

/**
 * mute the tab by sending a message to the background.js
 */
async function muteTab() {
    await chrome.runtime.sendMessage({
        text: "mute me!"
    });
}

/**
 * unmute the tab by sending a message to the background.js
 */
async function unMuteTab() {
    await chrome.runtime.sendMessage({
        text: "unmute me!"
    });
}