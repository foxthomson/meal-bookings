// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.tabs.executeScript(null, {
  file: 'highlight.js'
});

let page = document.getElementById('buttonDiv');
const kButtonColors = ['A', 'B', 'C', 'D'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.innerHTML = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({group: item}, function() {
        chrome.tabs.executeScript(null, {
          file: 'highlight.js'
        });
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
