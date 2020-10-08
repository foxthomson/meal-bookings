'use strict';

let page = document.getElementById('buttonDiv');
const kButtonColors = ['A', 'B', 'C', 'D'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.innerHTML = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({group: item})
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
