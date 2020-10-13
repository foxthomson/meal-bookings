'use strict';

let page = document.getElementById('buttonDiv');
const kButtonColors = ['A', 'B', 'C', 'D'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.innerHTML = item;
    button.onClick = "window.open('https://www.mealbookings.cai.cam.ac.uk/bookings.php');";
    button.addEventListener('click', function() {
      alert("Group successfully set to " + item);
      chrome.storage.sync.set({group: item});
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);