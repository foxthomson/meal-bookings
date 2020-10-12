'use strict';

chrome.storage.sync.get('group', gettable);

function gettable(group) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { group: group.group }, maketable);
    });
}

function maketable(table) {
    // make the table
}
