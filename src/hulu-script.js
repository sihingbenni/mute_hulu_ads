////////////////////////////////////////////////// run this 

info("Have fun watching Hulu!")

// is the app running?
let running = false

// sending a message to the background.js
chrome.runtime.sendMessage({
    text: "I just opened Hulu!"
})

// listen for the starting Point from 
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // listen for messages sent from background.js if the app is not running already
        if (!running && request.message === "Hulu episode selected! start the ad muter!") {
            info("Started watching something!")
            checkIfReady()
        }
    }
);

///////////////////////////////////////////////// functions

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

    // set running Flag
    running = true

    info("Web Player ready!")
    init(web_player_app)
}

/**
 * puts the ClassWatcher on the ad_player and
 * @param {Element} web_player_app 
 */
function init(web_player_app) {

    let ad_player = web_player_app.getElementsByClassName("AdPlayer")[0];
    let video_player = document.getElementById("web-player-app");


    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type == "childList") {
                mutation.addedNodes.forEach((node) => {
                    if (node.className == "AdUnitView") {
                        // Adds are running
                        adsAreRunning()
                    }
                });
                mutation.removedNodes.forEach((node) => {
                    if (node.className == "AdUnitView") {
                        // Adds are over
                        adsAreOver()
                    }
                })
            }
        });

    });

    // Configure the observer:
    var config = {
        childList: true,
        subtree: true
    };

    observer.observe(video_player, config)

    // watch for a hulu specific class change
    // new ClassWatcher(ad_player, 'AdPlayer--hidden', adsAreRunning, adsAreOver)
}

/**
 * The ClassWatcher detected, that an ad is running
 * muting the tab
 */
function adsAreRunning() {
    info("Ad is running!")
    muteTab()
}

/**
 * The ClassWatcher detected, that an ad has stopped running
 * unmuting the tab
 */
function adsAreOver() {
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