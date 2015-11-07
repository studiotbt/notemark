"use strict";

// Add site to storage
function addSites(tabs, callback) {
    chrome.storage.local.get("sites", function(storage) {
        var storage = storage["sites"] || [];
        for (let tab of tabs) {
            // Get a favicon properly
            if (!tab.favIconUrl || tab.favIconUrl.indexOf("chrome://theme") > -1) {
                tab.favIconUrl = chrome.runtime.getURL("../img/favicon.png");
            }
            let site = { title: tab.title, faviconUrl: tab.favIconUrl, url: tab.url };
            storage.push(site);
        }
        // Save modified |storage| object
        chrome.storage.local.set({sites: storage}, function() {
            callback();
        });
    });
}

// Remove site from storage
function removeSite(url, callback) {
    chrome.storage.local.get("sites", function(storage) {
        var sites = storage["sites"];
        if (!sites) {
            return;
        }
        for (let i=0; i<sites.length; i++) {
            if (sites[i].url === url) {
                sites.splice(i, 1);
                break;
            }
        }
        chrome.storage.local.set({sites: sites}, function() {
            callback();
        });
    });
}

// Get some info about current tab
function getCurrentTabInfo(callback) {
    chrome.tabs.query({active: true}, function(tab) {
        callback(tab);
    });
}