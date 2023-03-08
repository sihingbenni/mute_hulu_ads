console.log("Background running!")

// define regex expression that matches the needed url, so that the ad muter works
mute_on_urls = {
    "www.hulu.com": "/watch/*/"
}


chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {

        // determine from what streaming service this comes
        if (changeInfo.url) {
            console.log(changeInfo)
            const url = new URL(changeInfo.url)

            if (mute_on_urls[url.hostname] && url.pathname.match(mute_on_urls[url.hostname])) {
                console.log(changeInfo)
                chrome.tabs.sendMessage(tabId, {
                    message: "Hulu episode selected! start the ad muter!"
                })
            }
        }
    }
);

/**
 * Add message listener.
 * Listening for specific messages from the content-scripts
 * Return the tab id 
 * Mute the tab
 * Unmute the tab
 */
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text == "what is my tab_id?") {
        sendResponse({
            tab: sender.tab.id
        });
    } else if (msg.text == "mute me!") {
        setTabMute(sender.tab.id, true)
        console.log(`Tab with Id: ${sender.tab.id} has been muted!`)
    } else if (msg.text == "unmute me!") {
        setTabMute(sender.tab.id, false)
        console.log(`Tab with Id: ${sender.tab.id} has been unmuted!`)
    }

});

/**
 * Mutes or unmutes an tab with specific id
 * @param {int} tabId 
 * @param {Boolean} muted 
 */
async function setTabMute(tabId, muted) {
    await chrome.tabs.update(tabId, {
        muted
    });
}