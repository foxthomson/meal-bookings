'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({group: 'A'});
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlEquals: 'https://www.mealbookings.cai.cam.ac.uk/bookings.php'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
