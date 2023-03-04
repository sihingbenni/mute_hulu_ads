console.log("Background running!")


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