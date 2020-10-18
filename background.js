'use strict';

chrome.tabs.onActivated.addListener(function (info) {
  chrome.browserAction.setPopup({ popup: "" });
});

chrome.browserAction.onClicked.addListener(function (activeTab) {
  if (activeTab.url == 'https://www.mealbookings.cai.cam.ac.uk/bookings.php') {
    chrome.browserAction.setPopup({popup: "popup.html"})
  } else {
    chrome.browserAction.setPopup({ popup: "" })
    chrome.tabs.create({ url: 'https://www.mealbookings.cai.cam.ac.uk/bookings.php' });
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({group: 'A'});
});
