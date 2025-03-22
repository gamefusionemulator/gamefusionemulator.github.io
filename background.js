// Installation event handler
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "install") {
        // First, open popup.html in a new tab
        chrome.tabs.create({
            url: chrome.runtime.getURL("popup.html")
        });
        
        // Then, open the welcome page in another tab
        chrome.tabs.create({
            url: "https://gamefusionemulator.net/?install-extension"
        });
        
        // Store installation timestamp
        chrome.storage.local.set({
            'installDate': new Date().toISOString(),
            'extensionInstalled': true
        });
        
        console.log("Extension installed successfully!");
    } else if (details.reason === "update") {
        // Track update information
        const thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion);
    }
});

// Uninstall URL - this will redirect users when they uninstall the extension
chrome.runtime.setUninstallURL("https://gamefusionemulator.net/?uninstall-extension");

// Handle browser action click (when user clicks extension icon)
chrome.action.onClicked.addListener(function(tab) {
    // Open popup.html in a new tab
    chrome.tabs.create({
        url: chrome.runtime.getURL("popup.html")
    });
});